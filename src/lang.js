class Lang {
  constructor() {
    this.name = "";
		this.content = "";
		this.parent = null;
		this.element = null;
	}

  show() {
		if(this.parent === null) {
		  return ;
		}

		if(this.element !== null) {
		  this.parent.appendChild(this.element);
		} else {
		  let el = document.createElement("div");
		  el.innerHTML = this.content;
		  this.element = el;
		  this.parent.appendChild(this.element);
		}
	}
  
  hide() {
		if(this.element !== null && this.parent !== null) {
		  this.parent.removeChild(this.element);
		}
	}
}


module.exports = Lang;
