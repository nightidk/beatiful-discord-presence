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
    
    let state: APayload = {
        details: "test",
        state: "test",
        startTimestamp: states.startTimestamp ?? Date.now(),
        largeImageKey: "genshin-impact-logo",
        largeImageText: "Paimon.exe",
        smallImageKey: "genshin",
        smallImageText: "vsc",
        buttons: [{ label: "Discord", url: "https://discord.gg/C8GW7mEd" }]
    };

    return state;
}