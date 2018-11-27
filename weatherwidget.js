/*
 * Welcome to the Weather Widget.
 * This JS creates a table that displays basic weather data for a given city.
 * Create it and add refresh button event wiring in the script tag of your HTML as follows
 * 
 *      var varName = makeWeatherWidget({domId: "nameOfDomIdLocation", city: "nameOfCity"});
            varName.addEventListener("click", function () {
            varName.refresh();
            });

 * @returns {Element|makeWeatherWidget.weatherWidget}
 */

function makeWeatherWidget(domIdAndCity)
{
    /*Creats an instance to be appened to the dom at param domId*/
    var weatherWidget = document.createElement("table");

    /*Creats the table into which data is placed*/
    var rowLocationAndTime = weatherWidget.insertRow();
    var locationAndTime = rowLocationAndTime.insertCell(); //data is added during fresh or when created
    var btnRefresh = rowLocationAndTime.insertCell().innerHTML = '<button><i class="fa fa-redo"></i></button>';

    var rowTemperature = weatherWidget.insertRow();
    rowTemperature.insertCell().innerHTML = '<i class="fas fa-thermometer-half"></i> Temp: ';
    var temperature = rowTemperature.insertCell();

    var rowDescription = weatherWidget.insertRow();
    rowDescription.insertCell().innerHTML = '<i class="fa fa-cloud"></i> Description: ';
    var description = rowDescription.insertCell();

    var rowHumidity = weatherWidget.insertRow();
    rowHumidity.insertCell().innerHTML = '<i class="fa fa-tint"></i> Humidity: ';
    var humidity = rowHumidity.insertCell();

    var rowWind = weatherWidget.insertRow();
    rowWind.insertCell().innerHTML = '<i class="fa fa-wind"></i> Wind Speed: ';
    var wind = rowWind.insertCell();

    /*This functions make the API call with the OpenWather API
     * Although the call could be done with jQuery, this widget just uses javascript to demo what's happening "behind" the jQuery
     * Read more at https://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery
     */
    getWeatherData = function (city) {

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
                if (xmlhttp.status === 200) {
                    //use for debugging
                    //document.getElementById("rawData").innerHTML = xmlhttp.responseText;
                } else if (xmlhttp.status === 400) {
                    alert('There was an error 400 getting your weather data for '); //add city name
                } else {
                    alert('something else other than 200 was returned'); //change this line later
                }
            }
        };

        //this is a GET call because we are taking data from the API, not giving it the API
        //use of the open weather API requires a key, see below         //make key var?
        xmlhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=3281a94a3ece29f94a82d4c8b931e0a2", false); //had to set AJAX to false to parse JSON. unsure why
        xmlhttp.send();
        return JSON.parse(xmlhttp.responseText);
    };
    
    /*
     * Fires when refresh button is clicked. Calls getWeatherData() to update widget. 
     */
    weatherWidget.refresh = function () {

        data = getWeatherData(domIdAndCity.city);

        var kelvin = data.main.temp;
        temperature.innerHTML = ((9 / 5) * (kelvin - 273) + 32).toFixed(1);
        humidity.innerHTML = data.main.humidity;
        wind.innerHTML = data.wind.speed;
        description.innerHTML = ""; //must remove old data in field because of how loop concatenates 
        for (i = 0; i < data.weather.length; i++) {
            description.innerHTML += data.weather[i].description;
            if (i < data.weather.length - 1) {
                description.innerHTML += ", ";
            }
        }

        var today = new Date(); // so js has new and objects like I'm used to?
        var hours = today.getHours();
        var meridiem = " am"; //in your current time zone
        if (hours > 12) {
            hours -= 12;
            meridiem = " pm";
        }
        var minutes = today.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        locationAndTime.innerHTML = '<i class="fas fa-city"></i> ' + domIdAndCity.city + ', ' +
                hours + ":" + minutes + meridiem;
        
        //Without if statement, user would see this message in addtion to the creation message upon instantiation because of refresh() in IFFE 
        if (firstLogMessageWasSent) {
            console.log(domIdAndCity.city + " wather resfreshed");
        }

    };

    /*
     * IFFE: calls refresh() to dispaly data, and also leaves a message in the log saying the widget for a given location was created.
     */
    var firstLogMessageWasSent = false;

    (function () {
        weatherWidget.refresh();
        console.log(domIdAndCity.city + " weather widget was created.");
        firstLogMessageWasSent = true;
    })();

    /*
     * I used both the appendChild() and return so that the widget appeared on the page, but was also accessible to events. 
     * Note for future: is this possible with just a return statment? 
     */
    
    document.getElementById(domIdAndCity.domId).appendChild(weatherWidget);
    return weatherWidget;
} // end of makeStructurelist

