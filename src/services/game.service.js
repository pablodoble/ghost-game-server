module.exports = function () {
    var currentWord = "olakease";
    var dictionaryService = require('./dictionary.service');
    var objectUtilsService = require('./object-utils.service');

    function initGame() {
        return dictionaryService.loadDictionary();
    }

    function checkGameIsInitialized(){
        return !objectUtilsService.objectIsEmpty(dictionaryService.dictionary);
    }

    function addNewLetter(letter) {
        return new Promise(function (resolve, reject) {
            if (checkGameIsInitialized()) {
                resolve();
            } else {
                reject("Game has to be initialized before any call");
            }
        });
    };

    function getCurrentWord() {
        return new Promise(function (resolve, reject) {
             if (checkGameIsInitialized()) {
                resolve(currentWord);
            } else {
                reject("Game has to be initialized before any call");
            }
        });
    };

    return {
        initGame,
        addNewLetter,
        getCurrentWord
    }
}()