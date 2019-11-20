chrome.storage.local.set({'selectedText': null})

chrome.runtime.onMessage.addListener(
  function(message, sender, senderResponse) {
    if (message.type === 'text') {
      chrome.storage.local.set({'selectedText': message.payload})
    } else if (message.type === 'reset') {
      chrome.storage.local.set({'selectedText': null})
      return true
    } else if (message.type === 'key') {
      var b = chrome.storage.local.get(
        'selectedText',
        function (items) {
          if (!!items.selectedText) {
            let newText = `${message.payload}${items.selectedText}${targetKeysMapping[message.payload]}`
            senderResponse(newText)
          } else {
            senderResponse(message.payload)
          }
        }
      )
      chrome.storage.local.set({'selectedText': null})
      return true
    }
  }
)
