(() => {
    var secretkey = config.SECRET_KEY;
    run.addEventListener("click", getWeather)

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


    function getWeather() {
        var city = document.getElementById("city").value;
        getData(city)
            .then(response => {
                //console.log(response.data.list[0].dt)})
                //console.log(response.data["list"][0]["main"])})
                //console.log(response.data["list"][0]["dt_txt"])})
                getTimeLapses(response)
            })

    }


})();