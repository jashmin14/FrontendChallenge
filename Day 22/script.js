// Simple Markdown Previewer

const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

// basic markdown render
function renderMarkdown(text) {
  let html = text;

  // Headings
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");

  // Bold + Italic
  html = html.replace(/\*\*(.*)\*\*/gim, "<b>$1</b>");
  html = html.replace(/\*(.*)\*/gim, "<i>$1</i>");

  // Links
  html = html.replace(
    /\[(.*?)\]\((.*?)\)/gim,
    "<a href='$2' target='_blank'>$1</a>"
  );

  // Line breaks
  html = html.replace(/\n$/gim, "<br>");

  return html.trim();
}

editor.addEventListener("input", () => {
  preview.innerHTML = renderMarkdown(editor.value);
});

// default content
editor.value ="# Hello Markdown!\n\nType **bold**, *italic*, or [links](https://google.com)";
preview.innerHTML = renderMarkdown(editor.value);
