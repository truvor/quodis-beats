import CheckoutForm from "@/app/components/checkout-form/checkout-form";
import BEATS from "@/app/data/beats.json";
import Image from "next/image";

export default async function PurchasePage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const beat = BEATS.find((beat) => beat.id === id);

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto px-4 md:px-0 py-8">
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-8">
        {beat?.cover && (
          <div className="shrink-0 flex justify-center md:items-start">
            <Image
              src={beat.cover}
              alt={beat.name || "Beat cover"}
              width={200}
              height={200}
              className="rounded-lg shadow-sm object-cover"
            />
          </div>
        )}

        <div className="flex flex-col w-full">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{beat?.name}</h1>
            <p className="text-gray-600 mt-2">{beat?.description}</p>
            <p className="text-xl font-bold text-gray-900 mt-4">${beat?.price || 0}</p>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <CheckoutForm uiMode="embedded" beatId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
