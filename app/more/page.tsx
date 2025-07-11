type SearchResult = {
  title: string;
  url: string;
  description: string;
}

export default async function More() {
  const results = await fetch(`${process.env.BASE_URL}/api/search?q=quodis`);
  const resultData = await results.json();

  let searchResult: Array<SearchResult> = [];
  if (resultData.web && Array.isArray(resultData.web.results)) {
    searchResult = resultData.web.results.map((result: {
      title: string;
      url: string;
      description: string;
    }) => ({
      title: result.title,
      url: result.url,
      description: result.description

    }));
  }

  return (
    <div
      className="mt-4 flex flex-col items-center justify-center max-w-2xl mx-auto px-4 sm:px-0">
      {searchResult.length > 0 ? (
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            {searchResult.map((result, index) => (
              <div key={index} className="group pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
                <a href={result.url} target="_blank" rel="noopener noreferrer" className="block hover:no-underline">
                  <h2 className="text-xl font-medium text-blue-700 hover:text-blue-900 hover:underline mb-2 group-hover:underline">
                    {result.title}
                  </h2>

                  <p className="text-sm text-green-600 mb-2 truncate font-medium">{result.url}</p>

                  <p
                    className="text-gray-800 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: result.description }}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Loading</h1>
        </div>
      )}
    </div>
  );
}