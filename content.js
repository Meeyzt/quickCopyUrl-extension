// Keep track of active toast
let activeToast = null;

function showToast() {
  // Remove existing toast if any
  if (activeToast) {
    document.body.removeChild(activeToast);
    activeToast = null;
  }

  // Create toast container
  const toastContainer = document.createElement('div');
  toastContainer.style.position = 'fixed';
  toastContainer.style.top = '20px';
  toastContainer.style.right = '20px';
  toastContainer.style.zIndex = '999999';

  // Create toast element
  const toast = document.createElement('div');
  toast.style.backgroundColor = '#333';
  toast.style.color = 'white';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '8px';
  toast.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  toast.style.fontSize = '14px';
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(-20px)';
  toast.style.transition = 'all 0.3s ease-in-out';
  toast.textContent = 'URL Copied!';

  // Add toast to container
  toastContainer.appendChild(toast);
  document.body.appendChild(toastContainer);
  activeToast = toastContainer;

  // Show toast with animation
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 100);

  // Hide and remove toast
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      if (activeToast === toastContainer) {
        document.body.removeChild(toastContainer);
        activeToast = null;
      }
    }, 300);
  }, 2000);
}

// Check if listener is already added
if (!window.hasToastListener) {
  window.hasToastListener = true;

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "copyUrl") {
      try {
        const textarea = document.createElement('textarea');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.value = request.url;
        document.body.appendChild(textarea);
        textarea.select();

        const success = document.execCommand('copy');
        document.body.removeChild(textarea);

        if (success) {
          showToast();
          sendResponse({ success: true });
        } else {
          sendResponse({ success: false, error: 'execCommand copy failed' });
        }
      } catch (error) {
        sendResponse({ success: false, error: error.message });
      }
      return true;
    }
  });
} 