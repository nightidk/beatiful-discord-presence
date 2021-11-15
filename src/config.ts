import { workspace, WorkspaceConfiguration } from "vscode";

type WorkspaceConfig = WorkspaceConfiguration & {
    enabled: boolean,
    details: string,
    state: string,
    largeImageKey: string,
    largeImageText: string,
    smallImageKey: string,
    smallImageText: string,
    buttons: Array<{ label: string; url: string }>,
    id: string
};

export function getConfig() {
    return workspace.getConfiguration("beatiful-discord-presence") as WorkspaceConfig;
}