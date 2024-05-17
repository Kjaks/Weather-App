const API_KEY = "019ee3108683c866279f7f074728c873";

function getWeather() {
    // Step 1. Read the value of the city from the input field
    let city_name = document.getElementById("city").value;

    // Step 2. Call the OpenWeatherMap API to get the coordinates of a location
    fetch(`https://api.openweathermap.org/geo/1.0/direct?appid=${API_KEY}&q=${city_name}`)
        .then(response => {
            // Step 4. Capture the response code
            const statusCode = response.status;

            // Step 5. Check if the response status code is not 200
            if (statusCode !== 200) {
                // Display the error message
                console.error("Error: " + response.statusText);
                throw new Error("Failed to fetch coordinates.");
            }
            
            // If response is OK, return the JSON data
            return response.json();
        })
        .then(data => {
            // Step 3. Log the response data to the console (Optional)
            console.log(data);

            // Check if data array is empty (no results found)
            if (data.length === 0) {
                console.error("Error: No location found for the specified city.");
                throw new Error("No location found.");
            }

            // Step 6. If there are no errors in the request, process the response data and save the longitude and latitude data
            const lat = data[0].lat;
            const lon = data[0].lon;

            console.log(`Latitude: ${lat}, Longitude: ${lon}`);

            // Step 7. Call the OpenWeatherMap API to get weather data using the longitude and latitude data
            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        })
        .then(response => {
            // Step 9. Capture the response code
            const statusCode = response.status;

            // Step 10. If there is an error in the request, display the error message and exit the function
            if (statusCode !== 200) {
                console.error("Error: " + response.statusText);
                throw new Error("Failed to fetch weather data.");
            }

            return response.json();
        })
        .then(data => {
            // Step 8 & 11. Log the response data to the console (Optional)
            console.log(data);

            // Step 12. Update the HTML with the response data by creating the appropriate elements
            // Example: Update a div with id "weather-info" to show the weather information
            const weatherInfoTable = document.getElementById("weather-result");
            weatherInfoTable.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" style="justify-self: center; grid-column: 2; grid-row: 1">

                <div style="color:white; grid-column: 1; grid-row: 1; align-items: center; margin-bottom: 5%">
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Latitud: ${data.coord.lat}</p>
                <p>Longitud: ${data.coord.lon}</p>
                </div>

                <div style="color:white; grid-column: 1; align-items: center">
                    <p>Temperatura</p>
                    <br>
                    <p>Sensacion Termica</p>
                    <br>
                    <p>Temperatura min</p>
                    <br>
                    <p>Temperatura max</p>
                    <br>
                    <p>Presion</p>
                    <br>
                    <p>Humedad</p>
                    <br>
                    <p>Descripcion</p>
                </div>
                    
                <div style="color:white; grid-column: 2; justify-self: center">
                <p>${data.main.temp}°C</p>
                <br>
                <p>${data.main.feels_like}°C</p>
                <br>
                <p>${data.main.temp_min}°C</p>
                <br>
                <p>${data.main.temp_max}°C</p>
                <br>
                <p>${data.main.pressure} hPa</p>
                <br>
                <p>${data.main.humidity}%</p>
                <br>
                <p>${data.weather[0].description}</p>
                </div>`


        })
        .catch(error => {
            console.error("Error: " + error.message);
        });
}
