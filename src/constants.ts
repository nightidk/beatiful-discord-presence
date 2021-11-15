/* eslint-disable @typescript-eslint/naming-convention */
import { workspace } from "vscode";
import { getConfig } from "./config";
const config = getConfig();

export const CLIENT_ID = config.id;

export const enum CONFIG_KEYS {
	Enabled = 'beatiful-discord-presence.enabled',
    Buttons = 'beatiful-discord-presence.buttons',
    ID = 'beatiful-discord-presence.id'
};