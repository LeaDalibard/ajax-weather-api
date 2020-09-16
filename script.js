(() => {
    var secretkey = config.SECRET_KEY;
    run.addEventListener("click", getData)

    function getData(){
        var city = document.getElementById("city").value;
        let weather;
        axios.get("http://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=metric&appid="+secretkey)
            .then(result => {
                weather=result.data.list[1].dt
                console.log(weather)
            }, error => {
                alert("Type the name of a city.");
            });

    }
})();