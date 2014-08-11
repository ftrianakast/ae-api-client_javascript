var AentropicoExecutor = require('ae');
var dataAppExecutor = new AentropicoExecutor();

dataAppExecutor.buildDataPackage({
    "tableA": "https://s3.amazonaws.com/aecantor/2ha2l.csv"
}, "s2luq", function(dataPackage) {
	var job = dataAppExecutor.runDataApp(dataPackage, "s2luq");
});