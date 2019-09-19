/********************************************************************************************
    Name: Brian Laccone
    Class: CS 290
    Date: 11/5/2017
    Activity: Ajax Interactions
*********************************************************************************************/

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
	document.getElementById('getWeather').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        //apiKey found on piazza 
        var apiKey = "&appid=fa7d80c48643dfadde2cced1b1be6ca1";

        //set zip and city var to the information typed in by the user
		var zip = document.getElementById("zip").value;
        var city = document.getElementById("city").value;

        var payload;
        
        //if the zip var has a length of 5 then use the zip api
        if(zip.length == 5){

            payload = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us" + apiKey + '&units=imperial';

        //else use the regular address for the city
        }else{

            payload = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",us" + apiKey + '&units=imperial';

        }
        
        //set the third variable to true to send asynchronous request
		req.open("GET", payload, true);
        
        //make sure that the function execute only once everything else loads
		req.addEventListener('load', function() {

			if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                //display the results
				document.getElementById("tmp").textContent = response.main.temp;
                document.getElementById("hum").textContent = response.main.humidity;
                document.getElementById("spd").textContent = response.wind.speed;
			} else {
				console.log("error");
            }
            
        });

        //send the request
		req.send();
		event.preventDefault();
    });
}

