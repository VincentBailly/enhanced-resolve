var resolve = require("../lib/resolve");
var should = require("should");
var path = require("path");

describe("errors", function() {
	var errors = [
		["invalid package.json", path.join(__dirname, "fixtures"), "invalidPackageJson", /SyntaxError: Unexpected end of input/],
		["missing module", path.join(__dirname, "fixtures"), "missingModule", /fixtures.node_modules.missingModule/]
	];
	errors.forEach(function(error) {
		it("async resolve with " + error[0], function(done) {
			resolve(error[1], error[2], function(err, filename) {
				should.not.exist(filename);
				should.exist(err);
				error[3].test(err + "").should.be.ok;
				done();
			});
		});
		it("sync resolve with " + error[0], function() {
			(function() {
				resolve.sync(error[1], error[2]);
			}).should.throw(error[3]);
		});
	});

});