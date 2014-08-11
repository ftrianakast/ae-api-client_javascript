// ------------------------------------------------------------------------------
// External
// ------------------------------------------------------------------------------
var Async = require('async');
var Superagent = require('superagent');

// ------------------------------------------------------------------------------
// Internal
// ------------------------------------------------------------------------------
var Constants = require('./aentropico_lib/utils/aeConstants');
var Deserializer = require('./aentropico_lib/serializers/deserializer');
var Serializer = require('./aentropico_lib/serializers/serializer');
var UserTable = require('./aentropico_lib/models/userTable');
var Source = require('./aentropico_lib/models/source');
var Resource = require('./aentropico_lib/models/resource');
var DataPackage = require('./aentropico_lib/models/dataPackage');
var Utilities = require('./aentropico_lib/utils/utilities');

/**
 * @class  DataAppExecutor
 */
function DataAppExecutor() {

}


/**
 * @method runDataApp
 * @param  {Array}  correspondences
 * @param  {String} dataAppId
 */

DataAppExecutor.prototype.buildDataPackage = function(correspondences, dataAppId, cb) {
    Superagent
        .get(Constants.AENTROPICO_SERVER_URL + '/' + Constants.GET_DATA_PACKAGE__URI)
        .query({
            dataappid: dataAppId
        })
        .end(function(res) {
            var dataPackage = Deserializer.deserializeDataPackage(res.body);
            var userTables = buildUserTables(correspondences);
            validateUserTables(userTables, dataPackage, validationExecuted);

            function validationExecuted(valid) {
                if (valid) {
                    var clientDataPackage = buildClientDataPackage(userTables, dataPackage);
                    cb(clientDataPackage);
                } else {
                    throw new Exception("The tables that you are trying to upload not are valid.");
                }
            }
        });
};


/**
 * @method runDataApp
 * @param  {Object} clientDataPackage
 * @param  {String} dataAppId
 */
DataAppExecutor.prototype.runDataApp = function(clientDataPackage, dataAppId) {
    var realClientDataPackage = Serializer.serializeDataPackage(clientDataPackage);
    Superagent
        .post(Constants.AENTROPICO_SERVER_URL + '/' + Constants.RUN_DATA_APP_URI + '/' + dataAppId)
        .send(realClientDataPackage)
        .end(function(res) {
            console.log(res.body);
        });
};

/**
 * @method buildUserTables
 * @param  {Array} correspondences
 * @return {Array} userTables the set of userTables
 */
function buildUserTables(correspondences) {
    var userTables = [];
    for (var property in correspondences) {
        var userTable = new UserTable(property, correspondences[property]);
        userTables.push(userTable);
    }
    return userTables;
}

/**
 * @method validateUsertables
 * @param  {Array<UserTable>} userTables
 * @param  {DataPackage}      dataAppDataPackage
 * @param  {Function}         cb
 */
function validateUserTables(userTables, dataAppDataPackage, cb) {
    var response = false;
    var resourceResponses = [];
    if (userTables.length !== dataAppDataPackage.getResources().length) {
        return response;
    }

    Async.each(userTables, validateUserTable, finishValidation);

    function validateUserTable(userTable, cb) {
        var resourceResponse = false;
        var src = userTable.getSrc();
        var XHR = new XMLHttpRequest();
        XHR.open("GET", src, true);
        XHR.send();
        XHR.onload = function() {
            var resource = dataAppDataPackage.getResourceById(userTable.getId());
            var firstLine = XHR.responseText.slice(0, XHR.responseText.indexOf("\n"));
            var columnNames = firstLine.split(',');
            var fieldsAfterDiscrimination = [];

            for (var columnName in columnNames) {
                var realField = resource.getFieldById(columnName);
                if (realField !== null) {
                    var stopFieldFound = false;
                    for (var fieldAfterDiscrimination in fieldsAfterDiscrimination) {
                        if (fieldAfterDiscrimination === columnName) {
                            stopFieldFound = true;
                        }
                    }
                    if (!stopFieldFound) {
                        fieldAfterDiscrimination.push(columnName);
                    }
                }
            }

            if (fieldsAfterDiscrimination.length !== resource.getFields.length) {
                resourceResponse = false;
            } else {
                resourceResponse = true;
            }
            resourceResponses.push(resourceResponse);
            cb(null);
        };
    }


    function finishValidation(err) {
        if (!err) {
            var counter = 0;
            for (var i = 0; i < resourceResponses.length; i++) {
                var resourceResponse = resourceResponses[i];
                if (resourceResponse === true) {
                    counter++;
                }
            }
            if (counter === dataAppDataPackage.getResources().length) {
                response = true;
            } else {
                response = false;
            }
            cb(response);
        }
    }
}



/**
 * @method  buildClientDataPackage
 * @param  {Array}  userTables
 * @param  {Object} dataPackage
 */
function buildClientDataPackage(userTables, dataPackage) {
    var clientDataPackage = null;
    var clientResources = [];

    for (var i = 0; i < userTables.length; i++) {
        var userTable = userTables[i];
        var resource = dataPackage.getResourceById(userTable.getId());
        var clientSource = new Source(Constants.PUBLIC, userTable.getSrc(), Constants.PUBLIC);
        var clientResource = new Resource(resource.getId(), resource.getLabel(), resource.getFormat(), clientSource, resource.getDescription(), resource.getDataType(), resource.getFields());
        clientResources.push(clientResource);
    }

    var clientDataPackageId = Utilities.generateUniqueId();
    clientDataPackage = new DataPackage(null, clientResources);
    return clientDataPackage;
}


// ------------------------------------------------------------------------------
// Exports
// ------------------------------------------------------------------------------
module.exports = DataAppExecutor;