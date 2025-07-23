'use client'

import {useEffect} from "react";
import {captureException} from "@sentry/nextjs";
import ErrorBoundary from "@/app/components/error";

export default function GlobalError({error}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return <ErrorBoundary error={error}/>
}