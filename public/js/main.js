




function getScoreImdbMax(startingScore) {
        var request = new XMLHttpRequest();
        var response;
        request.onreadystatechange = function(){
            if (request.readyState == 4 && this.status == 200) {
                response = JSON.parse(request.responseText);
                if (response.count == 0) {
                    startingScore = (startingScore * 10 - 1) / 10
                    getScoreImdbMax(startingScore);
                }
                if (response.count > 0){
                    randomNumber = Math.floor((Math.random() * response.count));
                    console.log(response.results[randomNumber]);
                    document.getElementById('number-one-title').innerHTML = response.results[randomNumber].title;
                    document.getElementById('number-one-img').setAttribute('src',response.results[randomNumber].image_url);
                }
            }
        }
        request.open("GET", "http://localhost:8000/api/v1/titles/?imdb_score_min=" + startingScore);
        request.send();

        return response;
    };

getScoreImdbMax(10);