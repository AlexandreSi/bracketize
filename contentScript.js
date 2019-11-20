document.onkeydown = function(event) {
  const targetKeys = Object.keys(targetKeysMapping);

  if (resetKeys.indexOf(event.keyCode) >= 0) {
    resetFunction(event)
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

document.onselect = function(event) {
  try {
    const sel = document.getSelection()

    chrome.runtime.sendMessage(
      {
        type: 'text',
        payload: document.getSelection().toString(),
      },
    )
  } catch(error) {
    console.error(error)
  }
};

resetFunction = function(event) {
  chrome.runtime.sendMessage(
    {
      type: 'reset',
      payload: null,
    },
  )
}

document.onclick = resetFunction
document.onmousedown = resetFunction
