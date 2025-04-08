'use strict'

const SudokuSolver = require('../controllers/sudoku-solver.js')

module.exports = function (app) {
  let solver = new SudokuSolver()

  const puzzleStringToArray = inputString => {
    const arr2D = []
    for (let i = 0; i < 9; i++) {
      arr2D[i] = []
      for (let j = 0; j < 9; j++) {
        var inputChar = inputString[i * 9 + j]
        arr2D[i][j] = inputChar === '.' ? 0 : inputChar
      }
    }
    return arr2D
  }

  app.route('/api/check').post((req, res) => {})

  app.route('/api/solve').post((req, res) => {
    const puzzleString = req.body.puzzle
    console.log('puzzleString: ' + puzzleString + '\n')
    const box = puzzleStringToArray(puzzleString)
    for (var i = 0; i < 9; i++) {
      if (i % 3 === 0 && i !== 0) console.log('---------------------')
      console.log(
        box[i][0] +
          ' ' +
          box[i][1] +
          ' ' +
          box[i][2] +
          ' | ' +
          box[i][3] +
          ' ' +
          box[i][4] +
          ' ' +
          box[i][5] +
          ' | ' +
          box[i][6] +
          ' ' +
          box[i][7] +
          ' ' +
          box[i][8]
      )
    }
  })
}
