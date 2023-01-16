// editing HTML
function renderWeather(weather) {
  // reference HTML elements results summary
  const resultTemp = document.getElementById("result-temp");
  const resultPlace = document.getElementById("result-place");
  const resultWeather = document.getElementById("result-weather");
  const resultWeatherDesc = document.getElementById("result-weather-desc");
  // reference HTML elements results details
  const resultFeeling = document.getElementById("result-feeling");
  const resultHumidty = document.getElementById("result-humidity");
  const resultPressure = document.getElementById("result-pressure");
  const resultMinTemp = document.getElementById("result-mintemp");
  const resultMaxTemp = document.getElementById("result-maxtemp");
  // update HTML
  resultTemp.innerText = weather.main.temp + "°";
  resultPlace.innerText = weather.name;
  resultWeather.innerText = weather.weather[0].main;
  resultWeatherDesc.innerText = weather.weather[0].description;
  resultFeeling.innerText = weather.main.feels_like + "°";
  resultHumidty.innerText = weather.main.humidity + "%";
  resultPressure.innerText = weather.main.pressure + "mb";
  resultMinTemp.innerText = weather.main.temp_min + "°";
  resultMaxTemp.innerText = weather.main.temp_max + "°";
}

// getting data from Open Weather Map API
function fetchWeather(query, units) {
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=ae4e2d975dabdb9874f3abfe7179c0a8`;
  fetch(url, {
    mode: "cors",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      renderWeather(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

// handle unit convert button
function handleConvertUnitsBtn() {
  const convertUnitsBtn = document.getElementById("convert-units-btn");
  convertUnitsBtn.addEventListener("click", handleClick);
  let resultPlace;

  function handleClick() {
    const value = convertUnitsBtn.value;
    resultPlace = document.getElementById("result-place");

    if (value === "imperial") {
      convertUnitsBtn.innerText = "°F";
      convertUnitsBtn.value = "metric";
    } else {
      convertUnitsBtn.innerText = "°C";
      convertUnitsBtn.value = "imperial";
    }

    fetchWeather(resultPlace.innerText, value);
  }
}

// handle search input
function handleInput() {
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const containerMain = document.getElementById("container-main");
  const resultsContainer = document.getElementById("results-container");
  const errorBtn = document.getElementById("errorBtn");

  searchBtn.addEventListener("click", handleClick);

  function handleClick() {
    if (!searchInput.value) {
      if (!errorBtn.classList.contains("active")) {
        errorBtn.classList.toggle("active");
      }
    } else {
      // fetch weather details

      console.log(fetchWeather(searchInput.value, "metric"));

      if (fetchWeather(searchInput.value, "metric") !== "error") {
        // update display
        containerMain.classList.toggle("active");
        resultsContainer.classList.toggle("active");
      }
    }
  }

  // handle return button
  const returnBtn = document.getElementById("return-btn");
  returnBtn.addEventListener("click", handleReturnBtn);

  function handleReturnBtn() {
    // update display
    containerMain.classList.toggle("active");
    resultsContainer.classList.toggle("active");
  }
}

// MAIN
handleInput();
// handle unit conversion
handleConvertUnitsBtn();
