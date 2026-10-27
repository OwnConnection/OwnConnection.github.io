# СвояСвязь

**[Открыть сайт](https://ownconnection.github.io/)**

СвояСвязь — это веб-мессенджер с двумя режимами запуска:

- локальная серверная версия на `Node.js + Socket.IO` из папки `public/` и файла `server.js`;
- статическая версия для `GitHub Pages` из папки `docs/`, которая работает через `Supabase` и позволяет искать пользователей и вести личные переписки между разными людьми.

## Локальный запуск сервера

```powershell
npm.cmd install
npm.cmd start
```

По умолчанию приложение открывается на [http://localhost:3000](http://localhost:3000).

Если порт занят:

```powershell
$env:PORT="3001"
npm.cmd start
```

## GitHub Pages с реальными переписками

Один только `GitHub Pages` не умеет сам хранить пользователей и сообщения. Поэтому для поиска людей и личных диалогов в папке `docs/` используется `Supabase`.

### Что уже подготовлено

- [docs/index.html](D:\Рабочий стол\Полноценный мессенджер\docs\index.html) — интерфейс GitHub Pages-версии;
- [docs/app.js](D:\Рабочий стол\Полноценный мессенджер\docs\app.js) — логика регистрации, входа, поиска пользователей и личных чатов;
- [docs/app.js](D:\Рабочий стол\Полноценный мессенджер\docs\app.js) — логика регистрации, входа, поиска пользователей, личных чатов, realtime-обновлений, вложений и аватарок;
- [docs/styles.css](D:\Рабочий стол\Полноценный мессенджер\docs\styles.css) — адаптивный интерфейс;
- [docs/supabase-config.js](D:\Рабочий стол\Полноценный мессенджер\docs\supabase-config.js) — сюда нужно вставить URL и anon key проекта;
- [docs/supabase-schema.sql](D:\Рабочий стол\Полноценный мессенджер\docs\supabase-schema.sql) — SQL-схема для таблиц и политик доступа.

### Как подключить Supabase

1. Создайте проект в [Supabase](https://supabase.com/).
2. В Supabase откройте `SQL Editor` и выполните содержимое файла [docs/supabase-schema.sql](D:\Рабочий стол\Полноценный мессенджер\docs\supabase-schema.sql).
3. В `Project Settings` → `API` скопируйте `Project URL` и `anon public key`.
4. Вставьте их в файл [docs/supabase-config.js](D:\Рабочий стол\Полноценный мессенджер\docs\supabase-config.js).
5. При необходимости в `Authentication` настройте подтверждение email так, как вам нужно.
6. Если вы уже запускали SQL раньше, выполните обновлённый файл [docs/supabase-schema.sql](D:\Рабочий стол\Полноценный мессенджер\docs\supabase-schema.sql) ещё раз, чтобы включить `Supabase Realtime`, поля для аватарок и вложений, а также бакеты `avatars` и `attachments`.

Бакет `attachments` рассчитан на файлы размером до 50 МиБ. Файлы больше 6 МиБ загружаются возобновляемыми блоками TUS. Для существующего проекта повторно выполните обновлённую SQL-схему; также действует общий лимит загрузки вашего тарифа Supabase.

Пример конфига:

```js
window.SVOYSVYAZ_SUPABASE = {
  url: "https://your-project.supabase.co",
  anonKey: "your-anon-key",
};
```

### Как опубликовать на GitHub Pages

1. Загрузите репозиторий на GitHub.
2. Откройте `Settings` → `Pages`.
3. В `Build and deployment` выберите `Deploy from a branch`.
4. Выберите ветку `main` и папку `/docs`.
5. Сохраните настройки.

После этого сайт будет открываться по адресу вида:

`https://ВАШ_ЛОГИН.github.io/ИМЯ_РЕПО/`

## Структура проекта

- `server.js` — серверная версия мессенджера;
- `public/` — клиент для локального сервера;
- `docs/` — отдельная статическая версия для `GitHub Pages`;
- `data/store.json` — локальное файловое хранилище серверной версии;
- `public/uploads/` — загруженные файлы и аватарки серверной версии.

## Важно

Версия из `docs/` теперь уже не локальная игрушка в `localStorage`, а заготовка под реальные общие переписки. Но для её работы обязательно нужен настроенный `Supabase`, потому что без внешней базы `GitHub Pages` не может сам искать пользователей и хранить сообщения между разными устройствами.

### PWA и push-уведомления

Версия `docs/` поддерживает установку как PWA и Web Push на Android, а также на iPhone/iPad с iOS/iPadOS 16.4 или новее. Для доставки при закрытой или приостановленной вкладке необходим HTTPS, установленная PWA на устройствах Apple, VAPID-ключи и развернутая Supabase Edge Function.

1. Повторно выполните `docs/supabase-schema.sql` в Supabase SQL Editor, чтобы создать таблицу подписок и уникальный ключ звонков.
2. Создайте VAPID-пару локально командой `npx web-push generate-vapid-keys`. Укажите только `publicKey` в поле `pushVapidPublicKey` файла `docs/supabase-config.js`. Никогда не публикуйте `privateKey`.
3. Установите Supabase CLI и свяжите проект командой `supabase link --project-ref <project-ref>`.
4. Сохраните секреты и URL опубликованного приложения в Supabase: `supabase secrets set VAPID_PUBLIC_KEY=<publicKey> VAPID_PRIVATE_KEY=<privateKey> VAPID_SUBJECT=mailto:<email> APP_URL=https://<user>.github.io/<repo>/`.
5. Разверните отправитель: `supabase functions deploy send-push`.
6. Откройте опубликованное приложение по HTTPS, войдите и нажмите «Включить» в разделе «Уведомления». На iPhone/iPad сначала добавьте сайт на экран «Домой» через Safari и запускайте именно установленную PWA.

Push может доставить сообщение или разбудить приложение для входящего звонка, но браузеры не позволяют веб-странице постоянно исполнять JavaScript или держать WebRTC-аудио активным после блокировки/выгрузки приложения. Чтобы ответить на звонок, пользователь должен открыть PWA; для непрерывных фоновых звонков на всех устройствах нужна нативная оболочка с системными VoIP/push API.
