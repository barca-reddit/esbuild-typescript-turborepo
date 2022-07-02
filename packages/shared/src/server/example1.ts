import { version } from 'process';

/** Get the current NodeJS version */
export const getVersion = () => {
    return version;
};