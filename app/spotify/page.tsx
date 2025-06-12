// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client';

import {useRef, useState, useEffect} from 'react';

export default function Page() {
  const embedRef = useRef(null);
  const spotifyEmbedControllerRef = useRef(null);
  const [iFrameApi, setIframeApi] = useState(undefined);
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const uri = 'spotify:artist:4DyidZchSZfnjYlzxDyvDL';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://open.spotify.com/embed/iframe-api/v1';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (iFrameApi) {
      return;
    }

    window.onSpotifyIframeApiReady = (SpotifyIframeApi) => {
      setIframeApi(SpotifyIframeApi);
    };
  }, [iFrameApi]);

  useEffect(() => {
    if (playerLoaded || iFrameApi === undefined) {
      return;
    }

    iFrameApi.createController(
      embedRef.current,
      {
        width: '100%',
        height: '500',
        uri: uri,
      },
      (spotifyEmbedController) => {
        spotifyEmbedController.addListener('ready', () => {
          setPlayerLoaded(true);
        });
        spotifyEmbedControllerRef.current = spotifyEmbedController;
      }
    );
  }, [playerLoaded, iFrameApi, uri]);

  return (
    <>
      <div ref={embedRef}/>
      {!playerLoaded && <p>Loading...</p>}
    </>
  );
}