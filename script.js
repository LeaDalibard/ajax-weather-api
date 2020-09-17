(() => {
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
        const numberDays = 7;
        for (let j = 0; j < numberDays; j++) {
            if (dayFrom[j] < numberDays - 1) {
                dayFrom[j + 1] = dayFrom[j] + 1
            } else (dayFrom[j + 1] = 0)
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
        console.log(timeLapses);

    }

    //---------------------- Distributed data per day

    function distribute() {
        let promiseTime = Promise.resolve(getTimeLapses(response))
        promiseTime.then(result => {
            let promiseTemp = Promise.resolve(getTemp(response))
            promiseTemp.then(temp => {
                let promiseTemp = Promise.resolve(getTemp(response))
            })
        })
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
        return (arrSum/arr.length).toFixed(1)
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
                var dayOne = new Object();
                var dayTwo = new Object();
                var dayThree = new Object();
                var dayFour = new Object();
                var dayFive = new Object();
                dayOne.temp = average(getTemp(response).slice(0, lengthDayOne))
                dayTwo.temp = average(getTemp(response).slice(lengthDayOne, lengthDayOne + lengthDayTwo))
                dayThree.temp =average(getTemp(response).slice(lengthDayOne + lengthDayTwo, lengthDayOne + lengthDayTwo + lengthDayThree))
                dayFour.temp = average(getTemp(response).slice(lengthDayOne + lengthDayTwo + lengthDayThree, lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour))
                dayFive.temp = average(getTemp(response).slice(lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour, lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour + lengthDayFive))
                dayOne.feels_like = average(getFeels_like(response).slice(0, lengthDayOne))
                dayTwo.feels_like = average(getFeels_like(response).slice(lengthDayOne, lengthDayOne + lengthDayTwo))
                dayThree.feels_like = average(getFeels_like(response).slice(lengthDayOne + lengthDayTwo, lengthDayOne + lengthDayTwo + lengthDayThree))
                dayFour.feels_like = average(getFeels_like(response).slice(lengthDayOne + lengthDayTwo + lengthDayThree, lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour))
                dayFive.feels_like = average(getFeels_like(response).slice(lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour, lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour + lengthDayFive))
                dayOne.temp_min = average(getTemp_min(response).slice(0, lengthDayOne))
                dayTwo.temp_min =average(getTemp_min(response).slice(lengthDayOne, lengthDayOne + lengthDayTwo))
                dayThree.temp_min = average(getTemp_min(response).slice(lengthDayOne + lengthDayTwo, lengthDayOne + lengthDayTwo + lengthDayThree))
                dayFour.temp_min = average(getTemp_min(response).slice(lengthDayOne + lengthDayTwo + lengthDayThree, lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour))
                dayFive.temp_min = average(getTemp_min(response).slice(lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour, lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour + lengthDayFive))
                dayOne.temp_max = average(getTemp_max(response).slice(0, lengthDayOne))
                dayTwo.temp_max = average(getTemp_max(response).slice(lengthDayOne, lengthDayOne + lengthDayTwo))
                dayThree.temp_max =average(getTemp_max(response).slice(lengthDayOne + lengthDayTwo, lengthDayOne + lengthDayTwo + lengthDayThree))
                dayFour.temp_max =average(getTemp_max(response).slice(lengthDayOne + lengthDayTwo + lengthDayThree, lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour))
                dayFive.temp_max = average(getTemp_max(response).slice(lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour, lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour + lengthDayFive))
                console.log(dayOne.temp_max)
                console.log(dayTwo.temp_max)
                console.log(dayThree.temp_max)
                console.log(dayFour.temp_max)
                console.log(dayFive.temp_max)
                dayOne.weather = getWeather(response).slice(0, lengthDayOne)
                dayTwo.weather = getWeather(response).slice(lengthDayOne, lengthDayOne + lengthDayTwo)
                dayThree.weather = getWeather(response).slice(lengthDayOne + lengthDayTwo, lengthDayOne + lengthDayTwo + lengthDayThree)
                dayFour.weather = getWeather(response).slice(lengthDayOne + lengthDayTwo + lengthDayThree, lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour)
                dayFive.weather = getWeather(response).slice(lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour, lengthDayOne + lengthDayTwo + lengthDayThree + lengthDayFour + lengthDayFive)

            })


    }


})();

