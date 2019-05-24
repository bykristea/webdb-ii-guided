const knex = require('knex');
const router = require('express').Router();

const knexConfig = {
  client: 'sqlite3',
  connection: {//string or object
    filename: './data/rolex.db3'//from the root folder
  },
  useNullAsDefault: true,
};
const db = knex(knexConfig);

//GET /api/roles
router.get('/', (req, res) => {
  //SELECT * FROM roles
  db('roles') //<< enough to return a promise with all of the rows
  .then(roles => {
    res.status(200).json(roles);
  }).catch(error => {
    res.status(400).json({
      message: "error retrieving roles."
    });
  });
  // get the roles from the database
  // res.send('Write code to retrieve all roles');
});


// SELECT * from roles WHERE id = :id;
router.get('/:id', (req, res) => {
  db('roles')
    .where({id: req.params.id})
    .first()
  .then(role => {
    if(role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ message: 'role not found'})
    }
  })  
  .catch(err => {
    res.status(500).json(err);
  });
});

  // add a role to the database insert into roles () values (req.body)
router.post('/', (req, res) => {
  if(!req.body.name) {
    res.status(400).json({message: 'please provide a name'})
  } else {
  db('roles')
  .insert(req.body, 'id')
  .then(ids => {
    db('roles')
    where({ id: ids[0] })
    .first()
    .then(role => {
      res.status(200).json(role);
    })
    .catch(err => {
      res.status(500).json(err);
    });
  })
  .catch(error => {
    res.status(500).json(error);
  });
}
});

router.put('/:id', (req, res) => {
  db('roles')
  .where({id: req.params.id})
  .update(req.body)
  .then(count =>{
    if(count > 0) {
      res.status(200).json({ 
        message: ` &{count} roles updated`
      })
    } else {
      res.status(404).json({message: 'role not found'})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // remove roles (inactivate the role)
  db('roles')
  .where({id: req.params.id})
  .delete()
  .then(count =>{
    if(count > 0) {
      res.status(200).json({ 
        message: ` &{count} roles updated`
      })
    } else {
      res.status(404).json({message: 'role not found'})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

module.exports = router;
