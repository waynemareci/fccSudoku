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

  app.route('/api/check').post((req, res) => {
    console.log('in check function; puzzle: ' + req.body.puzzle)
    console.log(
      'coordinate ' + req.body.coordinate + '; value: ' + req.body.value
    )
    if (!req.body.puzzle || !req.body.coordinate || !req.body.value) {
      console.log("in check; required field missing")
      res.json({ error: 'Required field(s) missing' })
      return
    }
    const validateReturn = solver.validate(req.body.puzzle)
    if (!validateReturn || validateReturn === 'bad length') {
      if (!validateReturn) {
        console.log('invalid character error')
        res.json({ error: 'Invalid characters in puzzle' })
      } else {
        console.log('bad length')
        res.json({ error: 'Expected puzzle to be 81 characters long' })
      }
      return
    }

    if (!/^[A-Ia-i][1-9]$/.test(req.body.coordinate)) {
      console.log('bad coordinate')
      res.json({ error: 'Invalid coordinate' })
      return
    }

    const value = req.body.value
    if (!/[0-9]/.test(value) || value < 1 || value > 9) {
      console.log('bad value')
      res.json({error: 'Invalid value'})
      return
    }

    const row = 1
    const column = 1
    /*
    const rowResult = solver.checkRowPlacement(
      req.body.puzzle,
      row,
      column,
      req.body.value
    )
    const columnResult = solver.checkColumnPlacement(
      req.body.puzzle,
      row,
      column,
      req.body.value
    )
    const regionResult = solver.checkRegionPlacement(
      req.body.puzzle,
      row,
      column,
      req.body.value
    )
      */
    console.log("successful check pass")
    res.json({ valid: true })
  })

  app.route('/api/solve').post((req, res) => {
    const puzzleString = req.body.puzzle
    if (!puzzleString) {
      res.json({ error: 'Required field missing' })
      return
    }
    const validateReturn = solver.validate(puzzleString)
    if (!validateReturn || validateReturn === 'bad length') {
      if (!validateReturn) {
        console.log('invalid character error')
        res.json({ error: 'Invalid characters in puzzle' })
      } else {
        console.log('bad length')
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
    if (/0/.test(outputString)) {
      res.json({ error: 'Puzzle cannot be solved' })
      return
    }
    res.json({ solution: outputString })
  })
}
