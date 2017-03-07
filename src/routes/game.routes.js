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

    app.post('/game/letter/new', function (req, res) {
        gameService
            .addNewLetter("")
            .then(
            function () {
                res.send('Hello promise!');
            },
            function (err) {
                res.status(400);
                res.send(err);
            }
            );
    });

}