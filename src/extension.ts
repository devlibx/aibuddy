import * as vscode from 'vscode';
import { join } from 'path';

class AiBuddyViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'aibuddy.sidebarView';
	private _view?: vscode.WebviewView;

	constructor(
		private readonly _extensionUri: vscode.Uri,
	) { }

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [
				this._extensionUri
			]
		};

		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

		// Handle messages from the webview
		webviewView.webview.onDidReceiveMessage(message => {
			switch (message.type) {
				case 'info':
					vscode.window.showInformationMessage(message.value);
					return;
			}
		});
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>AI Buddy</title>
            <style>
                body {
                    padding: 10px;
                }
                .container {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                button {
                    padding: 8px;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>AI Buddy Panel</h2>
                <p>Welcome to AI Buddy! This panel will help you interact with AI features.</p>
                <button onclick="sendMessage()">Send Test Message</button>
            </div>
            <script>
                const vscode = acquireVsCodeApi();
                
                function sendMessage() {
                    vscode.postMessage({
                        type: 'info',
                        value: 'Hello from the webview!'
                    });
                }
            </script>
        </body>
        </html>`;
	}
}

export function activate(context: vscode.ExtensionContext) {
	console.log('AI Buddy extension is now active!');

	try {
		// Register the webview provider
		const provider = new AiBuddyViewProvider(context.extensionUri);
		const providerRegistration = vscode.window.registerWebviewViewProvider(
			AiBuddyViewProvider.viewType,
			provider,
			{
				webviewOptions: {
					retainContextWhenHidden: true
				}
			}
		);
		context.subscriptions.push(providerRegistration);
		console.log('Webview provider registered successfully');

		// Register the command
		const commandRegistration = vscode.commands.registerCommand('aibuddy.showPanel', async () => {
			try {
				await vscode.commands.executeCommand('workbench.view.extension.aibuddy-sidebar');
				console.log('Sidebar view opened successfully');
			} catch (error) {
				console.error('Error opening sidebar view:', error);
				vscode.window.showErrorMessage('Failed to open AI Buddy sidebar');
			}
		});
		context.subscriptions.push(commandRegistration);
		console.log('Command registered successfully');

		// Try to open the view
		void vscode.commands.executeCommand('workbench.view.extension.aibuddy-sidebar')
			.then(() => console.log('Initial view open attempted'))
			.then(undefined, (error: Error) => console.error('Error in initial view open:', error));

	} catch (error) {
		console.error('Error during extension activation:', error);
		vscode.window.showErrorMessage('Failed to activate AI Buddy extension');
	}
}

export function deactivate() { }
