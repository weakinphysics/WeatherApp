'use-strict';



let weatherObjectCallsApiByItself = {
    //apikey : "input your api key here",
    city: "New Delhi",
    temperature: 40,
    fetchWeather: function(city) {
        this.city = city;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apikey}`)
        .then((response) => response.json())
        .then((data)=> this.displayWeather(data));
    },
    displayWeather: function(data){
        /*
        console.log(data);
        console.log("Temperature is: " + (Number(data?.main?.temp) - 275.13));
        console.log(... data?.weather);
        console.log(data?.coord?.lat);
        console.log(data?.coord?.lon);
        console.log(data?.clouds?.all);
        */
        if(Number(data?.cod) === 404){
            alert("Invalid city, please try again!");
            return;
        }
        const body = document.querySelector("body");
        let now = new Date();
        body.style.backgroundImage = `url(https://source.unsplash.com/random/?${this.city},${(now.hours < 20 && now.hours > 6) ? "day":"night"})`;
        console.log(`url(https://source.unsplash.com/random/?${this.city},${(now.hours < 20 && now.hours > 6)?"day":"night"})`);
        const weatherCard = document.querySelector(".weather");
        if(weatherCard.classList.contains("hidden")){
            weatherCard.classList.remove("hidden");
        }
        this.temperature = (Number(data?.main?.temp) - 275.13);
        this.description = data?.weather[0]?.description;
        this.humidity = data?.main?.humidity + "%";
        this.windSpeed = data?.wind?.speed;
        this.windDir = data?.wind?.deg;
        this.iconsrc = data?.weather[0].icon;
        this.updateWeather();
    },
    updateWeather: function(){
        const city = document.querySelector(".city");
        const temp = document.querySelector(".temperature");
        const icon = document.querySelector(".icon");
        const humidity = document.querySelector(".humidity");
        const wind = document.querySelector(".wind");
        const description = document.querySelector(".description");
        city.textContent = "Weather for: " + weatherObjectCallsApiByItself.city;

        temp.textContent = Math.trunc(weatherObjectCallsApiByItself.temperature);
        humidity.textContent = weatherObjectCallsApiByItself.humidity;
        icon.src = `https://openweathermap.org/img/wn/${weatherObjectCallsApiByItself.iconsrc}@2x.png`;
        wind.textContent = `${weatherObjectCallsApiByItself.windSpeed} along ${weatherObjectCallsApiByItself.windDir}`;
        description.textContent = weatherObjectCallsApiByItself.description;
    }
}
document.querySelector(".weather").classList.add("hidden");
//weatherObjectCallsApiByItself.fetchWeather();
const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector("#search-btn");

const aunty = ()=>{
    weatherObjectCallsApiByItself.fetchWeather(searchBar.value);
}
const bunty = (e)=>{
    if(e.key === 'Enter') weatherObjectCallsApiByItself.fetchWeather(searchBar.value);
}
searchBtn.addEventListener("click", aunty);
searchBar.addEventListener("keypress", bunty);


/*

const searchQuery = document.querySelector(".search-bar");
const searchButton = document.selectElementById("search-btn");
let place = "Delhi";


const foo = ()=>{
    place = searchQuery.value;
    displayWeather();
}
searchButton.addEventListener("click", foo);
*/
