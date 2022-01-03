import * as vscode from 'vscode';
import "typescript";
import "constants";

let myStatusBar : vscode.StatusBarItem;

export function activate({ subscriptions }: vscode.ExtensionContext) {
	const codeCommentCommand = "code-comments.CodeComment";
	subscriptions.push(vscode.commands.registerCommand(codeCommentCommand, () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const text = editor.document.getText(selection);
			const newText = `/* ${text} */`;
			editor.edit(editBuilder => editBuilder.replace(selection, newText));
			vscode.window.showInformationMessage("Code Comment Generated! 🎉");
		}
		else {
			vscode.window.showErrorMessage("Not active file opened.");
		}
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
