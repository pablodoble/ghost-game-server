module.exports = function () {
    var currentWord = "olakease";

    function initGame() {
        return new Promise(function (resolve, reject) {
            resolve();
        });
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
        addNewLetter,
        getCurrentWord
    }
}