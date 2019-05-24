Client <> API <> knex <> adapter <> DB (Server)
adapter is a package you use to connect to something. 
adapter--connector

JAVASCRIPT array of objects
const student = {
    name: '', 
    email: '',
}

//relations
student ==row on a table
name | email 
'john' | 'email'

ORM = Object Relational Mapper
translate between objects and relations
ORMs include a Query Builder

Query Builder translate from a programming language to SQL

Knex.js is a query builder

Steps
1.X Create databse 
2. X add a roles table to the database
3. X install knex
4. X configure knex to talk to our DB
5. X list all roles
6. list a role by id
7. add a role
8. remove a role
9. update a role