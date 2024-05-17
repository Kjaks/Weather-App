// Step 0. Request an API KEY on the website https://openweathermap.org
const API_KEY = "{APIkey}";

function getWeather() {
    // Step 1. Read the value of the city from the input field

    // Step 2. Call the OpenWeatherMap API to get the coordinates of a location
    fetch(`http://api.openweathermap.org/geo/1.0/direct?appid=${API_KEY}&q={city_name}`)
    .then(response => response.json())
    .then(data => {
        // Step 3. Log the response data to the console (Optional)
        console.log(data);

        // Step 4. Capture the response code
        const statusCode = response.status;

        // Step 5.
        // If there is an error in the request, display the error message and exit the function
        // Code == 200    On success
        // Code != 200    On error
        if (statusCode !== 200) {
            console.log("Error: " + data.message);
            return;
        }

        // Step 6. If there are no errors in the request, process the response data and save the longitude and latitude data.
        const { lat, lon } = data[0];

        // Step 7. Call the OpenWeatherMap APIs according to the selected option using the longitude and latitude data.
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    })
    .then(response => response.json())
    .then(data => {
        // Step 8. Log the response data to the console (Optional)
        console.log(data);

        // Step 9. Capture the response code
        const statusCode = response.status;

        // Step 10.
        // If there is an error in the request, display the error message and exit the function
        // Code == 200    On success
        // Code != 200    On error
        if (statusCode !== 200) {
            console.log("Error: " + data.message);
            return;
        }

        // Step 11. If there are no errors in the request, process the response data

        // Step 12. Update the HTML with the response data by creating the appropriate elements
    })
    .catch(error => {
        console.log("Error: " + error.message);
    });
}

