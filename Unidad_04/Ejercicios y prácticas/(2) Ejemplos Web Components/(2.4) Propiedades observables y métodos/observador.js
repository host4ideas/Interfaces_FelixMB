class Observador extends HTMLElement {
  constructor() {
    super();
  }

  // Método auxiliar para modificar dinámicamente la propiedad 'cambio'
  modificar(valorNuevo) {
    this.cambio = valorNuevo;
  }

  // Lo usamos para la visualización inicial
  connectedCallback() {
    this.textContent = this.cambio || "Esto es un componente web. Modifica el atributo para observar como cambia";
  }

  // Se llama cuando se modifica el valor de los atributos especificados en observedAttributes
  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr == 'cambio' && oldVal != newVal) {
      this.textContent = `Valor antiguo de 'cambio': ${oldVal}, Valor nuevo de 'cambio': ${newVal}`;
    }
  }

  // Atributos reactivos cuando se invoca attributeChangedCallback
  static get observedAttributes() {
    return ['cambio'];
  }

  // Getter y setter que se accede para modificar el atributo 'cambio'
  get cambio() {
    return this.getAttribute('cambio');
  }

  set cambio(newVal) {
    this.setAttribute('cambio', newVal);
  }
}

window.customElements.define('observable-element', Observador);