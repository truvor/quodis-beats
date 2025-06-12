'use client';

import Script from 'next/script';

export default function Analytics() {
  return (
    <Script
      src={'https://cloud.umami.is/script.js'}
      data-website-id='de2e8101-b828-4d1f-a43b-98ea88db4186'
      strategy='afterInteractive'
    />
  );
}