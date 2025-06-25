export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const query = searchParams.get('q');

  const encodedQuery = `(intitle:"${query}" AND inbody:"${query}") (inpage:beats OR inpage:music OR inpage:artist)` || '';
  const braveRes = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${encodedQuery}&count=5&text_decorations=false`, {
    headers: {
      'Accept': 'application/json',
      'X-Subscription-Token': process.env.BRAVE_API_KEY as string,
    },
  });

  const data = await braveRes.json();
  return new Response(JSON.stringify(data), {
    headers: {'Content-Type': 'application/json'},
    status: braveRes.status,
  });
}