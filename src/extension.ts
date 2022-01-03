import * as vscode from 'vscode';
import "typescript";

let myStatusBar : vscode.StatusBarItem;

export function activate({ subscriptions }: vscode.ExtensionContext) {
	const codeCommentCommand = "code-comments.CodeComment";
	subscriptions.push(vscode.commands.registerCommand(codeCommentCommand, () => {
		vscode.window.activeTextEditor.edit(edit => {
			let selection = vscode.window.activeTextEditor.selection;
			let text = vscode.window.activeTextEditor.document.getText(selection);
			edit.replace(selection, `// ${text}`);
		});
	}));

	myStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBar.command = codeCommentCommand;
	subscriptions.push(myStatusBar);

	subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));
	updateStatusBarItem();
}

function updateStatusBarItem() {
	if (vscode.window.activeTextEditor) {
		myStatusBar.text = `$(comment) Comment Code`;		
		myStatusBar.show();
	} else {
		myStatusBar.hide();
	}
}

export function deactivate() {
	myStatusBar.dispose();
}
