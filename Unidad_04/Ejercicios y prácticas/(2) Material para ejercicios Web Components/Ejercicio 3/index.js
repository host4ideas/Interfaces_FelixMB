const templateMydetails = document.createElement('template');

templateMydetails.innerHTML = `
  <style>
	/* Estilos que se aplican a los elementos en un slot que son span */
	::slotted(span){
		color: orange;
	}
	button {
		background-color: blue;
	}
  </style>
  
  <details>
	<summary>
		<slot name="my-title">NECESITA NOMBRE</slot>
		<slot name="my-descripcion"> - NECESITA DESCRIPCION - </slot>
	</summary>
	<button>Atributos</button>
	<slot name="my-text">Ninguno</slot>
  </details>
`;

// En este caso creamos el Custom Element con una clase anónima
customElements.define('my-details',
	class extends HTMLElement {
		constructor() {
			super();

			this._shadowRoot = this.attachShadow({ mode: 'closed' });
			this._shadowRoot.appendChild(templateMydetails.content.cloneNode(true));
		}
	}
)