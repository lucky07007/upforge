// lib/creators.ts

export interface Creator {
  id: string
  uf_id: string
  name: string
  instagram_handle: string
  profile_image: string
  category?: string
  verified: boolean
  featured?: boolean
  shuffleOrder?: number // For random positioning
}

// Core creators list - No followers data needed
export const CREATORS_LIST: Creator[] = [
  {
    id: "1",
    uf_id: "UF-00001",
    name: "Lucky Tiwari",
    instagram_handle: "the.luckytiwari",
    profile_image: "https://instagram.fdel11-3.fna.fbcdn.net/v/t51.82787-19/589621453_18084386507086561_308767692752372596_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2gHunY9nB9MjiW8xov1sNDTrAOQShaJo_5aKFAKrSrHkZKvH703kpQuSJNJGLcvo-Bc050MybWVBbu0JArAUwD8W&_nc_ohc=RfMl1L4MVJoQ7kNvwGLYwc3&_nc_gid=A5DG1b_XQKueBn8-KbiDzw&edm=APoiHPcBAAAA&ccb=7-5&oh=00_Af1R5GaBNmACP-4DiGf8C9c8AF33JHT97HZdwnsE44Xj3A&oe=69EA4855&_nc_sid=22de04",
    category: "Public Figure",
    verified: true,
    featured: true, // Fixed at position 1
  },
  {
    id: "2",
    uf_id: "UF-00002",
    name: "Niraj Kumar",
    instagram_handle: "specxniraj",
    profile_image: "https://instagram.fdel11-4.fna.fbcdn.net/v/t51.82787-19/626095548_17850853989670454_6875058572148528240_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDI0LmMyIn0&_nc_ht=instagram.fdel11-4.fna.fbcdn.net&_nc_cat=102&_nc_oc=Q6cZ2gH4wKfeXD0Wv2MFN58zZ2palRnxCWkHm9r0DliHyeT5POT4TT-5vA6A2nFz-Hno8it0ylY3trnhlJ99QT06QS7F&_nc_ohc=6fMDosDJf8IQ7kNvwGBi930&_nc_gid=1hJ3jnWvcb33_4bVDp9ItQ&edm=APoiHPcBAAAA&ccb=7-5&oh=00_Af08dLiAPDzt-9T85mc8_zvXDhYxEUT_dkHgVXExJldIgw&oe=69EA6EE6&_nc_sid=22de04",
    category: "Digital creator",
    verified: true,
    featured: true, // Fixed at position 2
  },
  {
    id: "3",
    uf_id: "UF-00003",
    name: "Elisa",
    instagram_handle: "eeelistar",
    profile_image: "https://instagram.fdel11-4.fna.fbcdn.net/v/t51.2885-19/458249141_2532087130323621_6246366579141550520_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fdel11-4.fna.fbcdn.net&_nc_cat=109&_nc_oc=Q6cZ2gEKiik_EuSeSSujDe0SPRtnVPqfBrxpofTbO9J8-ZEBn8j1qp8BzWId4tp1DCZCwBAPnhkuuTfMWDQC-g0KzWDR&_nc_ohc=xukK5PCogG4Q7kNvwFQAOgF&_nc_gid=kezK2JlWcmmSp__tedXs7A&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af0V_N4_Gfx98zDjvlYJ2Z-dNVX5J3xww_RaQ44okgRdCg&oe=69EA5093&_nc_sid=7a9f4b",
    category: "Entrepreneur",
    verified: true,
    // Will be shuffled
  },
  {
    id: "4",
    uf_id: "UF-00004",
    name: "Raju Sani",
    instagram_handle: "raju_saini_20k",
    profile_image: "https://instagram.fdel11-4.fna.fbcdn.net/v/t51.82787-19/670653867_17984407070972261_971497840176079793_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fdel11-4.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2gE-7CvLMyg2jtsaff6RNVFXnk_QTTECbM4UBAzaiweYMndSUUgCF3hcCDuFORpvGl8QQJRdkP_Bv-B4XTs3SwvG&_nc_ohc=7P9Pxmba81AQ7kNvwEr8trg&_nc_gid=DSxKN1KiGiKaLF1-nShIUA&edm=APoiHPcBAAAA&ccb=7-5&oh=00_Af2r_A05w4OQiGJSjWrmhyJhcC_TKcjgK-dBjh9LtvwsJg&oe=69EA75ED&_nc_sid=22de04",
    category: "Digital creator",
    verified: true,
    featured: true, // Fixed at position 3
  },
  {
    id: "5",
    uf_id: "UF-00005",
    name: "madi - tech reviewer",
    instagram_handle: "thehippiehacker",
    profile_image: "https://instagram.fdel11-2.fna.fbcdn.net/v/t51.2885-19/491493515_3074456016040995_284104712132504447_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fdel11-2.fna.fbcdn.net&_nc_cat=103&_nc_oc=Q6cZ2gFCa4wQ7zzn4u_JloOyfqyxnH9cPdLxKuRjRVVgjO8N8TIl94khJwplPbvCMKIJ5o5wZOfjwPORiibO-W-Dgz8I&_nc_ohc=rwGdYvAYDlAQ7kNvwHmReIH&_nc_gid=enKXQ-PI5TCH0sCve6QLAA&edm=AHzjunoBAAAA&ccb=7-5&oh=00_Af3X8veCEm-Lvb7PW4NZrx1NgCRGomPo0Wvy5pHr6ZuWyg&oe=69EA5E6F&_nc_sid=ba8368",
    category: "Digital creator",
    verified: true,
    // Will be shuffled
  },
  {
    id: "6",
    uf_id: "UF-00006",
    name: "Rafiqah Akhdar",
    instagram_handle: "rxfiqah",
    profile_image: "https://instagram.fdel11-4.fna.fbcdn.net/v/t51.2885-19/451426780_1159003508738181_8695243222590765094_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fdel11-4.fna.fbcdn.net&_nc_cat=109&_nc_oc=Q6cZ2gE-fGF_ww7Cnf-vbs6qzLZSjjlrOK3K0hb7c2eV2Hxwf4fo4URVNNP2RV8EW9cVRH3vigk6HQOgUfzIKq4AyplD&_nc_ohc=lOaO_m7tof8Q7kNvwEMVozV&_nc_gid=MgRThzjd7gUMdgFrIxT6Fg&edm=APoiHPcBAAAA&ccb=7-5&oh=00_Af0MfJr8yMfCp-n7bfs5R14Nia9NSM8aOBM0QA72vWaavA&oe=69EA56B0&_nc_sid=22de04",
    category: "Blogger",
    verified: true,
    // Will be shuffled
  },
  {
    id: "7",
    uf_id: "UF-00007",
    name: "Mansi",
    instagram_handle: "ugc.with.mansi",
    profile_image: "https://instagram.fdel11-2.fna.fbcdn.net/v/t51.2885-19/449205099_454619287316307_8083015164556185012_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fdel11-2.fna.fbcdn.net&_nc_cat=103&_nc_oc=Q6cZ2gHicJltGc79JwBSnCwaXZgtDRyk7BlJJF-ndazMuc27kkFLBd3snOpXOfdmQrp9bjaCTnyWcflONbni28sEk6xi&_nc_ohc=bUgKiALSuw4Q7kNvwFOa2xu&_nc_gid=JbJ6VeSZuqUtwLF9KYZ7cg&edm=ADDLYBMBAAAA&ccb=7-5&oh=00_Af1fkfy0_THQkbKIpuvMTvHjFLa8VBniaIQUtKxwT9doHw&oe=69EA79EB&_nc_sid=56bdfd",
    category: "Digital creator",
    verified: true,
    // Will be shuffled
  },
  {
    id: "8",
    uf_id: "UF-00008",
    name: "Ishita",
    instagram_handle: "iamishitakush",
    profile_image: "https://instagram.fdel11-3.fna.fbcdn.net/v/t51.82787-19/637711904_18080801018588191_8806845480360018438_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=107&_nc_oc=Q6cZ2gEW0prCE180IGoqMIOCq9Shw3Xs-Y6lAuMM69pRMOngG3xdu6XJ9O_43HNZvPVS_OI0SfXKh3sMr7yOP5iNaEBd&_nc_ohc=3Ir3LdQW0tcQ7kNvwGPgMzQ&_nc_gid=s6UjuoWaLdFTgmRzkY7Hog&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af01tsSQxhe36cQVducIrxLok0MVrK4ID4RFrF4Nxc-L3g&oe=69EA74C0&_nc_sid=7a9f4b",
    category: "Digital creator",
    verified: true,
    featured: true, // Fixed at position 4
  },
  {
    id: "9",
    uf_id: "UF-00009",
    name: "Shobhit Agrawal",
    instagram_handle: "food.attic",
    profile_image: "https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-19/333954721_1241966953413028_741924684335210151_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2gGoX_WtCN3lDBPrbjd4rIh6ApX-1nuyDot_kJXTjYJwB79Fmms4oFIcED5Fj_Ll7TrNPo8N5RLN-dMyR6896KdK&_nc_ohc=07xPEQPQknQQ7kNvwGdrbuV&_nc_gid=3tiPzzyx4OyTha4BHjyPnQ&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af2XVcJPXa9-P5zbgzZ2jDujpI5_8lgiGv6Sf2cHGqj5nA&oe=69EA8083&_nc_sid=7a9f4b",
    category: "food",
    verified: true,
    // Will be shuffled
  },
  {
    id: "10",
    uf_id: "UF-00010",
    name: "Pratap J",
    instagram_handle: "pixelshooter",
    profile_image: "https://instagram.fdel11-2.fna.fbcdn.net/v/t51.2885-19/427613220_1104557424325543_6646171235668309074_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fdel11-2.fna.fbcdn.net&_nc_cat=107&_nc_oc=Q6cZ2gFTgVK0PwNte9WGfQs7nXdyiBfkqn6OxGKF_yanpEV14WN708CSBRDmAorIvy2Vy2qL2CKuV24ry7f4SYsPU427&_nc_ohc=3vHfmna7R10Q7kNvwEn-XcZ&_nc_gid=wsB_YGsNqp5PZ7xp1hbcww&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af3uNN-ajs-JYnNQtOkdGeBh0ls4gLMNvxYAuVpawYAHrQ&oe=69EA8074&_nc_sid=7a9f4b",
    category: "Digital creator",
    verified: true,
    // Will be shuffled
  },
  {
    id: "11",
    uf_id: "UF-00011",
    name: "Abhinav Singh Rajawat",
    instagram_handle: "abhinav_singh_rajawat_",
    profile_image: "https://instagram.fdel11-1.fna.fbcdn.net/v/t51.82787-19/658188521_18083180948591998_2150844035347299041_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fdel11-1.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2gGBSuUgER7DTni1nxwhKvV-_MTxEGedKxouCXyjIWltfO6k88M9TJ_-kRSr6giNuQ7d3bgJAoJgvDxdZsavioDq&_nc_ohc=jhQqUQ3qnzkQ7kNvwGWasP8&_nc_gid=4XSfTqQ-43ALLvfBJ936Vg&edm=APoiHPcBAAAA&ccb=7-5&oh=00_Af1lX6ngxPjVTx7WgkeWa454IKQoTfVTgh1w9iOUeKtT5w&oe=69EA5683&_nc_sid=22de04",
    category: "Poet",
    verified: true,
    // Will be shuffled
  },
  {
    id: "12",
    uf_id: "UF-00012",
    name: "DJ CAS",
    instagram_handle: "djcasindia",
    profile_image: "https://instagram.fdel11-1.fna.fbcdn.net/v/t51.82787-19/641194572_18569602312062096_3756827210088028670_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4zMjAuYzIifQ&_nc_ht=instagram.fdel11-1.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2gEPXVuhHfFKZbibui-bipT21-8iFAaUvh8D8BN_epSoqlsAG0rYmB2OiEpomg4feg8ZK88f4_0GuUFjyyEmDZL2&_nc_ohc=jtpmAWy3AvsQ7kNvwFEP7T5&_nc_gid=v8gAlrR6kDJcu9moue0fLw&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af0ZPsjE_BWy3ThinQER15lyICsLU3xQV10hLElgq9Ld8g&oe=69EA52E1&_nc_sid=7a9f4b",
    category: "Music Producer",
    verified: true,
    // Will be shuffled
  }
]

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Get creators with smart shuffle - fixed positions for featured, shuffle for rest
export function getShuffledCreators() {
  const featured = CREATORS_LIST.filter(c => c.featured)
  const regular = CREATORS_LIST.filter(c => !c.featured)
  
  // Shuffle only the regular creators
  const shuffledRegular = shuffleArray(regular)
  
  // Insert featured creators at their fixed positions
  // Positions: Alex(1), Maya(2), Sofia(3), Priya(4)
  const result = [...shuffledRegular]
  
  // Insert featured creators at specific indices
  result.splice(0, 0, featured.find(c => c.id === "1")!) // Position 1
  result.splice(1, 0, featured.find(c => c.id === "2")!) // Position 2
  result.splice(3, 0, featured.find(c => c.id === "4")!) // Position 4 (Sofia)
  result.splice(7, 0, featured.find(c => c.id === "8")!) // Position 8 (Priya)
  
  return result
}

export function getAllCreators() {
  return CREATORS_LIST
}

export function getCreatorCount() {
  return CREATORS_LIST.length
}
