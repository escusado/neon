'use strict';

class MiniWidget extends includes(MiniCustomEventSupport, MiniNodeSupport) {

  constructor (conf) {
    super();

    let _defaults = {
      active : false,
      disabled : false,
      __destroyed : false
    };

    Object.assign(_defaults, conf);
    Object.assign(this, _defaults);

    if(!this.element){
      this.element = this._getElement();
      console.log('[[el]]', this.element);
    }

    if(this.class){
      for(let className of this.class.split(' ')) {
        this.element.classList.add(className);
      }
    }
  }

  _getHTML () {
    return `<div></div>`;
  }

  _getElement () {
    let elementHolder = document.createElement('div');
    elementHolder.innerHTML = this._getHTML().trim();
    if(elementHolder.childNodes.length > 1){
      return elementHolder.childNodes;
    }
    return elementHolder.firstChild;
  }

  render (element, beforeElement) {
    if (this.__destroyed === true) {
      console.warn('calling on destroyed object');
    }
    this.dispatch('beforeRender', {
      element : element,
      beforeElement : beforeElement
    });
    this._render(element, beforeElement);
    this.dispatch('render');
    return this;
  }

  _render (element, beforeElement) {
    if (beforeElement) {
      element.insertBefore(this.element, beforeElement);
    } else {
      element.appendChild(this.element);
    }
    return this;
  }

  destroy () {
    if (this.__destroyed === true) {
        console.warn('calling on destroyed object');
    }
    this.dispatch('beforeDestroy');
    this._destroy();
    this.dispatch('destroy');
    return null;
  }

  _destroy () {
    this.destroyElement();
    this.destroyChildren();
    if (this.parent) {
        this.parent.removeChild(this);
    }
    console.log('bef',this);
    this.unbindAll();
    console.log('af',this);

    this.__destroyed = true;
  }

  destroyElement () {
    this.dispatch('beforeDestroyElement');
    this._destroyElement();
    this.dispatch('destroyElement');
  }

  _destroyElement () {
    if (this.element) {
      if (this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
    }
    this.element = null;
    return this;
  }

}
