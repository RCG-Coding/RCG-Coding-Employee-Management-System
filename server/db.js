import mysql from 'mysql';

const con = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"Employee MS"
})

con.connect((err) => {
    if(err){
        console.log(`Error is ${err}`)
    }else{
        console.log('database is connected')
    }
})

export default con;