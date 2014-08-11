var DataPackage = require('./../models/dataPackage');
var Field = require('./../models/field');
var Source = require('./../models/source');
var Resource = require('./../models/resource');


/**
 * @method deserializeDataPackage
 * @param  {Object} dataPackage
 * @return {DataPackage}
 */
module.exports.deserializeDataPackage = function(dataPackage){
	var realResources = [];
	for(var i=0; i<dataPackage.resources.length; i++){
		var resource = dataPackage.resources[i];
		var realFields = [];
		for(var j=0; j<resource.schema.fields.length; j++){
			var field = resource.schema.fields[j];
			var realField = new Field(field.columnId, field.label, field.description, field.dataType);
			realFields.push(realField);
		}
		var realResource = new Resource(resource.tableId, resource.label, resource.format, resource.src, resource.description, resource.dataType, realFields);
		realResources.push(realResource);
	}
	var realDataPackage = new DataPackage(dataPackage.id, realResources);
	return realDataPackage;
};