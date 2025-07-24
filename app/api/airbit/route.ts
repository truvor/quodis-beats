export async function GET() {
  try {
    const query = `
  query SearchBeatsByUser($userId: ID!, $first: Int!, $page: Int!, $search: String!) {
  searchBeatsByUser(
    first: $first
    page: $page
    userId: $userId
    search: $search
    onlyMarketPlace: true
  ) {
    data {
      ... on Beat {
        name
        alias
      }
    }
    paginatorInfo {
      hasMorePages
      total
    }
  }
}
`;

    const body = {
      operationName: 'SearchBeatsByUser',
      query,
      variables: {
        first: 3,
        page: 1,
        search: '',
        userId: '98319'
      }
    };

    const result = await fetch('https://api.airbit.com/gpl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      next: {revalidate: 86400}
    });

    if (!result.ok) {
      throw new Error(`Airbit API request failed with status ${result.status}`);
    }
    const data = (await result.json()).data;

    if (data.searchBeatsByUser && Array.isArray(data.searchBeatsByUser.data)) {
      return new Response(JSON.stringify(data.searchBeatsByUser.data), {
        headers: {'Content-Type': 'application/json'},
        status: result.status,
      });
    } else {
      throw new Error(`Airbit API response has unpredictable structure`);
    }
  } catch (err) {
    return new Response(JSON.stringify({
      error: 'Failed to fetch Airbit track list',
      details: (err as Error).message
    }), {
      headers: {'Content-Type': 'application/json'},
      status: 500,
    });
  }
}