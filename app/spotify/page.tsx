'use client';

export default function Page() {
  return (
    <iframe
      style={{ borderRadius: '12px' }}
      src="https://open.spotify.com/embed/artist/4DyidZchSZfnjYlzxDyvDL?utm_source=generator"
      width="100%"
      height="352"
      frameBorder={0}
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}