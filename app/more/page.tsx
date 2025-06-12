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
    <div className='flex flex-col items-center justify-center h-screen'>
      <> {(searchResult.length > 0) ? (
        searchResult.map((result, index) => (
        <div key={index}>
          <h3>{result.title}</h3>
          <p dangerouslySetInnerHTML={{ __html: result.description}} />
        </div>
        ))) : (
          <>
            <h1 className='text-4xl font-bold mb-4'>More Coming Soon!</h1>
            <p className='text-lg'>Stay tuned for more content from Quodis.</p>
          </>
        )
      }</>
    </div>
  );
}