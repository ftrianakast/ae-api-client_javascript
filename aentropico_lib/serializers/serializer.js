// ------------------------------------------------------------------------------
// Internal
// ------------------------------------------------------------------------------
var Utilities = require('./../utils/utilities');


/**
 * @method
 * @param  {DataPackage} dataPackage
 * @return {Object} realDataPackage
 */
module.exports.serializeDataPackage = function(dataPackageP) {
    var dataPackage = Utilities.simpleClone(dataPackageP);
    var realDataPackage = Utilities.simpleClone(dataPackage);
    var realResources = [];

    for (var i = 0; i < dataPackageP.getResources().length; i++) {
        var resource = dataPackageP.getResources()[i];
        var realResource = Utilities.simpleClone(resource);
        realResource.tableId = realResource.id;
        delete realResource.id;
        delete realResource.dataType;
        realResource.schema = {};
        realResource.schema.fields = resource.getFields();

        for (var j = 0; j < realResource.schema.fields.length; j++) {
            var field = realResource.schema.fields[j];
            field.columnId = field.id;
            delete field.id;
        }

        delete realResource.fields;
        realResources.push(realResource);
    }

    realDataPackage.resources = realResources;
    return realDataPackage;
};