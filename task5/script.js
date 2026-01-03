const apiKey = "fb04c20e502a428c8f283841252512";
const card = document.getElementById("card");
const bgVideo = document.getElementById("bgVideo");
const info = document.getElementById("info");
const tip = document.getElementById("tip");
let searchedOnce = false;

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  if (!city) return alert("Enter city name");

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    showWeather(data);
    applyWeatherTheme(data.current.condition.text);
    showWeatherTip(data.current.condition.text);
  } catch {
    document.getElementById("result").innerHTML = "City not found ❌";
    tip.style.opacity = 0;
  }
}

function showWeather(data) {
  document.getElementById("result").innerHTML = `
        <h2 class="text-2xl font-semibold mb-2 text-white dark:text-yellow-200">${data.location.name}, ${data.location.country}</h2>
        <img src="https:${data.current.condition.icon}" class="mx-auto my-2 w-20 transition-all duration-500">
        <p class="text-xl font-bold mb-1 text-white dark:text-gray-200">${data.current.temp_c}°C</p>
        <p class="mb-1 text-white dark:text-gray-200">${data.current.condition.text}</p>
        <p class="text-white dark:text-gray-200">Humidity: ${data.current.humidity}%</p>
    `;
}

function applyWeatherTheme(condition) {
  condition = condition.toLowerCase();

  if (!searchedOnce) {
    bgVideo.style.display = "block";
    searchedOnce = true;
  }

  let cardBg = "bg-white/20 dark:bg-gray-900/20"; // transparent card

  if (condition.includes("sun") || condition.includes("clear")) {
    bgVideo.src = "videos/sunny.mp4";
    cardBg = "bg-yellow-200/30 dark:bg-yellow-900/30";
  } else if (condition.includes("spring") || condition.includes("cherry")) {
    bgVideo.src = "videos/spring.mp4";
    cardBg = "bg-pink-200/30 dark:bg-pink-900/30";
  } else if (condition.includes("snow")) {
    bgVideo.src = "videos/snow.mp4";
    cardBg = "bg-blue-100/30 dark:bg-blue-900/30";
  } else if (condition.includes("rain")) {
    bgVideo.src = "videos/rain.mp4";
    cardBg = "bg-blue-300/30 dark:bg-blue-800/30";
  } else if (condition.includes("cloud")) {
    bgVideo.src = "videos/cloudy.mp4";
    cardBg = "bg-gray-300/30 dark:bg-gray-800/30";
  } else {
    bgVideo.src = "videos/cloudy.mp4";
    cardBg = "bg-gray-300/30 dark:bg-gray-800/30";
  }

  bgVideo.style.opacity = 0;
  bgVideo.load();
  setTimeout(() => {
    bgVideo.style.opacity = 1;
  }, 100);

  card.className = `relative z-10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 max-w-md w-11/12 flex flex-col items-center transition-all duration-700 ${cardBg}`;
}

function showWeatherTip(condition) {
  condition = condition.toLowerCase();
  let message = "";

  if (condition.includes("sun") || condition.includes("clear")) {
    message = "☀️ Sunny Day! Perfect time for a walk outside!";
  } else if (condition.includes("spring") || condition.includes("cherry")) {
    message = "🌸 Spring vibes! Enjoy the cherry blossoms!";
  } else if (condition.includes("snow")) {
    message = "❄️ Snow alert! Stay warm and cozy!";
  } else if (condition.includes("rain")) {
    message = "🌧 Rainy weather! Don’t forget your umbrella!";
  } else if (condition.includes("cloud")) {
    message = "☁️ Cloudy skies! Maybe a perfect reading day!";
  } else {
    message = "🌤 Have a great day!";
  }

  tip.innerText = message;
  tip.style.opacity = 0;
  tip.style.transform = "translateY(10px)";
  setTimeout(() => {
    tip.style.opacity = 1;
    tip.style.transform = "translateY(0)";
  }, 50);
}

function clearInput() {
  document.getElementById("city").value = "";
  document.getElementById("result").innerHTML = "";
  tip.style.opacity = 0;
  info.className =
    "text-white dark:text-gray-200 text-center mb-6 text-base px-4 py-2 rounded-lg bg-black/30 dark:bg-white/20 transition-all duration-700";
  bgVideo.style.opacity = 0;
  bgVideo.style.display = "none";
  document.body.style.backgroundImage =
    "url('https://images.unsplash.com/photo-1501973801540-537f08ccae7b')";
}
