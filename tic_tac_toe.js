function Game(p1, p2)
{
  this.original = "_"
  this.currentCell = 0
  this.p1Turn = false
  this.gameOver = false
  this.opponent = ''

  this.player1 =
  {
    name: p1,
    piece: "X",
    score: 0
  }

  this.player2 =
  {
    name: p2 === '' ? 'GLaDOS' : p2,
    piece: "O",
    score: 0
  }

  this.board =
  {
    pieces: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],

    location: ['^', '_', '_', '_', '_', '_', ' ', ' ', ' '],

    display: function ()
    {
      return `   |   |\n ${this.pieces[0]} | ${this.pieces[1]} | ${this.pieces[2]}\n_${this.location[0]}_|_${this.location[1]}_|_${this.location[2]}_\n   |   |\n ${this.pieces[3]} | ${this.pieces[4]} | ${this.pieces[5]}\n_${this.location[3]}_|_${this.location[4]}_|_${this.location[5]}_\n   |   |\n ${this.pieces[6]} | ${this.pieces[7]} | ${this.pieces[8]}\n ${this.location[6]} | ${this.location[7]} | ${this.location[8]}\n\n`
    }
  }
}

session = new Game(prompt("Enter your name"), prompt("Enter your friend's name or leave blank to play the AI"))
grid = [0, 0, 0, 0, 0, 0, 0, 0, 0]

function jump(x, y)
{
  if ((x + y) >= 0 && (x + y) < 9)
    return x + y;
  
  if (y === 1 || y === -1)
  {
    if ((x + y) < 0)
      return 8;
    return 0;
  }

  if (x === 0 && y === -3)
    return 8;
  if (x === 8 && y === 3)
    return 0;
  return y === 3 ? (x + 4) % 9 : x + 5;
}

function endGame(x, y, z)
{
  if (!session.p1Turn && session.player2.name === 'GLaDOS')
  {
    document.getElementById("selected_" + x).style = "background-color: red;"
    document.getElementById("selected_" + y).style = "background-color: red;"
    document.getElementById("selected_" + z).style = "background-color: red;"
  }
  else
  {
    document.getElementById("selected_" + x).style = "background-color: green;"
    document.getElementById("selected_" + y).style = "background-color: green;"
    document.getElementById("selected_" + z).style = "background-color: green;"
  }

  session.gameOver = true

  if (session.p1Turn)
  {
    session.player1.score++
    document.getElementById('p1').style.color = 'green'
    document.getElementById('p2').style.color = 'red'
  }
  else
  {
    session.player2.score++
    document.getElementById('p1').style.color = 'red'
    document.getElementById('p2').style.color = 'green'
  }
  
  document.getElementById("p1").textContent = session.player1.name + ": " + session.player1.score
  document.getElementById("p2").textContent = session.player2.name + ": " + session.player2.score
  
  if (session.player2.name === 'GLaDOS')
    Swal.fire
      ({
        title: 'Game over!',
        text: session.p1Turn ? "You did well. That's... surprising." : "Thank you for participating in our cell-assignment best-practices assessement. Your cake awaits you in the chamber.",
        type: session.p1Turn ? 'success' : 'error',
        allowEnterKey: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Play again',
        cancelButtonText: 'See board'
      }).then((result) =>
      {
        //debugger;
        setTimeout(function ()
        {
          if (result.value)
            setTimeout(reset, 500)
        }, 0)
      })
  else
    Swal.fire
      ({
        title: 'Game over!',
        text: (session.p1Turn ? session.player1.name : session.player2.name) + " won!",
        type: 'success',
        allowEnterKey: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Play again',
        cancelButtonText: 'See board'
      }).then((result) =>
      {
        //debugger;
        setTimeout(function ()
        {
          if (result.value)
            setTimeout(reset, 500)
        }, 0)
      })
}

