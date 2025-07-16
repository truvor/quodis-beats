import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://7819f1b9212d4c95542d6888fa43c61e@o4509669944066048.ingest.de.sentry.io/4509669947801680",

  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0
});
