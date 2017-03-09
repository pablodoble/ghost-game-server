module.exports = function () {
    var MIN_WORD_LENGTH = "4";
    var dictionary = {};

    var objectUtilsService = require('./object-utils.service');

    function _readDictionaryFile() {
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

    function _addWordToDictionary(word, partialDictionary) {
        var firstChar = word.charAt(0);
        if (!partialDictionary[firstChar]) {
            partialDictionary[firstChar] = {};
        }
        if (word.length === 1) {
            partialDictionary[firstChar]["_"] = {};
        }
        if (word.length > 1) {
            var wordWithoutFirstChar = word.substr(1, word.length - 1);
            _addWordToDictionary(wordWithoutFirstChar, partialDictionary[firstChar]);
        }
    }

    function _parseDictionaryData(data) {
        return new Promise(function (resolve, reject) {
            var words = data
                .split('\n')
                .map(function (word) {
                    return word.trim();
                })
                .filter(function (word) {
                    return word.length >= MIN_WORD_LENGTH;
                });
            words.forEach(function (word) {
                _addWordToDictionary(word, dictionary);
            });
            resolve();
        });
    }

    function _getSubTreeSync(word, partialDictionary) {
        var firstChar = word.charAt(0);
        if (word.length <= 1) {
            return partialDictionary[firstChar];
        } else {
            if (partialDictionary[firstChar]) {
                var wordWithoutFirstChar = word.substr(1, word.length - 1);
                return _getSubTreeSync(wordWithoutFirstChar, partialDictionary[firstChar]);
            } else {
                return null;
            }
        }
    }

    function _getTreeDepthSync(tree) {
        var level = 1;
        var key;
        for (key in tree) {
            if (!tree.hasOwnProperty(key)) continue;

            if (typeof tree[key] == 'object') {
                var depth = _getTreeDepthSync(tree[key]) + 1;
                level = Math.max(depth, level);
            }
        }
        return level;
    }

    function loadDictionary() {
        return _readDictionaryFile()
            .then(function (data) {
                return _parseDictionaryData(data);
            });
    }

    function getSubTree(word) {
        return new Promise(function (resolve, reject) {
            var subTree = _getSubTreeSync(word, dictionary);
            resolve(subTree);
        });
    }

    function isWordOnDictionary(word) {
        return getSubTree(word)
            .then(function (subTree) {
                if (subTree && subTree.hasOwnProperty("_")) {
                    return true;
                } else {
                    return false;
                }
            })
    }

    function getTreeDepth(tree) {
        return new Promise(function (resolve, reject) {
            if (objectUtilsService.objectIsEmpty(tree)) {
                resolve(0);
                return;
            }
            resolve(_getTreeDepthSync(tree));
        });
    }


    return {
        dictionary,
        loadDictionary,
        getSubTree,
        isWordOnDictionary,
        getTreeDepth
    }
}()