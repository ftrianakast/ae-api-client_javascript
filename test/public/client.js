var AentropicoExecutor = require('ae');
var dataAppExecutor = new AentropicoExecutor();
var dataAppId = "5vtw7";


dataAppExecutor.buildDataPackage({
    "tableA": "https://s3.amazonaws.com/aecantor/2ha2l.csv"
}, "5vtw7", function(dataPackage) {
    dataAppExecutor.runDataApp(dataPackage, "5vtw7", function(job) {
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