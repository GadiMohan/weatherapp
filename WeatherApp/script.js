let weather = {
    apiKey: "3045dd712ffe6e702e3245525ac7fa38",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, pressure, feels_like, temp_min, temp_max } = data.main;
        const { speed } = data.wind;
        const currentDate = new Date();
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        const formattedDate = currentDate.toLocaleDateString(undefined, dateOptions);
        const formattedTime = currentDate.toLocaleTimeString(undefined, timeOptions);

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".real-feel").innerText =
            "Real Feel: " + feels_like + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".pressure").innerText =
            "Pressure: " + pressure + " hPa";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".min-temp").innerText =
            "Min Temp: " + temp_min + "°C";
        document.querySelector(".max-temp").innerText =
            "Max Temp: " + temp_max + "°C";
        document.querySelector(".date-time").innerText =
            "Date: " + formattedDate + " | Time: " + formattedTime;
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Visakhapatnam");
