var through = require('through')
var toSource = require('tosource')

var rcu = require('rcu/rcu.node')

rcu.init(require('ractive'))

module.exports = function(file, options) {
	var ext = options.extension || "html";

	if (!new RegExp('\\.' + ext + '$', 'i').test(file))
		return through();

	var source = "";
	var stream = through(
		function(buf) {
			source += buf;
		},
		function() {
			var component = rcu.parse(source);
			
			this.queue("var component = {};\ncomponent.exports = {};");
			
			if(component.script)
				this.queue(component.script);
			
			if(component.template) {
				this.queue("component.exports.template = ");
				this.queue(toSource(component.template));
				this.queue(";\n");
			}
			if(component.css) {
				this.queue("component.exports.css = ");
				this.queue(toSource(component.css));
				this.queue(";\n");
			}
			if(component.imports) {
				this.queue("component.exports.components = {\n");
				component.imports.forEach(function(imp) {
					this.queue(imp.name);
					this.queue(": require(");
					this.queue(toSource(imp.href));
					this.queue("),\n");
				}, this);
				this.queue("};\n")
			}
			
			this.queue("module.exports = require('ractive').extend(component.exports);");
			
			this.queue(null)
		}
	)
	return stream
};