const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();


const ALERT_EMAIL_USER = process.env.ALERT_EMAIL_USER;
const ALERT_EMAIL_PASS = process.env.ALERT_EMAIL_PASS;
const ALERT_RECEIVER_EMAIL = process.env.ALERT_RECEIVER_EMAIL; 

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or "Outlook" / "Yahoo" depending on provider
  auth: {
    user: ALERT_EMAIL_USER,
    pass: ALERT_EMAIL_PASS,
  },
});

/**
 *
 * @param {Object} alertData 
 * @param {string} alertData.level 
 * @param {string} alertData.siteId
 * @param {Object} alertData.prediction
 */
const sendAlertEmail = async (alertData) => {
  const { level, siteId, prediction } = alertData;

  const mailOptions = {
    from: `Rockfall Monitoring <${ALERT_EMAIL_USER}>`,
    to: ALERT_RECEIVER_EMAIL,
    subject: `[Rockfall Alert] ${level} Risk Detected at Site ${siteId}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #b91c1c;">⚠️ Rockfall Alert - ${level}</h2>
        <p>A new prediction has flagged a <strong>${level}</strong> risk at <b>Site ID:</b> ${siteId}.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p><strong>Prediction Data:</strong></p>
        <pre style="background: #f9f9f9; padding: 10px; border-left: 3px solid #b91c1c; white-space: pre-wrap;">${JSON.stringify(
          prediction,
          null,
          2
        )}</pre>
        <p style="color: #b91c1c; font-weight: bold;">
          ⚡ Please take immediate action according to emergency protocols.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`🚨 Alert email sent successfully [${level}]`);
  } catch (error) {
    console.error("❌ Error sending alert email:", error);
  }
};

module.exports = {
  sendAlertEmail,
};
