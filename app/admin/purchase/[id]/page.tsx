import CheckoutForm from "@/app/components/checkout-form/checkout-form";
import { getBeats } from "@/app/actions/beats";
import PlayableCover from "./playable-cover";

export default async function PurchasePage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const beat = (await getBeats()).find((beat) => beat.id === id);

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto px-4 md:px-0 py-8">
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-8">
        {beat?.picture_url && (
          <PlayableCover beat={beat} />
        )}

        <div className="flex flex-col w-full">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{beat?.name}</h1>
            <p className="text-gray-600 mt-2">{beat?.description}</p>
            <p className="text-xl font-bold text-gray-900 mt-4">${beat?.price || 0}</p>
            <p className="text-xl font-bold text-gray-900 mt-4">{beat?.bpm || 0} bpm</p>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <CheckoutForm uiMode="embedded" beatId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
