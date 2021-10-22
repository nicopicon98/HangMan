import { UsingFetch } from './usingFetch.js'
import Swal from '/dependencies/sweetalert2/src/sweetalert2.js'
import { dropBody } from './functions.js'




export class HangMan {
  constructor(line1, line2, rope, line4, line5, armL, armR, line8, line9, formulario, hintButton) {
    this.linesArray = [line1, line2, rope, line4, line5, armL, armR, line8, line9];
    this.formulario = formulario
    this.hintButton = hintButton
    this.guessed = []
    this.array_words = []
    this.array_wordsNaked = []
    this.randomWord = ""
    this.new_splitted_array = []
    this.count = 0
    this.countHint = 0
    this.attempts = 3
    this.a = null
    this.fetch = null
    this.wordStatus = ""
    this.word = ""
    this.letter = ""
    this.randomDefinitionWiky = ""
    this.randomDefinitionWikti = ""
    this.firstLetter = ""
    this.wordStatusHint = ""
    this.randomSplittedWord = ""
    this.pass = ""
  }

  async __str__() {
    this.array_words = await this.randomArray()
    console.log(this.array_words)
  }

  async randomArray() {
    this.array_wordsNaked = await this.fetchingData(); // Then I apply the random method
    this.array_words = this.array_wordsNaked[Math.floor(Math.random() * this.array_wordsNaked.length)]
    return this.array_words
  }

  async fetchingData() {
    this.a = new UsingFetch
    this.fetch = await this.a.fetching();
    this.array_words = this.fetch
    return this.array_words;
  }
  // Este deberia ser await, pero siendo DOMContentLoaded el primer listener que se ejecuta, nada se ejecuta antes asi que nada mas espera.
  // Tiene un await implicito
  eventListeners() {
    document.addEventListener('DOMContentLoaded', async () => {
      this.pass = await this.randomArray() // definimos un array especifico cuando el documento es cargado
      // this.guessedWord(this.pass.word);
      this.onLoadShowLines()
      this.formulario.addEventListener('submit', () => this.letterHandler(this.pass));
      this.hintButton.addEventListener('click', () => this.hintButtonHandler(this.pass));
    })
  }

  onLoadShowLines() {
    this.wordStatus = this.pass.word.split("").map(lt => (this.guessed.indexOf(lt) >= 0 ? lt : " _ ")).join('');
    return document.getElementById('wordToGuess').innerHTML = `
       ${this.wordStatus}
      `;
  }

  async guessedWord(word) {
    this.word = word
    this.randomSplittedWord = this.word.split("")
    this.wordStatus = this.word.split("").map(lt => (this.guessed.indexOf(lt) >= 0 ? lt : " _ ")).join(''); //line 150

    console.log(this.wordStatus)

    document.getElementById('wordToGuess').innerHTML = `
       ${this.wordStatus}
      `;

    //if no hay mas letras faltando
    if (!this.wordStatus.split("").includes("_")) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Ganaste',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        location.reload()
      })
    }
  }

  checker(arrayWords, letter) {
    this.array_words = arrayWords;
    this.randomWord = this.array_words.word
    this.new_splitted_array = this.randomWord.split("")
    console.log(this.randomWord)
    if (this.new_splitted_array.includes(letter)) {
      console.log("Si existe")
      this.guessed.indexOf(letter) === -1 ? this.guessed.push(letter) : null; // Si ya existe, null
      this.guessedWord(this.randomWord);
    } else {
      if (this.count > 8) {
        this.formulario.style.marginTop = "50px";
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
        this.linesArray[this.count].style.visibility = "visible";
        this.count++;
      }
    }
  }

  async letterHandler(argument) {
    this.array_words = argument
    this.letter = document.getElementById("letter").value

    if (this.letter.length === 0 || this.letter.includes(" ")) {
      Swal.fire({
        title: '<h3> Ups, no escribiste nada</h3>'
      })
    }
    else if (this.letter.length > 1) {
      Swal.fire({
        title: '<h3> Ups, Solo letras, no frases, ni numeros</h3>'
      })
    } else {
      this.checker(this.array_words, this.letter)
    }
    this.formulario.reset();
  }

  hintButtonHandler(argument) {
    this.countHint++
    this.array_words = argument
    this.randomDefinitionWiky = this.array_words.url_wikipedia_definition
    this.randomDefinitionWikti = this.array_words.url_wiktionary_definition
    this.firstLetter = this.array_words.word.charAt(0)
    console.log(this.countHint)
    if (this.countHint === 1) {
      document.getElementById('hint').innerHTML = `
      <p> <strong> First Letter: </strong>  ${this.firstLetter} </p>
     `;
      this.hintButton.innerHTML = `${this.attempts - this.countHint} Hints left!`
      this.randomSplittedWord = this.array_words.word.split("")
      this.guessed.indexOf(this.firstLetter) === -1 ? this.guessed.push(this.firstLetter) : null; // Si ya existe, null
      this.wordStatusHint = this.randomSplittedWord.map(lt => (this.guessed.indexOf(lt) >= 0 ? lt : " _ ")).join('');

      document.getElementById('wordToGuess').innerHTML = `
       ${this.wordStatusHint}
      `;
    }
    if (this.countHint === 2) {
      document.getElementById('hint').innerHTML = `
      <p> <strong> First Letter: </strong>  ${this.firstLetter} </p>
      <p> <strong> Definition NOT reliable xd : </strong> ${this.randomDefinitionWiky} </p>
     `;
      this.hintButton.innerHTML = `${this.attempts - this.countHint} Hints left!`
    }
    if (this.countHint === 3) {
      document.getElementById('hint').innerHTML = `
      <p> <strong> First Letter: </strong>  ${this.firstLetter} </p>
      <p> <strong> Definition NOT reliable xd : </strong> ${this.randomDefinitionWiky} </p>
      <p> <strong> Definition NOT reliable either but, it's not wikipedia so, it's more reliable xd: </strong> ${this.randomDefinitionWikti} </p>
     `;
      this.hintButton.innerHTML = `${this.attempts - this.countHint} Hints left!`
    }
    if (this.countHint > 3) {
      Swal.fire('Sorry folk, no more hints :(')
    }
  }

}



