(() => {
    const numberDays = 5;
    const daysWeek = 7;
    var d = new Date();
    var date = d.getDate();


    var secretkey = config.SECRET_KEY;

    city.addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
           doTheThing();
        }
    })
    run.addEventListener("click", doTheThing)


    function getData(input) {
        return new Promise((resolve) => {
                axios.get("http://api.openweathermap.org/data/2.5/forecast?q=" + input + "&units=metric&appid=" + secretkey)
                    .then(data => {
                        resolve(data);
                    }, error => {
                        alert("Type the name of a city.");
                    });
            }
        )
    }

    function getDailyData(lat, lon) {
        return new Promise((resolve) => {
                axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +
                    "&exclude=miutely,hourly&units=metric&appid=" + secretkey)
                    .then(data => {
                        resolve(data);
                    }, error => {
                        alert("error");
                    });
            }
        )
    }


    //---------------------- get TimeLapses and distributed them in 5 days

    function getTimeLapses(response) {
        let timeLapses = [];
        let day1 = [];
        let day2 = [];
        let day3 = [];
        let day4 = [];
        let day5 = [];
        var dayFrom = new Array(5);
        dayFrom[0] = new Date(response.data["list"][0]["dt_txt"]).getDay();
        for (let j = 0; j < numberDays; j++) {
            if (dayFrom[j] < daysWeek - 1) {
                dayFrom[j + 1] = dayFrom[j] + 1
            } else (dayFrom[j + 1] = 0)
        }
        const daysName = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ]
        for (let j = 0; j < dayFrom.length - 1; j++) {
            document.getElementById("day-" + j).innerHTML = daysName[dayFrom[j]]
        }
        for (let i = 0; i < response.data["list"].length; i++) {
            timeLapses.push(response.data["list"][i]["dt_txt"])
        }
        for (let i = 0; i < timeLapses.length; i++) {
            if (new Date(response.data["list"][i]["dt_txt"]).getDay() == dayFrom[0]) {
                day1.push(response.data["list"][i]["dt_txt"])
            } else if (new Date(response.data["list"][i]["dt_txt"]).getDay() == dayFrom[1]) {
                day2.push(response.data["list"][i]["dt_txt"])
            } else if (new Date(response.data["list"][i]["dt_txt"]).getDay() == dayFrom[2]) {
                day3.push(response.data["list"][i]["dt_txt"])
            } else if (new Date(response.data["list"][i]["dt_txt"]).getDay() == dayFrom[3]) {
                day4.push(response.data["list"][i]["dt_txt"])
            } else {
                day5.push(response.data["list"][i]["dt_txt"])
            }
        }
        return [day1, day2, day3, day4, day5];
    }


    function doTheThing() {
        var city = document.getElementById("city").value;
        getData(city)
            .then(response => {
                getTimeLapses(response);
                var lengthDayOne = getTimeLapses(response)[0].length;
                var lengthDayTwo = getTimeLapses(response)[1].length;
                var lengthDayThree = getTimeLapses(response)[2].length;
                var lengthDayFour = getTimeLapses(response)[3].length;
                var lengthDayFive = getTimeLapses(response)[4].length;
                var day = new Object();
                var lat = response.data["city"]["coord"].lat
                var lon = response.data["city"]["coord"].lon
                getDailyData(lat, lon)
                    .then(response => {
                        console.log(response.data["daily"]);
                        let weather = [];
                        let icons = [];
                        for (let i = 0; i < numberDays; i++) {
                            weather.push(response.data["daily"][i]["weather"][0]["main"])
                            icons.push(response.data["daily"][i]["weather"][0]["icon"])
                            document.getElementById("weather-" + i).innerHTML = weather[i]
                            document.getElementById("icons-" + i).src = "https://openweathermap.org/img/wn/" + icons[i] + "@2x.png"
                        }

                        let temp = [];
                        for (let i = 0; i < numberDays; i++) {
                            temp.push(response.data["daily"][i]["temp"]["day"])
                            document.getElementById("temp-" + i).innerHTML = temp[i]
                        }
                        let feels_like = [];
                        for (let i = 0; i < numberDays; i++) {
                            feels_like.push(response.data["daily"][i]["feels_like"]["day"])
                            document.getElementById("feels_like-" + i).innerHTML = feels_like[i]
                        }
                        let temp_min = [];
                        for (let i = 0; i < numberDays; i++) {
                            temp_min.push(response.data["daily"][i]["temp"]["min"])
                            document.getElementById("temp_min-" + i).innerHTML = temp_min[i]
                        }
                        let temp_max = [];
                        for (let i = 0; i < numberDays; i++) {
                            temp_max.push(response.data["daily"][i]["temp"]["max"])
                            document.getElementById("temp_max-" + i).innerHTML = temp_max[i]
                        }

                    })
            })


    }


})();

