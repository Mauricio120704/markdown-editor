function formatTextToCursiveOrBold(text) {
    if (currentSelectedText) {
      text = text.replace(
        currentSelectedText,
        state ? `**${currentSelectedText}**` : `*${currentSelectedText}*`
      );
      state = !state;
      changeBtnName();
    }
  
    return text;
  }
  
function getTextFromTextArea(callback) {
    let text = markdownInput.value;
    if (text === ""){
      alert("Debe ingresar un texto para poder generar el MD");
      return; // termine la ejecución luego de mostar la alerta
    }

    text = formatTextToCursiveOrBold(text);


    callback(text);
  }
  
  function convertHeadings(html) {
    html = html.replace(
      /^# (.+)$/gm,
      "<h1 class='text-6xl font-bold border-b'>$1</h1>"
    );
    // ## titulo -> <h2>titulo</h2>
    html = html.replace(
      /^## (.+)$/gm,
      "<h2 class='text-5xl font-bold border-b'>$1</h2>"
    );
    html = html.replace(/^### (.+)$/gm, "<h3 class='text-4xl font-bold'>$1</h3>");
    html = html.replace(
      /^#### (.+)$/gm,
      "<h4 class='text-3xl font-bold'>$1</h4>"
    );
    html = html.replace(
      /^##### (.+)$/gm,
      "<h5 class='text-2xl font-bold'>$1</h5>"
    );
    html = html.replace(
      /^###### (.+)$/gm,
      "<h6 class='text-xl font-bold'>$1</h6>"
    );
  
    return html;
  }

  function convertBold(html) {
    // **hola**
    return html.replace(
      /\*\*([^\*]+)\*\*/g,
      "<strong class='text-red-500'>$1</strong>"
    );
  }
  
  function converCursive(html) {
    // *hola*
    return html.replace(/\*([^\*]+)\*/g, "<i>$1</i>");
  }
  function convertToHtml(text) {
    let html = text;
    // evaluamos listas (primero para evitar conflictos con otros elementos)
    html = convertLists(html);
    // evaluamos titulo
    html = convertHeadings(html);
    // evaluamos formatos de texto (negrita e itálica)
    html = convertFormats(html);
    // evaluamos enlaces (pendiente de implementar)
  
    html = convertBold(html);
    html = converCursive(html);
    renderPreview(html); // HTML lo muestra en el preview
  }
  
  function renderPreview(html) {
    previewSection.innerHTML = html;
    // Reiniciamos el estado de contraste cuando se genera nueva vista previa
    encabezadosContrastados = false;
  }