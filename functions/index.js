/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { defineSecret } = require("firebase-functions/params");
const closePowerliftingApiKey = defineSecret("CLOSEPOWERLIFTING_API_KEY");
const { logger } = require("firebase-functions");
const {initializeApp} = require("firebase-admin/app");
const {getDatabase} = require("firebase-admin/database");
const axios = require("axios");
require("dotenv").config({path: __dirname + "/.env.local"});

initializeApp();

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 10});

/**
 * Hardened GET for third-party JSON APIs.
 * - maxRedirects 0: never forward the Authorization header to another host
 * - timeout and size limits: a slow or oversized response can't hang or bloat the function
 * @param {string} url - URL to fetch
 * @param {Object} headers - Request headers
 * @return {Promise<Object>} Parsed response body
 */
async function fetchJson(url, headers = {}) {
  const response = await axios.get(url, {
    headers,
    timeout: 15000,
    maxRedirects: 0,
    maxContentLength: 5 * 1024 * 1024,
    responseType: "json",
  });
  return response.data;
}

/**
 * Turns an error into a log-safe summary. Axios errors carry the full request
 * config, including the Authorization header, so they must never be logged or
 * rethrown as-is.
 * @param {Error} error - Any error
 * @return {{message: string, status: (number|undefined), code: (string|undefined)}}
 */
function safeError(error) {
  return {
    message: error.message,
    status: error.response ? error.response.status : undefined,
    code: error.code,
  };
}

/**
 * Scheduled function that runs once a month to fetch powerlifting data
 * from Close Powerlifting API and store it in Firebase Realtime Database.
 * Runs at 2:00 AM UTC on the 1st of each month.
 */
/* eslint-disable indent */
/* eslint-disable max-len */
exports.fetchClosePowerliftingData = onSchedule({
  schedule: "0 0 * * *",         // Every night at midnight UTC
  secrets: [closePowerliftingApiKey],
  timeoutSeconds: 60,
  }, 
  async (event) => {
  try {
    const apiKey = closePowerliftingApiKey.value();

    if (!apiKey) {
    throw new Error("CLOSEPOWERLIFTING_API_KEY secret is not set");
    }

    logger.info("Fetching powerlifting data from Close Powerlifting API");

    const data = await fetchJson(
    "https://closepowerlifting.com/api/users/calvinle",
    {"Authorization": `Bearer ${apiKey}`},
    );

    const db = getDatabase();
    const timestamp = new Date().toISOString();

    await db.ref("powerlifting/user_data").set({
    data,
    lastUpdated: timestamp,
    });

    logger.info("Successfully fetched and stored powerlifting data");
  } catch (error) {
    const details = safeError(error);
    logger.error("Error fetching powerlifting data", details);
    // Rethrow a clean error so the runtime's own error logging can't include the API key
    throw new Error(`Powerlifting fetch failed: ${details.message}`);
  }
});
/* eslint-enable indent */
/* eslint-enable max-len */

/**
 * Scheduled function that runs once a day to fetch speedcubing data
 * from WCA REST API and store it in Firebase Realtime Database.
 * Runs at 3:00 AM UTC daily.
 */
/* eslint-disable indent */
/* eslint-disable max-len */
exports.fetchWcaSpeedcubingData = onSchedule({
  schedule: "0 3 * * *",         // Every day at 3:00 AM UTC
  timeoutSeconds: 60,
  }, 
  async (event) => {
  try {
    logger.info("Fetching speedcubing data from WCA REST API");

    const data = await fetchJson(
    "https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/persons/2010LECA01.json",
    );

    const db = getDatabase();
    const timestamp = new Date().toISOString();

    await db.ref("speedcubing/wca_data").set({
    data,
    lastUpdated: timestamp,
    });

    logger.info("Successfully fetched and stored WCA speedcubing data");
  } catch (error) {
    const details = safeError(error);
    logger.error("Error fetching WCA speedcubing data", details);
    throw new Error(`Speedcubing fetch failed: ${details.message}`);
  }
});
/* eslint-enable indent */
/* eslint-enable max-len */
