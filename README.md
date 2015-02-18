
This is a browserify transform module for Ractive's [single-file components](https://github.com/ractivejs/component-spec), based on ractify.

Example usage
-------------

`mycomponent.html`:

	<h1>Hello {{world}}!</h1>

	<script>
		component.exports = {
			data: {world: "World"},
		};
	</script>

`main.js`:

	var MyComponent = require("./mycomponent.html");
	var comp = new MyComponent();

Then run Browserify with the transform

    browserify -t ractive-xform main.js
    # Alternatively
    browserify -t [ ractive-xform --extension ract ] main.js

Differences from Ractify
------------------------

* Supports `<link rel="ractive">` for importing other components.
* Returns a Ractive class, instead of a table to pass to `Ractive.extend`. If you need to customize the table, do it by
  adding to or redefining `component.exports` in the component itself.
* The default extension is `.html`, not `.ract`, though it's still customizable with the `extension` option.

Possible improvements
---------------------

* Support CSS and/or JS transforms (Less, Sass, Typescript, etc.)
