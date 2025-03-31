<<<<<<< HEAD
/**
 * Variables para obtener elementos HTML
 */
const generateHtml = document.querySelector("#generate-html");
const markdownInput = document.querySelector("#markdown-input");
const previewSection = document.querySelector("#preview-section");

=======
// button
const generateHtml = document.querySelector("#generate-html");
// textarea
const markdownInput = document.querySelector("#markdown-input");
// section preview
const previewSection = document.querySelector("#preview-section");

const changeBoldOrCursive = document.querySelector("#change-bold-or-cursive");
 
 let state = false;
 let currentSelectedText = "";
 
 function changeBtnName() {
   changeBoldOrCursive.textContent = state
     ? "Cambiar a Negrita"
     : "Cambiar a cursiva";
 }
 
 changeBtnName();

>>>>>>> master
// Variable para rastrear el estado de contraste de los encabezados
let encabezadosContrastados = false;

// Creación del botón para contrastar encabezados
function crearBotonContraste() {
  const botonContraste = document.createElement("button");
  botonContraste.textContent = "Contrastar Encabezados";
  botonContraste.id = "contrastar-encabezados";
  botonContraste.className = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2";
  
  // Insertar el botón después del botón de generar HTML
  generateHtml.parentNode.insertBefore(botonContraste, generateHtml.nextSibling);
  
  // Agregar event listener al botón
  botonContraste.addEventListener("click", toggleContrasteEncabezados);
}

// Crear contador de palabras y caracteres
function crearContador() {
  const contadorContainer = document.createElement("div");
  contadorContainer.id = "contador-container";
  contadorContainer.className = "text-base text-white font-medium absolute bottom-0 left-0 p-2 bg-gray-800 z-10";
  contadorContainer.innerHTML = `
    <span id="contador-palabras">0 palabras</span> | 
    <span id="contador-caracteres">0 caracteres</span>
  `;
  
  // Insertar el contador dentro de la primera sección (donde está el textarea)
  const editorSection = document.querySelector('section:first-of-type');
  editorSection.appendChild(contadorContainer);
  
  // Iniciar el contador
  actualizarContador();
  
  // Añadir evento para actualizar el contador al escribir
  markdownInput.addEventListener("input", actualizarContador);
}

// Función para actualizar el contador de palabras y caracteres
function actualizarContador() {
  const texto = markdownInput.value;
  const contadorPalabras = document.getElementById("contador-palabras");
  const contadorCaracteres = document.getElementById("contador-caracteres");
  
  // Contar caracteres (incluyendo espacios)
  const caracteres = texto.length;
  
  // Contar palabras (dividiendo por espacios y filtrando elementos vacíos)
  const palabras = texto.trim() === "" ? 0 : texto.trim().split(/\s+/).length;
  
  // Actualizar contadores
  contadorPalabras.textContent = `${palabras} palabra${palabras !== 1 ? 's' : ''}`;
  contadorCaracteres.textContent = `${caracteres} caracter${caracteres !== 1 ? 'es' : ''}`;
}

// Función para alternar el contraste de los encabezados
function toggleContrasteEncabezados() {
  // Obtenemos todos los encabezados en la vista previa
  const encabezados = previewSection.querySelectorAll("h1, h2, h3, h4, h5, h6");
  
  // Si no hay encabezados, no hacemos nada
  if (encabezados.length === 0) return;
  
  // Alternamos el estado de contraste
  encabezadosContrastados = !encabezadosContrastados;
  
  if (encabezadosContrastados) {
    // Aplicamos estilos de contraste
    encabezados.forEach(encabezado => {
      // Guardamos los estilos originales para poder restaurarlos después
      encabezado.dataset.originalColor = encabezado.style.color;
      encabezado.dataset.originalBackground = encabezado.style.backgroundColor;
      encabezado.dataset.originalTransform = encabezado.style.transform;
      
      // Aplicamos los estilos de contraste según el tipo de encabezado
      switch (encabezado.tagName.toLowerCase()) {
        case "h1":
          encabezado.style.color = "#FF5733"; // Rojo anaranjado
          encabezado.style.backgroundColor = "#FFF3F0";
          encabezado.style.transform = "scale(1.05)";
          break;
        case "h2":
          encabezado.style.color = "#33A1FF"; // Azul claro
          encabezado.style.backgroundColor = "#F0F8FF";
          encabezado.style.transform = "scale(1.03)";
          break;
        case "h3":
          encabezado.style.color = "#33FF57"; // Verde claro
          encabezado.style.backgroundColor = "#F0FFF3";
          encabezado.style.transform = "scale(1.02)";
          break;
        default: // h4, h5, h6
          encabezado.style.color = "#A033FF"; // Púrpura
          encabezado.style.backgroundColor = "#F8F0FF";
          encabezado.style.transform = "scale(1.01)";
      }
      
      // Añadimos una transición suave
      encabezado.style.transition = "all 0.3s ease";
      // Añadimos un borde sutil
      encabezado.style.borderLeft = "4px solid currentColor";
      encabezado.style.paddingLeft = "10px";
    });
  } else {
    // Restauramos los estilos originales
    encabezados.forEach(encabezado => {
      // Restauramos los estilos originales
      encabezado.style.color = encabezado.dataset.originalColor || "";
      encabezado.style.backgroundColor = encabezado.dataset.originalBackground || "";
      encabezado.style.transform = encabezado.dataset.originalTransform || "";
      encabezado.style.borderLeft = "";
      encabezado.style.paddingLeft = "";
    });
  }
}

