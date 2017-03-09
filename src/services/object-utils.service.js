module.exports = function () {
    function objectIsEmpty(object) {
        return Object.keys(object).length === 0 && object.constructor === Object
    }
    
    return {
        objectIsEmpty
    }
}();