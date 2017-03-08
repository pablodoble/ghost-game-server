module.exports = function () {
    var currentWord = "";

    var dictionaryService = require('./dictionary.service');
    var objectUtilsService = require('./object-utils.service');

    function _checkGameIsInitialized() {
        return !objectUtilsService.objectIsEmpty(dictionaryService.dictionary);
    }

    function _getWinner(playingUser) {
        return Promise.all([
            dictionaryService.isWordOnDictionary(currentWord),
            dictionaryService.getSubTree(currentWord)
        ])
            .then(function (results) {
                var isWordOnDictionary = results[0];
                var subTree = results[1];
                if (isWordOnDictionary) {
                    // This mean the playing user has typed a valid word, so he loses
                    return !playingUser; // See README.me to understand playingUser agreement
                } else {
                    if (subTree) {
                        // This mean the playing user has not typed a valid word, so no one loses
                        return null;
                    } else {
                        // This mean the playing user has typed a partial word that cannot produce another one, so he loses
                        return !playingUser;
                    }
                }
            });
    }

    function _getBestChild() {
        return dictionaryService
            .getSubTree(currentWord)
            .then(function (subTree) {
                var promiseArray = [];
                var candidatesArray = [];

                for (key in subTree) {
                    promiseArray.push(dictionaryService.getTreeDepth(subTree[key]))
                    candidatesArray.push(key);
                }
                return Promise
                    .all(promiseArray)
                    .then(function (depths) {
                        var maxDepth = Math.max(...depths);
                        var maxDepthIndex = depths.indexOf(maxDepth);
                        return candidatesArray[maxDepthIndex];
                    });
            });

    }

    function _getNextMove() {
        return new Promise(function (resolve, reject) {
            _getWinner(true)
                .then(function (possibleWinner) {
                    if (possibleWinner !== null) {
                        resolve({
                            winner: possibleWinner,
                            currentWord: currentWord
                        });
                    } else {
                        _getBestChild()
                            .then(function (bestChild) {
                                currentWord += bestChild;
                                return _getWinner(false);
                            })
                            .then(function (possibleWinner) {
                                resolve({
                                    winner: possibleWinner,
                                    currentWord: currentWord
                                });
                            });
                    }
                });
        });
    }

    function initGame() {
        return dictionaryService
            .loadDictionary()
            .then(function () {
                currentWord = "";
            });
    }

    function addNewLetter(letter) {
        return new Promise(function (resolve, reject) {
            if (_checkGameIsInitialized()) {
                currentWord += letter;
                _getNextMove()
                    .then(function (nextMove) {
                        resolve(nextMove);
                    });
            } else {
                reject("Game has to be initialized before any call");
            }
        });
    }

    function getCurrentWord() {
        return new Promise(function (resolve, reject) {
            if (_checkGameIsInitialized()) {
                resolve(currentWord);
            } else {
                reject("Game has to be initialized before any call");
            }
        });
    }

    function getWordInfo(word) {
        return dictionaryService.isWordOnDictionary(word)
        .then(function(isOnDictionary) {
            return {
                isOnDictionary
            }
        });
    }


    return {
        initGame,
        addNewLetter,
        getCurrentWord,
        getWordInfo
    }
}()