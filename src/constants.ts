import { workspace } from "vscode";

export const CLIENT_ID = workspace.getConfiguration(CONFIG_KEYS.ID);

export const enum CONFIG_KEYS {
	Enabled = 'enabled',
    Buttons = 'buttons',
    ID = 'id'
}