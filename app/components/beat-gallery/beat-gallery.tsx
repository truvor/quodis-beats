"use client";

import BeatCard from "./beat-card";
import BEATS from "@/app/data/beats.json";

function BeatGallery() {
  return (
    <div className="flex flex-col items-center mb-4">
      {BEATS.map((beat) => (
        <BeatCard key={beat.id} beat={beat} />
      ))}
    </div>
  );
}

export default BeatGallery;
