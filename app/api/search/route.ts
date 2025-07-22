export async function GET() {
  const encodedQuery = `(intitle:"quodis" AND inbody:"quodis") (inpage:beats OR inpage:music OR inpage:artist)`;

  try {
    const braveRes = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${encodedQuery}&count=5&text_decorations=false`, {
      headers: {
        'Accept': 'application/json',
        'X-Subscription-Token': process.env.BRAVE_API_KEY as string,
      },
    });

    if (!braveRes.ok) {
      throw new Error(`Brave API request failed with status ${braveRes.status}`);
    }
    const data = await braveRes.json();

    if (data.web && Array.isArray(data.web.results)) {
      return new Response(JSON.stringify(data.web.results), {
        headers: {'Content-Type': 'application/json'},
        status: braveRes.status,
      });
    } else {
      throw new Error(`Brave API response has unpredictable structure`);
    }
  } catch (err) {
    return new Response(JSON.stringify({
      error: 'Failed to fetch search results',
      details: (err as Error).message
    }), {
      headers: {'Content-Type': 'application/json'},
      status: 500,
    });
  }
}