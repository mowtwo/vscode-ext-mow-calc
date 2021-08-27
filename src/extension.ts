// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { errorMsg, infoMsg } from './utils/Alert';
import getWebViewContent, { compileViewContent, parseResUri } from './utils/getWebViewContent';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "mow-calc" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('mow-calc.calc', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const panel = vscode.window.createWebviewPanel(
			'calcVeiw',
			'计算器',
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				retainContextWhenHidden: true
			}
		)
		try {
			const temp = await getWebViewContent(context, 'index')
			const flower = parseResUri(context, panel, 'image/flower.gif')
			infoMsg(flower)
			const html = compileViewContent(temp, {
				content: "pug compile content",
				flower
			})
			panel.webview.html = html
		} catch (error) {
			errorMsg(String(error))
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
