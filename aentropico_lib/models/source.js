/**
 * @class  Source
 * @param {String} name
 * @param {String} url
 * @param {String} kind
 */
function Source(name, url, kind) {
    this.name = name;
    this.url = url;
    this.kind = kind;
}

Source.prototype.getName = function() {
    return this.name;
};

Source.prototype.getUrl = function() {
    return this.url;
};

Source.prototype.getKind = function() {
    return this.kind;
};

Source.prototype.setName = function(name) {
    this.name = name;
};

Source.prototype.setUrl = function(url) {
    this.url = url;
};

Source.prototype.setKind = function(kind) {
    this.kind = kind;
};

// ------------------------------------------------------------------------------
// Exports
// ------------------------------------------------------------------------------
module.exports = Source;