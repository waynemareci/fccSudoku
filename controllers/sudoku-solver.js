class SudokuSolver {
  validate (puzzleString) {
    if (puzzleString.length !== 81) return ('bad length')
    return /^[0-9.]+$/.test(puzzleString)
  }

  checkRowPlacement (puzzleString, row, column, value) {}

  checkColPlacement (puzzleString, row, column, value) {}

  checkRegionPlacement (puzzleString, row, column, value) {}

  solve (grid) {
    console.log('in solve function\n')
    for (var i = 0; i < 9; i++) {
      if (i % 3 === 0 && i !== 0) console.log('---------------------')
      console.log(
        grid[i][0] +
          ' ' +
          grid[i][1] +
          ' ' +
          grid[i][2] +
          ' | ' +
          grid[i][3] +
          ' ' +
          grid[i][4] +
          ' ' +
          grid[i][5] +
          ' | ' +
          grid[i][6] +
          ' ' +
          grid[i][7] +
          ' ' +
          grid[i][8]
      )
    }
    console.log('before call to solveGrid')
    const newGrid = this.solveSudoku(grid)
    if (newGrid) console.log('solved')
    else console.log('failed to solve')
    for (var i = 0; i < 9; i++) {
      if (i % 3 === 0 && i !== 0) console.log('---------------------')
      console.log(
        newGrid[i][0] +
          ' ' +
          newGrid[i][1] +
          ' ' +
          newGrid[i][2] +
          ' | ' +
          newGrid[i][3] +
          ' ' +
          newGrid[i][4] +
          ' ' +
          newGrid[i][5] +
          ' | ' +
          newGrid[i][6] +
          ' ' +
          newGrid[i][7] +
          ' ' +
          newGrid[i][8]
      )
    }
    var outputString = ''
    for (var i = 0; i < 9; i++)
      for (var j = 0; j < 9; j++)
        var outputString = outputString + newGrid[i][j]
    return outputString
  }

  solveSudoku (board) {
    function isValid (row, col, num) {
      for (let i = 0; i < 9; i++) {
        if (
          board[row][i] == num ||
          board[i][col] == num ||
          board[3 * Math.floor(row / 3) + Math.floor(i / 3)][
            3 * Math.floor(col / 3) + (i % 3)
          ] == num
        ) {
          return false
        }
      }
      return true
    }

    function findEmpty () {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (board[i][j] === 0) {
            return [i, j]
          }
        }
      }
      return null
    }

    function solve () {
      let emptyPos = findEmpty()
      if (!emptyPos) {
        return true
      }

      let [row, col] = emptyPos

      for (let num = 1; num <= 9; num++) {
        if (isValid(row, col, String(num))) {
          board[row][col] = String(num)

          if (solve()) {
            return true
          }

          board[row][col] = 0
        }
      }
      return false
    }

    solve()
    return board
  }
}

module.exports = SudokuSolver
