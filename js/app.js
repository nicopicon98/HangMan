import { HangMan } from './HangMan.js';

//Calling elements
const line1 = document.getElementById("a1")
const line2 = document.getElementById("a2")
const rope = document.getElementById("rope")
const line4 = document.getElementById("a4")
const line5 = document.getElementById("a5")
const armL = document.getElementById("armL")
const armR = document.getElementById("armR")
const line8 = document.getElementById("a8")
const line9 = document.getElementById("a9")

//Button
const hintButton = document.getElementById("hintButton")

//form
const formulario = document.querySelector('#agregar-letra');

const objeto = new HangMan(line1, line2, rope, line4, line5, armL, armR, line8, line9, formulario, hintButton)
objeto.eventListeners()