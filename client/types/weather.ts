export interface WeatherInfo {
    wind: {
        speed: number;
        deg: number;
    };
    weather: {
        description: string;
        icon: string;
        id: number;
        main: string;
    }[];
    timezone: number;
    name: string;
    sys: {
        country: string;
        sunrise: string;
        sunset: string;
    };
    coord: {
        lat: number;
        lon: number;
    };
    main: {
        temp_min: number;
        temp_max: number;
        temp: number;
        sea_level: number;
        pressure: number;
        humidity: number;
        grnd_level: number;
        feels_like: number;
    };
}
