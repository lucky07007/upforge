// Firebase Admin REST helper for legacy quiz comments/leads.
// Credentials MUST be supplied through environment variables; never commit a
// service-account private key to the repository.

type ServiceAccount = {
  project_id: string;
  client_email: string;
  private_key: string;
};

function getServiceAccount(): ServiceAccount {
  const project_id = process.env.FIREBASE_PROJECT_ID || "";
  const client_email = process.env.FIREBASE_CLIENT_EMAIL || "";
  const private_key = (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  if (!project_id || !client_email || !private_key) {
    throw new Error("Firebase Admin credentials are not configured.");
  }
  return { project_id, client_email, private_key };
}

let cachedToken: { token: string; expiresAt: number } | null = null;

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem.replace(/-----[^\n]+-----/g, "").replace(/\s+/g, "");
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

function base64UrlEncode(str: string) {
  return btoa(str).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function getServiceAccountToken() {
  const account = getServiceAccount();
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.expiresAt > now + 60) return cachedToken.token;

  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: account.client_email,
    sub: account.client_email,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
    scope: "https://www.googleapis.com/auth/datastore",
  };
  const unsignedJwt = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}`;
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(account.private_key),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, new TextEncoder().encode(unsignedJwt));
  const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsignedJwt}.${signatureBase64}`,
    }),
  });
  if (!res.ok) throw new Error(`Failed to obtain Google token: ${await res.text()}`);
  const data = await res.json();
  cachedToken = { token: data.access_token, expiresAt: now + (data.expires_in || 3600) };
  return cachedToken.token;
}

function toFirestoreValue(val: any): any {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === "boolean") return { booleanValue: val };
  if (typeof val === "number") return Number.isInteger(val) ? { integerValue: String(val) } : { doubleValue: val };
  if (typeof val === "string") return { stringValue: val };
  if (Array.isArray(val)) return { arrayValue: { values: val.map(toFirestoreValue) } };
  if (typeof val === "object") {
    const fields: Record<string, any> = {};
    for (const [key, value] of Object.entries(val)) fields[key] = toFirestoreValue(value);
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

export function fromFirestoreValue(field: any): any {
  if (!field) return null;
  if ("stringValue" in field) return field.stringValue;
  if ("integerValue" in field) return parseInt(field.integerValue, 10);
  if ("doubleValue" in field) return parseFloat(field.doubleValue);
  if ("booleanValue" in field) return field.booleanValue;
  if ("nullValue" in field) return null;
  if ("timestampValue" in field) return field.timestampValue;
  if ("arrayValue" in field) return (field.arrayValue.values || []).map(fromFirestoreValue);
  if ("mapValue" in field) {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(field.mapValue.fields || {})) result[key] = fromFirestoreValue(value);
    return result;
  }
  return null;
}

export function decodeFirestoreDoc(doc: any): any {
  if (!doc || !doc.fields) return null;
  const data: Record<string, any> = {
    id: doc.name ? doc.name.split("/").pop() : undefined,
    createTime: doc.createTime,
    updateTime: doc.updateTime,
  };
  for (const [key, value] of Object.entries(doc.fields)) data[key] = fromFirestoreValue(value);
  return data;
}

function baseUrl() {
  return `https://firestore.googleapis.com/v1/projects/${getServiceAccount().project_id}/databases/(default)/documents`;
}

export async function adminAddDocument(collectionPath: string, data: Record<string, any>, customDocId?: string) {
  const token = await getServiceAccountToken();
  const fields: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) fields[key] = toFirestoreValue(value);
  let url = `${baseUrl()}/${collectionPath}`;
  if (customDocId) url = `${url}?documentId=${encodeURIComponent(customDocId)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) throw new Error(`Firestore admin write failed [${res.status}]: ${await res.text()}`);
  return decodeFirestoreDoc(await res.json());
}

export async function adminListDocuments(collectionPath: string, pageSize = 50) {
  const token = await getServiceAccountToken();
  const res = await fetch(`${baseUrl()}/${collectionPath}?pageSize=${pageSize}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.documents ? json.documents.map(decodeFirestoreDoc) : [];
}
