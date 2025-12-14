const path = require('path');
const { MESSAGES } = require('../constants');
const { recognizeLocalOCR } = require('./localOCR');

const directions = new Map([
    ['3 2', 'up'],      // up > down
    ['3 -2', 'down'],   // down > up
    ['3 0', 'south'],   // south > north
    ['2 0', 'west'],    // west > east
    ['0 0', 'north'],   // north > south
    ['5 0', 'east'],    // east > west
]);

const directions2 = {
    'up': 'down',
    'down': 'up',
    'south': 'north',
    'west': 'east',
    'north': 'south',
    'east': 'west'
};

function getViewDirection(yaw, pitch) {
    const key = `${Math.round(yaw)} ${Math.round(pitch)}`;
    return directions2[directions.get(key)];
}

function setupCaptchaHandler(bot, settings, pluginDir) {
    if (!settings.saveImages && !settings.autoSolve) {
        return null;
    }

    try {
        const fs = require('fs');
        const imagesDir = path.join(pluginDir, 'images');
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }

        const FlayerCaptcha = require('flayercaptcha');
        const captcha = new FlayerCaptcha(bot);
        let captchaPassed = false;

        bot.on('message', (message) => {
            const text = message.toString();
            if (text.includes('BotFilter >> Проверка пройдена')) {
                captchaPassed = true;
            }
        });

        captcha.on('imageReady', async ({ data, image }) => {
            if (captchaPassed) {
                return;
            }
            try {
                const botYaw = bot.entity.yaw;
                const botPitch = bot.entity.pitch;
                const botViewDirection = getViewDirection(botYaw, botPitch);

                if (botViewDirection !== data.viewDirection) {
                    return;
                }

                const timestamp = new Date().toISOString()
                    .replace(/T/, '_')
                    .replace(/:/g, '-')
                    .split('.')[0];

                const filename = `captcha_full_${timestamp}.png`;
                const filepath = path.join(pluginDir, 'images', filename);

                if (settings.saveImages) {
                    await image.toFile(filepath);
                    bot.sendLog(MESSAGES.CAPTCHA_SAVED);

                    const imageBuffer = fs.readFileSync(filepath);
                    const base64Image = imageBuffer.toString('base64');

                    bot.events.emit('funtime:captcha_detected', {
                        filepath: filepath,
                        filename: filename,
                        base64: base64Image,
                        timestamp: timestamp
                    });
                    return;
                }

                if (settings.autoSolve) {
                    await image.toFile(filepath);

                    const answer = await recognizeLocalOCR(filepath, bot.sendLog, settings);

                    if (answer) {
                        bot.sendLog(MESSAGES.LOCAL_OCR_SUCCESS.replace('{answer}', answer));
                        bot.chat(answer);
                    } else {
                        bot.sendLog(MESSAGES.CAPTCHA_SOLVE_ERROR);

                        bot.events.emit('funtime:captcha_failed', {
                            filepath: filepath,
                            filename: filename,
                            error: 'Recognition failed'
                        });
                    }

                    try {
                        fs.unlinkSync(filepath);
                    } catch (e) {
                    }
                }

            } catch (error) {
                bot.sendLog(MESSAGES.CAPTCHA_ERROR.replace('{error}', error.message));
                bot.sendLog(`[FunTimeCaptcha] Stack: ${error.stack}`);
            }
        });

        return captcha;

    } catch (error) {
        bot.sendLog(`[FunTimeCaptcha] Ошибка инициализации: ${error.message}`);
        bot.sendLog(`[FunTimeCaptcha] Stack: ${error.stack}`);
        if (error.message && error.message.includes('Cannot find module')) {
            throw error;
        }
        return null;
    }
}

module.exports = { setupCaptchaHandler };
