import {createProxyMiddleware} from 'http-proxy-middleware';

const {OPEN_WEATHER_TOKEN} = process.env;

export const weatherProxy = createProxyMiddleware('/', {
    target: 'https://api.openweathermap.org',
    secure: false,
    pathRewrite(path, _) {
        const [url, query] = path.split('?');
        return url.replace('/api/weather/current', `/data/2.5/weather?appid=${OPEN_WEATHER_TOKEN}&${query}`);
    },
});
