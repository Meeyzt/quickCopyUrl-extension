# QuickCopy URL

A lightweight Chrome extension that lets you instantly copy the current tab's URL with a simple keyboard shortcut. No more clicking around - just press the shortcut and the URL is in your clipboard!

## Features

- 🚀 Instantly copy current tab's URL
- ⌨️ Convenient keyboard shortcuts
- 🪶 Lightweight and fast
- 🔔 Elegant toast notifications
- 💻 Cross-platform support (Mac, Windows, Linux)

## Keyboard Shortcuts

- **Mac**: `Command + Control + C`
- **Windows/Linux**: `Alt + Shift + C`

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory
5. The extension is now installed and ready to use!

## Usage

1. Navigate to any webpage
2. Press the keyboard shortcut for your operating system
3. A toast notification will appear confirming the URL has been copied
4. Paste the URL anywhere you need it!

## Technical Details

The extension uses:

- Manifest V3
- Modern Chrome Extension APIs
- Clean, efficient JavaScript
- Minimal permissions for security

## Permissions Required

- `activeTab`: To access the current tab's URL
- `commands`: For keyboard shortcuts
- `clipboardWrite`: To copy URLs to clipboard
- `scripting`: To inject the notification script

## Contributing

Feel free to fork this repository and submit pull requests for any improvements you'd like to add!

## License

MIT License - feel free to use this code in your own projects!

## Author

Created by meeyzt

---

💡 **Pro Tip**: You can customize the keyboard shortcuts by going to `chrome://extensions/shortcuts` after installing the extension.
