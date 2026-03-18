import Image from "next/image";
import Link from "next/link";

export default function BeatCard({
  play,
  id,
  isPlaying,
}: {
  play: (id: number, e: React.MouseEvent) => void;
  id: number;
  isPlaying: boolean;
}) {
  return (
    <div className="relative w-screen flex items-center justify-between max-w-[95vws] xl:max-w-2xl p-4 bg-white hover:bg-gray-100 group">
      <button
        className="absolute inset-0 z-10 cursor-pointer rounded"
        onClick={(e) => play(id, e)}
        aria-label="Play beat"
      />

      <div className="relative z-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/final_chapter_600x600.jpg"
          alt="Beat Image"
          width={50}
          height={50}
        />
        <Image
          src={isPlaying ? "/pause-circle.svg" : "/play-circle.svg"}
          className="absolute z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          alt="Play Icon"
          width={30}
          height={30}
        />
      </div>

      <p className="flex flex-col text-gray-600 w-full pl-2">
        <span>Beat Name</span>
        <span className="text-xs  pl-1">160bpm</span>
      </p>

      <Link
        className="z-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="/admin/purchase"
      >
        $50
      </Link>
    </div>
  );
}
