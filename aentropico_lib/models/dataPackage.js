/**
 * @class DataPackage
 * @param {String} id
 * @param {Object} resources
 */
function DataPackage(id, resources) {
    if (id) {
        this.id = id;
    }
    this.resources = resources;
}


/**
 * @method getResourceById
 * @param  {String} id
 * @return {Object} requiredResource
 */
DataPackage.prototype.getResourceById = function(id) {
    var requiredResource = null;
    var found = false;
    for (var i = 0; i < this.resources.length && !found; i++) {
        var resource = this.resources[i];
        if (resource.getId() === id) {
            found = true;
            requiredResource = resource;
        }
    }
    return requiredResource;
};


DataPackage.prototype.getId = function() {
    return this.id;
};

DataPackage.prototype.getResources = function() {
    return this.resources;
};

// ------------------------------------------------------------------------------
// Exports
// ------------------------------------------------------------------------------
module.exports = DataPackage;