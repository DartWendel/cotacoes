const request = require('request');


const cotacao = (id, callback) => {
    const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
        request({url: url, json: true}, (err, res) =>{
            if(err){
                 callback(
                    { message: `Error wong data: ${err}` }
                    , undefined
                 );                
            }

            if(res.body == undefined || res.body.id === undefined) {
                      return callback({
                        mensage : `No data found`,
                        code: 400
                        }, undefined);
            }

            const parseJSON = res.body;
            const {id, title, completed} = parseJSON
            const data = {id, title, completed}
            callback(undefined, data);
        });
}

module.exports = cotacao;