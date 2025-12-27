// Telegram Notification Service
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

/**
 * Send notification to Telegram
 * @param {string} message - Message to send
 * @returns {Promise<boolean>} - Success status
 */
export const sendTelegramNotification = async (message) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram credentials not configured");
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });

    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error("Failed to send Telegram notification:", error);
    return false;
  }
};

/**
 * Format and send API request log to Telegram
 * @param {string} feature - Feature name (e.g., "Instagram Stalker")
 * @param {object} params - Request parameters
 * @param {boolean} success - Whether the request was successful
 * @param {string} [error] - Error message if failed
 */
export const logApiRequest = async (feature, params, success, error = null) => {
  const timestamp = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
  });

  let message = `📊 <b>API Request Log</b>\n\n`;
  message += `🔧 <b>Feature:</b> ${feature}\n`;
  message += `📅 <b>Time:</b> ${timestamp}\n`;
  message += `📝 <b>Parameters:</b>\n<code>${JSON.stringify(
    params,
    null,
    2
  )}</code>\n`;
  message += `\n${
    success ? "✅ <b>Status:</b> Success" : "❌ <b>Status:</b> Failed"
  }`;

  if (error) {
    message += `\n⚠️ <b>Error:</b> ${error}`;
  }

  await sendTelegramNotification(message);
};

export default { sendTelegramNotification, logApiRequest };
