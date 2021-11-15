import { CONFIG_KEYS } from './constants';
import { env, TextDocument, window, workspace } from 'vscode';
import { getConfig } from './config';

export interface APayload {
    details?: string;
	state?: string;
	startTimestamp?: number | null;
	largeImageKey?: string;
	largeImageText?: string;
	smallImageKey?: string;
	smallImageText?: string;
	partyId?: string;
	partySize?: number;
	partyMax?: number;
	matchSecret?: string;
	joinSecret?: string;
	spectateSecret?: string;
	buttons?: { label: string; url: string }[];
	instance?: boolean;
}

export async function activity(states: APayload = {}) {
    const config = getConfig();
    const appName = env.appName;
    
    let stater: APayload = {
        details: states.details ?? config.details ?? undefined,
        state: states.state ?? config.state ?? undefined,
        startTimestamp: states.startTimestamp ?? Date.now(),
        largeImageKey: states.largeImageKey ?? config.largeImageKey ?? undefined,
        largeImageText: states.largeImageText ?? config.largeImageText ?? undefined,
        smallImageKey: states.smallImageKey ?? config.smallImageKey ?? undefined,
        smallImageText: states.smallImageText ?? config.smallImageText ?? undefined,
        buttons: undefined
    };
    if (window.activeTextEditor) {
        let fileName = window.activeTextEditor.document.fileName.split('\\');
        stater = {
            ...stater,
            state: states.state === `Работаю с ${fileName[fileName.length - 1]}` ? states.state : `Работаю с ${fileName[fileName.length - 1]}` ?? undefined
        };
    }

    return stater;
}