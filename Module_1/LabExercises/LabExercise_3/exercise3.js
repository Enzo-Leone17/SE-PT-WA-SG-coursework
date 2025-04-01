function randomizeColorAndText(elemenIDNumber) {
  let backgroundOnly = false;
  let variableText = "";
  let defaultHeader = ["Airplane", "Send"];
  let columnID = "column" + elemenIDNumber;
  let headerID = "heading" + elemenIDNumber;
  let textareaID = "textArea" + elemenIDNumber;
  let columnElement = document.getElementById(columnID);
  let headerElement = document.getElementById(headerID);
  let textareaElement = document.getElementById(textareaID);
  if (textareaElement?.value) {
    variableText = textareaElement.value;
  }
  if (
    variableText !== undefined &&
    variableText !== null &&
    variableText !== ""
  ) {
    headerElement.innerHTML = variableText;
    backgroundOnly = true;
    headerElement.style.color = "black";
  } else {
    for (let i = 0; i < defaultHeader.length; i++) {
      if (parseInt(elemenIDNumber) - 1 === i) {
        headerElement.innerHTML = defaultHeader[i];
        break;
      }
    }
  }
  var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  if (columnElement?.style) {
    columnElement.style.backgroundColor = randomColor;
  }
  if (headerElement?.style && !backgroundOnly) {
    randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    headerElement.style.color = randomColor;
  }
}
