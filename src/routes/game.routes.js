var gameService = require('../services/game.service');

module.exports = function (app) {
    app.get('/game/init', function (req, res) {
        gameService
            .initGame()
            .then(
            function () {
                res.send(200);
            },
            function (err) {
                res.status(500);
                res.send(err);
            }
            );
    });

    app.get('/game/word/current', function (req, res) {
        gameService
            .getCurrentWord()
            .then(
            function (word) {
                res.send(word);
            },
            function (err) {
                res.status(400);
                res.send(err);
            }
            );
    });

    app.post('/game/word/info', function (req, res) {
        var word = req.body.word;
        gameService
            .getWordInfo(word)
            .then(
            function (word) {
                res.send(word);
            },
            function (err) {
                res.status(400);
                res.send(err);
            }
            );
    });

    app.post('/game/letter/new', function (req, res) {
        var letter = req.body.letter;
        gameService
            .addNewLetter(letter)
            .then(
            function (result) {
                res.send(result);
            },
            function (err) {
                res.status(400);
                res.send(err);
            }
            );
    });

}