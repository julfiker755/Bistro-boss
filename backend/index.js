const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const stripe = require("stripe")('sk_test_51OEngWDbR4bZMF6dlP4SB6Tnjg7jnlyTHpwofmbv8XgpFJvdNiMapSD3UyRV2s5sUGUMiBxPaYzPhVZ1JlDWQhm300b1RCxa1T');


// middleware 
app.use(cors({origin: ["https://bistro-boss1.surge.sh","http://localhost:5173"],}))
app.use(express.json())
app.use(cookieParser())






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3ksqccu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true, } });

async function run() {
  try {
    const Menudatabase = client.db("Bistroboss").collection("Menu");
    const cartsdatabase = client.db("Bistroboss").collection("Carts");
    const userdatabase = client.db("Bistroboss").collection("user");
    const paymentdatabase=client.db("Bistroboss").collection("payment");
    // ? ************------------------------------------------------
    const varifytoken = async (req, res, next) => {
      if (!req.headers?.authorization){
        return res.status(401).send({ message: 'Unauthorized token' })
      }
      const token=req.headers?.authorization.split(' ')[1]
      jwt.verify(token, `${process.env.ASSENTOKEN}`, (err, decoded) => {
        // error
        if (err) {
          console.log(err)
          return res.status(401).send({ message: 'Unauthorized token varify' })
        }
        req.user = decoded
        next()
      })
    }
    // varify admin
    const verifyAdmin = async (req, res, next) => {
      const email = req.user.email;
      const query = { email: email };
      const user = await userdatabase.findOne(query);
      const isAdmin = user?.role === 'admin';
      if (!isAdmin) {
        return res.status(403).send({ message: 'forbidden access' });
      }
      next();
    }
    // ? ------------------------------------------------------------------------------------
    app.get('/payment',async(req,res)=>{
      const {email}=req.query
      const query={email:email}
      const result=await paymentdatabase.find(query).toArray()
      res.send(result)
    })
    app.post('/payment',async(req,res)=>{
     const paymet=req.body
     const paymentresult=await paymentdatabase.insertOne(paymet)
      const query={_id:{
        $in:paymet.cartids.map(id=> new ObjectId(id))
      }}
      const deleteresult=await cartsdatabase.deleteMany(query) 
     res.send({paymentresult,deleteresult})
    })

    // payment mathod for side
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount=parseInt(price*100)
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      })

    })

    // ? ------------------------------------------------------------------------------------
     app.post('/jwt',async(req,res)=>{
       const user=req.body
       const token=jwt.sign(user, process.env.ASSENTOKEN, { expiresIn:'1h'})
       res.send({token})
     })
    //  ? ----------------------------------------------------------------------------------
     // save user from database post mathod
     app.post('/users',async(req,res)=>{
      const user=req.body
      const query={email:user?.email}
      const existinguser=await userdatabase.findOne(query)
      if(existinguser){
       return res.send({message:'already exsis'})
      }else{
       const result = await userdatabase.insertOne(user);
       res.send(result)
      }
   })
     // save user from database put mathod
     app.put('/user/:email',async(req,res)=>{
      const email=req.params.email
      const user=req.body
      const filter = {email:email};
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const result = await userdatabase.updateOne(filter, updateDoc, options);
      res.send(result)
     })
    //? ------------------------------------------------------------------------------------
      
    // all user check user/ admin 
    app.get("/user/admin/:email",varifytoken,async(req,res)=>{
       const emaill=req.params.email
       if(emaill !== req.user.email){
        res.status(403).send({message:'Unauthorized access'})
       }
       const query={email:emaill}
       const singleuser=await userdatabase.findOne(query)
       let isAdmin = 'user';
        if (singleuser && singleuser.role === 'admin') {
            isAdmin = 'admin';
        }
       res.send({isAdmin})
    })
    // get data
       app.get('/user',varifytoken,verifyAdmin,async(req,res)=>{
      const result=await userdatabase.find().toArray()
      res.send(result)
      })
     

      //  user delete data
       app.delete('/delete/:userid',async(req,res)=>{
        const id=req.params.userid
        const query={_id:new ObjectId(id)}
        const result=await userdatabase.deleteOne(query)
        res.send(result)
       })
      
      //  patch data  for user /admin set
       app.patch('/user/:uid',async(req,res)=>{
        const id=req.params.uid
        const body=req.body
        const filter = {_id:new ObjectId(id)};
        const options = { upsert: true };
        const updateDoc = {
          $set: {
           role: body.role
          },
        };
        const result = await userdatabase.updateOne(filter, updateDoc, options);
        res.send(result)
       })
    // ? -------------------------------------------------------------------------------------
    // menu get item
     app.get('/menu',async(req,res)=>{
       const result=await Menudatabase.find().toArray()
       res.send(result)
     })
    //  menu post item
     app.post('/menu',async(req,res)=>{
      const menubody=req.body
      const result=await Menudatabase.insertOne(menubody)
      res.send(result)
     })
    //  menu delete item
     app.delete('/menu/:menuid',async(req,res)=>{
      const id=req.params.menuid
      const query={_id:new ObjectId(id)}
      const result=await Menudatabase.deleteOne(query)
      res.send(result)
     })
    //  menu put item
     app.put('/updatemenu/:id', async (req, res) => {
      const id = req.params.id;
      const updatemenu = req.body
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const updatedoc = {
        $set: {
          name: updatemenu.name,
          recipe: updatemenu.recipe,
          category: updatemenu.category,
          price: updatemenu.price,
        }
      }
      const result = await Menudatabase.updateOne(filter, updatedoc, options)
      res.send(result)
    })
     
    //? ---------------------------------------------------------------------------------------
      app.post('/carts',async(req,res)=>{
        const body=req.body
        const result=await cartsdatabase.insertOne(body)
        res.send(result)
      })
      app.get('/carts',async(req,res)=>{
        const {email}=req.query
        const query={email:email}
        const result=await cartsdatabase.find(query).toArray()
        res.send(result)
      })
      app.delete('/carts/:id',async(req,res)=>{
         const {id}=req.params
         const query={_id:new ObjectId(id)}
         const result=await cartsdatabase.deleteOne(query)
         res.send(result)
      })
    // ? -----------------------------------------------------------------------------------
    app.get('/order-stats',async(req,res)=>{
       const result=await paymentdatabase.aggregate([
         {
          $unwind:"$menuids",
         },{
          $lookup:{
            from:'Menu',
            localField:'menuids',
            foreignField:'_id',
            as:'menuItems',
          }
        }
        //  },{
        //   $unwind:"$menuItems",
        //  }
       ]).toArray()
       res.send(result)
    })
     app.get('/total',async(req,res)=>{
      const totalmenu=await Menudatabase.estimatedDocumentCount()
      const totaluser=await userdatabase.estimatedDocumentCount()
      const totalorder=await cartsdatabase.estimatedDocumentCount()
      const result=await paymentdatabase.aggregate([
        {
          $group:{
            _id:null,
            totalRevenue:{
              $sum:'$price',
            }
          }
        }
      ]).toArray()
      const reviewresult=result?.length > 0 ? result[0]. totalRevenue : 0 ;
      res.send({
        totalmenu,
        totaluser,
        totalorder,
        reviewresult
      })
     })
    // ? -------------------------------------------------------------------------------------
    // simple get data
    app.get('/', (req, res) => {
      res.send('server running for website')
    })
    console.log("Mongobd connect");
  } finally {
    // Ensures that the client will close when you finish/error
    //   await client.close();
  }
}
run().catch(console.dir)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})