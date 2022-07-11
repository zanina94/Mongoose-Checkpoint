const express = require('express')
const router = express.Router()
const Person = require('../Models/PersonSchema')

// add Person @post (save)
// router.post('/newPerson',(req,res)=>{
//     let newPerson = new Person(req.body)
//     newPerson.save((err,data)=>{
//         err ? console.log(err) : res.send('Person was added')
//     })
// })

//Create Many Records with model.create()
router.post('/newPerson', async (req,res,next) =>{
    let {name,age,favouriteFoods} = req.body 
    try{
        let person = new Person({
            name,
            age,
            favouriteFoods
        })
       Person.create(person)
       res.status(200).json({
         status: 'Success',
         data : person
       })
    }catch(err){
        console.log(err)
        next(err)
    }
  })
   

  //Use model.find() to Search Your Database
router.post('/findPerson',(req,res)=>{
    Person.find({name: "alex"},(err,data)=>{  
        err ? console.log(err) : res.send('Person was find :'+ data)
})
})

//Use model.findOne() to Return a Single Matching Document from Your Database
router.post('/findPerson',(req,res)=>{
    Person.findOne({favouriteFoods: "burger"},(err,data)=>{  
        err ? console.log(err) : res.send('Person was find :'+ data)
})
})

//Use model.findById() to Search Your Database By _id
router.post('/findPersonById',(req,res)=>{
    Person.findById('62c70dc7e3f881c873b0275a',(err,data)=>{  
        err ? console.log(err) : res.send('Person was find :'+ data)
})
})

//Perform Classic Updates by Running Find, Edit, then Save
router.get('/updatePerson', async (req,res,next) =>{
    Person.findById('62cc3092ccb1ab661ca7cdce',(err,data)=>{  
       if(err)
       {
        console.log(err)
       }
       else
        {
            let {name,age,favouriteFoods} = data 
            let person = new Person({
                name,
                age,
                favouriteFoods
            })
            person.favouriteFoods.push("hamburger")
            person.save()
            res.status(200).json({
              status: 'Success',
              data : person
        })  
  }
})
})

//Perform New Updates on a Document Using model.findOneAndUpdate()
router.get('/updatePersonByName', async (req,res,next) =>{
    const filter = { name: 'alex' };
    const update = { age: 20 };

// `doc` is the document _after_ `update` was applied because of
// `new: true`
let person = await Person.findOneAndUpdate(filter, update, {
  new: true
});
 
res.status(200).json({
    status: 'Success',
    data : person
})  
})

//Delete One Document Using model.findByIdAndRemove
router.post('/RemovePersonById',(req,res)=>{
    Person.findByIdAndRemove('62c3177b3f54551e7724a655',(err,data)=>{  
        err ? console.log(err) : res.send('Person was removed :'+ data)
})
})


//MongoDB and Mongoose - Delete Many Documents with model.remove()
router.post('/RemovePersonByName',(req,res)=>{
      Person.remove({ name: 'Marie' },(err,data)=>{  
        err ? console.log(err) : res.send('Person removed :'+ data.deletedCount)
})
})

//Chain Search Query Helpers to Narrow Search Results
router.post('/Filter',(req,res)=>{
    Person.find({ favouriteFoods: 'burger' }).sort({name :1}).limit(2).select(["-age"]).then(docs => {
        console.log(docs)
      })
     .catch(err => {
        console.error(err)
      })
})

 module.exports = router