function checkWinner(x)
{
  switch (x)
  {
    case 0:
    case 3:
    case 6:
      if (document.getElementById(`selected_${x}`).textContent === document.getElementById(`selected_${x + 1}`).textContent && document.getElementById(`selected_${x}`).textContent === document.getElementById(`selected_${x + 2}`).textContent)
      {
        endGame(x, x + 1, x + 2)
        return;
      }
      break;
    case 1:
    case 4:
    case 7:
      if (document.getElementById(`selected_${x}`).textContent === document.getElementById(`selected_${x - 1}`).textContent && document.getElementById(`selected_${x}`).textContent === document.getElementById(`selected_${x + 1}`).textContent)
      {
        endGame(x, x - 1, x + 1)
        return;
      }
      break;
    case 2:
    case 5:
    case 8:
      if (document.getElementById(`selected_${x}`).textContent === document.getElementById(`selected_${x - 1}`).textContent && document.getElementById(`selected_${x}`).textContent === document.getElementById(`selected_${x - 2}`).textContent)
      {
        endGame(x, x - 1, x - 2)
        return;
      }
      break;
    default: { }
      break;
  }
  
  switch (x)
  {
    case 0:
      if (document.getElementById(`selected_${0}`).textContent === document.getElementById(`selected_${4}`).textContent && document.getElementById(`selected_${0}`).textContent === document.getElementById(`selected_${8}`).textContent)
      {
        endGame(0, 4, 8)
        return;
      }
      break;
    case 4:
      if (document.getElementById(`selected_${0}`).textContent === document.getElementById(`selected_${4}`).textContent && document.getElementById(`selected_${0}`).textContent === document.getElementById(`selected_${8}`).textContent)
      {
        endGame(0, 4, 8)
        return;
      }
      break;
    case 8:
      if (document.getElementById(`selected_${0}`).textContent === document.getElementById(`selected_${4}`).textContent && document.getElementById(`selected_${0}`).textContent === document.getElementById(`selected_${8}`).textContent)
      {
        endGame(0, 4, 8)
        return;
      }
      break;
    default: { }
      break;
  }
  
  switch (x)
  {
    case 2:
      if (document.getElementById(`selected_${2}`).textContent === document.getElementById(`selected_${4}`).textContent && document.getElementById(`selected_${2}`).textContent === document.getElementById(`selected_${6}`).textContent)
      {
        endGame(2, 4, 6)
        return;
      }
      break;
    case 4:
      if (document.getElementById(`selected_${2}`).textContent === document.getElementById(`selected_${4}`).textContent && document.getElementById(`selected_${2}`).textContent === document.getElementById(`selected_${6}`).textContent)
      {
        endGame(2, 4, 6)
        return;
      }
      break;
    case 6:
      if (document.getElementById(`selected_${2}`).textContent === document.getElementById(`selected_${4}`).textContent && document.getElementById(`selected_${2}`).textContent === document.getElementById(`selected_${6}`).textContent)
      {
        endGame(2, 4, 6)
        return;
      }
      break;
    default: { }
      break;
  }

  if (document.getElementById(`selected_${x}`).textContent === document.getElementById(`selected_${(x + 3) % 9}`).textContent && document.getElementById(`selected_${x}`).textContent === document.getElementById(`selected_${(x + 6) % 9}`).textContent)
  {
    endGame(x, (x + 3) % 9, (x + 6) % 9)
    return
  }

  for (i = 0; i < 9; i++)
    if (document.getElementById(`selected_${i}`).textContent === '')
      return
  //debugger
  session.gameOver = true

  if (session.player2.name === 'GLaDOS')
    Swal.fire
      ({
        title: 'You tied!',
        text: !session.p1Turn ? "I didn't win? You played decently. I'm... surprised." : "You really wanted that cake. Looking at you, I'm not surprised.",
        type: 'warning',
        allowEnterKey: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Play again',
        cancelButtonText: 'See board'
      }).then((result) =>
      {
        //debugger;
        setTimeout(function ()
        {
          if (result.value)
            setTimeout(reset, 500)
        }, 0)
      })
  else
    Swal.fire
      ({
        title: 'You tied!',
        text: "No one won... but at least no one lost?",
        type: 'warning',
        allowEnterKey: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Play again',
        cancelButtonText: 'See board'
      }).then((result) =>
      {
        //debugger;
        setTimeout(function ()
        {
          if (result.value)
            setTimeout(reset, 500)
        }, 0)
      })
}

