const express = require ( "express" ); // npm i express
const app = express();
const bodyParser = require ( "body-parser" ); //npm i body-parser
const { nuevoCurso, getCursos, editCurso, deleteCurso } = require ( "./consultas" );

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen( 3000, ()=>{console.log('Servidor escuchando en el puerto 3000')} );


app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.post( "/curso" , async (req, res) => {
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    const respuesta = await nuevoCurso(nombre, nivelTecnico, fechaInicio, duracion);
    res.send(respuesta);
});

app.get("/cursos", async ( req, res)=>{
    const respuesta= await getCursos();
    res.send(respuesta)
})

app.put('/curso', async (req, res) => {
    const { id, nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    const respuesta =await editCurso(id, nombre, nivelTecnico, fechaInicio, duracion);
    res.send(respuesta)
});

app.delete('/cursos/:id', async (req, res) => {
    const {id}= req.params
    const respuesta= await deleteCurso(id);
    respuesta>0? res.send(`Curso ${id} eliminado`):res.send(`Curso ${id} no existe`)
})