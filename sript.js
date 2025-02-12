const imageUrl = {
    thunderstorm: "snowflake.png",
    rain: "rainy-day.png",
    clear: "hot.png",
}

function updateWeatherIcon(condition) {
    let url = imageUrl[condition] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSssMsdbkrxD5yUeUpErTeQD3FqHIwYhmSmFA&s"; // Fallback image

    console.log("Weather Condition:", condition);
    console.log("Image URL:", url);

    // Fix: Select the correct <img> element
    let imgElement = document.querySelector(".weather-icon");

    if (imgElement) {
        imgElement.src = url; // Update image source
    } else {
        console.error("Weather icon element not found!");
    }
}

const getRes = async () => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
    return await res.json(); // Extract JSON data
};

document.querySelector("button").addEventListener("click", async function () {
    city = document.getElementById("cityInput").value;
    let cityNameElement = document.getElementById("cityName");

    if (city.trim() !== "") {
        cityNameElement.innerText = city;
    }

    // Get API data
    let weatherData = await getRes();
    console.log(weatherData); // Debugging to check response

    let cityNameTemp = document.getElementById("temperature");
    if (weatherData.main) {
        cityNameTemp.innerText = `Temperature: ${weatherData.main.temp}°C`;
    }

    // Update weather icon
    if (weatherData.weather && weatherData.weather.length > 0) {
        let condition = weatherData.weather[0].main.toLowerCase(); // Convert condition to lowercase
        updateWeatherIcon(condition);
    }
});