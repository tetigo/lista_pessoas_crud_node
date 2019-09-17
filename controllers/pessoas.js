const pessoas = require('../models/pessoas')

// const index = (req, res) =>{
//     res.send('Pessoas index!!!')
// }

const index = async(conn, req, res)=>{
    // conn.query('select * from pessoas', (err, results)=>{
    //     res.send(results)
    // })
    const result = await pessoas.findAll(conn)
    // res.send(result)
    res.render('pessoas/index', {pessoas: result})
}

const deleteOne = async(conn, req, res) =>{
    await pessoas.deleteOne(conn, req.params.id)
    res.redirect('/pessoas')
}

const createForm = (req, res) =>{
    res.render('pessoas/create')
}

const createProcess = async(conn, req, res) => {
    //express nao processa body automatico
    //tudo é customizado, precisamos de um middleware
    //precisamos instalar body-parser
    // res.send(req.body)
        
    await pessoas.create(conn, req.body)
    res.redirect('/pessoas')
}

const updateForm = async(conn, req, res) =>{
    const pessoa = await pessoas.findById(conn, req.params.id) 
    res.render('pessoas/update',{pessoa})
}

const updateProcess = async(conn, req, res) => {
    //pode-se criar id no form do tipo hidden ou passar req.params.id
    // const log = await pessoas.update(conn, req.params.id, req.body)
    const log = await pessoas.update(conn, req.body)
    // console.log(log)
    // res.send(req.body)
    res.redirect('/pessoas')
}


module.exports ={
    index,
    deleteOne,
    createForm,
    createProcess,
    updateForm,
    updateProcess
}

