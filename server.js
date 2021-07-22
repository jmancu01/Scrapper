import express from 'express'
import getPriceFeed from './index.js'

const app = express()

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

app.listen('3000', () => {
    console.log('runing in port 3000')
})