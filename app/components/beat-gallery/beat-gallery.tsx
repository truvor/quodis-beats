import { Beat } from "@/app/types/beat";
import BeatCard from "./beat-card";
import { getBeats } from "@/app/actions/beats";

async function BeatGallery() {
  const beats = await getBeats();

  return (
    <div className="flex flex-col items-center mb-4">
      {beats.map((beat: Beat) => (
        <BeatCard key={beat.id} beat={beat} />
      ))}
    </div>
  );
}

export default BeatGallery;
