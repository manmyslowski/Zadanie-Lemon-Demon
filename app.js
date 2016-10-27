$( document ).ready(function() {
  //oczekiwanie zanim wczyta się cała strona html, dopiero wtedy uruchomi się javascript
  var input = $('.main-input');
  //zmienna input odnosząca się do elementu html po klasie 
  var gifsList = $('.gifs-list');
  //zmienna gifslist odnosząca się do elementu html po klasie 
  var inputValue = '';
  //okreslam inputValue jako string
  var gifs = [];
  //ustanowienie zmiennej 'gifs' jako pustej tablicy

  input.on('keyup', function(event) {
    //keyup - nacisniecie klawisza, funkcja z parametrem event
    inputValue = input.val();
    //Wywolanie funkcji value na zmiennej input i przypisanie wyniku do inputValue 
    var url = 'http://api.giphy.com/v1/gifs/search?q=' + inputValue + '&api_key=dc6zaTOxFJmzC';
    //zmienna url okreslająca zrodlo gifow wraz z inputValue ktore jest wartoscia wpisywana przez odwiedzajacego witryne
    if (event.keyCode === 13) {
    //jezeli zostanie wcisniety enter (13 to oznaczenie entera) wykonaj kod:
      gifsList.html('')
      //czyszczenie zawartości listy 
      $.get(url).then(function(response) {
          //Load data from the server using a HTTP GET request. jQuery.get( url [, data ] [, then ] [, error ] )
          if(response.data.length === 0){
              return alert("No hits found")
              //jeżeli dana fraza nie zostanie wyszukana po stronie serwera, zwroc alert. <= przypadek brzegowy.
          }
          response.data.forEach(function(item) {
          //dla obiektu response wykonujemy funkcje z parametrem item odnoszaca sie do kazdego elementu (petla) data - bo obiekt ktory jest zwracany z linku ma wlasciwosci, z ktorych interesuja nas 'data'
            if($.isEmptyObject(item)){
                //jezeli obiekt zwrocony z serwera giphy jest pusty, return false.
                return false;
            }
            gifs.push(
                //przylaczenie wartosci do zmiennej gifs okreslonej na poczatku kodu 
                {
                  html: '<li style="display: block;float:left">' +
                  // do tablicy wlasciwosci html na temat listy 
                  '<video class="video" autoplay loop>' +
                  //ustalam klase dla elementow na 'video' dolaczajac autoplay zeby powtarzalo wykonywanie gifow
                  '<source src="' + item.images.preview.mp4 +
                  //zrodlo + wlasciwosci z ktorych interesuja nas kolejno item->images->preview->mp4
                  '" type="video/mp4">' + '</video>' + '<div class="buttons">' +
                  //okreslam typ obiektu, zamykam tag video i 'opakowuje' przyciski w div z klasa buttons
                  '<input class="button" type="submit" value="Add point">' +
                  //dodaje przycisk, z klasa button, w value wpisana jest etykietka przycisku
                  '<input class="button" type="submit" value="Subtract point">'
                  //dodaje przycisk, z klasa button, w value wpisana jest etykietka przycisku
                  + '</div>' + '</li>',
                  // zamykam div i liste
                  counter: 0,
                  //ustawiam licznik na wartosc inicjacyjna zero
              });
          });
          gifs.forEach(function(itemObject) {
              //itemObject jest elementem tablicy, ktora za pomoca forEach jest rozpatrywana dla kazdego elementu listy az do jej konca. 
            gifsList.append(itemObject.html)
            // append - wstawiam wartosc, ustalona przez parametr na koniec listy 
          });
        }, function(error) {
            //na podstawie .get przy nie udanym zaladowaniu daty z serwera jest wyswietlany error.
          console.log(error);
        }
      );
    }
  });
});