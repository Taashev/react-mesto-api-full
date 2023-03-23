# react-mesto-api-full

Это полностью переписанная приложение [mesto](https://github.com/Taashev/mesto-react) на full-stack включающая в себя frontend и backend часть.

### Развертывание:

- в терминале перейти в каталог куда будет слонирован репозиторий
- клонировать репозиторий командой в cli `git clone https://github.com/Taashev/react-mesto-api-full.git`
- перейти в дерикторию `./backend` и установить все зависимости командой `npm i`
- перейти в дерикторию `./frontend/` и установить все зависимости командой `npm i`

## Запуск backend

Если у вас еще не установлена [MongoDB](https://www.mongodb.com/) то скачайте и установите ее. \
[ссылка на скачивание](https://www.mongodb.com/try/download/community-kubernetes-operator)

Создайте БД с именем `mestodb`
Запустите MongoDB в терминале командой `mongod` или через приложение [MongoDB Compass](https://www.mongodb.com/products/compass)

`Если у вас возникнет ошибка "const serverSelectionError = new ServerSelectionError();" при подключении к БД то попробуйте сменить URL подключения mongo с localhost на 127.0.0.1`

`npm run start` — запускает сервер на 3001 порту
`npm run dev` — запускает сервер в режиме разработки с hot-reload \
(Для того, что бы запустить сервер на ином порту укажиите порт при запуске например `npm run dev PORT = 8080`)

## Запуск frontend

`npm run start` - запустить frontend
