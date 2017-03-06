module.exports = function () {
    var dictionary = [];

    function readDictionaryFile() {
        var fs = require('fs');
        return new Promise(function (resolve, reject) {
            fs.readFile('src/assets/word.lst', function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data.toString());
            });
        });
    }

    function loadDictionary() {
        return readDictionaryFile();
    }


    return {
        loadDictionary
    }
}()