import * as vscode from 'vscode';
import "typescript";

export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.commands.registerCommand('code-comments.CodeComment', () => {
		
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
	
}
