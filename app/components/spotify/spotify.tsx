'use client';

import "./spotify.css";
import {useEffect, useState} from "react";

export default function Spotify() {
  const [summary, setSummary] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/summary`, {
      method: 'POST',
      body: JSON.stringify({
        messages: 'make a summary about the producer quodis beats with no follow ups'
      })
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
      .then(data => {
        if (data && data.text) {
          setSummary(data.text);
        }
      });
  }, []);

  return (
    <>
      {summary ?
        <div
          className="summary bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="stext-sm text-amber-800">
            <p className="font-medium">AI-Made Summary about Quodis</p>
            <p className="text-amber-700">{summary}</p>
          </div>
        </div>
        : null}

      <div className='mx-auto p-4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
        <iframe
          className='widget'
          src='https://open.spotify.com/embed/artist/4DyidZchSZfnjYlzxDyvDL?utm_source=generator'
          width='100%'
          height='500'
          frameBorder={0}
          allowFullScreen
          allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
          loading='lazy'
          title="Most popular on Spotify"
        />
      </div>
    </>
  );
}