const router = express.Router();
const { User, Contact } = require('./sequelize')
var jwt = require('jsonwebtoken');

//routing
router.post('/users/post', function (req, res, next) {
    addUser(req, res);
});

router.post('/users/get', function (req, res, next) {
    loginUser(req, res);
});

router.post('/contact/post',function(req,res,next){
    addContact(req,res);
});

router.post('/contact/get',function(req,res,next){
    getAllContacts(req,res);
});

router.post('/contact/delete',function(req,res,next){
    contactDelete(req,res);
});

router.post('/contact/update',function(req,res,next){
    contactUpdate(req,res);
})



//database
async function addUser(req, res) {
    const userData=req.body;
    console.log(userData);
    User.create(userData).then(user => res.json(user), error=> {
        console.log(error);
        
    })
}

async function addContact(req,res)
{
    const contactData=req.body;
    console.log(contactData.body);
    Contact.create(contactData).then(contact => res.json(contact),error=>{
        console.log(error);
    })
}

async function loginUser(req,res)
{
    User.findAll().then(users => {
        res.json(users);
      },error=>{
        console.log(error);
      });
    // try{
    //     const userData = req.body;
    //     let user = await User.findOne({name: userData.username});
    //     if(user.password === userData.password){
    //         res.status(200).json({user: user});
    //     } else{
    //         res.status(200).json({message: "Invalid user"});
    //     }
    // } catch(error){
    //     res.status(200).json({});
    // }
}

async function contactDelete(req,res){
    let userId=req.body.userId;
    let contactId=req.body.contactId
    console.log("inside delete function");

    Contact.destroy({
        where: {
          id: contactId,
          userid:userId
        }
      }).then(() => {
          res.sendStatus(200);
        // console.log("Done");
      });
}

async function getAllContacts(req,res)
{
    Contact.findAll({where:{userid:req.body.userId}}).then(contacts => {
        res.json(contacts);
      },error=>{
        console.log(error);
      });
}

async function contactUpdate(req,res){
    Contact.update({ name:req.body.name, email:req.body.email, contact:req.body.contact, city:req.body.city }, {
        where: {
          id: req.body.id,
          userid:req.body.userid
        }
      }).then(() => {
        res.sendStatus(200);
      });
}

module.exports = router;
