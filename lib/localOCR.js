const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');


function validateCaptchaText(text) {
    if (!text) return null;

    const cleaned = text.replace(/\D/g, '');

    if (cleaned.length >= 3 && cleaned.length <= 6) {
        return cleaned;
    }

    return null;
}

async function recognizeLocalOCR(imagePath, log, settings = {}) {
    const startTime = Date.now();

    const apiUrl = settings.ApiUrl || 'http://localhost:5000/recognize';
    const apiTimeout = settings.yoloApiTimeout || 10000;

    try {
        if (!fs.existsSync(imagePath)) {
            return null;
        }

        const formData = new FormData();
        formData.append('image', fs.createReadStream(imagePath));

        const response = await axios.post(apiUrl, formData, {
            headers: formData.getHeaders(),
            timeout: apiTimeout
        });

        if (response.data.success) {
            const { answer } = response.data;

            const validatedText = validateCaptchaText(answer);

            if (validatedText) {
                return validatedText;
            } else {
                return null;
            }
        } else {
            return null;
        }

    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            log(`[FunTimeCaptcha] API недоступен (${apiUrl})`);
        } else if (error.code === 'ETIMEDOUT') {
            log('[FunTimeCaptcha] Таймаут API');
        } else {
            log(`[FunTimeCaptcha] Ошибка API: ${error.message}`);
        }
        return null;
    }
}

module.exports = { recognizeLocalOCR };
