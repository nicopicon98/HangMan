import { UsingFetch } from './UsingFetch.js'
import Swal from '../dependencies/sweetalert2/src/sweetalert2.js'
import DropBodyClass from './DropBodyClass.js'


export class HangMan {
  constructor(line1, line2, rope, line4, line5, armL, armR, line8, line9, formulario, hintButton) {
    this.linesArray = [line1, line2, rope, line4, line5, armL, armR, line8, line9];
    this.formulario = formulario
    this.hintButton = hintButton
    this.guessed = []
    this.array_words = []
    this.array_wordsNaked = []
    this.randomWord = ""
    this.wordStatusHint = ""
    this.new_splitted_array = []
    this.randomSplittedWord = ""
    this.countHangMan = 0
    this.countHint = 0
    this.attempts = 3
    this.newUsingFetchObject = null
    this.fetch = null
    this.wordStatus = ""
    this.word = ""
    this.letter = ""
    this.randomDefinitionWiky = ""
    this.randomDefinitionWikti = ""
    this.firstLetter = ""
    this.objDropBody = null
  }
  //Example
  async __str__() {
    this.array_words = await this.randomArray()
    console.log(this.array_words)
  }

  async randomArray() {
    this.array_wordsNaked = await this.fetchingData(); // Then I apply the random method
    this.array_words = this.array_wordsNaked[Math.floor(Math.random() * this.array_wordsNaked.length)]
    return this.array_words
  }

  dropingBody() {
    const objDropBody = new DropBodyClass();
    return objDropBody.dropBody();
  }

