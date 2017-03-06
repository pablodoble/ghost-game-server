module.exports = function () {
    var currentWord = "olakease";
    var dictionaryService = require('./dictionary.service');

    function initGame() {
        return dictionaryService.loadDictionary();
    }

    function addNewLetter(letter) {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };

    function getCurrentWord() {
        return new Promise(function (resolve, reject) {
            resolve(currentWord);
        });
    };

    return {
        initGame,
        addNewLetter,
        getCurrentWord
    }
}()