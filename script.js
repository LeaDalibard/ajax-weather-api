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
        )}

    function getWeather() {
        var city = document.getElementById("city").value;
        getData(city).then(response=>{
            console.log(response)})
    }


})();