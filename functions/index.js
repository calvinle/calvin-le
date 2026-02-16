/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const {onSchedule} = require("firebase-functions/scheduler");
const logger = require("firebase-functions/logger");
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

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

/**
 * Scheduled function that runs once a month to fetch powerlifting data
 * from Close Powerlifting API and store it in Firebase Realtime Database.
 * Runs at 2:00 AM UTC on the 1st of each month.
 */
/* eslint-disable indent */
/* eslint-disable max-len */
exports.fetchClosePowerliftingData = onSchedule("0 2 1 * *", {secrets: [closePowerliftingApiKey]}, async (context) => {
      try {
        const apiKey = closePowerliftingApiKey.value();

        if (!apiKey) {
          throw new Error(
              "CLOSEPOWERLIFTING_API_KEY secret is not set",
          );
        }

        logger.info("Fetching powerlifting data from Close Powerlifting API");

        const response = await axios.get(
            "https://closepowerlifting.com/api/users/calvinle",
            {
              headers: {
                "Authorization": `Bearer ${apiKey}`,
              },
            });

        const db = admin.database();
        const timestamp = new Date().toISOString();

        // Store the fetched data in Firebase Realtime Database
        await db.ref("powerlifting/user_data").set({
          data: response.data,
          lastUpdated: timestamp,
        });

        logger.info("Successfully fetched and stored powerlifting data", {
          timestamp,
          dataSize: JSON.stringify(response.data).length,
        });
      } catch (error) {
        logger.error("Error fetching powerlifting data", error);
        throw error;
      }
    });
/* eslint-enable indent */
/* eslint-enable max-len */
