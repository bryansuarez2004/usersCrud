const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
      const users = await User.findAll()
          //esto es como hacer un select * from
    
    return res.json(users)
});

const create = catchError(async (req,res)=>{
      const {firstname, lastname, email,password, birthday} = req.body 
      const newBody = {firstname,lastname,email,password,birthday}
     const user = await User.create(newBody)
      return res.status(201).json(user)
})

const getOne = catchError(async(req,res)=>{
      const {id} = req.params
      const user = await User.findByPk(id)
 if(!user) res.sendStatus(404)

      return res.json(user)
})

const destroy = catchError(async (req,res)=>{
    const {id} = req.params
    const user = await User.destroy({where: {id}})
    if(!user) res.sendStatus(404)
    return res.send('User deleted').status(204)
})

const update = catchError(async(req,res)=>{
    const {id} = req.params
    const {firstname, lastname, password} = req.body 
    const newBody = {firstname, lastname, password}
    //no dejare que cambie el birthday porque no se deberia poder modificar
    // y tampoco dejo modificar el email, porque es dato unico, 
    const user = await User.findByPk(id)
    if(!user) return res.sendStatus(404)


    const userUpdate = await User.update(
            newBody,
            {where: {id}, returning: true}
         )
    return res.json(userUpdate[1][0])
})


module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update
}