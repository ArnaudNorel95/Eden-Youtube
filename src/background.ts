import { hideElements } from './components/Menu';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("🚀 ~ chrome.tabs.onUpdated.addListener ~ changeInfo:", changeInfo)

  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('youtube.com')) {
    chrome.storage.local.get('hideShorts', (result) => {
          console.log("🚀 ~ chrome.storage.local.get ~ result.hideShorts:", result.hideShorts)
            if (result.hideShorts) {
                hideElements();
            }
        });
    }
});
