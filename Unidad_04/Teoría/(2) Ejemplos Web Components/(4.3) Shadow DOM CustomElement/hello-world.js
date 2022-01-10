// En este ejemplo creamos el template del shadow DOM directamente como una variable de JavaScript
const templateHello = document.createElement('template');

templateHello.innerHTML = `
	<style>
		p {
			color: blue;
		}
	</style>
	<p>Hello world!</p>
`;

class HelloWorld extends HTMLElement {
	constructor() {
		super();
		
		// Accedemos al DOM del template y creamos un clon
		var elem = templateHello.content.cloneNode(true);

		// Creo el shadow root para todo el componente (en este ejemplo probamos el modo closed que obliga a guardar una referencia que creamos como propiedad)
		this._shadowRoot = this.attachShadow({mode: 'closed'});
		
		// Accedo al shadow root e incluyo el template 
		this._shadowRoot.appendChild(elem);
	}
}

customElements.define('hello-world', HelloWorld);