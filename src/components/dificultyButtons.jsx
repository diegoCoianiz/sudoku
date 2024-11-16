import { useState } from 'react';
import ApiSectionExplained from './apiSectionExplained';

const DificultyButtons = ({ handleSelectionChange }) => {
    const [difficulty, setDifficulty] = useState(null);
    const [visibilityLevel, setVisibilityLevel] = useState(5); // Valor inicial en 4 (visibilidad intermedia)

    // Función que maneja la selección de dificultad
    const handleDifficultyClick = (level) => {
        setDifficulty(level);
        handleSelectionChange(level, visibilityLevel); // Pasa el nivel de dificultad y visibilidad actual
    };

    // Función que maneja el slider de visibilidad
    const handleVisibilityChange = (e) => {
        const value = parseInt(e.target.value);
        setVisibilityLevel(value);
        if (difficulty) {
            handleSelectionChange(difficulty, value); // Pasa el nivel de dificultad y el nuevo nivel de visibilidad
        }
    };

    return (
        <div className='dificultyButtonsContainer'>
            <h2 style={{ marginBottom: "-15px" }}>Nueva partida:</h2>
            <div className='dificultyButtons'>
                <button onClick={() => handleDifficultyClick(2)}></button>
                <button onClick={() => handleDifficultyClick(3)}>Sudoku</button>
                <button onClick={() => handleDifficultyClick(4)}>Mega Sudoku</button>
                <p>
                Buscas un desafío aún más grande que el Sudoku tradicional? el Mega Sudoku, con un tamaño de 16x16, es la respuesta (:</p>
            </div>
            <br />
            <h2 style={{marginBottom:"-20px"}}>Nivel de visibilidad:</h2>
            <div className='visibilitySlider'>
                <input
                    type="range"
                    min="2"
                    max="6"
                    value={visibilityLevel}
                    onChange={handleVisibilityChange}
                    step="1"
                />
                <div className="visibilityLabels">
                    <span>Fácil</span>
                    <span>Intermedio</span>
                    <span>Difícil</span>
                </div>
            </div>

            <section style={{marginTop:"25px", marginBottom:"-55px"}}>
                <ApiSectionExplained />
            </section>

        </div>
    );
};

export default DificultyButtons;
