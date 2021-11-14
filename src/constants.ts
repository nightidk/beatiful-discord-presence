/* eslint-disable @typescript-eslint/naming-convention */
import { workspace } from "vscode";

export const CLIENT_ID = "665667955220021250" as const; //(workspace.getConfiguration(CONFIG_KEYS.ID) !== undefined) ? workspace.getConfiguration(CONFIG_KEYS.ID) : "665667955220021250";

export const CONFIG_KEYS = {
	Enabled: 'beatiful-discord-presence.enabled',
    Buttons: 'beatiful-discord-presence.buttons',
    ID: 'beatiful-discord-presence.id'
};