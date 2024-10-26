import React from 'react'
import Image from 'next/image';
import "./apiSection.css";

const Index = () => {
    return (
        <div className='apiSectionPage'>
            <h3>GET:</h3>
            <p>
                Para obtener los valores de un tablero se puede utilizar la consulta:
            </p>
            <Image
                src="/APIGET.jpg"
                width={800}
                height={500}
                alt="Post Method"
            />
            <p>donde:</p>
            <p> <code>square</code> debe ser un número entre 2 y 4 que, respecticamente, generará sudokus de 4x4 ; 9x9 ; 16x16 </p>
            <p> <code>visibility</code> debe ser un número entre 0 y 9 de "dificultad" donde 0 significa que todos los números serán visibles y 9 representa un nivel de dificultad extrema, con muy pocos números visibles en la lista a retornar y una gran catidad de `x`.</p>
            <p> Esta consulta devuelve un JSON
                que incluye <code>board</code> (el tablero) con los numeros y las `x` generedas y <code>boardId</code> (el ID del tablero).
            </p>
            <div style={{ textAlign: "start" }}>
                <h5>en el siguiente ejemplo:</h5>
                <br />
                <code>http://localhost:3000/api?square=3&visibility=5</code>
                <br />
                <br />
                <h5>se retorna:</h5>
                <br />
                <code> {`{"board":[[3,"x","x","x","x",6,"x","x",4],["x",8,1,5,4,"x",6,"x","x"], [4,9,"x","x",3,"x","x",5,7],["x",4,5,"x","x",9,"x",3,2], ["x",3,"x","x","x",5,"x",7,"x"],["x","x",9,"x","x","x","x",4,"x"], ["x",2,4,6,5,7,"x",1,8],[8,6,"x",1,"x","x","x","x","x"], [5,1,3,"x",8,4,7,"x","x"]], "boardId":"sud5s9"}`} </code>
            </div>
            <br></br>
            <h3>POST:</h3>
            <p>
                Para verificar la solución de un tablero se puede utilizar el método <code>POST</code> a <code>/api</code>,
                enviando el <code>boardId</code> y la solución del usuario en el cuerpo de la petición.
                El formato de la solicitud es el siguiente:</p>
            <Image
                src="/APIPOST.jpg"
                width={800}
                height={500}
                alt="Post Method"
            />
            <p> Esto permite verificar si la solución proporcionada es correcta al enviarla como una lista plana de todos los números del tablero. Este metodo devuelve un valor booleano <code>isValid</code> (donde <code>True</code> implica que la solución es correcta) y luego <code>originalBoard</code> para que el cliente pueda verificar y comparar su solución con los datos reales del tablero en caso de presentar una solución incorrecta.
            </p>
            <div style={{ textAlign: "start" }}>
                <h5>en el siguiente ejemplo:</h5>
                <div></div>
                <Image
                    src="/POSTSendSolution.jpg"
                    width={400}
                    height={100}
                    alt="Post Method"
                />
                <h5>se retorna:</h5>
                <br />
                <code> {`{"isValid":false, "originalBoard":[[9,1,2,5,8,3,6,4,7],[7,5,3,4,9,6,2,1,8], [8,4,6,1,7,2,3,5,9],[3,8,1,9,2,5,4,7,6], [6,9,5,7,3,4,1,8,2],[2,7,4,8,6,1,5,9,3], [5,2,8,3,1,9,7,6,4],[4,3,9,6,5,7,8,2,1], [1,6,7,2,4,8,9,3,5]]}`}
                </code>
            </div>
            <br />
            <hr />
            <p>
                Usted puede disponer de esta API de forma gratuita para su uso en sus propios proyectos. Si tiene alguna duda respecto de este proyecto o gusta ponerse en contacto ante cualquier eventualidad no dude en contactarme vía email: <code>diego.c.coianiz@gmail.com</code> o buscarme en <a href='https://github.com/diegoCoianiz'><code>gitbub/diegoCoianiz</code></a> 
            </p>
        </div>
    )
}

export default Index