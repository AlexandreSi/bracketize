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
        // let sel = document.getSelection()
        // console.log(sel)
        // const { childNodes } = sel.anchorNode
        // const childNodesTags = []
        // for (let childNode of childNodes) {
        //   childNodesTags.push(childNode.tagName)
        // }
        // const compatibleTags = ['INPUT', 'TEXTAREA']
        // let childNodeIndex;
        // for (let childNodeTagIndex = 0; childNodeTagIndex < childNodesTags.length; childNodeTagIndex++) {
        //   if (compatibleTags.indexOf(childNodesTags[childNodeTagIndex]) >= 0) {
        //     childNodeIndex = childNodeTagIndex
        //     break
        //   }
        // }
        // const childNode = childNodes.item(childNodeIndex);
        // inputValue = childNode.value
        // const selectionStart = childNode.selectionStart
        // const selectionEnd = childNode.selectionEnd
        // const wholeNewText = `${inputValue.substring(0, selectionStart)}${newText}${inputValue.substring(selectionEnd, inputValue.length)}`
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
    sel = document.getSelection()
    input = sel.anchorNode.childNodes[1]
    inputValue = input.value

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
