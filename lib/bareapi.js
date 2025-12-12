const axios = require('axios');
const fs = require('fs');

class BareAPISolver {
    constructor(apiUrl = 'http://127.0.0.1:80') {
        this.apiUrl = apiUrl;
    }

    async solveCaptcha(imageBuffer) {
        try {
            const base64Image = imageBuffer.toString('base64');

            const response = await axios.post(`${this.apiUrl}/in.php`,
                new URLSearchParams({
                    key: 'dummy',
                    method: 'base64',
                    body: base64Image
                }),
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    timeout: 5000
                }
            );

            const result = response.data;

            if (result.startsWith('OK|')) {
                const captchaId = result.split('|')[1];

                await new Promise(resolve => setTimeout(resolve, 100));

                const resultResponse = await axios.get(`${this.apiUrl}/res.php`, {
                    params: { id: captchaId },
                    timeout: 5000
                });

                const answer = resultResponse.data;

                if (answer.startsWith('OK|')) {
                    const text = answer.split('|')[1];
                    return text;
                }
            }

            return null;

        } catch (error) {
            console.error('[BareAPI] Error solving captcha:', error.message);
            return null;
        }
    }

    async isAvailable() {
        try {
            await axios.get(this.apiUrl, { timeout: 2000 });
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = BareAPISolver;
