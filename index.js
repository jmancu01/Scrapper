
import axios from 'axios'

import cheerio from 'cheerio'

const getPriceFeed = async() =>{
    try{
        //choose a website
        const siteURL = 'https://coinmarketcap.com/'

        //get data
        const {data} = await axios({
            method: "GET",
            url: siteURL,
        })

        //create a cheerio variable
        const $ = cheerio.load(data)
        //select an element and copy the selector tag
        const elementSelector
        = '#__next > div.bywovg-1.sXmSU > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr'

        //define key values of each item
        const keys = [
            'position',
            'name',
            'price',
            '24h',
            '7h',
            'marketcap',
            'volume',
            'supply',
        ]
        
        let coinArr = []
        //Call the each method, with parent and index values
        $(elementSelector).each((index, element) =>{
            //objeto para cada item
            const coinObject = {}
            //index para loopear
            let keyindex = 0

            //agarramos los 2 primeros
            if(index <= 1){
                //loop para cada children que tenga
                $(element).children().each((indexChild, elementChild) =>{
                    //informacion de cada children(usamos la variable de enterno del each)
                    let info = $(elementChild).text()
                    //Esto es una forma de adaptar info fea para que se vea bien en el obj
                    if(keyindex == 1 || keyindex == 6){
                        // console.log($(elementChild).text())
                        info = ($('p:first-child', $(elementChild).html()).text())
                    }
                    //en caso que no tenga un espacio en blanco
                    if(info){
                        //creamos una propiedad del objeto llamada como el index del array keys
                        //le asignamos el valor info(que es el texto de la valiable de entontorno)
                        //descomentar para ver el valor
                        // console.log($(elementChild).text())
                        coinObject[keys[keyindex]] = info
                        //subimos el index para asignar el valor de arriba a la siguiente propiedad
                        //sino se le va a asignar el valor a la primera variable del array
                        //{position: 'ultimos valor'}
                        keyindex++
                    }
                })
                //tenemos el coinObjet creado
                coinArr.push(coinObject)
                
            }
        })

        //console.log
    
        return coinArr
    }catch(error){
        console.log(error)
    }
}


export default getPriceFeed


//servidor
// const express = require('express')
// const app = express()

// app.get('/', async(req, res) => {
//     try{

//         const cryptoPrice = await getPriceFeed()

//         return res.status(200).json({
//             result: cryptoPrice,
//         })

//     }catch (error){
//         console.log(error)

//         return res.status(500).json({
//             error: error.toString(),
//         })
//     }
// })

// app.listen('3000', () => {
//     console.log('runing in port 3000')
// })
    
