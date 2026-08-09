/**
 * Centralized server-side configuration.
 *
 * This is the ONLY place backend base URLs and secrets should be read from
 * process.env. Everything here is imported exclusively by files under
 * src/server/** and src/pages/api/**, which Next.js never bundles into the
 * client. Do not import this module (or anything under src/server/) from a
 * page component, a component under src/components, or anything else that
 * renders in the browser -- doing so risks pulling internal hostnames and
 * SDK credentials into client JavaScript again, which is the exact problem
 * this restructure fixes.
 *
 * Every value has a fallback equal to what was previously hardcoded in the
 * old src/pages/api/**\/*.js modules, so behavior is unchanged unless you
 * explicitly set these env vars.
 */

const config = {
  // Internal backend services (previously hardcoded *.test hostnames,
  // reachable only from inside the deployment network -- never from a
  // browser). Override per-environment via env vars.
  apiBaseUrl: process.env.BACKEND_API_BASE_URL || "http://api.test/api",
  heartbeatBaseUrl: process.env.BACKEND_HEARTBEAT_BASE_URL || "http://heartbeat.test/heartbeat",
  confirmationBaseUrl: process.env.BACKEND_CONFIRMATION_BASE_URL || "http://confirmation.test",
  generatorBaseUrl: process.env.BACKEND_GENERATOR_BASE_URL || "http://generator.test/wallet",

  // External, publicly reachable services.
  addressServiceBaseUrl: process.env.ADDRESS_SERVICE_BASE_URL || "https://ethereum.counter.co.ke",
  orderServiceBaseUrl: process.env.ORDER_SERVICE_BASE_URL || "https://api.counter.co.ke",
  binanceBaseUrl: process.env.BINANCE_BASE_URL || "https://data-api.binance.vision",

  // Secret. Must never be prefixed NEXT_PUBLIC_ and must never be read
  // outside src/server/**.
  moralisApiKey: process.env.moralis_api_key || null,
};

module.exports = config;
