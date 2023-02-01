const path = require('path');
const hbs = require('hbs');
const express = require('express');
const cotacoes = require('./util/cotacao');

const app = express();

const publicDiretoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views/views');
const partialsPath = path.join(__dirname, '../views/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDiretoryPath));

app.get('', (req, res) => {
    res.render ('index', {
        titile: 'Sistema',
        author: 'Wendel Oliveira'
    });
});

app.get('/about', (req, res) => {
    res.render ('about', {
        titile: 'Sobre',
        author: 'Wendel Oliveira'
    });
});

app.get('/help', (req, res) => {
    res.render ('help', {
        titile: 'Ajuda',
        author: 'Wendel Oliveira'
    });
});




app.get('/cotacoes', (req, res)=>{

    if (!req.query.id){
        res.status(400).json({
           error : {
            message: "O id deve ser informado!",
            code: 400
            }
        });
    }

    const id = req.query.id;

    cotacoes(id, (err, data) => {

        if(err){
            
            return res.status(err.code).json({error : {
                message: "O id não foi encontrado!",
                    code: err.code
            }});
        }
        
        res.status(200).json(data);
    });


    // const pessoa = {
    //     nome: 'Wendel',
    //     idade: 35,
    //     signo: 'libra',
    //     time: 'corinthans'
    // }

    // const pessoas = new Array();
    // pessoas.push(pessoa);
    // pessoas.push(pessoa);

    // response.send(pessoas);
});

app.get('*', (req, res) => {
    res.send('404', {
        titile: '404',
        errorMensage : 'Página não encontrada!',
        author: 'Wendel Silva'
    });
});


app.listen(3000, ()=>{
    console.log('ser is up on port 3000')
});