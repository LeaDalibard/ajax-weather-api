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

    /*function getTime(response){
         let timesInterval=[];
         for (let i=0; i<)
     }*/

    function getTimeLapses(response) {
        let timeLapses = [];
        for (let i = 0; i < response.data["list"].length; i++) {
            timeLapses.push(response.data["list"][i]["dt_txt"])
        }
        console.log(timeLapses);
    }

    function getTemp(response) {
        let temp = [];
        for (let i = 0; i < response.data["list"].length; i++) {
            temp.push(response.data["list"][i]["main"]["temp"])
        }
        console.log(temp);
    }

    function getFeels_like(response) {
        let feels_like = [];
        for (let i = 0; i < response.data["list"].length; i++) {
            feels_like.push(response.data["list"][i]["main"]["feels_like"])
        }
        console.log(feels_like);
    }

    function getTemp_min(response) {
        let temp_min = [];
        for (let i = 0; i < response.data["list"].length; i++) {
            temp_min.push(response.data["list"][i]["main"]["temp_min"])
        }
        console.log(temp_min);
    }

    function getTemp_max(response) {
        let temp_max = [];
        for (let i = 0; i < response.data["list"].length; i++) {
            temp_max.push(response.data["list"][i]["main"]["temp_max"])
        }
        console.log(temp_max);
    }

    function getWeather(response){
        let weather = [];
        for (let i = 0; i < response.data["list"].length; i++) {
            weather.push(response.data["list"][i]["weather"][0]["main"])
        }
        console.log(weather);
    }

    function doTheThing() {
        var city = document.getElementById("city").value;
        getData(city)
            .then(response => {
                //console.log(response.data.list[0].dt)})
                //console.log(response.data["list"][0]["main"])})
                //console.log(response.data["list"][0]["dt_txt"])})
                getTimeLapses(response)
                getTemp(response)
                getFeels_like(response)
                getTemp_min(response)
                getTemp_max(response)
                getWeather(response)
               // console.log(response.data["list"][0]["weather"][0]["main"])
            })

    }


})();