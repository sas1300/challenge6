
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
            //write code to redesign website with info from response_two HERE
        })
    })
})



/*
links for icons:
current weather:
`http://openweathermap.org/img/wn/${response_two.weather[0].icon}@2x.png`

forecast:
`http://openweathermap.org/img/wn/${response_two.daily[i].weather[0].icon}@2x.png`
*/