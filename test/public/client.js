var AentropicoExecutor = require('ae');
var dataAppExecutor = new AentropicoExecutor();
var dataAppId = "rxghd";


dataAppExecutor.buildDataPackage({
    "tableA": "https://s3.amazonaws.com/aecantor/2ha2l.csv"
}, "rxghd", function(dataPackage) {
    dataAppExecutor.runDataApp(dataPackage, "rxghd", function(job) {
        var myInterval = setInterval(function() {
            dataAppExecutor.getResult(job, function(res) {
                if (res.length !== 0) {
                    console.log(res);
                    window.clearInterval(myInterval);
                }
            });
        }, 3000);
    });
});