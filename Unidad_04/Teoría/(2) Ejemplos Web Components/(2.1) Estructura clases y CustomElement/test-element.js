class TestElement extends HTMLElement {
	// Las propiedades de clase definidas arriba del todo no requieren this
	// Tampoco es válido emplear let, var o const
	x = 2;	
	
	// Se recomienda definir las propiedades privadas arriba. En caso contrario dan problemas
	// Las propiedades privadas aún no tiene soporte en algunos navegadores como Firefox
	#y = 3;

	constructor() {
		super();

		// Propiedad definida arriba y se modifica en el constructor
		this.x = 10;	
		
		// Se añade una propiedad directamente y sin definirla arriba
		this.prueba = 2;
 	}
	
	connectedCallback(){
		// Variable con el mismo nombre que una propiedad
		let prueba = 3;

		
		// IMPORTANTE. En este caso es una página sencilla y no hay problema, pero es recomendable no acceder 
		// a los atributos de HTML en el constructor. Por ello se accederá a prueba y status desde el constructor
		console.log("Atributo 'prueba' desde connectedCallback", this.prueba);
		console.log("Variable 'prueba' desde connectedCallback", prueba);
		
		// Prueba de acceso de atributos públicos y privados, x e y respectivamente
		console.log("Atributo 'x' desde connectedCallback", this.x);
		console.log("Atributo 'y' privado desde connectedCallback", this.#y);
				
		// Si queremos acceder directamente al atributo status como se hace con prueba, necesitamos getter y setter
		// No obstante, no hace falta crear los getter y setter y se puede acceder directamente con los métodos getAttribute y setAttribute
		// Los getter y setter servirían para tener un acceso directo con la referencia this.status
		console.log("Atributo 'status' desde connectedCallback", this.getAttribute("status"));
			
		this.#metodoPrivado("connectedCallback");	
		this.metodoPublico("connectedCallback");	
			
		// Contenido del componente web	
		this.innerHTML = "Prueba. Mirar consola";	 		
	}
	
	// Se llama cuando se modifica el valor de los atributos especificados en observedAttributes
	attributeChangedCallback(attr, oldVal, newVal) {
		console.log("Propiedad modificada", attr, oldVal, newVal);	
	}
	
	#metodoPrivado(lugar){
		console.log(`Llamando a método privado desde ${lugar}`);
	}
	
	// Cualquier método definido en un componente web se puede llamar desde fuera
	metodoPublico(lugar){
		console.log(`Llamando a método público desde ${lugar}`);
	}
	
	// Atributos reactivos cuando se invoca attributeChangedCallback
	static get observedAttributes() {
		return ['status'];
	}	

	// Getter y setter del atributo x que se define arriba. Nunca se llama porque es un atributo que ya existe y está declarado
	// Si no se define x arriba del todo esta definición fallaría
	get x() {
		return this.x;		
	}
	
	set x(newVal) {
		this.x = newVal;
	}
	
	// Getter y setter del atributo privado. Sirve para poder acceder desde fuera. En este caso si se llama
	get y() {
		return this.#y;		
	}
	
	set y(newVal) {
		this.#y = newVal;
	}
	
	// Getter para propiedades computadas. El setter no tiene sentido en este caso y solo cuando queremos encapsular otras propiedades como las privadas
	get xy() {
		return this.x + this.y;		
	}
	
	// Getter y setter que no se define arriba. En este caso no funciona, salvo que sea un atributo de HTML 
	get prueba() {
		return this.getAttribute('prueba');		
	}
	
	set prueba(newVal) {
		this.setAttribute('prueba', newVal);
	}
}

customElements.define('test-element', TestElement);
