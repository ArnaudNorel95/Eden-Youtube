
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("🚀 ~ chrome.runtime.onMessage.addListener ~ sender:", sender.tab)

    if (request.type === 'DELETE_SHORTS') {
        const currentSite = sender.tab?.url;
        console.log("🚀 ~ chrome.runtime.onMessage.addListener ~ sender.tab?.id:", sender.tab?.id)

        if (sender.tab?.id) {

          chrome.scripting.executeScript(
            {
              target: { tabId: sender.tab.id },
              func: () => window.getSelection()?.toString() || document.documentElement.innerText,
            },
            (result) => {
              console.log("🚀 ~ chrome.runtime.onMessage.addListener ~ result:", result)
            }
          )
        }

        if (!currentSite) {
          sendResponse({
            error: 'Access not allowed from this domain',
            currentSite: currentSite
          });
          return true;
        }
    }
})    