<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="./dependencies/sweetalert2/dist/sweetalert2.css"
    />
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/custom.css" />
    <title>Hangman</title>
  </head>
  <body>
    <div class="text-center pt-3 mt-3">
      <h1 style="color: black; font-size: 4em; font-weight: bold">
        Welcome to HANGMAN
      </h1>
    </div>
    <div class="container text-center" id="container">
      <svg height="400" width="400" class="pt-5">
        <g id="body">
          <g id="a4">
            <circle
              cx="200"
              cy="80"
              r="20"
              stroke="black"
              stroke-width="4"
              fill="white"
            />
            <g id="rEyes">
              <circle cx="193" cy="80" r="4" />
              <circle cx="207" cy="80" r="4" />
            </g>
            <g id="xEyes" class="hide">
              <line x1="190" y1="78" x2="196" y2="84" />
              <line x1="204" y1="78" x2="210" y2="84" />
              <line x1="190" y1="84" x2="196" y2="78" />
              <line x1="204" y1="84" x2="210" y2="78" />
            </g>
          </g>
          <line x1="200" y1="100" x2="200" y2="150" id="a5" />
          <line x1="200" y1="120" x2="170" y2="140" id="armL" />
          <line x1="200" y1="120" x2="230" y2="140" id="armR" />
          <line x1="200" y1="150" x2="180" y2="190" id="a8" />
          <line x1="200" y1="150" x2="220" y2="190" id="a9" />
        </g>
        <line x1="10" y1="250" x2="150" y2="250" />
        <line id="door1" x1="150" y1="250" x2="200" y2="250" />
        <line id="door2" x1="200" y1="250" x2="250" y2="250" />
        <line x1="250" y1="250" x2="390" y2="250" />
        <line x1="100" y1="250" x2="100" y2="20" id="a1" />
        <line x1="100" y1="20" x2="200" y2="20" id="a2" />
        <line x1="200" y1="20" x2="200" y2="60" id="rope" />
      </svg>
      <form id="agregar-letra" action="#">
        <div class="form-group">
          <input
            type="character"
            class="form-control"
            id="letter"
            placeholder="type your letter"
          />
        </div>
        <button type="submit" class="btn btn-primary">Agregar</button>
      </form>
      <div class="word text-center pt-5">
        <h1 id="wordToGuess"></h1>
      </div>
      <button type="submit" class="btn btn-success mt-5" id="hintButton">
        Hint!
      </button>
      <div class="word text-center pt-5" id="hint"></div>
    </div>
    <script
      src="https://code.jquery.com/jquery-3.2.1.min.js"
      integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
      crossorigin="anonymous"
    ></script>
    <script src="//cdn.jsdelivr.net/velocity/1.5/velocity.min.js"></script>
    <script type="module" src="js/app.js"></script>
  </body>
</html>
