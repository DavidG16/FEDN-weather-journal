const apikey = "f40c638941f8ec61c23eef964c696ae0";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}

// even handler 
function  perfomAction  (e) {
    e.preventDefault();
    const zip = document.getElementById("zip").value;
    const userContent = document.getElementById("my-content").value;
    getWeatherData(zip, baseURL , apikey).then(function(data){
        postData("/add", {temperature: data.main.temp, date: date, userContent}).then(function(newData){
            updateUI("/showdata")});
    })
} 


document.getElementById("generate").addEventListener('click', perfomAction);


// Create date
let d = new Date();
let date = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// get weather data from API
const getWeatherData = async (zip, baseURL, apikey) => {
    const url = (`${baseURL}${zip}&appid=${apikey}`);
    const res =  await fetch(url);
    try {
        const data = await res.json();
        return data;

    } catch (error) {
        console.error('error');
    }
}


//  post entry
const postData = async (url = "", data = {}) => {
    const req = await fetch (url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            date : data.date,
            temperature : data.temperature,
            userContent : data.userContent
        }),

    }) ;
    try {
        const newData = await req.json();
        return newData

    } catch(error) {
        console.log('error', error)

    }
};

// kelvin to celcius
function kelvinCelcius  (kelvin) {
    celcius = kelvin - 273.15
    return celcius
}

// update UI
const updateUI  = async (url) =>{
    response = await fetch(url) 
    try {
        const data = await response.json()
        const temp = kelvinCelcius(data.temperature)
        document.getElementById('date').innerHTML = data.date
        document.getElementById('content').innerHTML = data.userContent
         document.getElementById('temp').innerHTML = `${Math.round(temp)}ºC`;
    } catch (error) {
        console.log(error);
    };
    
};



