const express = require('express')
const path = require('path')
const nocache = require('nocache')

const app = express()




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
        console.log(arr)
        res.send(`${arr[arr.length - 1]}`)
    } catch (error) {
        throw error
    }
    
})

app.post('/api/queue/', (req, res) => {
    try {
        if (arr.length === 0) {
            arr.push(1)
        } else {
            arr.push(arr[arr.length - 1] + 1)
        }
        console.log(arr)
        res.send(`${arr[arr.length - 1]}`)
    } catch (error) {
        throw error
    }
    
})

app.get('/api/queue-add/', (req, res) => {
    try {
        if(!arr.includes(parseInt(req.query.num))){
            arr.push(parseInt(req.query.num))
        }
        console.log(arr)
        res.send(`${arr}`)
    } catch (error) {
        throw error
    }
    
})

app.get('/api/queue-del/', (req, res) => {
    try {
        if(arr.includes(parseInt(req.query.num))){
            let index = arr.indexOf(parseInt(req.query.num))
            console.log(index)
            if (index > -1) {
                arr.splice(index, 1)
            }
        }  
        console.log(arr)
        res.send(`${arr}`)
    } catch (error) {
        throw error
    }
    
})

app.get('/api/queue-fetch/', (req, res) => {
    try {
        res.json(arr)
    } catch (error) {
        throw error
    }
    
})

app.get('/api/reg/', (req, res) => {
    try {
        if(req.query.login === "admin@iasa.kpi" && req.query.pass === "riba_metch"){
            res.send({'res': '11'})
        } else {
            res.send({'res': '00'})
        }
    } catch (error) {
        throw error
    }
    
})

app.use('/', express.static(path.join('./dist')))
app.use('/admin', express.static(path.join('./dist')))
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
  next()
})
app.use(nocache())
