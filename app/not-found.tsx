export default function NotFound() {
  return (
    <div
      className="mt-4 flex flex-col items-center justify-center max-w-2xl mx-auto px-4 sm:px-0">
      <div
        className="w-full bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Not Found</h2>
        <p className="text-slate-600">Could not find requested resource</p>
      </div>
    </div>
  )
}
