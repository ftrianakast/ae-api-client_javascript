/**
 * @class  Resource
 * @param {String} id
 * @param {String} label
 * @param {String} format
 * @param {String} src
 * @param {String} description
 * @param {String} dataType
 */
function Resource(id, label, format, src, description, dataType, fields){
	this.id = id;
	this.label = label;
	this.format = format;
	this.src = src;
	this.description = description;
	this.dataType = dataType;
	this.fields = fields;
}


/**
 * @method getFieldByID
 * @param  {String} id
 * @return {Field}
 */
Resource.prototype.getFieldById = function(id){
	var found = false;
	var requiredField = null;
	for(var i=0; i<this.fields.length && !found; i++){
		var field = this.fields[i];
		if(field.id === id){
			found = true;
			requiredField = field;
		}
	}
	return requiredField;
};

Resource.prototype.getId = function(){
	return this.id;
};

Resource.prototype.getLabel = function(){
	return this.label;
};

Resource.prototype.getFormat = function(){
	return this.format;
};

Resource.prototype.getSrc = function(){
	return this.src;
};

Resource.prototype.getDescription = function(){
	return this.description;
};

Resource.prototype.getDataType = function(){
	return this.dataType;
};

Resource.prototype.getFields = function(){
	return this.fields;
};

Resource.prototype.setId = function(id){
	this.id = id;
};

Resource.prototype.setLabel = function(label){
	this.label = label;
};

Resource.prototype.setFormat = function(format){
	this.format = format;
};

Resource.prototype.setSrc = function(src){
	this.src = src;
};

Resource.prototype.setDescription = function(description){
	this.description = description;
};

Resource.prototype.setDataType = function(dataType){
	this.dataType = dataType;
};

Resource.prototype.setFields = function(fields){
	this.fields = fields;
};
// ------------------------------------------------------------------------------
// Exports
// ------------------------------------------------------------------------------
module.exports = Resource;