import * as vscode from 'vscode';
let name = "Отдыхаю";
let time = Date.now();
const { ClientRPC } = require('discord-rpc'); // eslint-disable-line
import { CLIENT_ID, CONFIG_KEYS } from './constants';
const statusBarIcon: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
let rpc = new ClientRPC({ transport: 'ipc' });

async function prepare() {
	statusBarIcon.text = '$(pulse) Подключение к Discord...';
	statusBarIcon.show();
}

async function start() {
	rpc.on("ready", () => {

		statusBarIcon.text = '$(globe) Подключено к Discord';
		statusBarIcon.tooltip = 'Подключено к Discord';


	});

	rpc.on('disconnected', async () => {

		await rpc.destroy();
		statusBarIcon.text = '$(pulse) Переподключение к Discord';
		statusBarIcon.command = 'beatiful-discord-presence.reconnect';

	});

	try {
		await rpc.login({ clientId: CLIENT_ID });
	} catch (error) {
		await rpc.destroy();
		void vscode.window.showErrorMessage('Приложение Discord не найдено!');
		statusBarIcon.text = '$(pulse) Переподключение к Discord';
		statusBarIcon.command = 'beatiful-discord-presence.reconnect';
	}
}

export function activate(context: vscode.ExtensionContext) {
	prepare();

	const disable = async () => {

		void rpc?.destroy();
		statusBarIcon.hide();

	};

	const enabler = vscode.commands.registerCommand('beatiful-discord-presence.enable', async () => {
		await disable();
		void start();
	});
	const reconnect = vscode.commands.registerCommand('beatiful-discord-presence.reconnect', async () => {
		await disable();
		void start();
	});
	
	
	context.subscriptions.push(enabler);
}


export function deactivate() {
	statusBarIcon.text = '$(pulse) Отключено от Discord';
	statusBarIcon.tooltip = 'Отключено от Discord';
	rpc.destroy();
}
