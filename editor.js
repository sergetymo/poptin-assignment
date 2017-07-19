;(function(window){

  var picker;

  var defaultPayload = {
    header: {
      top: '18%',
      left: '10%'
    },
    input: {
      top: '38%',
      left: '14.5%'
    },
    submit: {
      top: '55%',
      left: '14.5%'
    },
    footer: {
      top: '74%',
      left: '10%'
    },
    color: "#df795e"
  }

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
      src: 'https://tranquil-reef-41640.herokuapp.com/config.js',
      // src: 'http://localhost:3000/config.js',
    });
    nScript.onload = function() {
      init();
    }
    nBody.appendChild(nScript);
  }

  var payload = {};

  var updatePayload = function(node) {
    if(/px/i.test(node.style.top)) {
      payload[node.id].top = (parseInt(node.style.top) / (496 / 100)) + '%';
    }
    if(/px/i.test(node.style.left)) {
      payload[node.id].left = (parseInt(node.style.left) / (496 / 100)) + '%';
    }
  }

  var sendPayload = function() {
    var request = new XMLHttpRequest();
    request.open("POST", "https://tranquil-reef-41640.herokuapp.com/");
    // request.open("POST", "http://localhost:3000/");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(payload));
    setTimeout(function(){
      window.location.reload();
    }, 100);
  }

  var sendDefaultPayload = function() {
    payload = defaultPayload;
    sendPayload();
  }

  var changeColor = function(event) {
    var color = '#' + picker;
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      window.document.getElementById('circle').style.backgroundColor = color;
      payload.color = color;
    }
  }

  var init = function() {
    if (!config) {
      console.error('Can\'t fetch config file');
      return false;
    }

    if (window.document.getElementById('overlay')) {
      var nOldOverlay = window.document.getElementById('overlay');
      nOldOverlay.parentNode.removeChild(nOldOverlay);
    }

    var nOverlay = n('div', {id: 'overlay'}, config.overlayStyle);
    var nCircle = n('div', {id: 'circle'}, config.circleStyle);
    var nHeader = n('div', null, config.headerStyle, config.headerText);
    var nForm = n('form', config.formAttrs);
    var nInputWrapper = n('div', null, config.inputWrapperStyle);
    var nInput = n('input', config.inputAttrs, config.inputStyle);
    var nSubmitWrapper = n('div', null, config.submitWrapperStyle);
    var nSubmit = n('input', config.submitAttrs, config.submitStyle);
    var nFooter = n('div', null, config.footerStyle, config.footerText);

    nHeader.id = 'header';
    nInputWrapper.id = 'input';
    nSubmitWrapper.id = 'submit';
    nFooter.id = 'footer';

    nSubmit.onclick = function() {
      return false;
    };
    nForm.onsubmit = function() {
      return false;
    }

    nInputWrapper.appendChild(nInput);
    nSubmitWrapper.appendChild(nSubmit);
    nForm.appendChild(nInputWrapper);
    nForm.appendChild(nSubmitWrapper);
    nCircle.appendChild(nHeader);
    nCircle.appendChild(nForm);
    nCircle.appendChild(nFooter);
    nOverlay.appendChild(nCircle)

    nBody.appendChild(nOverlay);

    Draggable.init(nHeader);
    Draggable.init(nInputWrapper);
    Draggable.init(nSubmitWrapper);
    Draggable.init(nFooter);

    payload.header = {
      top: nHeader.style.top,
      left: nHeader.style.left
    }
    payload.input = {
      top: nInputWrapper.style.top,
      left: nInputWrapper.style.left
    }
    payload.submit = {
      top: nSubmitWrapper.style.top,
      left: nSubmitWrapper.style.left
    }
    payload.footer = {
      top: nFooter.style.top,
      left: nFooter.style.left
    }
    payload.color = nCircle.style.backgroundColor;

    var nColor = window.document.getElementById('color');
    nColor.value = config.circleStyle.backgroundColor;

    if(!nColor._jscLinkedInstance) {
      picker = new jscolor(nColor, {
        hash: true,
        uppercase: false
      });
      on(nColor, 'change', changeColor);
    } else {
      nColor._jscLinkedInstance.fromString(nColor.value);
    }
  }

  fetchConfig();
  on(window.document.getElementById('reset'), 'click', init);
  on(window.document.getElementById('save'), 'click', sendPayload);
  on(window.document.getElementById('defaults'), 'click', sendDefaultPayload);
  // on(window.document.getElementById('color'), 'change', changeColor);

})(window);
