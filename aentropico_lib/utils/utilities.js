/**
 * @method  generateUniqueId
 * @return {String} id
 */
module.exports.generateUniqueId = function() {
    return ("00000" + (Math.random() * Math.pow(36, 5) << 0).toString(36)).slice(-5);
};

/**
 * @method simpleClone
 */
module.exports.simpleClone = function(object){
	return JSON.parse(JSON.stringify(object));
};