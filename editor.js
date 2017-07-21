;(function(window){

  var picker;
  var nBody = window.document.getElementsByTagName('body')[0];
  var payload = {};

  /**
   * Style defaults
   * @type {Object}
   * Will be sent to server on `Defaults` button press
   */
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

  /**
   * Binds an event with callback to a node
   * @param  {HTMLElement}  node  Node to bind event to
   * @param  {String}       event Event type
   * @param  {Function}     fn    Callback function
   * @return {Void|Boolean}       Returns false on error
   */
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

  /**
   * Removes binded callback from a node
   * @param  {HTMLElement}  node  Node to unbind event from
   * @param  {String}       event Event type to unbind
   * @param  {Function}     fn    Callback function to remove
   * @return {Void|Boolean}       Returns false on error
   */
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

  /**
   * Applies a set of styles to a node
   * @param  {HTMLElement}  node  Node to apply styles to
   * @param  {Object}       style Styles collection to apply
   * @return {Void}
   */
  var setStyle = function(node, style) {
    for (var prop in style) {
      node.style[prop] = style[prop];
    }
  }

  /**
   * Creates a node with specified parameters
   * @param  {DOMString}  name      Node name
   * @param  {Object}     attrs     A set of attributes to apply to a node
   * @param  {Object}     style     A set of styles to apply to a node
   * @param  {String}     text      Either text or HTML to insert into node
   * @return {HTMLElement|Boolean}  Node with specified parameters of false on error
   */
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

  /**
   * Creates `script` tag that contains `config` variable.
   * Runs initialization function on success
   * @return {Void}
   */
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


  /**
   * Updates styles for a node with calculated percent values
   * @param  {HTMLElement} node Node to update styles from
   * @return {Void}
   */
  var updatePayload = function(node) {
    if(/px/i.test(node.style.top)) {
      payload[node.id].top = (parseInt(node.style.top) / (496 / 100)) + '%';
    }
    if(/px/i.test(node.style.left)) {
      payload[node.id].left = (parseInt(node.style.left) / (496 / 100)) + '%';
    }
  }

  /**
   * Sends styles to server via AJAX and reloads page to apply new styles
   * @return {Void}
   */
  var sendPayload = function() {
    var request = new XMLHttpRequest();
    request.open("POST", "https://tranquil-reef-41640.herokuapp.com/");
    // request.open("POST", "http://localhost:3000/");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(payload));
    request.onreadystatechange = function() {
      if(request.readyState == XMLHttpRequest.DONE && request.status == 200) {
        window.location.reload();
      }
    }
  }

  /**
   * Sends default styles to server
   * @return {Void}
   */
  var sendDefaultPayload = function() {
    payload = defaultPayload;
    sendPayload();
  }

  /**
   * Applies color from color picker to the circle.
   * Also updates payload with specified color.
   * @return {Void}
   */
  var changeColor = function() {
    var color = '#' + picker;
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      window.document.getElementById('circle').style.backgroundColor = color;
      payload.color = color;
    }
  }

  /**
   * Enables drag and drop for an element
   * @type {Object}
   */
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

  /**
   * Creates popup DOM elements tree, applies styles that came from server,
   * initializes draggeble elements, binds events to controls.
   * @return {Void|Boolean} Returns false on error
   */
  var init = function() {
    // Stop if config isn't loaded
    if (!config) {
      console.error('Can\'t fetch config file');
      return false;
    }

    // Erase old DOM if it exists
    if (window.document.getElementById('overlay')) {
      var nOldOverlay = window.document.getElementById('overlay');
      nOldOverlay.parentNode.removeChild(nOldOverlay);
    }

    // Create popup elements
    var nOverlay        = n('div', {id: 'overlay'}, config.overlayStyle);
    var nCircle         = n('div', {id: 'circle'}, config.circleStyle);
    var nHeader         = n('div', null, config.headerStyle, config.headerText);
    var nForm           = n('form', config.formAttrs);
    var nInputWrapper   = n('div', null, config.inputWrapperStyle);
    var nInput          = n('input', config.inputAttrs, config.inputStyle);
    var nSubmitWrapper  = n('div', null, config.submitWrapperStyle);
    var nSubmit         = n('input', config.submitAttrs, config.submitStyle);
    var nFooter         = n('div', null, config.footerStyle, config.footerText);

    // Identify elements that supposed to be draggable
    // Necessary for `updatePayload()` to work properly
    nHeader.id        = 'header';
    nInputWrapper.id  = 'input';
    nSubmitWrapper.id = 'submit';
    nFooter.id        = 'footer';

    // Prevent form submitting on nSubmit click - we just want to drag it
    nSubmit.onclick = function() { return false; };
    nForm.onsubmit = function() { return false; }

    // Build a tree of elements
    nInputWrapper.appendChild(nInput);
    nSubmitWrapper.appendChild(nSubmit);
    nForm.appendChild(nInputWrapper);
    nForm.appendChild(nSubmitWrapper);
    nCircle.appendChild(nHeader);
    nCircle.appendChild(nForm);
    nCircle.appendChild(nFooter);
    nOverlay.appendChild(nCircle)

    // Put elements into DOM
    nBody.appendChild(nOverlay);

    // Initialize draggable elements
    Draggable.init(nHeader);
    Draggable.init(nInputWrapper);
    Draggable.init(nSubmitWrapper);
    Draggable.init(nFooter);

    // Update payload with server values.
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

    // Set value for color input
    var nColor = window.document.getElementById('color');
    nColor.value = config.circleStyle.backgroundColor;

    // Either initialize color picker in color input or,
    // if it's already present (happens on `Reset`),
    // just update its color value to match server's one.
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

})(window);
