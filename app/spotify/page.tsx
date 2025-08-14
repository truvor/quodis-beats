export default function Spotify() {
  return (<div className="mx-auto p-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
    <iframe
      className="widget"
      src="https://open.spotify.com/embed/artist/4DyidZchSZfnjYlzxDyvDL?utm_source=generator"
      width="100%"
      height="500"
      frameBorder={0}
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      title="Most popular on Summary"
    />
  </div>)
}