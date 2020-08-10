declare module 'utils' {
    import {Location} from 'history';
    import {RouteComponentProps} from 'react-router';

    export interface Indexed<T = any> {
        [x: string]: T;
    }

    export type Assign<T, K> = Pick<T, Exclude<keyof T, keyof K>> & K;

    export interface RouterLocation extends Location {
        query?: Indexed;
    }

    export abstract class EntityAPI {
        abstract request?: (...args: unknown[]) => Promise<unknown>;
        abstract create?: (...args: unknown[]) => Promise<unknown>;
        abstract update?: (...args: unknown[]) => Promise<unknown>;
        abstract delete?: (...args: unknown[]) => Promise<unknown>;
        abstract find?: (...args: unknown[]) => Promise<unknown>;
    }

    export type RouteProps<T> = Assign<RouteComponentProps<T>, {
        location: RouterLocation;
    }>;

    export type Nullable<T = unknown> = null | T;
    export type Empty<T = unknown> = undefined | T;
}
