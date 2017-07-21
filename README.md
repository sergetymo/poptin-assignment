# Poptup

Poptup is popup injection script and editor.

## Inject popup into any webpage
Insert `<script src="https://tranquil-reef-41640.herokuapp.com/poptup.js"></script>` just before closing `</body>` tag.

There's test pages with already injected script:
* [On the same domain that server is located](https://tranquil-reef-41640.herokuapp.com/test.html).
* [On diferrent domain](http://fm.atelier.co.ua/test.html).

## Edit popup that will be injected
Go to [Editor](https://tranquil-reef-41640.herokuapp.com/), move some elements, change color and press **Save**. **Reset** will undo all unsaved changes, **Defaults** will revert elemtnts placement and color to original.

## Files in this repository
* `.gitignore` specifies which patterns will be ignored by git.
* `.vimrc` describes vim settings for this project.
* `config-tpl.js` is a template for actual config file, with `%placeholders%` for changeable values.
* `config.js` is actual configuration file that determines how popup will look both in editor and when inserted into page.
* `editor.js` provides editor functionality.
* `index.html` is editor entry point.
* `jscolor.js` is a third-party color picker used in editor.
* `package.json` and `package-lock.json` are `npm` configuration files, they allow to install dependencies for server to function.
* `poptup.js` is script file that should be injected into webpage to show popup.
* `README.md` is this file.
* `server.js` provides server functionality: receive updates, store and serve config file, and the rest of needful static files.
* `test.html` is popup script injection test page.
