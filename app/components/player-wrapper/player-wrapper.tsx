"use client";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function PlayerWrapper() {
  return <AudioPlayer src="/audio/foo.mp3" showSkipControls />;
}

export default PlayerWrapper;
