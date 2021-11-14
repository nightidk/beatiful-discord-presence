import { workspace, WorkspaceConfiguration } from "vscode";

type WorkspaceConfig = WorkspaceConfiguration & {
    enabled: boolean,
    buttons: string[],
    id: string
};

export function getConfig() {
    return workspace.getConfiguration("beatiful-discord-presence") as WorkspaceConfig;
}