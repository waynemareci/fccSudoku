class SudokuSolver {

  validate(puzzleString) {
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(box) {
    console.log("in solve function\n")
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
  }
}

module.exports = SudokuSolver;

