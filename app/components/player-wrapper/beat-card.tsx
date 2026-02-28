import Image from "next/image";
import Link from "next/link";

export default function BeatCard({
  play,
  id,
}: {
  play: (id: number) => void;
  id: number;
}) {
  return (
    <div className="w-screen flex items-center justify-between max-w-2xl p-4 bg-white">
      <Image
        src="/final_chapter_600x600.jpg"
        alt="Beat Image"
        width={50}
        height={50}
        onClick={() => play(id)}
      />
      <span className="text-gray-600 text-sm">Beat Name</span>
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="/admin/purchase"
      >
        $50
      </Link>
    </div>
  );
}
