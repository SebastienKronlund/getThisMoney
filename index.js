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
  *             Airline(0), Airline ID(1), Source airport(2), destination airport(4), destination airport id(5)
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

    routeData.forEach(route => {

        //Check the source aiport towards our airport data
            // Check longitude and latitude

            airportData.forEach(airport => {
                if(airport[4] === `"${route[2]}"`) {
                    console.log([airport[1], airport[6], airport[7]]);
                    return [airport[1], airport[6], airport[7]];
                }
            });

        //Check destination airport towards our airport data
            // Check longitude and latitude

        //Return the 10 longest flights Airline, and Airline ID data.

    })

    /* airportData.forEach(airport => {
        console.log(airport[4]);
    }) */
}

retrieve();