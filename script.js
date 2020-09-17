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

    //----------------------Declaring variable


    let feels_like = [];
    let temp_min = [];
    let temp_max = [];
    let weather = [];

    //---------------------- get TimeLapses and distributed them in 5 days

    function getTimeLapses(response) {
        return new Promise (resolve => {
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
            console.log(timeLapses);
            console.log(day1);
            console.log(day2);
            console.log(day3);
            console.log(day4);
            console.log(day5);

        })

    }
    //---------------------- Distributed data per day

    function distribute(array){
        array.day1=array.splice(0, dayFrom.length-day1.length)
            console.log(array.day1)
    }




    //---------------------- get Temperature global

    function getTemp(response) {
        return new Promise(resolve => {
            let temp = [];
            for (let i = 0; i < response.data["list"].length; i++) {
                temp.push(response.data["list"][i]["main"]["temp"])
            }
            console.log(temp);
        })

    }

    //---------------------- get Feels like

    function getFeels_like(response) {
        for (let i = 0; i < response.data["list"].length; i++) {
            feels_like.push(response.data["list"][i]["main"]["feels_like"])
        }
        console.log(feels_like);
    }

    //---------------------- get temperature minimal

    function getTemp_min(response) {

        for (let i = 0; i < response.data["list"].length; i++) {
            temp_min.push(response.data["list"][i]["main"]["temp_min"])
        }
        console.log(temp_min);
    }

    //---------------------- get temperature maximal

    function getTemp_max(response) {

        for (let i = 0; i < response.data["list"].length; i++) {
            temp_max.push(response.data["list"][i]["main"]["temp_max"])
        }
        console.log(temp_max);
    }

//---------------------- get weather

    function getWeather(response) {
        for (let i = 0; i < response.data["list"].length; i++) {
            weather.push(response.data["list"][i]["weather"][0]["main"])
        }
        console.log(weather);
    }

//---------------------- get final results

    function doTheThing() {
        var city = document.getElementById("city").value;
        getData(city)
            .then(response => {
                getTimeLapses(response)
                temp=getTemp(response)
                getFeels_like(response)
                getTemp_min(response)
                getTemp_max(response)
                getWeather(response)
                console.log(response.data["list"])
            })
            .then(response=>{distribute(temp)})

    }


})();