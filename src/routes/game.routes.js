module.exports = function (app) {
    app.get('/game/init', function (req, res) {
        res.send('Hello World!');
    });

    app.post('/game/letter/new', function (req, res) {
        res.send('Hello World!');
    });
    
    app.get('/game/word/current', function (req, res) {
        res.send('Hello World!');
    });
}