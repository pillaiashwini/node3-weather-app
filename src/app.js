
const path = require('path')

const express = require('express')

const hbs = require('hbs')

const geoCode = require('./utils/geocode')

const forcast = require("./utils/forcast")

const app = express()

const port = process.env.PORT || 3000

//  to get the handlebars hbs
app.set('view engine', 'hbs')


// to render static html file to browser

app.use(express.static(path.join(__dirname, '../public')))

// to change the name of hbs folder from views
// setting path for partials

app.set('views', path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

// to render dynamic data tobrowser

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: "Andrew"

    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title:"About me",
        name: "Andrew"
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: "Help",
        name:"Andrew",
        message:"contact us for any help"
    })
})

// to render json data to browser

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:"Address need to be provided"
        })
    }

    geoCode(req.query.address,(error, {latitude, longitude, location} = {}) => {

        if(error) {
            return res.send({error} )
        }
    
        forcast(latitude, longitude ,(error, forcastData ) => {
            if(error) {
                return res.send({error})
            }
    
           res.send({
               location: location,
               forcast: forcastData,
               address: req.query.address
           })
    
        })
    })

    
})


// error page message

app.get('/help/*',(req,res) => {
    res.render('404',{
        name:'Andrew',
        errorMessage: "Help article not found"
    })
})
// error page message

app.get('*', (req,res) => {
    res.render('404',{
        name:'Andrew',
        errorMessage: "Page not found"
    })
})

// start the server

app.listen(port, () => {
    console.log("Server is running on "+ port)
})
