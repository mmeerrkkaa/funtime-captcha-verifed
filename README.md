# FunTime Captcha Solver

Плагин для автоматического распознавания и решения капч на сервере FunTime (mc.funtime.su).

## Возможности

✅ Автоматическое сохранение изображений капчи
✅ Автоматический ввод ответа в чат
✅ События для интеграции с другими плагинами

## Настройки плагина

- **Включить автосохранение капчи** - сохранять изображения капчи в папку `images/`
- **Автоматически решать капчу** - включить автоматическое распознавание через YOLO API
- **URL API** - адрес API сервера (по умолчанию: `http://212.22.70.39:5000/recognize`) ЭТО БЕСПЛАТНЫЙ СЕРВЕР ДЛЯ ПРОХОЖДЕНИЯ КАПЧ. ШАНС УСПЕХА 85%
- **Таймаут API (мс)** - время ожидания ответа от API (по умолчанию: 10000мс)

## Сохранённые изображения

Все капчи сохраняются в папку:
```
plugins/funtime-captcha-verifed/images/
```

Формат имени: `captcha_full_YYYY-MM-DD_HH-MM-SS.png`

## События для разработчиков

Плагин отправляет следующие события через `bot.events`:

### `funtime:captcha_detected`

Отправляется когда капча обнаружена и сохранена.

**Payload:**
```javascript
{
  filepath: string,    // Полный путь к файлу
  filename: string,    // Имя файла (captcha_full_YYYY-MM-DD_HH-MM-SS.png)
  base64: string,      // Изображение капчи в base64
  timestamp: string    // Временная метка (YYYY-MM-DD_HH-MM-SS)
}
```

**Пример использования:**
```javascript
bot.events.on('funtime:captcha_detected', (data) => {
  console.log(`Капча обнаружена: ${data.filename}`);
  // Можно отправить base64 изображение куда-то или обработать
});
```

### `funtime:captcha_failed`

Отправляется при ошибке распознавания.

**Payload:**
```javascript
{
  filepath: string,    // Полный путь к файлу
  filename: string,    // Имя файла
  error: string        // Описание ошибки
}
```

**Пример использования:**
```javascript
bot.events.on('funtime:captcha_failed', (data) => {
  console.log(`Не удалось распознать капчу: ${data.error}`);
});
```