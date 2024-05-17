const API_KEY = "019ee3108683c866279f7f074728c873";

function getWeather() {
    let city_name = document.getElementById("city").value;

    fetch(`https://api.openweathermap.org/geo/1.0/direct?appid=${API_KEY}&q=${city_name}`)
        .then(response => {
            const statusCode = response.status;
            if (statusCode !== 200) {
                console.error("Error: " + response.statusText);
                throw new Error("Failed to fetch coordinates.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.length === 0) {
                console.error("Error: No location found for the specified city.");
                throw new Error("No location found.");
            }
            const lat = data[0].lat;
            const lon = data[0].lon;

            console.log(`Latitude: ${lat}, Longitude: ${lon}`);

            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`);
        })
        .then(response => {
            const statusCode = response.status;
            if (statusCode !== 200) {
                console.error("Error: " + response.statusText);
                throw new Error("Failed to fetch weather data.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

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
                </div>`;
        })
        .catch(error => {
            console.error("Error: " + error.message);
        });
}

function getWeatherInterval() {
    let city_name = document.getElementById("cityInterval").value;
    let days = document.getElementById("days").value;
    let intervals = days * 8;

    fetch(`https://api.openweathermap.org/geo/1.0/direct?appid=${API_KEY}&q=${city_name}`)
        .then(response => {
            const statusCode = response.status;
            if (statusCode !== 200) {
                console.error("Error: " + response.statusText);
                throw new Error("Failed to fetch coordinates.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.length === 0) {
                console.error("Error: No location found for the specified city.");
                throw new Error("No location found.");
            }
            const lat = data[0].lat;
            const lon = data[0].lon;

            console.log(`Latitude: ${lat}, Longitude: ${lon}`);

            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${intervals}&units=metric&lang=es&appid=${API_KEY}`);
        })
        .then(response => {
            const statusCode = response.status;
            if (statusCode !== 200) {
                console.error("Error: " + response.statusText);
                throw new Error("Failed to fetch weather data.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            const weatherResultInterval = document.getElementById("weather-result-interval");
            weatherResultInterval.innerHTML = `
            <table border="1">
            <caption>
            <h2>${data.city.name}, ${data.city.country}</h2>
            <p>Coordenadas geográficas (latitud, longitud): ${data.city.coord.lat}, ${data.city.coord.lon}</p>
            </caption>
                <thead>
                    <tr>
                        <th>Fecha y Hora</th>
                        <th>Temperatura (°C)</th>
                        <th>Sensación Térmica (°C)</th>
                        <th>Temp. Mín (°C)</th>
                        <th>Temp. Máx (°C)</th>
                        <th>Presión (hPa)</th>
                        <th>Humedad (%)</th>
                        <th>Descripción</th>
                        <th>Icono</th>
                        <th>Nubes (%)</th>
                        <th>Vel. Viento (m/s)</th>
                        <th>Dir. Viento (°)</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>`;

            const tbody = weatherResultInterval.querySelector("tbody");

            data.list.forEach(interval => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${interval.dt_txt}</td>
                    <td>${interval.main.temp}</td>
                    <td>${interval.main.feels_like}</td>
                    <td>${interval.main.temp_min}</td>
                    <td>${interval.main.temp_max}</td>
                    <td>${interval.main.pressure}</td>
                    <td>${interval.main.humidity}</td>
                    <td>${interval.weather[0].description}</td>
                    <td><img src="https://openweathermap.org/img/wn/${interval.weather[0].icon}.png" alt="Weather Icon"></td>
                    <td>${interval.clouds.all}</td>
                    <td>${interval.wind.speed}</td>
                    <td>${interval.wind.deg}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error: " + error.message);
        });
}
