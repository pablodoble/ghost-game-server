module.exports = function () {
    var MIN_WORD_LENGTH = "4";
    var dictionary = {};

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

    function addWordToDictionary(word, partialDictionary) {
        var firstChar = word.charAt(0);
        if (!partialDictionary[firstChar]) {
            partialDictionary[firstChar] = {};
        }
        if (word.length > 1) {
            var wordWithoutFirstChar = word.substr(1, word.length - 1);
            addWordToDictionary(wordWithoutFirstChar, partialDictionary[firstChar]);
        }
    }

    function parseDictionaryData(data) {
        return new Promise(function (resolve, reject) {
            var words = data
                .split('\n')
                .map(function (word) {
                    return word.trim();
                })
                .filter(function (word) {
                    return word.length > MIN_WORD_LENGTH;
                });
            words.forEach(function (word) {
                addWordToDictionary(word, dictionary);
            });
            resolve();
        });
    }

    function loadDictionary() {
        return readDictionaryFile()
            .then(function (data) {
                return parseDictionaryData(data);
            });
    }


    return {
        dictionary,
        loadDictionary
    }
}()