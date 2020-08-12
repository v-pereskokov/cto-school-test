![Node.js CI](https://github.com/vladpereskokov/cto-school-test/workflows/Node.js%20CI/badge.svg?branch=master)

# Отборочный проект в «Школу будущих CTO»
## Умный сервис прогноза погода (задача со звёздочкой)
[Ссылка на задачу](https://www.notion.so/47397a87fbe149aaaf466b477aff26cf)  
Сервис призван помогать пользователю быстро определить погоду в своем населенном пункте и советовать, а что необходимо надеть сегодня на улицу, чтобы чувствовать себя комфортно.  

## Хосты
* stable — [https://tst-01.vpa.group:4010](https://tst-01.vpa.group:4010)
* dev — [https://localhost:4000](https://localhost:4000)

Посмотреть функционал можно и на [видео](https://yadi.sk/i/5TJb69CfRsKxEQ)

## Разработка
### Установка
```bash
~$ npm install
~$ npm run start:dev
```

Перед началом разработки необходимо создать файл `.env`, в который нужно положить содержиоме из файла `.env.example`, но добавить реальные значения токенов.

### CI
Continuous integration в данном случае делается через GitHub Actions на Ubuntu с nodejs.
### CD
Деплой происходит после вливания в ветку *release*. Запускается actions на данную ветку и собирает докер-образ, который пушит в docker-registry (сейчас в глобальный приватный хаб).  
После завершения выполнения actions, GitHib WebHook подхватывает изменения и запускает процесс перезапуска по ssh докер-контейнера.  
В момент CD токены прокидываются из «секретницы» гитхаба.

Собирается образ из скрипта [scripts/build.sh](/scripts/build.sh).  
Деплой происходит на облачную VPS XEN. Доступ на сервер только по ssh с целью защиты от брутфорса по 22му порту.

## Продукт

Клиенсткая часть — веб-приложение.
Серверная часть — nodejs-express веб-сервер.

### Стек технологий
#### Frontend
Находится в папке [client](/client).  

* TypeScript — пишем фронтенд быстро и со строгой типизацией;
* Reactjs (и redux, thunk обвязка) + много собственных модулей — ускоряет разработку SPA-приложений;
* Вспомогательные библиотеки, но их минимально на клиенте;
* Server side rendering;
* Линтеры стилей и кода;
* Yandex Metrika для записи на вебвизор действий клиента, а также сбора аналитики;
* Yandex Maps для взаимодействия с картой.

Сервис работает на экранах больше 13 дюймов.   
Сервис проверялся только в Safari и Chromium-системах (Yandex Browser, Google Chrome / Canary / Chromium).

#### Backend
Находится в папке [server](/server).  

* TypeScript — пишем бэкенд быстро и со строгой типизацией
* expressjs — универсальный инструмент для написания веб-серверов любой сложности (и даже хайлоада) 
* [Dadata API](https://dadata.ru/) — для работы с подсказками страны и города
* [Open Weather API](https://openweathermap.org/api) — для работы с актуальными данными о погоде

Однопоточность JavaScript не мешает ему быть одним из самых мощных языков как в клиентской разработке, так и в серверной. Поскольку проект небольшой, соединились SSR и API в одном веб-сервере.

### Взаимодействие
Взаимдействие фронтэнда и бэкенда происходит через REST API с помощью `json`. Все запросы на бэкенд отправляются через `/api/*`. Бэкенд проксирует запросы в Dadata или Weather с зашитыми токенами.  
Клиент не передаёт никакие ключи.   
Пример запроса за подсказками страны:
```curl
curl 'https://localhost:4000/api/suggests/country' \
  -H 'Connection: keep-alive' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.101 YaBrowser/20.7.0.1230 Yowser/2.5 Safari/537.36' \
  -H 'content-type: application/json' \
  -H 'Accept: */*' \
  -H 'Origin: https://localhost:4000' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: https://localhost:4000/' \
  -H 'Accept-Language: ru,en;q=0.9' \
  -H 'Cookie: <cookie>' \
  --data-binary '{"query":"Росс"}' \
  --compressed \
  --insecure
```    
Ответ на такой запрос:
```json
{
    "suggestions": [
        {
            "value": "Россия",
            "unrestricted_value": "Российская Федерация",
            "data": {
                "code": "643",
                "alfa2": "RU",
                "alfa3": "RUS",
                "name_short": "Россия",
                "name": "Российская Федерация"
            }
        }
    ]
}
```
В таком же формате работают ручки остальных подсказок и получения информации о погоде.    
Пример работы с погодой. Ручка умеет принимать как «квери»-параметр "query" для поиска по подстроке, так и по координатам.
```curl
# Запрос по клику на карту (через координаты)
# Еще можно сделать запрос со страной или городом: https://localhost:4000/api/weather/current?q=Россия
curl 'https://localhost:4000/api/weather/current?lat=55.732181382713264&lon=37.61394531250001' \
  -H 'Connection: keep-alive' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.101 YaBrowser/20.7.0.1230 Yowser/2.5 Safari/537.36' \
  -H 'Accept: */*' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: https://localhost:4000/' \
  -H 'Accept-Language: ru,en;q=0.9' \
  -H 'Cookie: <cookie>' \
  --compressed \
  --insecure
```
В ответ получим такое:
```json
{
    "coord": {
        "lon": 100,
        "lat": 60
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 288.3,
        "feels_like": 287.73,
        "temp_min": 288.3,
        "temp_max": 288.3,
        "pressure": 1004,
        "humidity": 79,
        "sea_level": 1004,
        "grnd_level": 968
    },
    "visibility": 10000,
    "wind": {
        "speed": 1.5,
        "deg": 26
    },
    "clouds": {
        "all": 51
    },
    "dt": 1597269929,
    "sys": {
        "country": "RU",
        "sunrise": 1597267789,
        "sunset": 1597324805
    },
    "timezone": 25200,
    "id": 2017370,
    "name": "Russia",
    "cod": 200
}
```

Запросы в третьисторонние API идут через прокси-библиотеку. По сути это тот же роут, но удобное прокси с заголовками и тд.  
Ссылки на прокси данного проекта:
* [Weather](/server/controllers/weather.ts)
* [Dadata](/server/controllers/dadata.ts)

Стоит rate limiter на запросы. 

### Что нужно докрутить
* Безопасность
    * CSRF — в случае добавления залогина или шарилки через соц.сети
    * XSS сканеры
    * CORS — настроить строгие правила
    * CSP — добавить строгие правила для статики
    * UUID — добавить проверку пользователей по UUID для более строгой валидации и защиты
    * Мониторинг на брутфорс
* Клиентская часть
    * Добавить i18n
    * Провести UX-исследование и добавить корректную интеграцию с сервисами одежды
    * Добавить share результатов в соц.сети
 

## Мои другие проекты
Основная часть проектов под NDA и закрыта за VPN в различных внутренних GitHub, GitLab и BitBucket.  

### Курс по фронтенд-разработке
Где: [Yandex Praktikum](https://praktikum.yandex.ru/middle-frontend/)
Что делал: Автор всего курса

### 3D браузерный шутер
Код: [GitHub](https://github.com/vladpereskokov/soul-hunting)  
Цель: Реализовать браузерную игру.  
Условия: 
* Синглплеер и мультиплеер с несколькими пользователями
* Адаптив
* Сервис должен работать офлайн без интернета
* Спроектировать самим дизайн (от референсов до макетов)
* Не использовать фреймворки и написать весь SPA самим на ES6+
* Бэкенд — Java, Spring
* Соединение в мультиплеере — через WebSocket

В результате сервис был переписан в конце курса на TypeScript и React частично.

### Написание API форума для нагрузочного тестирования
Код: [GitHub](https://github.com/vladpereskokov/Technopark_DataBase)  
Цель: Реализовать по готовому Swagger'у веб-сервер, который будет проходить большое количество функциональных тестов, а в последствии и нагрузочное тестирование на чтение, запись и смесь.    
Стек:
* JavaScript
* Koa
* PostgreSQL

### Реализовать nginx
Код: [GitHub](https://github.com/vladpereskokov/Technopark_HighLoad-nginx)  
Цель: Реализовать с нуля собственный nginx, путём обработки сырых HTTP-запросов. *Условие:* порядок времени отдачи статики должен быть сопоставим с nginx.  
Стек:
* Golang
Проверяли через apache bench.

### Написать кейгеня и кряки для ПО
Код: [GitHub](https://github.com/vladpereskokov/Technopark_InfoSec-Cracks)  
Цель: Даны защищенные паролем ПО на Windows. Необходимо, применяя реверс-инжиниринг и не только, найти адрес памяти, где делается проверка пароля и высчитать пароль или написать кейген для взлома.  
Стек:
* python

### Прототип умного дома
Код: [GitHub](https://github.com/vladpereskokov/iot-arduino-analog)  
Цель: Самому спроектировать и запрограммировать в Протеусе микроконтроллер, который будет работать с различными устройствами.
Что было сделано:
* Три устройства в Прометеусе
* Реальное устройство на реальной плате с подключёнными приборами
* Всё находилось на разных машинах в одной локальной сети (виртуальные машины, телефоны и другие устройства)
Примеры можно увидеть в репозитории  
Стек:
* C / C++
* Nodejs

### Обеспечение качества продукта
Код: [GitHub](https://github.com/vladpereskokov/Technopark_QA)  
Цель: Покрыть автотестами сервис Одноклассники.
Стек:
* Python3, Selenium
* Боты от одноклассников

### Остальное
На гитхабе лежит ещё много различных проектов:

* [Защита](https://vk.com/wall-45881160_15130) крупной платформы для блогеров и рекламодателей (время начала: 23:25)
* Ещё один [умный дом](https://github.com/vladpereskokov/Jarvis), но на arduino, C++ последних стандартов с паттернами и серверами и немного питона. Запись защиты проекта [тут](https://youtu.be/isFt27p8pgU?t=158)
* [Бэкенд](https://github.com/vladpereskokov/Jira__backend) а-ля Jira на golang.  
* [Django](https://github.com/vladpereskokov/Technopark_Web)
* [Мобильное приложение под Android](https://github.com/vladpereskokov/MusicGURU)
