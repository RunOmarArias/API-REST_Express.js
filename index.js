const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {
    errorHandler,
    logErrors,
    boomErrorHandler,
} = require('./middlewares/error.handler');

const port = process.env.PORT || 3000;
const app = express();

const whiteList = ['http://localhost:8080', 'http://localhost:5000', 'https://myapp.com'];
const options = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido'));
        }
    }
}


app.use(express.json());
app.use(cors(options));

/* app.get('/', (req, res) => {
    res.send('Hola, mi server en express');
});
app.get('/nueva-ruta', (req, res) => {
    res.send('Hola, soy un nuevo endpoint');
}); */

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
