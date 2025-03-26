# AI Buddy - Your Intelligent Coding Assistant

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/aibuddy.svg?style=flat-square&label=VS%20Code%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=aibuddy)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/Built%20With-TypeScript-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

AI Buddy is a powerful VS Code extension that brings intelligent coding assistance right to your editor. It helps you write, review, and improve your code through an intuitive chat interface.

![AI Buddy Demo](media/icon.svg)

## ✨ Features

- 🤖 **Intelligent Code Assistance**: Get real-time coding help and suggestions
- 💬 **Interactive Chat Interface**: Communicate naturally with the AI through a clean, modern UI
- ⚡ **Quick Access**: Easily accessible from the VS Code sidebar
- 🎨 **VS Code Theme Integration**: Seamlessly matches your editor's theme
- ⚙️ **Customizable Settings**: Configure the AI model and server settings to your needs

## 🚀 Installation

1. Open VS Code
2. Go to the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`)
3. Search for "AI Buddy"
4. Click Install

Or install through the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=aibuddy).

## 🎯 Usage

1. Click the AI Buddy icon in the activity bar (side panel)
2. Type your question or request in the chat interface
3. Press send or hit Enter to get AI assistance

### Commands

- `AI Buddy: Show Panel` - Opens the AI Buddy chat interface

## 🎛️ Interface Icons

AI Buddy provides quick access to key features through intuitive icons in the top bar:

### Top Bar Icons
- ⚙️ **Settings Icon**: Opens the settings panel where you can configure your AI model preferences
  - Location: Top-right corner of the AI Buddy panel
  - Click to access and modify your configuration
  - Settings are automatically saved to `~/.aibuddy`

- ➕ **Add Icon**: Quick action for creating new items or starting new conversations
  - Location: Top-right corner, next to settings
  - Use for starting fresh interactions with AI Buddy

## ⚙️ Settings Configuration

AI Buddy offers comprehensive settings that are stored in `~/.aibuddy` for persistent configuration:

### LLM Server Settings
- **Server URL** 
  - The endpoint URL for your AI model server
  - Example: `https://api.your-llm-server.com`
  - Required for connecting to your preferred AI service

### Authentication
- **API Token**
  - Your authentication token for the AI service
  - Securely stored and encrypted
  - Required for accessing the AI model

### Model Configuration
- **Model Name**
  - Specify which AI model to use
  - Example: `gpt-4`, `claude-v2`, etc.
  - Choose based on your needs and API access

### Settings Management
- Settings are automatically saved when you click "Save"
- Stored locally in `~/.aibuddy` for privacy
- Loaded automatically when VS Code starts
- Can be updated any time through the settings panel

## 🛠️ Development

Want to contribute? Great! Here's how to set up the development environment:

1. Clone the repository
```bash
git clone https://github.com/yourusername/aibuddy.git
cd aibuddy
```

2. Install dependencies
```bash
npm install
cd webview-ui && npm install
```

3. Start development
```bash
npm run dev
```

### Project Structure

```
aibuddy/
├── src/                  # Extension source code
├── webview-ui/          # React-based UI
├── media/              # Assets
└── package.json        # Extension manifest
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [VS Code Extension API](https://code.visualstudio.com/api)
- UI powered by [React](https://reactjs.org/)
- Styled with [VS Code's theme tokens](https://code.visualstudio.com/api/references/theme-color)

## 📫 Support

Having issues? [Open an issue](https://github.com/yourusername/aibuddy/issues) or reach out to the maintainers.

---

<p align="center">Made with ❤️ for the VS Code community</p>
