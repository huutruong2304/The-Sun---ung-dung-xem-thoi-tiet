// console.log(2);
//địa chỉ mặc định sẽ nhảy ra
const autoAddress = 'hanoi,vietnam';



const weatherForm = document.querySelector('#search-form');
const search = document.querySelector('#search-input');
const air = document.querySelector('#main-air');
const iconAir = document.querySelector('#icon-air');
const humidity = document.querySelector('#main-humidity');
const uv = document.querySelector('#main-uv');
const wind = document.querySelector('#main-wind');
const locationTitle = document.querySelector('#location');
const date = document.querySelector('#date');
const time = document.querySelector('#time');


// khai báo object các bảng bên phải week. dùng kiểu object giúp tiết kiệm việc đặt biến
const wArea = {
    today: {
        title: document.querySelector('#wToday h5'),
        icon: document.querySelector('#wToday img'),
        temp: document.querySelector('#wToday p span')
    },
    nextDay1: {
        title: document.querySelector('#wNextDay1 h5'),
        icon: document.querySelector('#wNextDay1 img'),
        temp: document.querySelector('#wNextDay1 p span')
    },
    nextDay2: {
        title: document.querySelector('#wNextDay2 h5'),
        icon: document.querySelector('#wNextDay2 img'),
        temp: document.querySelector('#wNextDay2 p span')
    },
    nextDay3: {
        title: document.querySelector('#wNextDay3 h5'),
        icon: document.querySelector('#wNextDay3 img'),
        temp: document.querySelector('#wNextDay3 p span')
    }
}

const week = ['sun', 'mon', 'tue', 'wed', 'thurs', 'fri', 'sat', ];

function setDay(timestamp) {
    let date = new Date(timestamp * 1000);
    return week[date.getDay()];
}

// function setCurTime(curDate) {
//     date.textContent = curDate.getDate() + '/' + (curDate.getMonth() + 1) + '/' + curDate.getFullYear();
//     time.textContent = curDate.getHours() + ':' + curDate.getMinutes();
// }

function getWeather(address) {
    const curDate = new Date();
    fetch('/weather?address=' + address).then(response => {
        response.json().then(data => {
            if (data.err) {
                console.log(data);
            } else {
                //set những chỉ số hiện tại như sức gió, nhiệt độ, độ ẩm
                wind.textContent = data.windSpeed;
                air.textContent = data.temperature.toFixed(1);
                humidity.textContent = data.humidity * 100;
                uv.textContent = data.uvIndex;
                locationTitle.textContent = data.location;

                //set thời gian hiện tại
                date.textContent = curDate.getDate() + '/' + (curDate.getMonth() + 1) + '/' + curDate.getFullYear();
                time.textContent = curDate.getHours() + ':' + curDate.getMinutes();

                //set chỉ số nhiệt độ của 3 ngày tính từ ngày hiện tại. nhiệt độ trung bình
                wArea.today.temp.textContent = (data.temperature).toFixed(1);
                wArea.nextDay1.temp.textContent = ((data.nextDay1.temperatureHigh + data.nextDay1.temperatureLow) / 2).toFixed(1);
                wArea.nextDay2.temp.textContent = ((data.nextDay2.temperatureHigh + data.nextDay2.temperatureLow) / 2).toFixed(1);
                wArea.nextDay3.temp.textContent = ((data.nextDay3.temperatureHigh + data.nextDay3.temperatureLow) / 2).toFixed(1);

                //set chỉ số ngày thứ
                wArea.today.title.textContent = week[curDate.getDay()];
                wArea.nextDay1.title.textContent = setDay(data.nextDay1.time);
                wArea.nextDay2.title.textContent = setDay(data.nextDay2.time);
                wArea.nextDay3.title.textContent = setDay(data.nextDay3.time);

                //set icon
                iconAir.setAttribute('src', 'assets/kindweather/' + data.icon + '.png');
                wArea.today.icon.setAttribute('src', 'assets/kindweather/' + data.icon + '.png');
                wArea.nextDay1.icon.setAttribute('src', 'assets/kindweather/' + data.nextDay1.icon + '.png');
                wArea.nextDay2.icon.setAttribute('src', 'assets/kindweather/' + data.nextDay2.icon + '.png');
                wArea.nextDay3.icon.setAttribute('src', 'assets/kindweather/' + data.nextDay3.icon + '.png');
            }
        })
    })
}


getWeather(autoAddress);
search.value = autoAddress;

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const address = search.value;
    getWeather(address);
})

// console.log('kakak');