/**
 * TODO: Fetch API data from sources and parse into object
 *      todo: Fetch req to end point
 *      todo: Return fetch to promise that parses data into object
 * 
 * TODO: Extract 'important variables' from data-object.
 *      todo: Try reading 'important variables'  from newly created data-obj
 * 
 * TODO: Compare 'important variables' and sort them, returning the 10 longest flights
 *      todo: Compare 'important variables' from two different data-objs    
 *          todo: if successful, compare long + lat and return the 10 longest flights
 * 
 * TODO: ... Front-end T__T
 *      todo: tuck yourself in, roll over on your side and cry ...
 */


 /********************************* SCHEMA
  *  Routes:
  *     {Airline, Airline ID, Source airport, Source airport ID, Destination airport, Destination airport ID, Codeshare, Stops, Equipment}
  *         Important variables:
  * 
  *            ---> Airline(0), Airline ID(1), Source airport(2), destination airport(4), destination airport id(5) <---
  * 
  * Airport:
  *     {Airport ID, Name(airport), City, Country, IATA, ICAO, Latitude, Longitude, Altitude, Timezone, DST, Tz database timezone, Type, Source}
  *         Important variables:
  *             Latitude(5), Longitude(7), Country(3), City(2)
  * 
  */

const fetch = require("node-fetch");

const fileDataToArray = data => data
  .toString()
  .split('\n')
  .filter(r => r !== '')
  .map(r => r.split(','));


async function retrieve() {
    const airportData = await fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat').then(data => data.text()).then(data => fileDataToArray(data));
    const routeData = await fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat').then(data => data.text()).then(data => fileDataToArray(data));

    //Get start and dest airports
    const sourceAirport = [];
    const destAirport = [];
    routeData.forEach(route => {
            airportData.forEach(airport => {
                if(airport[4] === `"${route[2]}"`) {
                    sourceAirport.push([airport[1], airport[6], airport[7]]);
                }
            });

            airportData.forEach(airport => {
                if(airport[4] === `"${route[4]}"`) {
                    destAirport.push([airport[1], airport[6], airport[7]]);
                }
            });

    //----- End of forEach Loop         
    })

    const flights = [];
    const distances = [];
    for (let i = 0; i < destAirport.length; i++) {
        flights.push([
            sourceAirport[i][0],
            destAirport[i][0],
            distanceInKmBetweenEarthCoordinates(sourceAirport[i][1], sourceAirport[i][2], destAirport[i][1],  destAirport[i][2])]
        );
        distances.push(flights[i][2]);
    };

    distances.sort((a, b) => b - a);
    
    const longestD = [];
    for (let i = 0; i <= 9; i++) {
        longestD.push(distances.shift());
    }

   let longestF = [];
    
    longestD.forEach(distance => {
        flights.forEach(flight => {
            if(flight[2] === distance) {
                longestF.push(flight);
            }
        });
    })

    longestF.pop();
    console.log(longestF);

    //------ End of retrieve
}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }
  
function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
}

retrieve();