import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('plandex.run', () => {
    const terminal = vscode.window.createTerminal('Plandex');
    terminal.show();
    terminal.sendText('plandex');
  });

  const disposableWithOutput = vscode.commands.registerCommand('plandex.runWithOutput', () => {
    const outputChannel = vscode.window.createOutputChannel('Plandex Output');
    outputChannel.show(true);

    exec('plandex', (error, stdout, stderr) => {
      if (error) {
        outputChannel.appendLine(`[ERROR]: ${error.message}`);
        return;
      }
      if (stderr) {
        outputChannel.appendLine(`[STDERR]: ${stderr}`);
      }
      outputChannel.appendLine(`[STDOUT]:\n${stdout}`);
    });
  });

  context.subscriptions.push(disposable, disposableWithOutput);
}

export function deactivate() {}