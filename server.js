const express = require('express')
const path = require('path')
const firebase = require('firebase')
 
const app = express()

const firebaseConfig = {
    apiKey: "AIzaSyCvnPhjVI_vLWHefcYwVzo-VGZi1x7oQbI",
    authDomain: "abit-queue.firebaseapp.com",
    databaseURL: "https://abit-queue.firebaseio.com",
    projectId: "abit-queue",
    storageBucket: "abit-queue.appspot.com",
    messagingSenderId: "642912729314",
    appId: "1:642912729314:web:d26605bbf8fa3ec8c146bb",
    measurementId: "G-8FJGSF1204"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

app.set('port', 3000)

app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on localhost:${app.get('port')}`)
});

let arr = []  /*?????????????????*/ 

app.get('/api/queue/', (req, res) => {
    try {
        if (arr.length === 0) {
            arr.push(1)
        } else {
            arr.push(arr[arr.length - 1] + 1)
        }
        res.send(`${arr[arr.length - 1]}`)
    } catch (error) {
        throw error
    }
    
})

app.use('/', express.static(path.join('./dist')))
app.use('/admin', express.static(path.join('./dist')))
