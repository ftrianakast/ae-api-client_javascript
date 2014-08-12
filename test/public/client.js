var AentropicoExecutor = require('ae');
var dataAppExecutor = new AentropicoExecutor();

dataAppExecutor.buildDataPackage({
    "tableA": "https://s3.amazonaws.com/aecantor/2ha2l.csv"
}, "s2luq", function(dataPackage) {
    dataAppExecutor.runDataApp(dataPackage, "s2luq", function(job) {
        dataAppExecutor.getResult(job, function(res) {
            console.log(res);
        });
    });
});