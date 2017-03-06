var gameService = require('../services/game.service')();

module.exports = function (app) {
    app.get('/game/init', function (req, res) {
        res.send('Hello World!');
    });

    app.get('/game/word/current', function (req, res) {
        gameService
            .getCurrentWord()
            .then(function (word) {
                res.send(word);
            });
    });

    app.post('/game/letter/new', function (req, res) {
        gameService
            .addNewLetter("")
            .then(function () {
                res.send('Hello promise!');
            });
    });

}