const path = require('path');
const { PLUGIN_OWNER_ID, MESSAGES } = require('./constants');
const { setupCaptchaHandler } = require('./lib/captchaHandler');

async function onLoad(bot, options) {
    const log = bot.sendLog;
    const settings = options.settings || {};
    const pluginDir = __dirname;

    try {

        if (settings.saveImages || settings.autoSolve) {
            const captcha = setupCaptchaHandler(bot, settings, pluginDir);

            if (!captcha) {
                log('[FunTimeCaptcha] Не удалось инициализировать');
            }
        }

    } catch (error) {
        log(`[FunTimeCaptcha] Ошибка загрузки: ${error.message}`);
        if (error.message && error.message.includes('Cannot find module')) {
            throw error;
        }
    }
}

async function onUnload({ botId, prisma }) {
    console.log(`[FunTimeCaptcha] Выгрузка плагина для бота ID: ${botId}`);
}

module.exports = { onLoad, onUnload };
