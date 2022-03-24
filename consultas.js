const { Pool } = require ( "pg" ); //npm i pg

const pool = new Pool({
user: "fidonoso_desafiolatam" ,
host: "postgresql-fidonoso.alwaysdata.net" ,
password: "desafiolatam1234" ,
database: "fidonoso_cursos" ,
port: 5432 ,
max: 20,
idleTimeoutMillis: 5000,
connectionTimeoutMillis: 2000,
});

async function nuevoCurso (nombre, nivelTecnico, fechaInicio, duracion) {

    try{
        const result = await pool.query(`INSERT INTO cursos (nombre, nivel, fecha, duracion) values ('${nombre}', '${Number(nivelTecnico)}', '${fechaInicio}', '${Number(duracion)}') RETURNING *`);
        return result.rows;
    }catch(e){
        return e;
    }
};

getCursos=async ()=>{
    try {
        const result= await pool.query('select * from cursos;')
        return result.rows;
    } catch (error) {
        return error
    }
};
editCurso=async (id, nombre, nivelTecnico, fechaInicio, duracion)=>{
    try {
        const result = await pool.query(`UPDATE cursos SET nombre='${nombre}', nivel='${Number(nivelTecnico)}', fecha='${fechaInicio}', duracion='${Number(duracion)}' WHERE id= '${id}' RETURNING *;`)
        return result.rows;

    }catch(error) {
        return error
    }
};

deleteCurso=async(id)=>{
    try {
        const result= await pool.query(`DELETE FROM cursos WHERE id='${id}' RETURNING *;`)
        return result.rowCount
    }catch(error){
     console.log(error)   
    }
};

module.exports = {
    nuevoCurso,
    getCursos,
    editCurso,
    deleteCurso
    };