<<<<<<< HEAD
function getTextFromTextArea() {
  const text = markdownInput.value;
  if (text === ""){
    alert("Debe ingresar un texto para poder generar el MD");
    return; // termine la ejecución luego de mostar la alerta
  }
  return text;
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

=======
>>>>>>> master
function convertLists(text) {
  // Identificar bloques de listas desordenadas
  let result = text;
  
  // Primero identificamos y procesamos listas no ordenadas
  // Detectamos bloques de listas desordenadas (identificadas por líneas que comienzan con - * +)
  result = result.replace(
    /(^|\n)((?:[\t ]*[-*+][^\n]+\n)+)/g,
    function(match, p1, listBlock) {
      // Convertimos cada línea a un <li>
      const listItems = listBlock.replace(/^[\t ]*[-*+][\t ]+([^\n]+)$/gm, '<li>$1</li>');
      // Envolvemos todo en un <ul>
      return p1 + '<ul class="list-disc pl-5 my-2">' + listItems + '</ul>';
    }
  );
  
  // Luego procesamos listas ordenadas
  // Detectamos bloques de listas ordenadas (identificadas por líneas que comienzan con número seguido de punto)
  result = result.replace(
    /(^|\n)((?:[\t ]*\d+\.[\t ]+[^\n]+\n)+)/g,
    function(match, p1, listBlock) {
      // Convertimos cada línea a un <li>
      const listItems = listBlock.replace(/^[\t ]*\d+\.[\t ]+([^\n]+)$/gm, '<li>$1</li>');
      // Envolvemos todo en un <ol>
      return p1 + '<ol class="list-decimal pl-5 my-2">' + listItems + '</ol>';
    }
  );
  
  return result;
}

function convertFormats(text) {
  let result = text;
  
  // Convertir negrita (texto entre ** o __)
  // Primero manejamos los ** para negrita
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Luego manejamos los __ para negrita (alternativa)
  result = result.replace(/\_\_([^_]+)\_\_/g, '<strong>$1</strong>');
  
  // Convertir itálica (texto entre * o _)
  // Primero manejamos los * para itálica
  result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // Luego manejamos los _ para itálica (alternativa)
  result = result.replace(/\_([^_]+)\_/g, '<em>$1</em>');
  
  // También podemos manejar combinaciones (negrita e itálica juntas)
  result = result.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
  result = result.replace(/\_\_\_([^_]+)\_\_\_/g, '<strong><em>$1</em></strong>');
  
  return result;
}

<<<<<<< HEAD
function convertToHtml(text) {
  let html = text;
  // evaluamos listas (primero para evitar conflictos con otros elementos)
  html = convertLists(html);
  // evaluamos titulo
  html = convertHeadings(html);
  // evaluamos formatos de texto (negrita e itálica)
  html = convertFormats(html);
  // evaluamos enlaces (pendiente de implementar)

  return html;
}

function renderPreview(html) {
  previewSection.innerHTML = html;
  // Reiniciamos el estado de contraste cuando se genera nueva vista previa
  encabezadosContrastados = false;
}
=======
markdownInput.addEventListener("select", function (event) {
  getSelectedText(event);
});
>>>>>>> master

// Inicializar componentes cuando la página cargue
document.addEventListener("DOMContentLoaded", function() {
  crearBotonContraste();
  crearContador();
});

<<<<<<< HEAD
// TODO: Cuando hagamos click en el boton generateHtml, tenemos que obtener el texto del textarea y trasnformalo a HTML y eso mostrarlo el preview
generateHtml.addEventListener("click", function () {
  // para obtener el texto de un input usamos el .value
  const text = getTextFromTextArea(); // Obtiene el value del textarea
  const html = convertToHtml(text); // convierte el value a un HTML
  renderPreview(html); // HTML lo muestra en el preview
=======
generateHtml.addEventListener("click", function () {
getTextFromTextArea(convertToHtml);
});

changeBoldOrCursive.addEventListener("click", function () {
  getTextFromTextArea(convertToHtml);
>>>>>>> master
});