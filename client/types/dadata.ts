export interface RequestOptions {
    query: string;
    locations?: {
        country: string;
    }[];
}

export interface Response {
    suggestions: {
        value: string;
        unrestricted_value: string;
    }[];
}
