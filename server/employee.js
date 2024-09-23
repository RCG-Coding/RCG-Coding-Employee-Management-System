import express from 'express';
import jwt from 'jsonwebtoken';
import con from './db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/employeeLogin', (req, res) => {
    console.log(req.body)
    const sql = "SELECT * FROM employee where email = ?";

    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query Error" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {

                if (err) return res.json({ loginStatus: false, Error: "Wrong password" });
                if (response) {
                    const email = result[0].email;
                    const token = jwt.sign({ role: "employee", email: email },
                        "employee_secret_key",
                        { expiresIn: "1d" }
                    );
                    res.cookie('token', token);
                    return res.json({ loginStatus: true, id: result[0].id });
                }else{
                    return res.json({ loginStatus: false, Error: "Wrong Email or Password" });
                }
            });
        }
    });
});

router.get('/details/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM employee where id=?';
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status:false, Error: 'Query Error'})
        return res.json(result)
    })
})

export { router as employeeRouter }