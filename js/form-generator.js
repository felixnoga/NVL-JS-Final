var input_labels = document.querySelector("#inputlabel");
var select_options = document.querySelector("#select-options");
var tipo_campo = document.querySelector("#tipocampo");
var existing_label = document.querySelector("#labels p");
var new_form = document.querySelector("#new-form");
var add_btn = document.querySelector("#add-input");
var tipo_input, etiqueta;
var options = [];

console.log(tipo_input);
console.log(etiqueta);
function extractValue(id) {
  var elemento = document.querySelector(id);
  return elemento.value;
}

function addLabels(text, button=false) {

  if (existing_label) {
    existing_label.remove();
  }
  var cont = document.querySelector("#labels");
  var p = document.createElement("p");
  if(button) {
    cont = document.querySelector("#botonlb");
    cont.textContent = "LABEL BOTÓN: "+ text;
  }
  else {
    cont.textContent = "ETIQUETA: "+ text;
  }

  cont.appendChild(p);
  input_labels.value = "";
}

function addOptionsToShow(text) {

  var cont = document.querySelector("#options-container");
  var p = document.createElement("p");
  p.textContent =  text;
  cont.appendChild(p);
  select_options.value = "";
}

function addInput(type, label) {
  switch (type) {
    case "input-txt":
    case "input-email":
    case "input-num":
      container = document.createElement("div");
      container.classList.add("formcontrol");
      node = document.createElement("input");
      la = document.createElement("label");
      la.innerText = label;
      atributo = label.trim().toLowerCase();
      la.setAttribute("for", atributo);
      node.type = "text";
      node.id = atributo;
      node.name = atributo;
      new_form.appendChild(container);
      container.appendChild(la);
      container.appendChild(node);
      break;
    case "select":
      container = document.createElement("div");
      container.classList.add("formcontrol");
      node = document.createElement("select");
      la = document.createElement("label");
      la.innerText = label;
      atributo = label.trim().toLowerCase();
      la.setAttribute("for", atributo);
      node.id = atributo;
      node.name = atributo;
      new_form.appendChild(container);
      container.appendChild(la);
      container.appendChild(node);
      for (i=0; i<options.length; i++) {
        opt = document.createElement("option");
        opt.innerText = options[i];
        val = options[i].replace(/\s/g, "").toLowerCase();
        opt.setAttribute("value", val);
        node.appendChild(opt);
      }
    break;

    case "input-radio":
      container = document.createElement("div");
      container.classList.add("formcontrol");
      atributo = label.trim().toLowerCase();
      la = document.createElement("label");
      la.innerHTML = label +"<br>";
      la.setAttribute("for", atributo);
      new_form.appendChild(container);
      container.appendChild(la);
      for (i=0; i<options.length; i++) {
        opt = document.createElement("input");
        val = options[i].replace(/\s/g, "").toLowerCase();
        opt.name = atributo;
        opt.type = "radio";
        opt.value = val;
        text = document.createTextNode(options[i]);
        container.appendChild(opt);
        radio = container.lastChild;
        radio.parentNode.insertBefore(text, radio.nextSibling);

      }
      break;
    case "input-checkbox":
      container = document.createElement("div");
      container.classList.add("formcontrol");
      atributo = label.trim().toLowerCase();
      la = document.createElement("label");
      la.innerHTML = label +"<br>";
      la.setAttribute("for", atributo);
      new_form.appendChild(container);
      container.appendChild(la);
      for (i=0; i<options.length; i++) {
        opt = document.createElement("input");
        val = options[i].replace(/\s/g, "").toLowerCase();
        opt.name = atributo;
        opt.type = "checkbox";
        opt.value = val;
        text = document.createTextNode(options[i]);
        container.appendChild(opt);
        ch = container.lastChild;
        ch.parentNode.insertBefore(text, ch.nextSibling);

      }
      break;

    case "btn":
      container = document.createElement("div");
      container.classList.add("formcontrol");
      atributo = label.trim().toLowerCase();
      btn = document.createElement("button");
      new_form.appendChild(container);
      container.appendChild(btn);
      btn.type = "submit";
      btn.innerText  = label;
      break;

    }
}

function removeValues() {

  var inputs = document.querySelectorAll('input');
  for (var i=0; i< inputs.length; i++) {
    inputs[i].value = "";
  }
  console.log(document.querySelectorAll(".stg-btn").length);
  if (document.querySelectorAll(".stage-btn").length) {
    console.log("hay");
    document.querySelector(".stage-btn").classList.add("hidden");
  }

  add_btn.classList.add("hidden");
  if (document.querySelectorAll(".options").length) {
    document.querySelector(".options").classList.add("hidden");
  }


 if(document.querySelector("#options-container").childNodes.length) {
   while (document.querySelector("#options-container").firstChild) {
     document.querySelector("#options-container").removeChild(document.querySelector("#options-container").firstChild);
   }

 }
  var div_etiquetas = document.querySelector("div#labels");
  div_etiquetas.removeChild(div_etiquetas.childNodes[0]);
  tipo_campo.selectedIndex = 0;

  options = [];
}

tipo_campo.addEventListener('change', function(e) {
  if (e.target.value === "btn") {
    document.querySelector(".stage-btn").classList.remove("hidden");
    document.querySelector(".stage2").classList.add("hidden");
  }
  else {
    document.querySelector(".stage2").classList.remove("hidden");
  }

  tipo_input = extractValue("#tipocampo");
});

document.querySelector("#labelbtn").addEventListener('click', function () {
  etiqueta = extractValue("#inputlabel");
  addLabels(etiqueta);
  if(tipo_input !== undefined) {

    if(tipo_input==="select" || tipo_input==="input-radio" || tipo_input === "input-checkbox") {
      document.querySelector(".options").classList.remove("hidden");
    }
    else if (tipo_input==="input-txt" || tipo_input==="input-num" || tipo_input==="input-email") {
      add_btn.classList.remove("hidden");
    }
  }

});

document.querySelector("#btnbtn").addEventListener('click', function () {
  etiqueta = extractValue("#botonlabel");
  addLabels(etiqueta, true);


  if(tipo_input !== undefined) {
      add_btn.classList.remove("hidden");
  }

});


add_btn.addEventListener('click', function () {
  addInput(tipo_input, etiqueta);
  removeValues();

});

document.querySelector("#select-btn").addEventListener('click', function () {
  var opcion = extractValue("#select-options");
  addOptionsToShow(opcion);
  options.push(opcion);
  add_btn.classList.remove("hidden");
});
