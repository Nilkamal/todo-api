const handleGetUpcoming = (db) => (req,res) => {

    db.select('*').from('item').where('duedate','>',new Date())
    .where('iscompleted','=',false)
    .returning('*').then(upcomingTodos=>{
        res.json(upcomingTodos)
    })
    .catch(err=>{
        res.status(400).json('Error while getting upcoming todo');
    })
}

module.exports = {
    handleGetUpcoming
}