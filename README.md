
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

Differences from Ractify
------------------------

* Supports `<link rel="ractive">`
* Returns a Ractive class, instead of a table to pass to `Ractive.extend`.
* The default extension is `.html`, not `.ract` (though it's still customizable with the `extension` option).

Possible TODOs
--------------

* Support CSS and/or JS transforms (Less, Sass, Typescript, etc.)
