function setText(event) {
  try {
    let selection
    if (typeof document.getSelection !== "undefined") {
      selection = document.getSelection()
    } else if (typeof window.getSelection !== "undefined") {
      selection = window.getSelection()
    } else {
      throw "getSelection function not found."
    }
    chrome.runtime.sendMessage(
      {
        type: 'text',
        payload: selection.toString(),
      },
    )
  } catch(error) {
    console.error(error)
  }
}

function resetText(event) {
  chrome.runtime.sendMessage(
    {
      type: 'reset',
      payload: null,
    },
  )
}


document.onkeydown = function(event) {
  const targetKeys = Object.keys(targetKeysMapping);

  if (resetKeys.indexOf(event.keyCode) >= 0) {
    resetText(event)
  }
  if (targetKeys.indexOf(event.key) >= 0) {
    event.preventDefault()
    chrome.runtime.sendMessage(
      {
        type: 'key',
        payload: event.key,
      },
      function(newText) {
        document.execCommand(
          "insertText",
          false,
          newText
        );
      }
    )
  }
};

document.onselect = setText
window.onselect = setText
document.onclick = resetText
document.onmousedown = resetText
