/**
 * @class Field
 * @param {String} id
 * @param {String} label
 * @param {String} description
 * @param {String} dataType
 */
function Field(id, label, description, dataType){
	this.id = id;
	this.label = label;
	this.description = description;
	this.dataType = dataType;
}

Field.prototype.getId = function(){
	return this.id;
};

Field.prototype.getLabel = function(){
	return this.description;
};

Field.prototype.getDescription = function(){
	return this.description;
};

Field.prototype.getDataType = function(){
	return this.dataType;
};

Field.prototype.setId = function(id){
	this.id = id;
};

Field.prototype.setLabel = function(label){
	this.label = label;
};

Field.prototype.setDescription = function(description){
	this.description = description;
};

Field.prototype.setDataType = function(dataType){
	this.dataType = dataType;
};

// ------------------------------------------------------------------------------
// Exports
// ------------------------------------------------------------------------------
module.exports = Field;