import React from 'react'

const ResultBoard = ({ isValid, originalBoard, userSolution, blockSize }) => {
    console.log(originalBoard, userSolution);

    return (
        <div>
            {isValid ? (
                <div>
                    <p>¡Felicitaciones! Solución correcta.</p>
                    <br/>
                </div>
            ) : (
                <div>
                    <br/>
                    <p style={{padding:"0px 10px"}}>Solución incorrecta, compara tus resultados e inténtalo nuevamente.</p>
                    
                    <div className="result-board-container">
                        <div >
                            <h3>Solución:</h3>
                            <div className={`grid grid-${blockSize} result-board`}>
                                {originalBoard.flat().map((cell, index) => (
                                    <div key={index} className="result-cell">
                                        {cell}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <div style={{margin:"0px 5px"}}></div>
                        <div>
                            <h3>Tu solución:</h3>
                            <div className={`grid grid-${blockSize} result-board`}>
                                {userSolution.flat().map((cell, index) => (
                                    <div key={index} className="result-cell">
                                        {cell}
                                    </div>
                                ))}
                            </div>
                        </div> */}
                    </div>
                </div>
            )}
        </div>
    );
};



export default ResultBoard