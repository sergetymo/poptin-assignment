;(function(window){

  var on = function(node, event, fn) {
    if (node.addEventListener) {
      node.addEventListener(event, fn, false);
    } else if (node.attachEvent) {
  		node.attachEvent('on' + event, fn);
    } else {
      console.error('Can\'t start event listener');
      return false;
    }
  }

  var off = function(node, event, fn) {
    if (node.removeEventListener) {
      node.removeEventListener(event, fn, false);
    } else if (node.detachEvent) {
  		node.detachEvent('on' + event, fn);
    } else {
      console.error('Can\'t stop event listener');
      return false;
    }
  }

  var Draggable = {
    handleHTML: '<a href="javascript:;" class="handle"></a>',
  	keySpeed: 1,
  	initialMouseX: undefined,
  	initialMouseY: undefined,
  	startX: undefined,
  	startY: undefined,
  	dXKeys: undefined,
  	dYKeys: undefined,
  	draggedObject: undefined,
    init: function (node) {
  		node.onmousedown = Draggable.startDragMouse;
  		node.innerHTML += Draggable.handleHTML;
  		var links = node.getElementsByTagName('a');
  		var handle = links[links.length-1];
  		handle.relatedNode = node;
  		handle.onclick = Draggable.startDragKeys;
      node.className += ' draggable';
  	},
    startDragMouse: function(e) {
  		Draggable.startDrag(this);
  		var evt = e || window.event;
  		Draggable.initialMouseX = evt.clientX;
  		Draggable.initialMouseY = evt.clientY;
  		on(document, 'mousemove', Draggable.dragMouse);
  		on(document, 'mouseup', Draggable.releaseElement);
  		return false;
  	},
    startDragKeys: function () {
  		Draggable.startDrag(this.relatedNode);
  		Draggable.dXKeys = Draggable.dYKeys = 0;
  		on(document, 'keydown', Draggable.dragKeys);
  		on(document, 'keypress', Draggable.switchKeyEvents);
  		this.blur();
  		return false;
  	},
    startDrag: function (obj) {
  		if (Draggable.draggedObject) {
        Draggable.releaseElement();
      }
  		Draggable.startX = obj.offsetLeft;
  		Draggable.startY = obj.offsetTop;
  		Draggable.draggedObject = obj;
  		obj.className += ' dragged';
  	},
    dragMouse: function (e) {
  		var evt = e || window.event;
  		var dX = evt.clientX - Draggable.initialMouseX;
  		var dY = evt.clientY - Draggable.initialMouseY;
  		Draggable.setPosition(dX,dY);
  		return false;
  	},
    dragKeys: function(e) {
  		var evt = e || window.event;
  		var key = evt.keyCode;
  		switch (key) {
  			case 37:	// left
  			case 63234:
  				Draggable.dXKeys -= Draggable.keySpeed;
  				break;
  			case 38:	// up
  			case 63232:
  				Draggable.dYKeys -= Draggable.keySpeed;
  				break;
  			case 39:	// right
  			case 63235:
  				Draggable.dXKeys += Draggable.keySpeed;
  				break;
  			case 40:	// down
  			case 63233:
  				Draggable.dYKeys += Draggable.keySpeed;
  				break;
  			case 13: 	// enter
  			case 27: 	// escape
  				Draggable.releaseElement();
  				return false;
  			default:
  				return true;
  		}
  		Draggable.setPosition(Draggable.dXKeys, Draggable.dYKeys);
  		if (evt.preventDefault) {
  			evt.preventDefault();
      }
  		return false;
  	},
    setPosition: function (dx,dy) {
  		Draggable.draggedObject.style.left = Draggable.startX + dx + 'px';
  		Draggable.draggedObject.style.top = Draggable.startY + dy + 'px';
  	},
    switchKeyEvents: function () {
  		off(document, 'keydown', Draggable.dragKeys);
  		off(document, 'keypress', Draggable.switchKeyEvents);
  		on(document, 'keypress', Draggable.dragKeys);
  	},
    releaseElement: function() {
  		off(document, 'mousemove', Draggable.dragMouse);
  		off(document, 'mouseup', Draggable.releaseElement);
  		off(document, 'keypress', Draggable.dragKeys);
  		off(document, 'keypress', Draggable.switchKeyEvents);
  		off(document, 'keydown', Draggable.dragKeys);
  		Draggable.draggedObject.className = Draggable.draggedObject.className.replace(/dragged/,'');
      updatePayload(Draggable.draggedObject);
  		Draggable.draggedObject = null;
  	}
  }

  var setStyle = function(node, style) {
    for (var prop in style) {
      node.style[prop] = style[prop];
    }
  }

  var n = function(name, attrs, style, text) {
    if (!name) return false;
    var node = window.document.createElement(name);
    if (attrs) {
      for (var attr in attrs) {
        node.setAttribute(attr, attrs[attr]);
      }
    }
    if (style) {
      setStyle(node, style);
    }
    if (text) {
      if (/<[a-z][\s\S]*>/i.test(text)) {
        node.innerHTML = text;
      } else {
        var textNode = window.document.createTextNode(text);
        node.appendChild(textNode);
      }
    }
    return node;
  }

  var nBody = window.document.getElementsByTagName('body')[0];

  var fetchConfig = function() {
    var nScript = n('script', {
      type: 'text/javascript',
      src: 'https://tranquil-reef-41640.herokuapp.com:3000/config.js',
    });
    nScript.onload = function() {
      init();
    }
    nBody.appendChild(nScript);
  }

  var payload = {};

  var updatePayload = function(node) {
    console.log(node);
    if(/px/i.test(node.style.top)) {
      payload[node.id].top = (parseInt(node.style.top) / (496 / 100)) + '%';
    }
    if(/px/i.test(node.style.left)) {
      payload[node.id].left = (parseInt(node.style.left) / (496 / 100)) + '%';
    }
    console.log(payload[node.id]);
  }

  var sendPayload = function() {
    console.log(payload);
    var request = new XMLHttpRequest();
    request.open("POST", "https://tranquil-reef-41640.herokuapp.com:3000/");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(payload));
    setTimeout(function(){
      window.location.reload();
    }, 100);
  }

  var init = function() {
    if (!config) {
      console.error('Can\'t fetch config file');
      return false;
    }

    if (nOverlay) {
      nOverlay.parentNode.removeChild(nOverlay);
    }

    var nOverlay = n('div', null, config.overlayStyle);
    var nCircle = n('div', null, config.circleStyle);
    var nHeader = n('div', null, config.headerStyle, config.headerText);
    var nForm = n('form', config.formAttrs);
    var nInput = n('input', config.inputAttrs, config.inputStyle);
    var nSubmit = n('input', config.submitAttrs, config.submitStyle);
    var nFooter = n('div', null, config.footerStyle, config.footerText);

    nHeader.id = 'header';
    nInput.id = 'input';
    nSubmit.id = 'submit';
    nFooter.id = 'footer';

    nSubmit.onclick = function() {
      return false;
    };

    nForm.appendChild(nInput);
    nForm.appendChild(nSubmit);
    nCircle.appendChild(nHeader);
    nCircle.appendChild(nForm);
    nCircle.appendChild(nFooter);
    nOverlay.appendChild(nCircle)

    nBody.appendChild(nOverlay);

    Draggable.init(nHeader);
    Draggable.init(nInput);
    Draggable.init(nSubmit);
    Draggable.init(nFooter);

    payload.header = {
      top: nHeader.style.top,
      left: nHeader.style.left
    }
    payload.input = {
      top: nInput.style.top,
      left: nInput.style.left
    }
    payload.submit = {
      top: nSubmit.style.top,
      left: nSubmit.style.left
    }
    payload.footer = {
      top: nFooter.style.top,
      left: nFooter.style.left
    }
  }

  fetchConfig();
  on(window.document.getElementById('reset'), 'click', init);
  on(window.document.getElementById('save'), 'click', sendPayload);

})(window);
