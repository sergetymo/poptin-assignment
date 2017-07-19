;(function(window){

  var hasViewportMeta = function(win) {
    var metaTags = win.document.getElementsByTagName('meta');
    for (var i = 0; i < metaTags.length; i++) {
      if (metaTags[i].name === 'viewport') return true;
    }
    return false;
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

  var init = function() {
    if (!config) {
      console.error('Can\'t fetch config file');
      return false;
    }

    if (!hasViewportMeta(window)) {
      var nMeta = n('meta', config.metaViewportAttrs);
      window.document.getElementsByTagName('head')[0].appendChild(nMeta);
    }

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

    nCloser.addEventListener('click', function() {
      nBody.style.position = 'initial';
      nOverlay.parentNode.removeChild(nOverlay);
    });

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

    nInputWrapper.appendChild(nInput);
    nSubmitWrapper.appendChild(nSubmit);
    nForm.appendChild(nInputWrapper);
    nForm.appendChild(nSubmitWrapper);
    nCircle.appendChild(nHeader);
    nCircle.appendChild(nForm);
    nCircle.appendChild(nFooter);
    nCircle.appendChild(nCloser);
    nOverlay.appendChild(nCircle);
    nBody.appendChild(nOverlay);

    nBody.style.position = 'fixed';

  }

  fetchConfig();

})(window);
