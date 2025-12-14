const PLUGIN_OWNER_ID = 'plugin:funtime-captcha-verifed';

const MESSAGES = {
    CAPTCHA_SAVED: '[FunTimeCaptcha] Капча сохранена',
    CAPTCHA_ERROR: '[FunTimeCaptcha] Ошибка: {error}',
    CAPTCHA_SOLVE_ERROR: '[FunTimeCaptcha] Не удалось распознать',
    LOCAL_OCR_SUCCESS: '[FunTimeCaptcha] Предполагаемая капча: {answer}',
};

const CAPTCHA_TRIGGER = 'BotFilter >> Введите номер с картинки в чат';

module.exports = {
    PLUGIN_OWNER_ID,
    MESSAGES,
    CAPTCHA_TRIGGER,
};
