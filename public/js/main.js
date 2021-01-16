
function getFilmInfo(id, pre) {
    var request = new XMLHttpRequest();
    var response;
    request.onreadystatechange = function(){
            if (request.readyState == 4 && this.status == 200) {
                response = JSON.parse(request.responseText);
                document.getElementById(pre + '-title').innerHTML = response.title;
                document.getElementById(pre + '-img').setAttribute('src',response.image_url);
                document.getElementById(pre + '-description').innerHTML = response.long_description;
            }
        }
        request.open("GET", "http://localhost:8000/api/v1/titles/" + id);
        request.send();
}


function filmTop(top, uri, category, slice_start, slice_end, films = []) {
        var request = new XMLHttpRequest();
        var response;
        request.onreadystatechange = function(){
            if (request.readyState == 4 && this.status == 200) {
                response = JSON.parse(request.responseText);
                for (film of response.results){
                    films.push([film.id, film.image_url])
                }
                if (top-5 > 0){
                    filmTop(top-5, response.next, category, slice_start, slice_end, films);
                }
                let all_img_HTML = "";
                for (film of films.slice(slice_start, slice_end)) {
                    const img_HTML = "<img id=\"" + film[0] + "\" src=\"" + film[1] + "\" class=\"carousel__img\"></img>";
                    all_img_HTML = all_img_HTML + img_HTML;
                    document.getElementById(category + "__carousel").innerHTML = all_img_HTML;
                }
                if (category == "top-film"){
                    getFilmInfo(films[0][0], 'number-one');
                }
            }
        }
        request.open("GET", uri);
        request.send();

        return response;
    };

const cat1 =  document.getElementById('category-1__title').textContent;
const cat2 =  document.getElementById('category-2__title').textContent;
const cat3 =  document.getElementById('category-3__title').textContent;
filmTop(10, "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score", 'top-film',1 ,8);
filmTop(10, "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre_contains=" + cat1, 'category1', 0 , 7);
filmTop(10, "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre_contains=" + cat2, 'category2', 0 , 7);
filmTop(10, "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre_contains=" + cat3, 'category3', 0, 7);