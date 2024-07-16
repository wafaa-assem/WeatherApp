// select today 
const today = document.getElementById("today");
const monthOfToday = document.getElementById("monthOfToday");
const theCity = document.getElementById("city");
const tempretureOFToday = document.getElementById("temOfToday");
const iconForConditionToday = document.getElementById("iconConditionToday");
const ConditionOfToday = document.getElementById("conditionOfToday");
const humdityOfToday = document.getElementById("humdity");
const windkphOfToday = document.getElementById("windkph");
const winddirOfToday = document.getElementById("winddir");

//select next days
const nextDay = document.querySelectorAll(".nextDay");
const iconForNextDay = document.querySelectorAll(".nextDayIconCondition");
const nextDayMaxTem = document.querySelectorAll(".nextDayMaxTem");
const nextDayMinTem = document.querySelectorAll(".nextDayMinTem");
const nextDayCondition = document.querySelectorAll(".nextDayCondition");

//select search input
const searchInput = document.getElementById("findLocation");

//search for city 
searchInput.addEventListener("input",function(){
    runProj(this.value);
});

//fetch api data for today
async function getweatherData(city){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6337906d4096426aa59133109240307&q=${city}&days=3&aqi=no&alerts=no`);
    let finalResponse = await response.json();
    return finalResponse;
}

//display today 
function displayToday(data){
    let todayDate = new Date();
    today.innerHTML = todayDate.toLocaleString("en-us",{weekday:"long"});
    monthOfToday.innerHTML = `${todayDate.getDate()} ${todayDate.toLocaleString("en-us",{month:"long"})}`;
    theCity.innerHTML = data.location.name;
    tempretureOFToday.innerHTML = data.current.temp_c + '&deg;C';
    iconForConditionToday.setAttribute("src",`https:${data.current.condition.icon}`);
    ConditionOfToday.innerHTML = data.current.condition.text;
    humdityOfToday.innerHTML = data.current.humidity + '%';
    windkphOfToday.innerHTML =  data.current.wind_kph + 'km/h';
    winddirOfToday.innerHTML = data.current.wind_dir;
}

// display tomorrow and next day
function displayNextDays(data){
let forecastDays = data.forecast.forecastday;      // [{},{},{}]
for (let i = 0; i < 2; i++) { //querySelectorAll => [element1, elemnt2] => nodeList
    let nextDaysDate = new Date(forecastDays[i+1].date);
    nextDay[i].innerHTML = nextDaysDate.toLocaleString("en-us",{weekday:"long"});
    iconForNextDay[i].setAttribute("src",`https:${forecastDays[i+1].day.condition.icon}`)
    nextDayMaxTem[i].innerHTML = forecastDays[i+1].day.maxtemp_c + '&deg;C';
    nextDayMinTem[i].innerHTML =  forecastDays[i+1].day.mintemp_c + '&deg;';
    nextDayCondition[i].innerHTML = forecastDays[i+1].day.condition.text ;
}
}

//run the project
async function runProj(value="cairo"){                       
    let weatherData = await getweatherData(value);  
    if(!weatherData.error){             //weatherData => {error}  or {location:{}, current:{}, forecast:{}}
        displayToday(weatherData);
        displayNextDays(weatherData);
    }              
}
runProj();
 
       
