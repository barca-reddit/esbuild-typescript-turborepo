import { getTitle, getURL } from '@repo/shared/web';

if (typeof window !== 'undefined') {
    console.log(`Page title: ${getTitle()}`);
    console.log(`Page URL: ${getURL()}`);
}