import * as vscode from 'vscode';
import { activity } from './activity';
let time = Date.now();
const { Client } = require('discord-rpc'); // eslint-disable-line
import { CLIENT_ID, CONFIG_KEYS } from './constants';
import { getConfig } from './config';
const statusBarIcon: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
let rpc = new Client({ transport: 'ipc' });
let state = {};
let listeners: { dispose(): any }[] = [];
const config = getConfig();

export function cleanUp() {
	listeners.forEach((listener) => listener.dispose());
	listeners = [];
}

async function prepare() {
	statusBarIcon.text = '$(pulse) Подключение к Discord...';
	statusBarIcon.show();
}

async function sendactivity() {
	
	state = {
		...(await activity(state)),
	};

	rpc.setActivity(state);
}

async function start() {
	cleanUp();
	rpc = new Client({ transport: 'ipc' });

	rpc.on("ready", () => {
		cleanUp();
		
		statusBarIcon.text = '$(globe) Подключено к Discord';
		statusBarIcon.tooltip = 'Подключено к Discord';

		void sendactivity();
		const onChangeActiveTextEditor = vscode.window.onDidChangeActiveTextEditor(() => sendactivity());
		const onChangeTextDocument = vscode.workspace.onDidChangeTextDocument(() => setTimeout(sendactivity, 2000));
		const onStartDebugSession = vscode.debug.onDidStartDebugSession(() => sendactivity());
		const onTerminateDebugSession = vscode.debug.onDidTerminateDebugSession(() => sendactivity());

		listeners.push(onChangeActiveTextEditor, onChangeTextDocument, onStartDebugSession, onTerminateDebugSession);
	});

	rpc.on('disconnected', async () => {
		cleanUp();
		await rpc.destroy();
		statusBarIcon.text = '$(pulse) Переподключение к Discord';
		statusBarIcon.command = 'beatiful-discord-presence.reconnect';

	});

	try {
		await rpc.login({ clientId: CLIENT_ID });
	} catch (error) {
		cleanUp();
		await rpc.destroy();
		void vscode.window.showErrorMessage('Приложение Discord не найдено!');
		statusBarIcon.text = '$(pulse) Переподключение к Discord';
		statusBarIcon.command = 'beatiful-discord-presence.reconnect';
	}
}

export function activate(context: vscode.ExtensionContext) {
	prepare();
	start();

	const disable = async () => {
		cleanUp();
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
	
	
	context.subscriptions.push(enabler, reconnect);
}


export function deactivate() {
	cleanUp();
	statusBarIcon.text = '$(pulse) Отключено от Discord';
	statusBarIcon.tooltip = 'Отключено от Discord';
	rpc.destroy();
}
