//funcao pura. Depende unica e exclusivamente de conn
const findAll = (conn, params) =>{
    return new Promise((resolve, reject)=>{
        const offset = params.currentPage * params.pageSize
        const pageSize = params.pageSize
        conn.query('select count(*) as total from pessoas', (err, res)=>{
            const total = res[0].total
            const totalPages = parseInt(total/pageSize)
            if(err){
                reject(err)
            }else{
                conn.query(`select * from pessoas limit ${offset}, ${pageSize}`, (error, results)=>{
                    if(!error) resolve({
                        data:results,
                        pagination:{
                            pages: totalPages,
                            pageSize,
                            currentPage: parseInt(params.currentPage)
                        }
                    })
                    else reject(error)
                })
            }
        })
    })
}

const findById = (conn, id) =>{
    return new Promise((resolve, reject)=>{
        conn.query('select * from pessoas where id = '+ id, (error, results)=>{
            if(!error) resolve(results[0])
            else reject(error)
        })
    })
}

const deleteOne = (conn, id) => {
    return new Promise((resolve, reject)=>{
        conn.query('delete from pessoas where id = ' + id + ' limit 1', (error)=>{
            if(error) reject(error)
            else resolve()
        })
    })
}

const create = (conn, data)=>{
    return new Promise((resolve, reject)=>{
        conn.query(`insert into pessoas (nome, nacionalidade, cargo) values ('${data.nome}', '${data.nacionalidade}', '${data.cargo}')`, (error)=>{
            if(error) reject(error)
            else resolve()
        })
    })
}

// const update = (conn, id, data)=>{
const update = (conn, data)=>{
    return new Promise((resolve, reject)=>{
        const teste = conn.query(`update pessoas set nome='${data.nome}', nacionalidade='${data.nacionalidade}', cargo='${data.cargo}' where id = '${data.id}' `, (error)=>{
            if(error) reject(error)
            else {
                console.log(teste)
                resolve()

            }
        })
    })
}

module.exports = {
    findAll,
    findById,
    deleteOne,
    create,
    update
}