const SERVICE_ACCOUNT = {
  project_id: "upforge-quizz",
  client_email: "firebase-adminsdk-fbsvc@upforge-quizz.iam.gserviceaccount.com",
  private_key: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDWk+0eS/g1hymG
ufrwxiYrnq2+Z7oqVpl4pQ0i2XNAPeP5TvYgfnh3SlC7O0IUu2oBRxqTUpdcjAwz
daUrDgP/K/acHQs12IVf9h2E7xlzLGEk4zDxJ4OkR9FdDq/ofQN8SDNUIZemQj04
C/q47y+HyG7W7Tp0YmDDB1OMrgTFfzPn3cNsUn8e1gO/4QSMfbgM0nTHJ4DZ48YT
tNg6YyMW/4pcDab34V86l6hjCkmrJJUE96SnEvdsCSLc6HCZzC7+et8U+KaGWhMh
j9mDGfr/K1TMOEw9XHB9GxG1jqAGc1zd0wJxz9sDlwrP+S1C+urVhMePjHb9JZFx
7+J0gBkbAgMBAAECggEAG4oWaN4w3Snbk14uOJWt03OvnTGHNqTbrfISVV0u31lc
zM6sucSRkHnaElWg0wlZ/w+m9657clYfwMECHEcAY1EQpb5NMIbOrgoShXusZVhA
9YYvw1uiF8UHOALJDTUc6+gA/R9nQmAw/DmpXu/acU+w+LuvVhLu6Uj47k7Cmlgk
e/E6wh0LULCgRc5dO/omlrKiAoRwmF9FI8khvYEZ9FEOx1d/nZRrfYwalGCIUnR4
+DLqgCeUEpITEZIHULlfVrb4kqAxly9nbXy/xn5+//3/vE2H5aMMNdOh3C9UKXMX
bUUZZehi0tqaAlxaPnUElUmosFOGsiBurQW9fl7iHQKBgQD/5qFJtIZ6Pa48adv0
szuoN+ZbNwI1fXbDiUfe+5bTUIkzetuYWg/cSDplYJtQNzM9SyoxT/zSNnb9wqJv
55yEzDA5AXdf+ZjwEwBBNqaSGfPEYf7tumH5hDvaLpFTRBbKzHZdDXCYipQ71WP8
ywZ7ZcG7MbgJFGd0H2tsWzhRZQKBgQDWqTMPRMlNY/1/3rKIwR2p7Wf41w/9sylf
CICjrmaND2F+Odn46dXsLJham6DaPxuEzQvmCkePnPTiZKuujCF4P68dCAMwYY5g
eXNtxcOzCtC65iuqwhf3eHab0twnqOT3jMH4vXgZK0+SU58jfQt6n18Jhrvkc6CK
xpJIonFYfwKBgQD4DnA6KixRQokrNtJomXUy0z0RHnmdsEj3spNgqzDBFkhpBqbn
QCYvujQhIUxsrZWVzM7Rjl/cxb8CrTEYmMM4V1ZHbAxzlFeUIFcW4AsHhPCvZO7h
MtLWNEBwdsOYm2AcpaX2/ZgvxeV7Opb57TQTWcg51TA4XPcLsYlIOASXoQKBgETX
urJY4x5YxQHvT96f4H2Qz9l0T4KTpN7/gRH9apIurpumvgsgIyU9IBde9fVIa/Dp
Obmq7kxWkArTMmQmOM2xzt1Gpo8rmlfCW4yG8j5HZ62pB7QZz0nkblWHCGgHuHbT
w5mcWhnoU/qfqtfc0IOg/P+3ICciFgirqlp1DljNAoGAV+zOlEqjUjhW/Wa+aUzG
x0e2wUluZ2FQAbZV3aKpmXX/EywOUY03DZYl8mvdgBog95hnD2nahG9Z1bPngab2
Ff9d5Zm77BpibjjoYHutmeFidL80ywrGs0H6VDKs0vy0tc+gbl7fEub7WGIJGKYE
3Ln3nWVB51WDGt8C41dVHfA=
-----END PRIVATE KEY-----`,
};

let cachedToken: { token: string; expiresAt: number } | null = null;

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----[^\n]+-----/g, "")
    .replace(/\s+/g, "");
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getServiceAccountToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.expiresAt > now + 60) {
    return cachedToken.token;
  }

  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: SERVICE_ACCOUNT.client_email,
    sub: SERVICE_ACCOUNT.client_email,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
    scope: "https://www.googleapis.com/auth/datastore",
  };

  const unsignedJwt = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}`;
  const binaryKey = pemToArrayBuffer(SERVICE_ACCOUNT.private_key);

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(unsignedJwt)
  );

  const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const assertion = `${unsignedJwt}.${signatureBase64}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to obtain Google token: ${await res.text()}`);
  }

  const data = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: now + (data.expires_in || 3600),
  };

  return cachedToken.token;
}

function toFirestoreValue(val: any): any {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === "boolean") return { booleanValue: val };
  if (typeof val === "number") {
    return Number.isInteger(val) ? { integerValue: val.toString() } : { doubleValue: val };
  }
  if (typeof val === "string") return { stringValue: val };
  if (Array.isArray(val)) return { arrayValue: { values: val.map(toFirestoreValue) } };
  if (typeof val === "object") {
    const fields: Record<string, any> = {};
    for (const [k, v] of Object.entries(val)) {
      fields[k] = toFirestoreValue(v);
    }
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
    const res: Record<string, any> = {};
    for (const [k, v] of Object.entries(field.mapValue.fields || {})) {
      res[k] = fromFirestoreValue(v);
    }
    return res;
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
  for (const [k, v] of Object.entries(doc.fields)) {
    data[k] = fromFirestoreValue(v);
  }
  return data;
}

const BASE_URL = `https://firestore.googleapis.com/v1/projects/${SERVICE_ACCOUNT.project_id}/databases/(default)/documents`;

export async function adminAddDocument(collectionPath: string, data: Record<string, any>, customDocId?: string) {
  const token = await getServiceAccountToken();
  const fields: Record<string, any> = {};
  for (const [k, v] of Object.entries(data)) {
    fields[k] = toFirestoreValue(v);
  }

  let url = `${BASE_URL}/${collectionPath}`;
  if (customDocId) {
    url = `${BASE_URL}/${collectionPath}?documentId=${encodeURIComponent(customDocId)}`;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Firestore admin write failed [${res.status}]: ${errText}`);
  }

  const json = await res.json();
  return decodeFirestoreDoc(json);
}

export async function adminListDocuments(collectionPath: string, pageSize = 50) {
  const token = await getServiceAccountToken();
  const url = `${BASE_URL}/${collectionPath}?pageSize=${pageSize}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return [];
  const json = await res.json();
  if (!json.documents) return [];
  return json.documents.map(decodeFirestoreDoc);
}
