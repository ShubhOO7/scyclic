const express = require('express'); 
const mysql = require('mysql');
const cors = require('cors');

const app = express(); 

app.use(express.json() );
app.use(cors());




const db = mysql.createConnection({
    host: 'bjkrjkfqb6hxkflupozu-mysql.services.clever-cloud.com',
    user: 'uxyjgumzhizqv00r',
    password: 'nrb2PfTU02xn8X1e8jR5',
    database: 'bjkrjkfqb6hxkflupozu'
});

app.post('/' , (req, res) => {
    const username = req.body.username ;
    const password = req.body.password ;
    const imageUrl = req.body.imageUrl ;
    // console.log(username);
    // console.log(password);
    db.query("INSERT INTO Login (username, password , imageUrl) VALUES (?,?,?)",
     [username, password , imageUrl] ,
     (err, result) => {
        // console.log(err);
        if(err){
            if(err.code === 'ER_DUP_ENTRY' ){
                // console.log("duplicate");
                res.send(err.code) ; 
            }else{
                res.send(err);
                // console.log(err);
            }
        }else{
            res.send(result);
        }
     }); 
})


app.post('/loginform' , (req, res) => {
    const username = req.body.username ;
    const password = req.body.password ;
    // console.log(username);
    // console.log(password);
    console.log("--------------------------------");
    db.query("SELECT * FROM Login WHERE username = ? AND Password = ?",
     [username, password ] ,
     (err, result) => {
        if(err){
            // console.log(err);
        }
        if(result.length > 0 ){
            // console.log(result);
            res.send(result);
        }else{
            // console.log("Wrong username or password ");
            res.send({ message : "Wrong username or password "});
        }
     }); 
})

app.get('/tickets', function(req, res){
    db.query("SELECT * FROM List ORDER BY List_id DESC", function(err, results){
         if(err) {
            console.log(err);
            throw err;
         }else{
            // console.log(results);
            res.send(results);
         }
    })
})

app.post('/tickets' , (req, res)=>{
    const username = req.body.Username ;
    const imageUrl = req.body.imageUrl ;
    const Song = req.body.Song;

    db.query("INSERT INTO List (username, Song , imageUrl) VALUES (?,?,?)",
     [username, Song , imageUrl] ,
     (err, result) => {
        // console.log(err);
        if(err){
            if(err.code === 'ER_DUP_ENTRY' ){
                // console.log("duplicate");
                res.send(err.code) ; 
            }else{
                res.send(err);
                // console.log(err);
            }
        }else{
            res.send(result);
        }
     }); 
})
app.post('/tickets/create' , (req, res)=>{
    const username = req.body.Username ;
    const imageUrl = req.body.imageUrl ;
    const Song = req.body.Song;

    // console.log(username);
    // console.log(imageUrl);
    // console.log(Song);

    db.query("UPDATE List SET song = ? WHERE Username = ?",
     [Song , username] ,
     (err, result) => {
        // console.log(err);
        if(err){
            if(err.code === 'ER_DUP_ENTRY' ){
                // console.log("duplicate");
                res.send(err.code) ; 
            }else{
                res.send(err);
                // console.log(err);
            }
        }else{
            res.send(result);
        }
     }); 
})

app.post('/tickets/delete' , (req, res)=>{
    const username = req.body.Username ;
    const imageUrl = req.body.imageUrl ;
    const Song = req.body.Song;

    db.query("DELETE FROM List WHERE Song = ?",
     [Song] ,
     (err, result) => {
        // console.log(err);
        if(err){
            if(err.code === 'ER_DUP_ENTRY' ){
                // console.log("duplicate");
                res.send(err.code) ; 
            }else{
                res.send(err);
                // console.log(err);
            }
        }else{
            res.send(result);
        }
     }); 
})

app.listen(8000 , ()=> {
    console.log('listening on port : 8000 ');
})
