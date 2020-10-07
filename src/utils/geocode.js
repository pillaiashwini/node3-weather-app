const request = require('request')

const geoCode = (location, callback) => {

    url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+location+".json?access_token=pk.eyJ1IjoiYXNod2luaTExIiwiYSI6ImNrZm8xcnA2YTF2ODQyd21qODZqYTZ1c3QifQ.xvvmEZXHx5sypkCPl0mkXg&limit=1"

    request({url, json:true}, (error, {body})  => {
        
        if(error) {
            callback("Unable to connect to mapbox", undefined)
        } 
        else if(body.features.length === 0) {
            callback("Location can't be found", undefined)
        } 
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
                
                })
            }
        
        })

    }



module.exports = geoCode