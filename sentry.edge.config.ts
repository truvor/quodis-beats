export {};

if (process.env.NODE_ENV === "production") {
  import("@sentry/nextjs").then(Sentry => {
    Sentry.init({
      dsn: "https://7819f1b9212d4c95542d6888fa43c61e@o4509669944066048.ingest.de.sentry.io/4509669947801680",

      tracesSampleRate: 1.0
    });
  });
}
