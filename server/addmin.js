import express from 'express';
import jwt from 'jsonwebtoken';
import con from './db.js';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';

const router = express.Router();

router.post('/login', (req, res) => {

    const sql = "SELECT * FROM addmin where email = ? and password = ?";

    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Login Error" });
        
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email }, 
                "jwt_secret_key", 
                { expiresIn: "1d" }
            );
            res.cookie('token', token);
            return res.json({ loginStatus: true });

        } else {
            return res.json({ loginStatus: false, Error: "Wrong Email or Password" });
        }
    });
});

router.post('/addCat', (req, res) => {
    const sql = `INSERT INTO category (name) VALUES (?)`;

    con.query(sql, [req.body.value], (err, result) => {
        console.log(req.body.value)
        if(err) return res.json({ loginStatus: false, Error: "Login Error" });
        return res.json({Status: true})
    })
})

router.get('/getCat', (req, res) => {
    const sql = 'SELECT * FROM category';

    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Login Error"})
            console.log(result)
        return res.json({Status: true, Result: result})      
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id
    const sql = 'SELECT * FROM employee WHERE id = ?';

    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
            console.log(result)
        return res.json({Status: true, Result: result})      
    })
})

router.put('/edit_emp/:id', (req, res) => {
    const id = req.params.id
    const sql = 'UPDATE employee SET name=?, email=?, salary=?, address=?, category_id=? WHERE id = ?';
    console.log(req.body.category_id)
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id,
        id
    ]
    console.log(values)
    con.query(sql, [...values], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
            console.log(result)
        return res.json({Status: true, Result: 'Edit Successful'})      
    })
})


router.get('/getEmp', (req, res) => {
    const sql = 'SELECT * FROM employee';

    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Login Error"})
        return res.json({Status: true, Result: result})      
    })
})

// image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

router.post('/addEmp', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee (name, email, password, salary, address, image, category_id)
    VALUES (?)`
    console.log(req.body.category_id)
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status:false, Error: "Query Error"})
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.salary,
            req.body.address,
            req.file.filename,
            req.body.category_id
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status:false, Error: "Query Error"})
            return res.json({Status: true})
        })   
    })
})

router.delete('/delEmp/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM employee WHERE id=?';
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status:false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})  
    })  
})

router.get('/countAdmin', (req, res) => {
    const sql = 'select count(id) as admin from addmin';
    con.query(sql, (err, result) => {
        if(err) return res.json({Status:false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})  
    })
})

router.get('/countEmp', (req, res) => {
    const sql = 'select count(id) as employee from employee';
    con.query(sql, (err, result) => {
        if(err) return res.json({Status:false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})  
    })
})

router.get('/countSalary', (req, res) => {
    const sql = 'select sum(salary) as salary from employee';
    con.query(sql, (err, result) => {
        if(err) return res.json({Status:false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})  
    })
})

router.get('/adminRec', (req, res) => {
    const sql = 'select * FROM addmin';
    con.query(sql, (err, result) => {
        if(err) return res.json({Status:false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})  
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})      
})

export { router as adminRouter };
