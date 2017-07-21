;(function(window){

  var nBody = window.document.getElementsByTagName('body')[0];

  /**
   * Determines wheter viewport meta tag is present on page.
   * It is necessary for responsive features to work
   * @param  {Object} win Window object to search meta tags in
   * @return {Boolean}
   */
  var hasViewportMeta = function(win) {
    var metaTags = win.document.getElementsByTagName('meta');
    for (var i = 0; i < metaTags.length; i++) {
      if (metaTags[i].name === 'viewport') return true;
    }
    return false;
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
   * Creates popup DOM elements tree, applies styles that came from server,
   * creates viewport meta tag if necessary, binds events to controls.
   * @return {Void|Boolean} Returns false on error
   */
  var init = function() {
    // Stop if config isn't loaded
    if (!config) {
      console.error('Can\'t fetch config file');
      return false;
    }

    // Create viewport meta tag if it's not in DOM
    if (!hasViewportMeta(window)) {
      var nMeta = n('meta', config.metaViewportAttrs);
      window.document.getElementsByTagName('head')[0].appendChild(nMeta);
    }

    // Create popup elements
    var nOverlay = n('div', null, config.overlayStyle);
    var nCircle = n('div', null, config.circleStyle);
    var nHeader = n('div', null, config.headerStyle, config.headerText);
    var nForm = n('form', config.formAttrs);
    var nInputWrapper = n('div', null, config.inputWrapperStyle);
    var nInput = n('input', config.inputAttrs, config.inputStyle);
    var nSubmitWrapper = n('div', null, config.submitWrapperStyle);
    var nSubmit = n('input', config.submitAttrs, config.submitStyle);
    var nFooter = n('div', null, config.footerStyle, config.footerText);
    var nCloser = n('div', null, config.closerStyle, '<span>&times;</span>');

    // Bind event to `Close` button
    nCloser.addEventListener('click', function() {
      nBody.style.position = 'initial';
      nOverlay.parentNode.removeChild(nOverlay);
    });

    // Handle window width changes
    var reduceElements = function() {
      setStyle(nHeader, config.headerReducedStyle);
      setStyle(nSubmit, config.submitReducedStyle);
      setStyle(nFooter, config.footerReducedStyle);
    }
    var enlargeElements = function() {
      setStyle(nHeader, config.headerStyle);
      setStyle(nSubmit, config.submitStyle);
      setStyle(nFooter, config.footerStyle);
    }
    var query = window.matchMedia(config.mediaQuery);
    if (query.matches) reduceElements();
    query.addListener(function(changed) {
      if (changed.matches) {
        reduceElements();
      } else {
        enlargeElements();
      }
    });

    // Build a tree of elements
    nInputWrapper.appendChild(nInput);
    nSubmitWrapper.appendChild(nSubmit);
    nForm.appendChild(nInputWrapper);
    nForm.appendChild(nSubmitWrapper);
    nCircle.appendChild(nHeader);
    nCircle.appendChild(nForm);
    nCircle.appendChild(nFooter);
    nCircle.appendChild(nCloser);
    nOverlay.appendChild(nCircle);

    // Put elements into DOM
    nBody.appendChild(nOverlay);

    // Prevent page scrolling when popup is present.
    // Scroll will be released on `Close` button press
    nBody.style.position = 'fixed';

  }

  fetchConfig();

})(window);
