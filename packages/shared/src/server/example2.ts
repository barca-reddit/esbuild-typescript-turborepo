import { platform } from 'os';

/** Get the current OS platform */
export const getPlatform = () => {
    return platform();
};
