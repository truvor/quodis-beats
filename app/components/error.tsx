'use client'

import Image from "next/image";

export default function ErrorBoundary({error}: {
  error: Error & { digest?: string }
}) {

  return (
    <div
      className="mt-4 flex flex-col items-center justify-center max-w-2xl mx-auto px-4 sm:px-0">
      <div
        className="w-full rounded-lg shadow-sm bg-red-50 border border-red-300 p-6 space-y-6 text-red-900">
        <h2 className="flex font-semibold">
          <Image
            src="/error.svg"
            width={20}
            height={20}
            className="mr-1"
            alt="Error"
          />Something went wrong!</h2>
        <p className='text-red-800'>{error.message}</p>
      </div>
    </div>
  )
}