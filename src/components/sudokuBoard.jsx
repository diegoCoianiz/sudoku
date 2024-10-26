import { useEffect, useRef, useState } from 'react';

const SudokuBoard = ({ board, selectedCell, handleNumberInput, userInputs,
    handleCellClick, getCellClassName, finish}) => {
    const [inputWidth, setInputWidth] = useState(0);
    const boardRef = useRef(null);
    const blockSize = Math.sqrt(board.length);

    useEffect(() => {
        if (boardRef.current) {
            const boardWidth = boardRef.current.offsetWidth;
            setInputWidth(boardWidth);
        }
    }, [board.length, selectedCell]);

    return (
        <div className="SudokuBoardAndInputs">
            <div ref={boardRef} className={`grid grid-${blockSize}`}>
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <button
                            key={`${rowIndex}-${colIndex}`}
                            className={getCellClassName(rowIndex, colIndex)}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                            disabled={cell !== 'x'}
                        >
                            {cell !== 'x' ? (
                                <span className="original-number">{cell}</span>
                            ) : (
                                <span className="user-number">
                                    {userInputs[`${rowIndex}-${colIndex}`]?.map((entry, index) => (
                                        <span key={index} style={{ color: entry.color }}>
                                            {entry.number}
                                        </span>
                                    ))}
                                </span>
                            )}
                        </button>
                    ))
                )}
            </div>
            {(selectedCell && !finish) && (
                <div className="number-input" style={{ width: `${inputWidth}px` }}>
                    {[...Array(board.length)].map((_, i) => (
                        <button key={i} onClick={() => handleNumberInput(i + 1)}>
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};


export default SudokuBoard;