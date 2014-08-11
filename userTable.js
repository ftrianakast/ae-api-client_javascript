function UserTable(id, src) {
    this.id = id;
    this.src = src;
}

UserTable.prototype.getId = function() {
    return this.id;
};

UserTable.prototype.getSrc = function() {
    return this.src;
};

UserTable.prototype.setId = function(id) {
    this.id = id;
};

UserTable.prototype.setSrc = function(src) {
    this.src = src;
};

module.exports = UserTable;