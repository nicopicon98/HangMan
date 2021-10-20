import Swal from '/node_modules/sweetalert2/src/sweetalert2.js'
import { dropBody} from '/functions.js';


//elements
const line1 = document.getElementById("a1")
const line2 = document.getElementById("a2")
const rope = document.getElementById("rope")
const line4 = document.getElementById("a4")
const line5 = document.getElementById("a5")
const armL = document.getElementById("armL")
const armR = document.getElementById("armR")
const line8 = document.getElementById("a8")
const line9 = document.getElementById("a9")
const door1 = document.getElementById("door1")
const door2 = document.getElementById("door2")
const body = document.getElementById("body")
const container_palabra = document.getElementById("container_palabra")
const span = document.getElementById("span")
const swal1 = document.getElementsByClassName("swal2-container")

//form
const formulario = document.querySelector('#agregar-gasto');

//newArray
const linesArray = [line1, line2, rope, line4, line5, armL, armR, line8, line9];
let guessed = [];

//array
const array_words = ["python", "ruby", "c", "javascript", "php", "python", "html", "xml", "css", "angular", "laravel"];
const randomWord = array_words[Math.floor(Math.random() * array_words.length)]

//count
var count = 0;

//Llamamos la funcion
eventListeners();

function eventListeners() {
  formulario.addEventListener('submit', letterHandler);
  document.addEventListener('DOMContentLoaded', guessedWord)
}

//Listeners
function letterHandler(e) {
  e.preventDefault();
  const letter = document.getElementById("letter").value
  console.log(randomWord)
  // console.log(letter)
  if (letter.length === 0 || letter.includes(" ")) {
    Swal.fire({
      title: '<h3> Ups, no escribiste nada</h3>'
    })
  }
  else if(letter.length > 1){
    Swal.fire({
      title: '<h3> Ups, Solo letras, no frases, ni numeros</h3>'
    })
  }else{
    checker(randomWord, letter)
  }
  formulario.reset();
}

function guessedWord(){
  const randomSplittedWord = randomWord.split("")
  const wordStatus = randomSplittedWord.map(lt => (guessed.indexOf(lt) >= 0 ? lt : " _ ")).join('');
  console.log(typeof(wordStatus) + " - > " + wordStatus)
    document.getElementById('wordSpotlight').innerHTML = `
    <p> ${wordStatus} </p>
    `;
  if(!wordStatus.split("").includes("_")){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Ganaste',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
        location.reload()
    })
  }
}

function checker(newRandomWord, letter) {
  const new_splitted_array = newRandomWord.split("")
  const indexes = []

  new_splitted_array.forEach((l, index) => {
    if (l == letter) {
      indexes.push(index)
    }
  })
  if (indexes.length > 0) {
    console.log("Si existe")
    guessed.indexOf(letter) === -1 ? guessed.push(letter) : null;
    guessedWord();
  } else {
    if (count > 8) {
      formulario.style.marginTop = "50px";
      setTimeout(() => {
        Swal.fire({
          title: '<span style="color: white">You lost!</span>',
          confirmButtonColor: '#3085d6',
          width: 400,
          padding: '3em',
          allowOutsideClick: false,
          background: 'url("https://c.tenor.com/MDhSu4SDjlwAAAAC/among-us-imposter.gif") center'
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload()
          }
        })
      }, 3000);
      dropBody();
    } else {
      Swal.fire({
        title: '<h3> Ups, esa letra no existe en la palabra!! </h3>'
      })
      linesArray[count].style.visibility = "visible";
      count++;
    }
  }
}