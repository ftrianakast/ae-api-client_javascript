var Superagent = require('superagent');
var Constants = require('./ae_constants');

function DataAppExecutor() {

}

DataAppExecutor.prototype.buildDataPackage = function(correspondences, dataAppId) {
    Superagent
        .get(Constants.AENTROPICO_SERVER_URL + '/' + Constants.GET_DATA_PACKAGE__URI)
        .withCredentials()
        .query({
            dataappid: dataAppId
        })
        .end(function(res) {
            console.log(res.status);
        });
};

DataAppExecutor.prototype.runDataApp = function(correspondences) {
	
};

module.exports = DataAppExecutor;