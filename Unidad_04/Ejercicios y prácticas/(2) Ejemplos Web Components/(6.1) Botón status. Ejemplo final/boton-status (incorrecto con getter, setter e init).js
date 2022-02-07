class BotonStatus extends HTMLElement{
	constructor() {
	  super();

	  // Creamos shadow DOM que a partir de ahora se puede acceder a través de 
	  this.attachShadow({mode: 'open'});  
	  
	  // Actualizamos el parámetro status según el valor que recibimos como entrada
	  // El DOM nos da error porque no se puede modificar un atributo del HTML en el constructor
	  // Si quitamos los gettter y setter funciona, pero deja de ser reactivo y no funcionará el evento
	  // En definitiva, los getter y setter se encargan automáticamente de asociar getAttribute y setAttribute 
	  // con el valor del atributo de HTML
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
		this.render(newVal);	
	  }	
	}
	
	// Atributos reactivos cuando se invoca attributeChangedCallback
	static get observedAttributes() {
	  return ['status'];
	}
	
	// Getter y setter de status. Se accede cuando se cambia el valor de estos atributos o para obtenerlo
	get status() {
	  return this.getAttribute('status');
	}
	
	set status(newVal) {
	  if (newVal == null || newVal === false || newVal === '') {
         this.remove('status');
	  } else {
         this.setAttribute('status', newVal);
      }
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