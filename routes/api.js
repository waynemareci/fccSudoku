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
    if (!puzzleString) {
      res.json({ error: 'Required field missing' })
      return
    }
    const validateReturn = solver.validate(puzzleString)
    if (!validateReturn || validateReturn === 'bad length') {
      if (!validateReturn) {
        console.log("invalid character error")
        res.json({ error: 'Invalid characters in puzzle' })

      } else {
        console.log("bad length")
        res.json({ error: 'Expected puzzle to be 81 characters long' })
      }
      return
    }

    //      {res.json({error:'Invalid characters in puzzle'});return}
    console.log('puzzleString: ' + puzzleString + '\n')
    const box = puzzleStringToArray(puzzleString)
    const outputString = solver.solve(box)
    console.log("Here's what the ouputString looks like:")
    console.log(outputString)
    res.json({ solution: outputString })
  })
}
