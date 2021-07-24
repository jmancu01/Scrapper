import express from 'express'
import getPriceFeed from './index.js'

const app = express()

app.use(function(req, res, next) {
    
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    next();
});

app.get('/', async(req, res) => {
    try{

        const cryptoPrice = await getPriceFeed()

        return res.status(200).json({
            result: cryptoPrice,
        })

    }catch (error){
        console.log(error)

        return res.status(500).json({
            error: error.toString(),
        })
    }
})

app.listen('5000', () => {
    console.log('runing in port 5000')
})