  async fetchingData() {
    this.newUsingFetchObject = new UsingFetch
    this.fetch = await this.newUsingFetchObject.fetching();
    this.array_wordsNaked = this.fetch
    return this.array_wordsNaked;
  }
  // Este deberia ser await, pero siendo DOMContentLoaded el primer listener que se ejecuta, nada se ejecuta antes asi que nada mas espera.
  // Tiene un await implicito
  // formulario and hintbutton must take a callback function
  // para que resuelva y no quede pending
  eventListeners() {
    document.addEventListener('DOMContentLoaded', async () => {
      this.array_words = await this.randomArray() // definimos un array especifico cuando el documento es cargado
      this.onLoadShowLines()
      this.formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // let's prevent going to the top
        this.letterHandler(this.array_words)
      });
      this.hintButton.addEventListener('click', () => this.hintButtonHandler(this.array_words));
    })
  }

  onLoadShowLines() {
    this.wordStatus = this.array_words.word.split("").map(lt => (this.guessed.indexOf(lt) >= 0 ? lt : " _ ")).join('');
    return document.getElementById('wordToGuess').innerHTML = `
       ${this.wordStatus}
      `;
  }

  guessedWord(word) {
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

  checker(array_words, letter) {
    this.array_words = array_words;
    this.randomWord = this.array_words.word
    this.new_splitted_array = this.randomWord.split("")
    console.log(this.randomWord)
    if (this.new_splitted_array.includes(letter)) {
      console.log("Si existe")
      this.guessed.indexOf(letter) === -1 ? this.guessed.push(letter) : null; // Si ya existe, null
      this.guessedWord(this.randomWord);
    } else {
      if (this.countHangMan > 8) {
        this.formulario.style.marginTop = "50px";
        setTimeout(() => {
          Swal.fire({
            title: '<span style="color: white">You lost!</span>',
            confirmButtonColor: '#00AAF0',
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
        this.dropingBody();
      } else {
        Swal.fire({
          confirmButtonColor: '#00AAF0',
          title: '<h3> Ups, esa letra no existe en la palabra!! </h3>'
        })
        this.linesArray[this.countHangMan].style.visibility = "visible";
        this.countHangMan++;
      }
    }
  }

  letterHandler(array_words) {
    this.array_words = array_words
    this.letter = document.getElementById("letter").value

    if (this.letter.length === 0 || this.letter.includes(" ")) {
      Swal.fire({
        confirmButtonColor: '#00AAF0',
        title: '<h3> Ups, no escribiste nada</h3>'
      })
    }
    else if (this.letter.length > 1) {
      Swal.fire({
        confirmButtonColor: '#00AAF0',
        title: '<h3> Ups, Solo letras, no frases, ni numeros</h3>'
      })
    } else {
      this.checker(this.array_words, this.letter)
    }
    this.formulario.reset();
  }

  hintButtonHandler(array_words) {
    this.countHint++
    this.array_words = array_words
    this.randomDefinitionWiky = this.array_words.url_wikipedia_definition
    this.randomDefinitionWikti = this.array_words.url_wiktionary_definition
    this.firstLetter = this.array_words.word.charAt(0)
    console.log(this.countHint)
    if (this.countHint === 1) {
      document.getElementById('hint').innerHTML = `
        <table class="table table-bordered pt-5">
          <thead>
            <tr class="table-primary">
              <th scope="col">No. Hint</th>
              <th scope="col">Type</th>
              <th scope="col">Hint</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">${this.countHint}</th>
              <td>First Letter</td>
              <td>${this.firstLetter}</td>
            </tr>
          </tbody>
        </table>
     `;
      //changing button properties and content
      this.hintButton.innerHTML = `${this.attempts - this.countHint} Hints left!`
      this.hintButton.classList.remove("btn-success");
      this.hintButton.classList.add("btn-warning");

      this.randomSplittedWord = this.array_words.word.split("")
      this.guessed.indexOf(this.firstLetter) === -1 ? this.guessed.push(this.firstLetter) : null; // Si ya existe, null
      this.wordStatusHint = this.randomSplittedWord.map(lt => (this.guessed.indexOf(lt) >= 0 ? lt : " _ ")).join('');

      document.getElementById('wordToGuess').innerHTML = `
       ${this.wordStatusHint}
      `;
    }
    if (this.countHint === 2) {
      document.getElementById('hint').innerHTML = `
      <table class="table table-bordered pt-5">
          <thead>
            <tr class="table-primary">
              <th scope="col">No. Hint</th>
              <th scope="col">Type</th>
              <th scope="col">Hint</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-warning">
              <th scope="row">${this.countHint - 1}</th>
              <td>First Letter</td>
              <td>${this.firstLetter}</td>
            </tr>
            <tr>
              <th scope="row">${this.countHint}</th>
              <td>Definition NOT reliable xd</td>
              <td><a href="${this.randomDefinitionWiky}" target="_blank"> Wikipedia Definition </a></td>
            </tr>
          </tbody>
        </table>
     `;
      //changing button properties and content
      this.hintButton.innerHTML = `${this.attempts - this.countHint} Hints left!`
      this.hintButton.classList.remove("btn-warning");
      this.hintButton.classList.add("btn-danger");
    }
    if (this.countHint === 3) {
      document.getElementById('hint').innerHTML = `
      <table class="table table-bordered pt-5">
          <thead>
            <tr class="table-primary">
              <th scope="col">No. Hint</th>
              <th scope="col">Type</th>
              <th scope="col">Hint</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-warning"">
              <th scope="row">${this.countHint - 2}</th>
              <td>First Letter</td>
              <td>${this.firstLetter}</td>
            </tr>
            <tr>
              <th scope="row">${this.countHint - 1}</th>
              <td>Definition NOT reliable xd</td>
              <td><a href="${this.randomDefinitionWiky}" target="_blank"> Wikipedia Definition </a></td>
            </tr>
            <tr class="table-danger">
              <th scope="row">${this.countHint}</th>
              <td>Definition NOT reliable either but, it's not wikipedia so, it's more reliable xd</td>
              <td><a href="${this.randomDefinitionWikti}" target="_blank"> Wiktionary Definition </a></td>
            </tr>
          </tbody>
        </table>
      `;
      //changing button properties and content
      this.hintButton.innerHTML = `${this.attempts - this.countHint} Hints left!`
      this.hintButton.classList.remove("btn-danger");
      this.hintButton.classList.add("btn-secondary");
    }
    if (this.countHint > 3) {
      Swal.fire({
        confirmButtonColor: '#00AAF0',
        title: 'Sorry folk, no more hints :('
      })
    }
  }

}



