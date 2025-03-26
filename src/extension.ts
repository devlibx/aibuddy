import * as vscode from 'vscode';
import { join } from 'path';

class AiBuddyViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'aibuddy.sidebarView';
	private _view?: vscode.WebviewView;

	constructor(
		private readonly _extensionUri: vscode.Uri,
		private readonly _extensionContext: vscode.ExtensionContext
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
				case 'add':
					vscode.window.showInformationMessage('Add button clicked');
					return;
				case 'settings':
					vscode.window.showInformationMessage('Settings button clicked');
					return;
				case 'settings-updated':
					console.log('Settings updated:', message.value);
					// Store settings in workspace state
					this._extensionContext.workspaceState.update('aibuddy.settings', message.value);
					vscode.window.showInformationMessage('AI Buddy settings updated successfully');
					return;
			}
		});
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'webview-ui', 'dist', 'assets', 'index.js'));
		const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'webview-ui', 'dist', 'assets', 'index.css'));

		return `<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https:; style-src ${webview.cspSource}; script-src ${webview.cspSource} 'unsafe-inline';">
				<title>AI Buddy</title>
				<link rel="stylesheet" href="${styleUri}">
			</head>
			<body>
				<div id="root"></div>
				<script type="module" src="${scriptUri}"></script>
			</body>
		</html>`;
	}
}

export function activate(context: vscode.ExtensionContext) {
	console.log('AI Buddy extension is now active!');

	try {
		// Register the webview provider
		const provider = new AiBuddyViewProvider(context.extensionUri, context);
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
