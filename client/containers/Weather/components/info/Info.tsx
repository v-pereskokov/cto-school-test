import React, {FC} from 'react';
import {useSelector} from 'react-redux';

import {weatherPendingSelector, weatherSelector} from '__selectors/weather';
import {WeatherInfo} from '__types/weather';

import {b} from './Info.scss';

const LamodaLink = (text: string, link: string) => {
    return (
        <a target="_blank" href={link} className={b('link')} rel="noopener noreferrer">
            {text}
        </a>
    );
};

const getClothesByTemp = (
    temperature: number,
    {windSpeed}: {windSpeed: number},
): React.ReactNode => {
    if (temperature < -5) {
        return (
            <span>
                Стоит одеться теплее, не май месяц.
                <br/>
                {LamodaLink('Утепляемся с Lamoda', 'https://www.lamoda.ru/catalogsearch/result/?q=зима&submit=y&gender_section=men')}
            </span>
        );
    }

    if (temperature >= -5 && temperature <= 15) {
        return (
            <span>
                Надень куртку!
                <br/>
                {LamodaLink('Успокоим маму с Lamoda', 'https://www.lamoda.ru/catalogsearch/result/?q=осень-весна&submit=y&gender_section=women')}
            </span>
        );
    }

    if (temperature >= 15 && temperature <= 25) {
        return (
            <span>
                {windSpeed > 10
                    ? `Ух какой ветер (${windSpeed} м/с). Стоит спрятать горло.`
                    : 'Можно и подрасслабиться уже!'
                }
                <br/>
                {LamodaLink('Одеваемся стильно с Lamoda', 'https://www.lamoda.ru/catalogsearch/result/?q=осень-весна&submit=y&gender_section=women')}
            </span>
        );
    }

    return (
        <span>
            Море зовёт! Волна поёт.
            <br/>
            {LamodaLink('На пляж с Lamoda', 'https://www.lamoda.ru/catalogsearch/result/?q=лето&submit=y&gender_section=women')}
        </span>
    );
};

const Info: FC = () => {
    const weatherInfo = useSelector(weatherSelector);
    const isPending = useSelector(weatherPendingSelector);

    if (!weatherInfo && !isPending) {
        return null;
    }

    if (isPending) {
        return (
            <div className={b()}>
                <div className={b('loader')}>
                    Загрузка...
                </div>
            </div>
        );
    }

    const {
        main: {temp, temp_min, temp_max},
        wind: {speed},
    } = (weatherInfo || {}) as WeatherInfo;

    return (
        <div className={b()}>
            {!!weatherInfo && <hr/>}

            <div className={b('content')}>
                <h2 className={b('header')}>Итаааак:</h2>
                <table className="rwd-table">
                    <tr>
                        <td>Что надеть?</td>
                        <td>{getClothesByTemp(temp, {windSpeed: speed})}</td>
                    </tr>
                    <tr>
                        <td>Текущая температура</td>
                        <td>{temp}</td>
                    </tr>
                    <tr>
                        <td>Максимальная / минимальная температуры</td>
                        <td>{temp_max} / {temp_min}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};
export default Info;
