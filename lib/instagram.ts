// lib/instagram.ts

export interface InstagramData {
  followers_count: number
  profile_pic_url: string
  full_name: string
  biography: string
  is_verified: boolean
}

// Real Instagram data fetcher using public API
export async function fetchInstagramData(username: string): Promise<InstagramData | null> {
  try {
    // Using Instagram's public API endpoint
    const response = await fetch(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    )

    if (!response.ok) {
      // Fallback to alternative endpoint
      const fallbackResponse = await fetch(
        `https://www.instagram.com/${username}/?__a=1&__d=dis`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; UpForge/1.0)',
          },
          next: { revalidate: 3600 }
        }
      )
      
      if (fallbackResponse.ok) {
        const data = await fallbackResponse.json()
        const user = data.graphql?.user || data.user
        return {
          followers_count: user.edge_followed_by?.count || 0,
          profile_pic_url: user.profile_pic_url_hd || user.profile_pic_url,
          full_name: user.full_name,
          biography: user.biography,
          is_verified: user.is_verified || false
        }
      }
      
      return null
    }

    const data = await response.json()
    const user = data.data?.user
    
    return {
      followers_count: user.edge_follow?.count || 0,
      profile_pic_url: user.profile_pic_url_hd || user.profile_pic_url,
      full_name: user.full_name,
      biography: user.biography,
      is_verified: user.is_verified || false
    }
  } catch (error) {
    console.error('Error fetching Instagram data:', error)
    return null
  }
}
