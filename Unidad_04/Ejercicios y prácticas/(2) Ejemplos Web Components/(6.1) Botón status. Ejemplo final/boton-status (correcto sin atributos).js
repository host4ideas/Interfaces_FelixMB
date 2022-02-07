class BotonStatus extends HTMLElement{
	constructor() {
	  super();

	  // Creamos shadow DOM que a partir de ahora se puede acceder a través de 
	  this.attachShadow({mode: 'open'});  
	  
 	  this.shadowRoot.addEventListener('click', () => {
		// Creamos un objeto con todos los valores posibles y descripciones
		let opciones = {neutral: "Haz click para probar", danger: "Error", success: "Correcto"};
		let valores = Object.entries(opciones);

		// Se cambia el texto y esperamos un segundo
		this.shadowRoot.querySelector("#buttonStatus").textContent = "Cambiando estado..."
		
		setTimeout(() => {
			// Elegimos una opción al azar y se actualiza junto con su descripción
			let opcionElegida = valores[Math.floor(Math.random() * valores.length)];			
						
			// Lo importante es que al cambiar status attributeChangedCallback muestra la página de nuevo con el atributo correspondiente
			this.setAttribute('status', opcionElegida[0]);
			this.shadowRoot.querySelector("#buttonStatus").textContent = opcionElegida[1];
		}, 1000);			  		
	  });	  
 	}
	
	connectedCallback(){  		
	  // Se representa el HTML de la propiedad template en el shadow DOM
	  this.render(this.getAttribute('status'));	  
	}
	
	// Se llama cuando se modifica el valor de los atributos especificados en observedAttributes
	attributeChangedCallback(attr, oldVal, newVal) {
	  if(attr == 'status' && oldVal != newVal) { 
		this.render(newVal);	
	  }	
	}
	
	// Atributos reactivos cuando se invoca attributeChangedCallback
	static get observedAttributes() {
	  return ['status'];
	}
			
	// Código HTML
	render(currentStatus) {
	  this.shadowRoot.innerHTML = `
		<style>
		  div {
			display: inline-block;
			color: #fff;
			border-radius: 3px;
			padding: 10px;
			cursor:pointer;		
			background-color: #000;
		  }
		  .neutral {
			background-color: #888;
		  }
		  .danger {
			background-color: #d66;
		  }
		  .success {
			background-color: #3a6;
		  }
		</style>
		<div id="buttonStatus" ${currentStatus ? `class="${currentStatus}"` : 'class="neutral"'}><slot></slot></div>
	  `;
	}
}

window.customElements.define('boton-status', BotonStatus);