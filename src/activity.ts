import { CONFIG_KEYS } from './constants';
import { window, workspace } from 'vscode';

interface APayload {
    details?: string,
    state?: string,
    startTime?: number | null,
    largeImage?: string,
    largeImageText?: string,
    smallImage?: string,
    smallImageText?: string,
    buttons?: { label: string, url: string }[],
    instance?: boolean
}
