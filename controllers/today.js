const handleGetTodays = (db) => (req,res) => {
    db.select('*').from('item').whereBetween('duedate', [new Date(), new Date()]).where('iscompleted','=',false)
    .returning('*').then(todayTodos=>{
        res.json(todayTodos)
    })
    .catch(err=>{
        res.status(400).json('Error while getting todays todo');
    })
}

module.exports = {
    handleGetTodays
}