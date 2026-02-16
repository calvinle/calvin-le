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
const admin = require("firebase-admin");
const axios = require("axios");
require("dotenv").config({path: __dirname + "/.env.local"});

admin.initializeApp();

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
 * Scheduled function that runs once a month to fetch powerlifting data
 * from Close Powerlifting API and store it in Firebase Realtime Database.
 * Runs at 2:00 AM UTC on the 1st of each month.
 */
/* eslint-disable indent */
/* eslint-disable max-len */
exports.fetchClosePowerliftingData = onSchedule({
    schedule: "0 2 1 * *",           // Move schedule string here
    secrets: [closePowerliftingApiKey], // Secrets belong in this object
    timeoutSeconds: 60,              // Optional: standard for API calls
  }, 
  async (event) => {                 // In v2, the argument is 'event', not 'context'
    try {
      const apiKey = closePowerliftingApiKey.value();

      if (!apiKey) {
        throw new Error("CLOSEPOWERLIFTING_API_KEY secret is not set");
      }

      logger.info("Fetching powerlifting data from Close Powerlifting API");

      const response = await axios.get(
        "https://closepowerlifting.com/api/users/calvinle",
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
          },
        }
      );

      const db = admin.database();
      const timestamp = new Date().toISOString();

      await db.ref("powerlifting/user_data").set({
        data: response.data,
        lastUpdated: timestamp,
      });

      logger.info("Successfully fetched and stored powerlifting data");
      
    } catch (error) {
      // Log the actual error before re-throwing
      logger.error("Error fetching powerlifting data", error);
      throw error; 
    }
});
/* eslint-enable indent */
/* eslint-enable max-len */
