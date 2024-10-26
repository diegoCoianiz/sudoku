import React from 'react'

const ApiSectionExplained = () => {
    return (
        <div style={{maxWidth:"500px"}}>
            <h2>Para desarrolladores:</h2>
            <p>
                Los desarrolladores disponen de una API para solicitar y verificar tableros de Sudoku.</p>
            <p>
                Puede consultar la información en el siguiente <a href='/apiSection' style={{ color: "blue" }}>enlace</a>.
            </p>
            <br />
            <br />
            <h2>Sobre esta versión (v1.0):</h2>
            <p>Esta web surge del disfrute del autor por el desarrollo backend & frontend y no posee fines comerciales.</p>
            <br />
            <p>En próximas versiones (si es que tal cosa sucede, y puede que no suceda nunca) existirá un sistema de registro de cuentas. El usuario podrá contabilizar sus partidas, cronometrar sus tiempos, jugar contra otros usuarios y posicionarse en diferentes rankings.</p>
            <br />
            <p>El autor no se responsabiliza por los efectos secundarios que jugar al Sudoku produce en la mente y el cuerpo. Si durante el juego experimenta alucinaciones, estados elevados de expanción de la conciencia o cualquier clase de cuestionamiento de indole filosófico trascendental sepa, en todo momento, que está en el camino correcto y que la única mentira es la verdad. </p>
        </div>
    )
}

export default ApiSectionExplained