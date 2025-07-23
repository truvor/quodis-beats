export async function GET() {
  try {
    const query = `
  query getProfileContentTrackList($memberId: String!, $page: Int, $size: Int) {
    profileTracks(memberId: $memberId, page: $page, size: $size) {
      content {
        v2Id
        title
      }
    }
  }
`;

    const body = {
      operationName: 'getProfileContentTrackList',
      query,
      variables: {
        memberId: 'MR141266',
        page: 0,
        size: 5,
      }
    };

    const result = await fetch('https://core.prod.beatstars.net/graphql?op=getProfileContentTrackList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      next: {revalidate: 86400}
    });

    if (!result.ok) {
      throw new Error(`Beatstars API request failed with status ${result.status}`);
    }
    const data = (await result.json()).data;

    if (data.profileTracks.content && Array.isArray(data.profileTracks.content)) {
      return new Response(JSON.stringify(data.profileTracks.content), {
        headers: {'Content-Type': 'application/json'},
        status: result.status,
      });
    } else {
      throw new Error(`Beatstars API response has unpredictable structure`);
    }
  } catch (err) {
    return new Response(JSON.stringify({
      error: 'Failed to fetch Beatstars track list',
      details: (err as Error).message
    }), {
      headers: {'Content-Type': 'application/json'},
      status: 500,
    });
  }
}