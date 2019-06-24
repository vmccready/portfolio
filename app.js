const express = require('express');
const bodyParser = require('body-parser');
const { projects } = require('./data/data.json');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static('public'));

app.set('view engine','pug');

app.get('/', (req, res) => {
    res.render('index', { projects })
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/project/:id', (req, res) => {
    const { id } = req.params;
    const project = projects[id];
    res.render('project', { project });
});

app.use((req, res, next) => {
    const err = new Error('Oops! That page doesnt exist.');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log("That webpage doesn't exist.")
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
});

app.listen(port, () => {
});