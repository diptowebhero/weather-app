const infoText = document.querySelector(".info_text");
const inputField = document.querySelector("input");
const weatherPart = document.querySelector(".weather_part"),
  weatherIcon = weatherPart.querySelector("img");
const apiKey = "2f829bf3b4e30c2fa26f091856f3ce81";

let api;

inputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
} else {
  alert("Your browser not support geolocation api");
}

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}139&units=metric&appid=${apiKey}`;
  fetchData();
}
function onError(err) {
  infoText.innerText = err.message;
  infoText.classList.add("error");
}

function fetchData() {
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherInfo(result))
    .catch((err) => alert("invalid city name"));
}

function weatherInfo(info) {
  console.log(info);
  const cityAndCountry = info.name + "," + info.sys.country;
  const { description, id } = info.weather[0];
  const { temp, feels_like, humidity } = info.main;

  //   showing data in ui
  if (id == 800) {
    weatherIcon.src = "../weather Icons/clear.svg";
  } else if (id >= 200 && id <= 232) {
    weatherIcon.src = "../weather Icons/storm.svg";
  } else if (id >= 600 && id <= 622) {
    weatherIcon.src = "../weather Icons/snow.svg";
  } else if (id >= 701 && id <= 781) {
    weatherIcon.src = "../weather Icons/haze.svg";
  } else if (id >= 801 && id <= 804) {
    weatherIcon.src = "../weather Icons/haze.svg";
  } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
    weatherIcon.src = "../weather Icons/rain.svg";
  }
  weatherPart.querySelector(".temp .numb").innerHTML = Math.floor(temp);
  weatherPart.querySelector(".weather").innerHTML = description;
  weatherPart.querySelector(".location span").innerHTML = cityAndCountry;
  weatherPart.querySelector(".temp .numb2").innerHTML = Math.floor(feels_like);
  weatherPart.querySelector(".humidity .numb").innerHTML = Math.floor(humidity);
  inputField.value = "";
  infoText.style.display = "none";
}

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchData();
}
