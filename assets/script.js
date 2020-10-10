
$("#search").on("click", function (event) {
    event.preventDefault();
    $.ajax({
        url: `http://api.openweathermap.org/data/2.5/weather?q=${$("#city").val()}&appid=2d9d72c389eae1fae1c3cb891c1a3794`,
        method: "GET"//4 methods: "GET"(DOWNLOAD),"PUSH"(uPLOAD, creating a new element that doesnt exist before),"PUT"(updating something that already exists),"DELETE"
    })
        .then(function (response) {
            console.log(response)

            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&exclude=hourly,minutely,alerts&appid=2d9d72c389eae1fae1c3cb891c1a3794`,
                method: "GET"
            })
                .then(function (response_two) {
                    console.log(response_two);
                    document.querySelector("#currentWeatherCity").innerHTML = response.name;
                    document.querySelector("#temp").innerHTML = "Temp: " + ((response_two.current.temp - 273.15) * 9 / 5 + 32).toFixed(1);

                    for (i = 0; i < 5; i++) {
                        //this is the vanilla javscript version
                        document.querySelector("#fiveDay").innerHTML += `<div class="forecast">

                        Temp: ${response_two.daily[i].temp.day}
                        UVI: 
                        Humidity: 
                        </div>`;

                        //this is the jQuery version. both do the same thing
                        // $("#fiveDay").append(`<div class="forecast">

                        //     Temp: ${response_two.daily[i].temp.day}
                        //     UVI:
                        //     Humdiity
                        //     </div>`);
                    }
                })
            //write code to redesign website with info from response_two HERE
            //Need to take city entered in search box and make it show up in the currentWeather section



        })
})

var currentDay = moment().format("dddd, MMMM Do");
$("#currentDay").text(currentDay);



/*
links for icons:
current weather:
`http://openweathermap.org/img/wn/${response_two.weather[0].icon}@2x.png`

forecast:
`http://openweathermap.org/img/wn/${response_two.daily[i].weather[0].icon}@2x.png`
*/