function glados()
{
  if (document.getElementById(`selected_${session.currentCell}`).textContent !== '')
    grid[session.currentCell] = -1

  if (grid[0] + grid[1] + grid[2] === 2)
  {
    if (grid[0] === 0)
    {
      document.getElementById('selected_0').textContent = session.player2.piece
      grid[0] = 1
      return 0
    }
    
    if (grid[1] === 0)
    {
      document.getElementById('selected_1').textContent = session.player2.piece
      grid[1] = 1
      return 1
    }
    
    if (grid[2] === 0)
    {
      document.getElementById('selected_2').textContent = session.player2.piece
      grid[2] = 1
      return 2
    }
  }

  if (grid[3] + grid[4] + grid[5] === 2)
  {
    if (grid[3] === 0)
    {
      document.getElementById('selected_3').textContent = session.player2.piece
      grid[3] = 1
      return 3
    }
    
    if (grid[4] === 0)
    {
      document.getElementById('selected_4').textContent = session.player2.piece
      grid[4] = 1
      return 4
    }
    
    if (grid[5] === 0)
    {
      document.getElementById('selected_5').textContent = session.player2.piece
      grid[5] = 1
      return 5
    }
  }

  if (grid[6] + grid[7] + grid[8] === 2)
  {
    if (grid[6] === 0)
    {
      document.getElementById('selected_6').textContent = session.player2.piece
      grid[6] = 1
      return 6
    }
    
    if (grid[7] === 0)
    {
      document.getElementById('selected_7').textContent = session.player2.piece
      grid[7] = 1
      return 7
    }
    
    if (grid[8] === 0)
    {
      document.getElementById('selected_8').textContent = session.player2.piece
      grid[8] = 1
      return 8
    }
  }

  if (grid[0] + grid[3] + grid[6] === 2)
  {
    if (grid[0] === 0)
    {
      document.getElementById('selected_0').textContent = session.player2.piece
      grid[0] = 1
      return 0
    }
    
    if (grid[3] === 0)
    {
      document.getElementById('selected_3').textContent = session.player2.piece
      grid[3] = 1
      return 3
    }
    
    if (grid[6] === 0)
    {
      document.getElementById('selected_6').textContent = session.player2.piece
      grid[6] = 1
      return 6
    }
  }

  if (grid[1] + grid[4] + grid[7] === 2)
  {
    if (grid[1] === 0)
    {
      document.getElementById('selected_1').textContent = session.player2.piece
      grid[1] = 1
      return 1
    }
    
    if (grid[4] === 0)
    {
      document.getElementById('selected_4').textContent = session.player2.piece
      grid[4] = 1
      return 4
    }
    
    if (grid[7] === 0)
    {
      document.getElementById('selected_7').textContent = session.player2.piece
      grid[7] = 1
      return 7
    }
  }

  if (grid[2] + grid[5] + grid[8] === 2)
  {
    if (grid[2] === 0)
    {
      document.getElementById('selected_2').textContent = session.player2.piece
      grid[2] = 1
      return 2
    }
    
    if (grid[5] === 0)
    {
      document.getElementById('selected_5').textContent = session.player2.piece
      grid[5] = 1
      return 5
    }
    
    if (grid[8] === 0)
    {
      document.getElementById('selected_8').textContent = session.player2.piece
      grid[8] = 1
      return 8
    }
  }

  if (grid[0] + grid[4] + grid[8] === 2)
  {
    if (grid[0] === 0)
    {
      document.getElementById('selected_0').textContent = session.player2.piece
      grid[0] = 1
      return 0
    }
    
    if (grid[4] === 0)
    {
      document.getElementById('selected_4').textContent = session.player2.piece
      grid[4] = 1
      return 4
    }
    
    if (grid[8] === 0)
    {
      document.getElementById('selected_8').textContent = session.player2.piece
      grid[8] = 1
      return 8
    }
  }

  if (grid[2] + grid[4] + grid[6] === 2)
  {
    if (grid[2] === 0)
    {
      document.getElementById('selected_2').textContent = session.player2.piece
      grid[2] = 1
      return 2
    }
    
    if (grid[4] === 0)
    {
      document.getElementById('selected_4').textContent = session.player2.piece
      grid[4] = 1
      return 4
    }
    
    if (grid[6] === 0)
    {
      document.getElementById('selected_6').textContent = session.player2.piece
      grid[6] = 1
      return 6
    }
  }

  if (grid[0] + grid[1] + grid[2] === -2)
  {
    if (grid[0] === 0)
    {
      document.getElementById('selected_0').textContent = session.player2.piece
      grid[0] = 1
      return 0
    }
    
    if (grid[1] === 0)
    {
      document.getElementById('selected_1').textContent = session.player2.piece
      grid[1] = 1
      return 1
    }
    
    if (grid[2] === 0)
    {
      document.getElementById('selected_2').textContent = session.player2.piece
      grid[2] = 1
      return 2
    }
  }

  if (grid[3] + grid[4] + grid[5] === -2)
  {
    if (grid[3] === 0)
    {
      document.getElementById('selected_3').textContent = session.player2.piece
      grid[3] = 1
      return 3
    }
    
    if (grid[4] === 0)
    {
      document.getElementById('selected_4').textContent = session.player2.piece
      grid[4] = 1
      return 4
    }
    
    if (grid[5] === 0)
    {
      document.getElementById('selected_5').textContent = session.player2.piece
      grid[5] = 1
      return 5
    }
  }

  if (grid[6] + grid[7] + grid[8] === -2)
  {
    if (grid[6] === 0)
    {
      document.getElementById('selected_6').textContent = session.player2.piece
      grid[6] = 1
      return 6
    }
    
    if (grid[7] === 0)
    {
      document.getElementById('selected_7').textContent = session.player2.piece
      grid[7] = 1
      return 7
    }
    
    if (grid[8] === 0)
    {
      document.getElementById('selected_8').textContent = session.player2.piece
      grid[8] = 1
      return 8
    }
  }

  if (grid[0] + grid[3] + grid[6] === -2)
  {
    if (grid[0] === 0)
    {
      document.getElementById('selected_0').textContent = session.player2.piece
      grid[0] = 1
      return 0
    }
    
    if (grid[3] === 0)
    {
      document.getElementById('selected_3').textContent = session.player2.piece
      grid[3] = 1
      return 3
    }
    
    if (grid[6] === 0)
    {
      document.getElementById('selected_6').textContent = session.player2.piece
      grid[6] = 1
      return 6
    }
  }

  if (grid[1] + grid[4] + grid[7] === -2)
  {
    if (grid[1] === 0)
    {
      document.getElementById('selected_1').textContent = session.player2.piece
      grid[1] = 1
      return 1
    }
    
    if (grid[4] === 0)
    {
      document.getElementById('selected_4').textContent = session.player2.piece
      grid[4] = 1
      return 4
    }
    
    if (grid[7] === 0)
    {
      document.getElementById('selected_7').textContent = session.player2.piece
      grid[7] = 1
      return 7
    }
  }

  if (grid[2] + grid[5] + grid[8] === -2)
  {
    if (grid[2] === 0)
    {
      document.getElementById('selected_2').textContent = session.player2.piece
      grid[2] = 1
      return 2
    }
    
    if (grid[5] === 0)
    {
      document.getElementById('selected_5').textContent = session.player2.piece
      grid[5] = 1
      return 5
    }
    
    if (grid[8] === 0)
    {
      document.getElementById('selected_8').textContent = session.player2.piece
      grid[8] = 1
      return 8
    }
  }

  if (grid[0] + grid[4] + grid[8] === -2)
  {
    if (grid[0] === 0)
    {
      document.getElementById('selected_0').textContent = session.player2.piece
      grid[0] = 1
      return 0
    }
    
    if (grid[4] === 0)
    {
      document.getElementById('selected_4').textContent = session.player2.piece
      grid[4] = 1
      return 4
    }
    
    if (grid[8] === 0)
    {
      document.getElementById('selected_8').textContent = session.player2.piece
      grid[8] = 1
      return 8
    }
  }

  if (grid[2] + grid[4] + grid[6] === -2)
  {
    if (grid[2] === 0)
    {
      document.getElementById('selected_2').textContent = session.player2.piece
      grid[2] = 1
      return 2
    }
    
    if (grid[4] === 0)
    {
      document.getElementById('selected_4').textContent = session.player2.piece
      grid[4] = 1
      return 4
    }
    
    if (grid[6] === 0)
    {
      document.getElementById('selected_6').textContent = session.player2.piece
      grid[6] = 1
      return 6
    }
  }

  if (grid[4] === 0)
  {
    document.getElementById('selected_4').textContent = session.player2.piece
    grid[4] = 1
    return 4
  }

  if (grid[0] === 0)
  {
    document.getElementById('selected_0').textContent = session.player2.piece
    grid[0] = 1
    return 0
  }

  if (grid[2] === 0)
  {
    document.getElementById('selected_2').textContent = session.player2.piece
    grid[2] = 1
    return 2
  }

  if (grid[8] === 0)
  {
    document.getElementById('selected_8').textContent = session.player2.piece
    grid[8] = 1
    return 8
  }

  if (grid[6] === 0)
  {
    document.getElementById('selected_6').textContent = session.player2.piece
    grid[6] = 1
    return 6
  }

  if (grid[1] === 0)
  {
    document.getElementById('selected_1').textContent = session.player2.piece
    grid[1] = 1
    return 1
  }

  if (grid[3] === 0)
  {
    document.getElementById('selected_3').textContent = session.player2.piece
    grid[3] = 1
    return 3
  }

  if (grid[5] === 0)
  {
    document.getElementById('selected_5').textContent = session.player2.piece
    grid[5] = 1
    return 5
  }

  if (grid[7] === 0)
  {
    document.getElementById('selected_7').textContent = session.player2.piece
    grid[7] = 1
    return 7
  }
}

