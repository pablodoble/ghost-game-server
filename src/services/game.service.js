module.exports = function () {
    var currentWord = "olakease";
    var dictionaryService = require('./dictionary.service');
    var objectUtilsService = require('./object-utils.service');

    function initGame() {
        return dictionaryService.loadDictionary();
    }

    function checkGameIsInitialized(){
        return objectUtilsService.objectIsEmpty(dictionaryService.dictionary);
    }

    function addNewLetter(letter) {
        return new Promise(function (resolve, reject) {
            if (checkGameIsInitialized()) {
                reject();
            } else {
                resolve();
            }
        });
    };

    function getCurrentWord() {
        return new Promise(function (resolve, reject) {
             if (checkGameIsInitialized()) {
                reject();
            } else {
                resolve(currentWord);
            }
        });
    };

    return {
        initGame,
        addNewLetter,
        getCurrentWord
    }
}()