/*
(() => {
    const numberDays=5;
    const daysWeek=7;
    var d = new Date();
    var date = d.getDate();


    var secretkey = config.SECRET_KEY;
    run.addEventListener("click", doTheThing)

    function getData(input) {
        return new Promise((resolve) => {
                axios.get("http://api.openweathermap.org/data/2.5/forecast?q=" + input + "&units=metric&appid=" + secretkey)
                    .then(data => {
                        resolve(data);
                    }, error => {
                        alert("Type the name of a city.");
                    });
            }
        )
    }

    function getDailyData(lat, lon) {
        return new Promise((resolve) => {
                axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +
                    "&exclude=miutely,hourly&units=metric&appid=" + secretkey)
                    .then(data => {
                        resolve(data);
                    }, error => {
                        alert("error");
                    });
            }
        )
    }


    //---------------------- get TimeLapses and distributed them in 5 days

    function getTimeLapses(response) {
        let timeLapses = [];
        let day1 = [];
        let day2 = [];
        let day3 = [];
        let day4 = [];
        let day5 = [];
        var dayFrom = new Array(5);
        dayFrom[0] = new Date(response.data["list"][0]["dt_txt"]).getDay();
        for (let j = 0; j < numberDays; j++) {
            if (dayFrom[j] < daysWeek-1) {
                dayFrom[j + 1] = dayFrom[j] + 1
            } else (dayFrom[j + 1] = 0)
        }
        const daysName = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ]
       for (let j = 0; j < dayFrom.length-1; j++) {
        document.getElementById("day-"+j).innerHTML=daysName[dayFrom[j]]
        }
        for (let i = 0; i < response.data["list"].length; i++) {
            timeLapses.push(response.data["list"][i]["dt_txt"])
        }
        for (let i = 0; i < timeLapses.length; i++) {
            if (new Date(response.data["list"][i]["dt_txt"]).getDay() == dayFrom[0]) {
                day1.push(response.data["list"][i]["dt_txt"])
            } else if (new Date(response.data["list"][i]["dt_txt"]).getDay() == dayFrom[1]) {
                day2.push(response.data["list"][i]["dt_txt"])
            } else if (new Date(response.data["list"][i]["dt_txt"]).getDay() == dayFrom[2]) {
                day3.push(response.data["list"][i]["dt_txt"])
            } else if (new Date(response.data["list"][i]["dt_txt"]).getDay() == dayFrom[3]) {
                day4.push(response.data["list"][i]["dt_txt"])
            } else {
                day5.push(response.data["list"][i]["dt_txt"])
            }
        }
        return [day1, day2, day3, day4, day5];
    }


    //---------------------- get Temperature global

    function getTemp(response) {
        let temp = [];
        for (let i = 0; i < response.data["list"].length; i++) {
            temp.push(response.data["list"][i]["main"]["temp"])
        }
        return temp
    }

    //---------------------- get Feels like

    function getFeels_like(response) {
        let feels_like = [];
        for (let i = 0; i < response.data["list"].length; i++) {
            feels_like.push(response.data["list"][i]["main"]["feels_like"])
        }
        return feels_like;
    }

    //---------------------- get temperature minimal

    function getTemp_min(response) {
        let temp_min = [];
        for (let i = 0; i < response.data["list"].length; i++) {
            temp_min.push(response.data["list"][i]["main"]["temp_min"])
        }
        return temp_min;
    }

    //---------------------- get temperature maximal

    function getTemp_max(response) {
        let temp_max = [];
        for (let i = 0; i < response.data["list"].length; i++) {
            temp_max.push(response.data["list"][i]["main"]["temp_max"])
        }
        return temp_max;
    }

//---------------------- get weather
    let weather = [];

    function getWeather(response) {
        for (let i = 0; i < response.data["list"].length; i++) {
            weather.push(response.data["list"][i]["weather"][0]["main"])
        }
        return weather;
    }

    function average(arr) {
        arrSum = arr.reduce((a, b) => a + b, 0);
        return (arrSum / arr.length).toFixed(1)
    }

//---------------------- get final results

    function doTheThing() {
        var city = document.getElementById("city").value;
        getData(city)
            .then(response => {
                getTimeLapses(response);
                var lengthDayOne = getTimeLapses(response)[0].length;
                var lengthDayTwo = getTimeLapses(response)[1].length;
                var lengthDayThree = getTimeLapses(response)[2].length;
                var lengthDayFour = getTimeLapses(response)[3].length;
                var lengthDayFive = getTimeLapses(response)[4].length;
                getTemp(response);
                var day = new Object();
                day.temp = [];
                day.temp.push(average(getTemp(response).slice(0, lengthDayOne)))
                day.temp.push(average(getTemp(response).slice(lengthDayOne, lengthDayOne + lengthDayTwo)))
                day.temp.push(average(getTemp(response).slice(lengthDayOne + lengthDayTwo, lengthDayOne + lengthDayTwo + lengthDayThree)))
                day.temp.push(average(getTemp(response).slice(lengthDayOne + lengthDayTwo + lengthDayThree, lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour)))
                day.temp.push(average(getTemp(response).slice(lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour, lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour + lengthDayFive)))
                console.log(day.temp)
                day.feels_like = [];
                day.feels_like.push(average(getFeels_like(response).slice(0, lengthDayOne)))
                day.feels_like.push(average(getFeels_like(response).slice(lengthDayOne, lengthDayOne + lengthDayTwo)))
                day.feels_like.push(average(getFeels_like(response).slice(lengthDayOne + lengthDayTwo, lengthDayOne + lengthDayTwo + lengthDayThree)))
                day.feels_like.push(average(getFeels_like(response).slice(lengthDayOne + lengthDayTwo + lengthDayThree, lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour)))
                day.feels_like.push(average(getFeels_like(response).slice(lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour, lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour + lengthDayFive)))
                console.log(day.feels_like)
                day.temp_min = [];
                day.temp_min.push(average(getTemp_min(response).slice(0, lengthDayOne)))
                day.temp_min.push(average(getTemp_min(response).slice(lengthDayOne, lengthDayOne + lengthDayTwo)))
                day.temp_min.push(average(getTemp_min(response).slice(lengthDayOne + lengthDayTwo, lengthDayOne + lengthDayTwo + lengthDayThree)))
                day.temp_min.push(average(getTemp_min(response).slice(lengthDayOne + lengthDayTwo + lengthDayThree, lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour)))
                day.temp_min.push(average(getTemp_min(response).slice(lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour, lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour + lengthDayFive)))
                console.log(day.temp_min)
                day.temp_max = [];
                day.temp_max.push(average(getTemp_max(response).slice(0, lengthDayOne)))
                day.temp_max.push(average(getTemp_max(response).slice(lengthDayOne, lengthDayOne + lengthDayTwo)))
                day.temp_max.push(average(getTemp_max(response).slice(lengthDayOne + lengthDayTwo, lengthDayOne + lengthDayTwo + lengthDayThree)))
                day.temp_max.push(average(getTemp_max(response).slice(lengthDayOne + lengthDayTwo + lengthDayThree, lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour)))
                day.temp_max.push(average(getTemp_max(response).slice(lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour, lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour + lengthDayFive)))
                console.log(day.temp_max)
                for (let i = 0; i < day.temp.length; i++) {
                    document.getElementById("temp-" + i).innerHTML = day.temp[i]
                    document.getElementById("feels_like-" + i).innerHTML = day.feels_like[i]
                    document.getElementById("temp_min-" + i).innerHTML = day.temp_min[i]
                    document.getElementById("temp_max-" + i).innerHTML = day.temp_max[i]
                }
                console.log(response.data["city"]["coord"])
                var lat = response.data["city"]["coord"].lat
                var lon = response.data["city"]["coord"].lon
                getDailyData(lat, lon)
                    .then(response=>{
                        console.log(response.data["daily"][0]["temp"]["day"]);
                        let weather=[];
                        for (let i=0; i<numberDays; i++)
                        {weather.push(response.data["daily"][i]["weather"][0]["main"])
                            document.getElementById("weather-" + i).innerHTML = weather[i]
                        }
                    })
            })


    }


})();
*/
