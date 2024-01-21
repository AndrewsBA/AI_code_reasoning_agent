const vertexAI = require('./vertex-ai')
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
//const fs = require('fs');
//const path = require('path');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

function displayOutput(output) {
  const outputChannel = vscode.window.createOutputChannel('VertexAI');
  outputChannel.appendLine(`Generated Doc Strings:`);
  outputChannel.append(output.predictions[0].content);
  outputChannel.show();
}

function displayError(error) {
  vscode.window.showErrorMessage(error.message)
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('VertexAI.generateDocString', () => {
		const editor = vscode.window.activeTextEditor;
	
		if (editor) {
		  const selection = editor.selection;
		  const selectedText = editor.document.getText(selection);
	
      // Display the response in a new output window
      vertexAI
        .get_response_from_ai('generate_doc_strings', selectedText)
        .then(response => response.json())
        .then(data => displayOutput(data))
        .catch((err) => displayError(err))
		}
	  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
