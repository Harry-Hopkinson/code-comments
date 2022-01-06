import * as vscode from 'vscode';
import "typescript";
import "constants";

let myStatusBar : vscode.StatusBarItem;

export function activate({ subscriptions }: vscode.ExtensionContext) {
	const codeCommentCommand = "code-comments.CodeComment";
	subscriptions.push(vscode.commands.registerCommand(codeCommentCommand, () => {
		const editor = vscode.window.activeTextEditor;
		const documentFileType = vscode.window.activeTextEditor?.document.languageId;
		if (editor) {
			if (editor.selection.isEmpty) {
				vscode.window.showInformationMessage("Please select Text to Comment...");
			} 
			else {
				if (documentFileType === "python") {
					const selection = editor.selection;
					const text = editor.document.getText(selection);
					const newText = `'''\n${text}\n'''`;
					editor.edit(editBuilder => {
						editBuilder.replace(selection, newText);
					});
				}
				else if (documentFileType === "html") {
					const selection = editor.selection;
					const text = editor.document.getText(selection);
					const comment = `<!-- ${text} -->`;
					editor.edit(editBuilder => {
						editBuilder.replace(selection, comment);
					});
				}
				else if (documentFileType === "java") {
					const selection = editor.selection;
					const text = editor.document.getText(selection);
					const comment = `/* ${text} */`;
					editor.edit(editBuilder => {
						editBuilder.replace(selection, comment);
					});
				}
				else {
					const selection = editor.selection;
					const text = editor.document.getText(selection);
					const newText = `/*\n${text}\n*/`;
					editor.edit(editBuilder => editBuilder.replace(selection, newText));
				}
				vscode.window.showInformationMessage("Code Comment Generated! 🎉");
			}
		}
		else {
			vscode.window.showInformationMessage("Please open a file to Comment...");
		}
	}));

	// Status Bar and Updating the Status Bar
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