const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHidden = document.querySelector(".city-hidden");

search.addEventListener("click", () => {
    const APIKey = "f33a1bccb7962d77834dfcfcf48236e4";
    const city = document.querySelector(".search-box input").value;

    if (city === "") return;

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    )
        .then((response) => response.json())
        .then((json) => {
            if (json.cod == "404") {
                cityHidden.textContent = city;
                container.style.height = "400px";
                weatherBox.classList.remove("active");
                weatherDetails.classList.remove("active");
                error404.classList.add("active");
                return;
            }

            const image = document.querySelector(".weather-box img");
            const temperature = document.querySelector(".weather-box .temperature");
            const description = document.querySelector(".weather-box .description");
            const humidity = document.querySelector(
                ".weather-details .humidity span"
            );
            const wind = document.querySelector(".weather-details .wind span");

            if (cityHidden.textContent == city) {
                return;
            } else {
                cityHidden.textContent = city;
                container.style.height = "555px";
                container.classList.add("active");
                weatherBox.classList.add("active");
                weatherDetails.classList.add("active");
                error404.classList.remove("active");

                // setTimeout(() => {
                //     container.classList.remove('active')
                // }, 2500);
                switch (json.weather[0].main) {
                    case "Clear":
                        image.src = "images/clear.png";
                        break;
                    case "Rain":
                        image.src = "images/rain.png";
                        break;
                    case "Snow":
                        image.src = "images/snow.png";
                        break;
                    case "Clouds":
                        image.src = "images/cloud.png";
                        break;
                    case "Mist":
                    case "Haze":
                        image.src = "images/mist.png";
                        break;
                    default:
                        image.src = "images/cloud.png";
                }

                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

                // const infoweather = document.querySelector(".info-weater");
                // const infohumidity = document.querySelector(".info-humidity");
                // const infowind = document.querySelector(".info-wind");

                // const elCloneweather = infoweather.cloneNode(true);
                // const elCloneHumidity = infohumidity.cloneNode(true);
                // const elCloneWind = infowind.cloneNode(true);

                // elCloneweather.id = "clone-info-weather";
                // elCloneweather.classList.add("active-clone");

                // elCloneHumidity.id = "clone-info-humidity";
                // elCloneHumidity.classList.add("active-clone");

                // elCloneWind.id = "clone-info-wind";
                // elCloneWind.classList.add("active-clone");

                // setTimeout(() => {
                //     infoweather.insertAdjacentElement("afterend", elCloneweather);
                //     infohumidity.insertAdjacentElement("afterend", elCloneHumidity);
                //     infowind.insertAdjacentElement("afterend", elCloneWind);
                // }, 2200);

                // const cloneInfoWeather = document.querySelectorAll(
                //     ".info-weather.active-clone"
                // );
                // const totalCloneInfoWeather = cloneInfoWeather.length;
                // const cloneInfoWeatherFirst = cloneInfoWeather[0];

                // const cloneinfoHumidity = document.querySelectorAll(
                //     ".info-humidity.active-clone"
                // );
                // const cloneInfoHumidityFirst = cloneinfoHumidity[0];

                // const cloneinfoWind = document.querySelectorAll(
                //     ".info-wind.active-clone"
                // );
                // const cloneInfoWindFirst = cloneinfoWind[0];

                // if (totalCloneInfoWeather > 0) {
                //     cloneInfoWeatherFirst.classList.remove("active-clone");
                //     cloneInfoHumidityFirst.classList.remove("active-clone");
                //     cloneInfoWindFirst.classList.remove("active-clone");

                //     setTimeout(() => {
                //         cloneInfoWeatherFirst.remove();
                //         cloneInfoHumidityFirst.remove();
                //         cloneInfoWindFirst.remove();
                //     }, 2200);
                // }
            }
        });
});
