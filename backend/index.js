global.express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var auth = require('./routes');
const app = express()
app.use(bodyParser.json())

app.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
    credentials: true
}));

app.use('/api', auth);


const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})

module.exports = { express, app };