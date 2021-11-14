import * as vscode from 'vscode';
const client = require('discord-rich-presence-typescript')("665667955220021250");
const statusBarIcon: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
statusBarIcon.text = '$(pulse) Connecting to Discord...';
statusBarIcon.show();
let name = "Отдыхаю";
let time = Date.now();

export function activate(context: vscode.ExtensionContext) {
	
	//console.log('Congratulations, your extension "discord-presence-night" is now active!');
	const enabler = vscode.commands.registerCommand('discord.enable', async () => {
		await vscode.window.showInformationMessage('Enabled Discord Presence for this workspace');
	});
	statusBarIcon.text = '$(globe) Connected to Discord';
	statusBarIcon.tooltip = 'Connected to Discord';
	let fileName = vscode.window.activeTextEditor?.document.fileName;
	if (fileName !== undefined) {
		let file = fileName.split('\\');
		name = file[file.length - 1];
		client.updatePresence({
			state: "Версия: 2.2 [Release]",
			details: `Работаю с ${name}`,
			startTimestamp: time,
			largeImageKey: "genshin-impact-logo",
			smallImageKey: "genshin",
			instance: true,
		});
	} else {
		name = "Отдыхаю";
		client.updatePresence({
			state: "Версия: 2.2 [Release]",
			details: `${name}`,
			startTimestamp: time,
			largeImageKey: "genshin-impact-logo",
			smallImageKey: "genshin",
			instance: true,
		});
	}

	vscode.window.onDidChangeActiveTextEditor((textEditor) => {

			if (textEditor !== undefined) {
				let fileName = textEditor.document.fileName;
				let file = fileName.split('\\');
				name = file[file.length - 1];
				
				client.updatePresence({
					state: "Версия: 2.2 [Release]",
					details: `Работаю с ${name}`,
					startTimestamp: time,
					largeImageKey: "genshin-impact-logo",
					smallImageKey: "genshin",
					instance: true,
				});
			}

	});
	context.subscriptions.push(enabler)
}


export function deactivate() {
	statusBarIcon.text = '$(pulse) Disconnected from Discord';
	statusBarIcon.tooltip = 'Disconnected from Discord';
	client.disconnect();
}
