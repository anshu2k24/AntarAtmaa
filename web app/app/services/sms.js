const dotenv = require("dotenv");
const twilio = require("twilio");

dotenv.config();

const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE = process.env.TWILIO_PHONE;
const ALERT_RECEIVER_PHONE = process.env.ALERT_RECEIVER_PHONE;

if (!TWILIO_SID || !TWILIO_AUTH_TOKEN) {
  console.error("❌ Twilio credentials are missing. Check your .env file.");
}

let client;
try {
  client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);
} catch (err) {
  console.error("❌ Failed to initialize Twilio client:", err.message);
}

/**
 * Send SMS via Twilio
 */
const sendAlertSMS = async ({ level, siteId }) => {
  const message = `⚠️ Rockfall Alert: ${level} risk detected at Site ${siteId}. Take immediate action!`;

  try {
    if (!client) throw new Error("Twilio client not initialized");

    const response = await client.messages.create({
      body: message,
      from: TWILIO_PHONE,
      to: ALERT_RECEIVER_PHONE,
    });

    console.log("📲 SMS sent via Twilio:", response.sid);
  } catch (error) {
    console.error("❌ Error sending SMS via Twilio:", error.message);
  }
};

module.exports = { sendAlertSMS };