document.onkeydown = function (event)
{
  if (!session.gameOver)
    switch (event.keyCode)
    {
      case 37:
        document.getElementById(`selected_${session.currentCell}`).style = "background-color: white; color: black;"
        document.getElementById(`selected_${session.currentCell = jump(session.currentCell, -1)}`).style = "background-color: black; color: white;"
        break;
      case 38:
        document.getElementById(`selected_${session.currentCell}`).style = "background-color: white; color: black;"
        document.getElementById(`selected_${session.currentCell = jump(session.currentCell, -3)}`).style = "background-color: black; color: white;"
        break;
      case 39:
        document.getElementById(`selected_${session.currentCell}`).style = "background-color: white; color: black;"
        document.getElementById(`selected_${session.currentCell = jump(session.currentCell, 1)}`).style = "background-color: black; color: white;"
        break;
      case 40:
        document.getElementById(`selected_${session.currentCell}`).style = "background-color: white; color: black;"
        document.getElementById(`selected_${session.currentCell = jump(session.currentCell, 3)}`).style = "background-color: black; color: white;"
        break;
      case 13:
        if (document.getElementById(`selected_${session.currentCell}`).textContent === "")
        {
          if (session.p1Turn = !session.p1Turn)
            document.getElementById(`selected_${session.currentCell}`).textContent = session.player1.piece
          else
            document.getElementById(`selected_${session.currentCell}`).textContent = session.player2.piece
        
          checkWinner(session.currentCell)

          if (!session.gameOver && session.player2.name === 'GLaDOS')
          {
            session.p1Turn = !session.p1Turn

            checkWinner(glados())
          }
        }
        break;
    }
}

init = function ()
{
  currentCell = 0
  document.getElementById("p1").textContent = session.player1.name + ": " + session.player1.score
  document.getElementById("p2").textContent = session.player2.name + ": " + session.player2.score
  document.getElementById("selected_0").style = "background-color: black; color: white;"
  document.getElementById('p1').style.color = 'black'
  document.getElementById('p2').style.color = 'black'
}

reset = function ()
{
  for (i = 0; i < 9; i++)
  {
    document.getElementById(`selected_${i}`).textContent = ''
    document.getElementById(`selected_${i}`).style = "background-color: white; color: black;"
  }

  session.currentCell = 0
  session.gameOver = false
  grid = [0, 0, 0, 0, 0, 0, 0, 0, 0]

  init()

  if (!session.p1Turn && session.player2.name === 'GLaDOS')
    checkWinner(glados())
}

setTimeout(init, 0)

// while (!session.gameOver)
// {
//   alert("worked once")
//   //console.log(session.board.display())
//   session.gameOver = true
// }