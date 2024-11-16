import { NextResponse } from 'next/server';

// Objeto para almacenar los tableros generados temporalmente
let generatedBoards = {};
// Función para generar un ID único para el tablero
function generateBoardId() {
  return 'sud' + Math.random().toString(36).substr(2, 3);
}

function generateSudokuBoard(divisor) {
  const square = divisor * divisor
  let grid = [];

  //#region 1) Generación de numeros para la primera fila
  let availableNumbers = Array.from({ length: square }, (_, i) => i + 1);
  let firtsRow = [];
  for (let col = 0; col < square; col++) {
    let Strategy = Math.floor(Math.random() * availableNumbers.length);
    let selectedNumber = availableNumbers[Strategy];
    firtsRow.push(selectedNumber);
    availableNumbers.splice(Strategy, 1);
  }
  grid.push(firtsRow)
  //#endregion

  //#region 2) División de filas en X partes iguales de acuerdo al divisor
  let dividedFirstRow = []
  let block = []
  for (let num of grid[0]) {
    if (block.length == divisor) {
      dividedFirstRow.push(block)
      block = []
      block.push(num)
    } else {
      block.push(num)
    }
  }
  dividedFirstRow.push(block)
  //#endregion

  //#region 3) Generación y push() del resto de filas (2da en adelante) al grid mediante estrategias
  for (let generation = 0; generation < divisor; generation++) {
    let first = Boolean
    generation == 0 ? first = false : first = true

    // FIRST = FALSE: no hace grid.push() de la primera fila, ya hecho en la región 1 
    if (first) {
      // La fila se ordenará con las posiciones iniciales de < dividedFirstRow >
      let r = []
      for (let subBlock of dividedFirstRow) {
        r.push(subBlock)
      }
      grid.push(r.flat())
    }
    let Strategy = 0
    if (divisor > 2) {
      Strategy = Math.floor(Math.random() * (2));
    }
    let counter
    // La fila se ordenará con las posiciones random determinadas con < Strategy >
    for (let i = 0; i < divisor - 1; i++) {
      if (Strategy == 0) i > 0 ? counter += 1 : counter = 0
      if (Strategy == 1) i > 0 ? counter -= 1 : counter = divisor - 2


      let r = []
      let temp = [];
      for (let subBlock in dividedFirstRow) {
        // console.log("subBlock: ", subBlock, `<= counter: ${counter}`, "rowLength: ", dividedFirstRow.length)
        if (subBlock <= counter) {
          temp.push(dividedFirstRow[subBlock])
          // console.log(dividedFirstRow[subBlock], " entra en el temporal")
        } else if (subBlock < dividedFirstRow.length) {
          r.push(dividedFirstRow[subBlock])
          // console.log(dividedFirstRow[subBlock], " entra en la fila")
        }
      }
      r.push(temp.flat())
      grid.push(r.flat())
      // console.log("---------")
    }
    // console.log("\n")

    // Corrimiento de items por bloque: primer item al final - pop() & push() 
    for (let i = 0; i < divisor; i++) {
      let popAndPushNumber = dividedFirstRow[i].shift()
      dividedFirstRow[i].push(popAndPushNumber)
    }
  }
  //#endregion

  //#region 4) División extra entre columnas y numeros aleatorios mediante estrategias
  if(divisor > 2) {
    let tempCol = []
    for (let i = 0; i < grid[0].length; i++) {
      tempCol.push(grid[i].shift())
      grid[i].splice(1, 0, tempCol.shift())
      tempCol.push(grid[i].pop())
      grid[i].splice(6, 0, tempCol.shift())
    }
  
    let rotateNumbers = []
    let indexOfRotateNumbers = []
    let tempNum = []
    for (let i = 0; i < grid[0].length; i++) {
      if (i % divisor == 0) {
        indexOfRotateNumbers = []
        rotateNumbers = []
        for (let r = 0; r < divisor; r++) {
          rotateNumbers.push(grid[i+r][0])        
        }
      }
      for (let r = 0; r < divisor; r++) {
        indexOfRotateNumbers.push(grid[i].indexOf(rotateNumbers[r]))        
      }
      for (let r = 0; r < divisor-2; r++) {
        tempNum.push(grid[i][indexOfRotateNumbers[r]])
        grid[i][indexOfRotateNumbers[r]] = grid[i][indexOfRotateNumbers[r+1]]
        grid[i][indexOfRotateNumbers[r+1]] = tempNum.shift()        
      }
    }
  }
  //#endregion
  //
  return grid;
}

// Función para ocultar algunas celdas del tablero
function hideRandomCells(board, visibility) {
  return board.map(row => row.map(cell => Math.random() < (visibility+.5) / 10 ? 'x' : cell));
  return board
}

function validateSudokuSolution(solution, originalBoard) {
  if (JSON.stringify(solution) === JSON.stringify(originalBoard.flat())) return true
  return false
}


export async function GET(request) {
  // Obtener los parámetros de la URL
  const { searchParams } = new URL(request.url);

  // Obtener el valor de 'level' del parámetro de la query string y Convertir 'level' a número si es necesario
  const square = parseInt(searchParams.get('square'), 10); // Convertir a entero, ya que los parámetros de URL son strings
  const visibility = parseInt(searchParams.get('visibility'), 10); // Convertir a entero, ya que los parámetros de URL son strings
  

  // Aquí puedes usar 'square' para generar tu tablero en función del nivel de dificultad
  if (!square || isNaN(square)) {
    return new Response('Invalid level', { status: 400 });
  }

  // Lógica para generar el tablero de Sudoku con base en 'square' o 'level'
  const fullBoard = generateSudokuBoard(square);
  const boardId = generateBoardId();
  let visibleBoard = fullBoard
  if (visibility > 0) visibleBoard = hideRandomCells(fullBoard, visibility);

  // Almacena el tablero completo en el objeto temporal
  generatedBoards[boardId] = fullBoard;
  // console.log("se crea el tablero: ", boardId)

  // Configura un temporizador para eliminar el tablero después de 'x' minutos
  const minutes = square > 3 ? 60 : 30 
  setTimeout(() => {
    delete generatedBoards[boardId];
  }, minutes * 60 * 1000);

  return NextResponse.json({ board: visibleBoard, boardId });
}

export async function POST(request) {
  const { boardId, solution } = await request.json();
  console.log(`boardId: ${boardId}, solution: ${solution}`)

  if (!boardId || !solution) {
    return NextResponse.json({ error: 'No se proporcionó una solución o ID de tablero válido' }, { status: 400 });
  }

  const originalBoard = generatedBoards[boardId];


  if (!originalBoard) {
    return NextResponse.json({ error: 'El tablero ha expirado o no existe' }, { status: 400 });
  }

  const isValid = validateSudokuSolution(solution, originalBoard);
  console.log(`se procede a eliminar el usuario ${boardId}, cuya solución fue ${isValid == true ? "positiva" : "negativa"}`)
  delete generatedBoards[boardId];
  return NextResponse.json({ isValid, originalBoard });
}