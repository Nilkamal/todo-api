const handleGetCompleted = (db) => (req,res) => {
    db.select('*').from('item').where('iscompleted','=', true).returning('*')
    .then(completedTodos=>{
        res.json(completedTodos);
    })
    .catch(err=>{
        res.status(400).json('Unable to get completed todo')
    })
}

const done = (db) => (req, res) => {
    const { id, completed } = req.body;
    let success = false;
    db.update({iscompleted: completed}).from('item').where('id','=',id)
    .returning('*').then(data=>{
        if(data[0].id)
            success = true;
            res.json(success);
    }).catch(err=>{
        success = false;
        res.status(400).json(success)
    })
}
module.exports = {
    handleGetCompleted,
    done
}