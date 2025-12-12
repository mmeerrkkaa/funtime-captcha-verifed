const PLUGIN_OWNER_ID = 'plugin:funtime-captcha-verifed';

const MESSAGES = {
    CAPTCHA_SAVED: '&a[FunTimeCaptcha] Капча сохранена',
    CAPTCHA_ERROR: '&c[FunTimeCaptcha] Ошибка: {error}',
    CAPTCHA_SOLVE_ERROR: '&c[FunTimeCaptcha] Не удалось распознать',
    LOCAL_OCR_SUCCESS: '&a[FunTimeCaptcha] Предполагаемая капча: {answer}',
};

const CAPTCHA_TRIGGER = 'BotFilter >> Введите номер с картинки в чат';

module.exports = {
    PLUGIN_OWNER_ID,
    MESSAGES,
    CAPTCHA_TRIGGER,
};
