/* Global Variables */
const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const apiKey =
  "&appid=afcc183a26f96dfccf162aceddb1be0d&units=imperial";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate =
  d.getMonth() +
  "1" + "/"+
  d.getDate() +
  "/" +
  d.getFullYear();
// Event listener to add function to existing HTML DOM element
document
  .getElementById("generate")
  .addEventListener("click", getWeather);
/* Function called by event listener */
function getWeather(e) {
  const zipCode =
    document.getElementById("zip").value;
  const feelings =
    document.getElementById("feelings").value;
  const user_response = {
    zip_code: zipCode,
    feelings: feelings,
  };
  getWeatherData(baseURL, zipCode, apiKey)
    .then(function (data) {
      postData("/add", {
        temperature: data.main.temp,
        date: newDate,
        user_response: user_response,
      });
    })
    .then(updateUI);
}

/* Function to GET Web API Data*/
const getWeatherData = async (
  baseURL,
  zipCode,
  key
) => {
  const res = await fetch(
    baseURL + zipCode + key
  );
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML =
      allData.date;
    document.getElementById("temp").innerHTML =
      Math.round(allData.temperature) +
      "degrees";
    document.getElementById("z").innerHTML =
      allData.user_response.zip_code;
    document.getElementById("feel").innerHTML =
      allData.user_response.feelings;
  } catch (error) {
    console.log("error", error);
  }
};
