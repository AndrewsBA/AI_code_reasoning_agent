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

function executePrompt(command) {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);

    // Display the response in a new output window
    vertexAI
      .get_response_from_ai(command, selectedText)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Error!')
      })
      .then(data => displayOutput(data))
      .catch(err => displayError(err))
  }
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

  let doc_string_disposable = vscode.commands.registerCommand(
    'VertexAI.generateDocString',
    () => executePrompt('generate_doc_strings')
  );

  let unit_test_disposable = vscode.commands.registerCommand(
    'VertexAI.generateUnitTests',
    () => executePrompt('generate_unit_tests')
  );

  let code_review_disposable = vscode.commands.registerCommand(
    'VertexAI.reviewCode',
    () => executePrompt('code_review')
  );

  context.subscriptions.push(doc_string_disposable);
  context.subscriptions.push(unit_test_disposable);
  context.subscriptions.push(code_review_disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
