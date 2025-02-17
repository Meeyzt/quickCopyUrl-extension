// Listen for extension install
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed - checking commands...');
  chrome.commands.getAll((commands) => {
    console.log('Available commands:', commands);
  });
});

// Keep track of injected tabs
const injectedTabs = new Set();

// Listen for keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === "copy-url") {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tab = tabs[0];

      try {
        // Only inject content script if not already injected
        if (!injectedTabs.has(tab.id)) {
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
          });
          injectedTabs.add(tab.id);
        }

        // Send message to content script
        const response = await chrome.tabs.sendMessage(tab.id, {
          action: "copyUrl",
          url: tab.url
        });

        if (!response.success) {
          throw new Error(response.error);
        }
      } catch (err) {
        console.error('Failed to copy URL:', err);
        // If message sending fails, try re-injecting the content script
        injectedTabs.delete(tab.id);
      }
    });
  }
});

// Clean up injectedTabs when a tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  injectedTabs.delete(tabId);
}); 