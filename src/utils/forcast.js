const request = require('request')


const forcast = (lat,long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=2b3c0360d998e77a3ba76bb85fe752a6&query="+ lat +','+long
    request({url, json:true}, (error, {body}) => {
        
        if(error) {
            callback("Unable to connect to weatherstack", undefined)
        }
        else if(body.error) {
            callback("Location cant be found", undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0]  + '. It is currently ' +  body.current.temperature +' degrees out. It feels like '+ body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%.'  )
        }
    })
}

module.exports=forcast