const handleGetAll = (db) => (req,res) => {
    console.log('I am getting');
    db.select('*').from('item').returning('*').then((todos=>{
        res.json(todos);
    }))
    .catch(err=>{
        res.status(400).json('Error while getting todos');
    })
}

const insert = (db) => (req,res) => {
    const {title, dueDate } = req.body;

    db('item').insert({title:title, duedate: dueDate, iscompleted: false}).returning('*')
    .then(todo=>{
        res.json(todo[0]);
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json('Unable to save todo');
    })

}

module.exports = {
    handleGetAll,
    insert
}