function setBackground(condition) {
  if (condition.includes("sun")) {
    document.body.style.background = "linear-gradient(135deg, #f7971e, #ffd200)";
  } else if (condition.includes("cloud")) {
    document.body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
  } else if (condition.includes("rain")) {
    document.body.style.background = "linear-gradient(135deg, #314755, #26a0da)";
  } else {
    document.body.style.background = "linear-gradient(135deg, #1a0b2e, #0f0c29)";
  }
}

async function fetchWeather(query) {
  const url = `https://wttr.in/${query}?format=j1`;

  const res = await fetch(url);
  const data = await res.json();

  const current = data.current_condition[0];

  document.getElementById("cityName").innerText = query;
  document.getElementById("temp").innerText = current.temp_C + "°C";
  document.getElementById("desc").innerText = current.weatherDesc[0].value;
  document.getElementById("humidity").innerText = current.humidity + "%";
  document.getElementById("wind").innerText = current.windspeedKmph + " km/h";

  document.getElementById("weatherCard").classList.remove("hidden");

  setBackground(current.weatherDesc[0].value.toLowerCase());
}

function getWeather() {
  const city = document.getElementById("city").value;
  if (city) fetchWeather(city);
}

function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    fetchWeather(`${lat},${lon}`);
  });
}