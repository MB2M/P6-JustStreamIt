var api_url =  "http://localhost:8000/api/v1/titles/"


function getFilmInfo(id, pre) {
    fetch(api_url + id)
        .then(response => response.json())
        .then(json => {
            document.getElementById(pre + '__title').innerHTML = json.title;
            document.getElementById(pre + '__img').setAttribute('src',json.image_url);
            document.getElementById(pre + '__description').innerHTML = json.long_description;
            if (pre == "number-one"){
                document.getElementById(pre + '-show').id = json.id;
            }
            if (pre == "modal"){
                document.getElementById(pre + '__genres').innerHTML = json.genres;
                document.getElementById(pre + '__date_published').innerHTML = json.date_published;
                document.getElementById(pre + '__rated').innerHTML = json.rated;
                document.getElementById(pre + '__imdb_score').innerHTML = json.imdb_score;
                document.getElementById(pre + '__directors').innerHTML = json.directors;
                document.getElementById(pre + '__actors').innerHTML = json.actors;
                document.getElementById(pre + '__duration').innerHTML = json.duration;
                document.getElementById(pre + '__countries').innerHTML = json.countries;
                document.getElementById(pre + '__reviews_from_critics').innerHTML = json.reviews_from_critics;
            }
        })
}

function filmTop(top, url, category, slice_start, slice_end, films = []) {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            for (film of json.results){
                films.push([film.id, film.image_url])
            }
            if (top - 5 > 0){
                filmTop(top - 5, json.next, category, slice_start, slice_end, films);
                return []
            }
            return films;
        })
        .then(films => {
            if (films.length > 0){
                let all_img_HTML = "";
                for (film of films.slice(slice_start, slice_end)) {
                    var img = document.createElement("img");
                    img.id = film[0];
                    img.src = film[1];
                    img.className = "carousel__img";

                    var link = document.createElement("a");
                    link.href="#";
                    link.appendChild(img);

                    var carousel = document.getElementById(category + "__carousel");
                    carousel.appendChild(link);

                    if (carousel.childNodes.length >= 6) {
                        link.style.display = "none"
                    }
                }
                if (category == "top-film"){
                    getFilmInfo(films[0][0], 'number-one');
                }
                // When the user clicks on the image, open the modal
                for (var i = 0; i < document.getElementsByClassName("carousel__img").length; i++){
                    document.getElementsByClassName("carousel__img")[i].onclick = function() {
                        modal.style.display = "block";
                        getFilmInfo(this.id, 'modal')
                    }
                }

            }
        })
}

var topButton = document.getElementById("number-one-show");
topButton.onclick = function() {
    modal.style.display = "block";
    getFilmInfo(this.id, 'modal')
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("modal-content__close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const cat1 =  document.getElementById('category-1__title').textContent;
const cat2 =  document.getElementById('category-2__title').textContent;
const cat3 =  document.getElementById('category-3__title').textContent;
filmTop(10, api_url + "?sort_by=-imdb_score", 'top-film',1 ,8);
filmTop(10, api_url + "?sort_by=-imdb_score&genre_contains=" + cat1, 'category1', 0 , 7);
filmTop(10, api_url + "?sort_by=-imdb_score&genre_contains=" + cat2, 'category2', 0 , 7);
filmTop(10, api_url + "?sort_by=-imdb_score&genre_contains=" + cat3, 'category3', 0, 7);


// move carousel to the left
for (arrow of document.getElementsByClassName("carousel__arrow-left")) {
    arrow.onclick = function () {
        var images = this.parentElement.getElementsByClassName('carousel__img');
        images[0].parentElement.style.display = "none";
        images[0].parentElement.parentElement.append(images[0].parentElement);
        images[3].parentElement.style.display = "inline";
    }
}

// move carousel to the right
for (arrow of document.getElementsByClassName("carousel__arrow-right")) {
    arrow.onclick =  function(){
        var images = this.parentElement.getElementsByClassName('carousel__img');
        images[3].parentElement.style.display = "none";
        images[images.length - 1].parentElement.parentElement.prepend(images[images.length - 1].parentElement);
        images[0].parentElement.style.display = "inline";
    }
}


