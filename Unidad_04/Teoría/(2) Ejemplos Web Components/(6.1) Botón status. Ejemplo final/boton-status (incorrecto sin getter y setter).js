class BotonStatus extends HTMLElement{
	constructor() {
	  super();

	  // Creamos shadow DOM que a partir de ahora se puede acceder a través de 
	  this.attachShadow({mode: 'open'});  
	  
	  // Actualizamos el parámetro status según el valor que recibimos como entrada
	  let currentStatus = this.getAttribute('status');
	  if(currentStatus) {
		this.status = currentStatus;
	  } else {
		this.status = 'neutral';
	  }
	  	  
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
			// En este caso no funciona porque sin getter y setter no detecta el cambio en un atributo de HTML, sino en un atributo privado con el mismo nombre
			this.status = opcionElegida[0];
			this.shadowRoot.querySelector("#buttonStatus").textContent = opcionElegida[1];
		}, 1000);			  		
	  });	  
 	}
	
	// Se muestra el HTML por primera vez cuando se hay cargado el DOM
	connectedCallback(){
	   this.render(this.status);	  
	}
	
	// Se llama cuando se modifica el valor de los atributos especificados en observedAttributes
	attributeChangedCallback(attr, oldVal, newVal) {
	  if(attr == 'status' && oldVal != newVal) { 
	    this.status = newVal;
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
			outline:none;
			animation-duration: 1s; 
			animation-timing-function: ease-in;
			background-color: #000;
		  }
		  div:active{ 
			animation-name: anim; 
		  }
		  @keyframes anim { 
			0% {transform: scale(1);} 
			10%, 40% {transform: scale(0.7) rotate(-1.5deg);}  
			100% {transform: scale(1) rotate(0);} 
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
