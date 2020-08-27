const express = require('express')
const path = require('path')

const app = express()

app.set('port', 3000);

app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});

app.get('/api/queue', (req, res) => {
    res.send('12')
})

app.use('/', express.static(path.join(__dirname, '../../dist')));
