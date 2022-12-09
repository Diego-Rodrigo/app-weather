const container = document.querySelector('.container');
const search = document.querySelector('.box-search button');
const weatherBox = document.querySelector('.box-weather');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener("click", () => {
    console.log(search);
    const API_key = 'ADD_YOUR_KEY'
    const city = document.querySelector('.box-search input').value;

    if(city === '')
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`)
    .then(response => response.json())
    
    .then(json => {
        if(json.cod === '404'){
            container.style.height = '400px';

            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';

            error404.style.display = 'block';
            error404.classList.add('fadeIn')

            return
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn')

        const image = document.querySelector('.box-weather img')
        const temperature = document.querySelector('.box-weather .temperature')
        const description = document.querySelector('.box-weather .description')
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch(json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                break;

            case 'Rain':
                image.src = 'images/rain.png';
                break;

            case 'Snow':
                image.src = 'images/snow.png';
                break;

            case 'Clouds':
                image.src = 'images/clouds.png';
                break;

            case 'Haze':
                image.src = 'images/haze.png';
                break;
                       
            default:
                image.src = '';
                
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>ºC</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');

        container.style.height = '590px';
    })
})