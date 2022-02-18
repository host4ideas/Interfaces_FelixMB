const templateSwitch = document.createElement('template');

templateSwitch.innerHTML = `
	<style>			
		/* En este CSS no importa tanto emplear selectores de etiquetas ya que solo aplicará al componente web */
		:host{
			display: block;
			margin-bottom: 1em;
		}
		
		main{
			display: flex;		
		}
		
		main:hover{
			cursor: pointer;
		}
	
		div{
			width: 30px;
			height: 30px;			
		}
	
		.on{
			background-color: green;
			border: 1px solid green;
		}
		
		.off{
			background-color: red;
			border: 1px solid red;
		}
		
		.neutral{
			border: 1px solid black;
		}
	</style>
	<main>
		<div id="btnOff" class="off"></div>
		<div id="btnOn" class="neutral">OFF</div>		
	</main>
`;

class Switch extends HTMLElement {
	// Se representa el código
	constructor() {
		super();

		// Se muestra el HTML con shadow DOM
		this._shadowRoot = this.attachShadow({ mode: 'closed' });
		this._shadowRoot.appendChild(templateSwitch.content.cloneNode(true));

		// Guardamos una referencia de los botones on y off
		// Si hiciéramos esto en el connectedCallback se llamaría antes a attributeChangedCallback
		// Por tanto las referencias a los botones desde allí no serían correctas en este caso
		this.btnOff = this._shadowRoot.getElementById("btnOff");
		this.btnOn = this._shadowRoot.getElementById("btnOn");

		// Al hacer click cambiamos el atributo de HTML estado y esto desencadena una llamada a attributeChangedCallback
		this.addEventListener("click", () => {
			this.estado = (this.estado == "off") ? "on" : "off";
		});
	}
	/*
		connectedCallback: Se invoca cada vez que se añade un elemento personalizado a un documento. 
		Esto ocurrirá cada vez que el nodo se mueva, y puede suceder antes de que todo el contenido se haya parseado.
		Nota: connectedCallback puede llamarse cuando el elemento ya no esté conectado. Para asegurarse usar Node.isConnected.

		disconnectedCallback: Se invoca cada vez que el elemento se desconecta del DOM del documento.
		adoptedCallback: Se invoca cada vez que el elemento se mueve a un nuevo documento.
		attributeChangedCallback: Se invoca cada vez que los atributos del elemento se añaden, 
		quitan o cambian. Deben especificarse previamente en el método estático observedAttributes 
		los atributos que queremos que nos sean notificados.
	*/
	// Se llama cuando se modifica el valor de los atributos especificados en observedAttributes
	attributeChangedCallback(attr, oldVal, newVal) {
		if (attr == 'estado') {
			this.actualizarEstado(); // Comprobamos si el estado está en blanco o tiene un valor incorrecto en cuyo caso sería off				

			// Cambio de off a on y viceversa. Hay una serie de estilos que implementan cada estado	
			if (newVal == "off") {
				this.btnOff.className = "off";
				this.btnOff.innerHTML = "";
				this.btnOn.className = "neutral";
				this.btnOn.innerHTML = "OFF";
			} else if (newVal == "on") {
				this.btnOff.className = "neutral";
				this.btnOff.innerHTML = "ON";
				this.btnOn.className = "on";
				this.btnOn.innerHTML = "";
			}
		}
	}

	// Reinicia a off si el estado es incorrecto o está en blanco
	actualizarEstado() {
		if (!this.estado || (this.estado != "on" && this.estado != "off")) {
			this.estado = "off"
		}
	}

	/* Los métodos encender y apagar están pensados para que se llamen desde fuera y cambiar el estado */
	encender() {
		this.estado = "on";
	}

	apagar() {
		this.estado = "off";
	}

	// Atributos reactivos cuando se invoca attributeChangedCallback
	static get observedAttributes() {
		return ['estado'];
	}

	// Getter y setter de los atributos del HTML
	get estado() {
		return this.getAttribute('estado');
	}

	set estado(value) {
		this.setAttribute('estado', value);
	}
}

// Debido a que el componente apenas tiene código JavaScript, se define directamente en una clase anónima
customElements.define('my-switch', Switch);
