'use client'

import {useEffect, useState} from 'react';

type SearchResult = {
  title: string;
  url: string;
  description: string;
}

export default function More() {
  const [searchResult, setSearchResult] = useState<Array<SearchResult>>([]);

  useEffect(() => {
    fetch(`/api/search?q=quodis`).then(response => response.json())
      .then(data => {
        // Query limit could be reached
        let results: Array<SearchResult>;
        if (data.web && Array(data.web.results)) {
          results = data.web.results.map((result: {
            title: string;
            url: string;
            description: string;
          }) => {
            const resultItem = {
              title: result.title,
              url: result.url,
              description: result.description
            };

            console.log('resultItem', resultItem);

            return resultItem;
          });
          setSearchResult(results);
        }
  });
  }, []);

  return (
    <div className="mt-4 flex flex-col items-center justify-center max-w-2xl mx-auto">
      {searchResult.length > 0 ? (
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            {searchResult.map((result, index) => (
              <div key={index} className="group pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
                <a href={result.url} target="_blank" rel="noopener noreferrer" className="block hover:no-underline">
                  <h2 className="text-xl font-medium text-blue-700 hover:text-blue-900 hover:underline mb-2 group-hover:underline">
                    {result.title}
                  </h2>

                  <span className="text-sm text-green-600 mb-2 truncate font-medium">{result.url}</span>

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