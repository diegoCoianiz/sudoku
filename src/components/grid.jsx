'use client';
import React, { useState } from 'react';
import DificultyButtons from './dificultyButtons';
import ResultBoard from './resultBoard';
import SudokuBoar from './sudokuBoard';
import Sidebar from './sideBar';

const Grid = () => {
    const [board, setBoard] = useState(null);
    const [boardId, setBoardId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCell, setSelectedCell] = useState(null);
    const [result, setResult] = useState(null);
    const [difficulty, setDifficulty] = useState(null); // Estado para la dificultad
    const [userInputs, setUserInputs] = useState({}); // Para almacenar los números ingresados por el usuario
    const [sendButton, setSendButton] = useState(false);
    const [finish, setFinish] = useState(false)
    const [annotationColor, setAnnotationColor] = useState("#388e3c"); // Color predeterminado


    const fetchBoard = async (square, visibility) => {
        try {
            setLoading(true);
            // Pasa ambos parámetros en la query string del fetch
            const response = await fetch(`/api?square=${square}&visibility=${visibility}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBoard(data.board);
            setBoardId(data.boardId);
            setLoading(false);
        } catch (error) {
            setError('Error fetching Sudoku board');
            setLoading(false);
        }
    };

    // Unificamos el manejo de la selección de dificultad y visibilidad
    const handleSelectionChange = (newDifficulty, newVisibilityLevel) => {
        setDifficulty(newDifficulty);

        // Realiza el fetch una vez que ambos valores están definidos
        fetchBoard(newDifficulty, newVisibilityLevel);
    };

    // Renderiza el selector de dificultad y visibilidad si no se ha seleccionado aún
    if (!difficulty) {
        return (
            <DificultyButtons
                handleSelectionChange={handleSelectionChange} // Pasamos la función unificada
            />
        );
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!board) return null;

    const blockSize = Math.sqrt(board.length);

    const getCellClassName = (rowIndex, colIndex) => {
        let className = 'cell';
        if ((colIndex + 1) % blockSize === 0 && colIndex !== board.length - 1) {
            className += ' cell-right-border';
        }
        if ((rowIndex + 1) % blockSize === 0 && rowIndex !== board.length - 1) {
            className += ' cell-bottom-border';
        }
        if (selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex) {
            className += ' selected';
        }
        if (userInputs[`${rowIndex}-${colIndex}`]) {
            className += ' user-input';
        }
        return className;
    };

    const handleCellClick = (rowIndex, colIndex) => {
        if (board[rowIndex][colIndex] === 'x') {
            setSelectedCell({ row: rowIndex, col: colIndex });
        }
    };

    const handleNumberInput = (number) => {
        if (selectedCell && number >= 1 && number <= board.length) {
            const cellKey = `${selectedCell.row}-${selectedCell.col}`;
            const newInputs = { ...userInputs };
    
            // Si la celda está vacía, inicializamos con el número y color actuales
            if (!newInputs[cellKey]) {
                newInputs[cellKey] = [{ number, color: annotationColor }];
            } else {
                // Si el número ya está en la lista, lo eliminamos; si no, lo añadimos con el color actual
                const existingIndex = newInputs[cellKey].findIndex(entry => entry.number === number);
                if (existingIndex > -1) {
                    newInputs[cellKey].splice(existingIndex, 1);
                } else {
                    newInputs[cellKey].push({ number, color: annotationColor });
                }
            }
    
            setUserInputs(newInputs); // Actualiza el estado de `userInputs`
            isBoardComplete(newInputs);
        }
    };
    
    const isBoardComplete = (inputs) => {
        for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
            for (let colIndex = 0; colIndex < board.length; colIndex++) {
                const cellKey = `${rowIndex}-${colIndex}`;
                if (board[rowIndex][colIndex] === 'x' && (!inputs[cellKey] || inputs[cellKey].length !== 1)) {
                    return setSendButton(false);
                }
            }
        }
        return setSendButton(true);
    };

    const submitSolution = async () => {
        // Generamos la solución utilizando el estado actualizado de `userInputs`
        setSendButton(false)
        const userSolution = board.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                const cellKey = `${rowIndex}-${colIndex}`;
                // Verifica si el usuario ingresó un número en esa celda
                return  userInputs[cellKey]?.[0]?.number || cell;
            })
        );

        try {
            const response = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ boardId, solution: userSolution.flat() }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setFinish(true)

            const data = await response.json();
            setResult({
                isValid: data.isValid,
                originalBoard: data.originalBoard,
                userSolution: userSolution,
            });
        } catch (error) {
            setError('Error al enviar la solución');
        }
    };

    return (
        <div className='generalGrid'>
            <Sidebar setAnnotationColor={setAnnotationColor} />
            <SudokuBoar
                board={board}
                selectedCell={selectedCell}
                handleNumberInput={handleNumberInput}
                userInputs={userInputs}
                handleCellClick={handleCellClick}
                getCellClassName={getCellClassName}
                finish={finish}
            />

            {sendButton && (
                <div className="submit-button-container">
                    <button onClick={submitSolution} className="submit-button">
                        Enviar
                    </button>
                </div>
            )}

            {/* Si hay un resultado, mostramos los dos tableros */}
            {result && (
                <div className='generalResultBoard'>
                    <br />
                    <ResultBoard
                        isValid={result.isValid}
                        originalBoard={result.originalBoard}
                        userSolution={result.userSolution}
                        blockSize={blockSize}
                    />
                </div>
            )}

            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Grid;