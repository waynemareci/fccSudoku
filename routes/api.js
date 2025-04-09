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
      console.log('in check; required field missing')
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
      res.json({ error: 'Invalid value' })
      return
    }

    var row
    const column = req.body.coordinate.slice(1, 2)
    console.log('column is ' + column)
    switch (req.body.coordinate.slice(0, 1)) {
      case 'A':
      case 'a':
        row = 1
        break
      case 'B':
      case 'b':
        row = 2
        break
      case 'C':
      case 'c':
        row = 3
        break
      case 'D':
      case 'd':
        row = 4
        break
      case 'E':
      case 'e':
        row = 5
        break
      case 'F':
      case 'f':
        row = 6
        break
      case 'G':
      case 'g':
        row = 7
        break
      case 'H':
      case 'h':
        row = 8
        break
      case 'I':
      case 'i':
        row = 9
        break
    }
    console.log('row is ' + row)

    var conflict = []

    const rowResult = solver.checkRowPlacement(
      puzzleStringToArray(req.body.puzzle),
      row,
      column,
      req.body.value
    )
    console.log('rowResult is ' + rowResult)
    conflict.push(rowResult)
    const columnResult = solver.checkColPlacement(
      puzzleStringToArray(req.body.puzzle),
      row,
      column,
      req.body.value
    )
    console.log('colResult is ' + columnResult)
    conflict.push(columnResult)
    const regionResult = solver.checkRegionPlacement(
      puzzleStringToArray(req.body.puzzle),
      row,
      column,
      req.body.value
    )
    if (columnResult === '' && rowResult === '') {
      console.log('successful check pass')
      res.json({ valid: true })
      return
    } else res.json({ valid: false, conflict: conflict })
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
