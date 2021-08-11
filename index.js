const express = require('express');
const app = express();
const path = require('path');
const Product = require('./models/product');
const methodOverrride = require('method-override');


const mongoose = require('mongoose');
//const { AsyncLocalStorage } = require('async_hooks');
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected Mongo');
  })
  .catch(err => {
    console.log("Error in mongo connection");
    console.log(err);
  })

app.use(methodOverrride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded ({extended:true}));

const categories = ['fruit','vegetable','diary','mashrooms'];

//Product Show Page
app.get('/products', async (req, res) => {
  const {category} = req.query;
  let products;
  if(category)
  {
     products = await Product.find({category});
  }
  else
  {
     products = await Product.find({});
  }
  res.render('products/index', { products,category });
 
})
//Form for adding new product (Here this API is written before Details beacuse "new" can be bacome id for detail API)
app.get('/products/new', (req, res) => {
  res.render('products/new',{categories})
})

//Details
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/show', { product });
})

//Adding Product (Post Req)
app.post('/products',async (req,res)=>{
  const p = new Product(req.body);
  await p.save();
  res.redirect(`products/${p._id}`);
})

//Edit
app.get('/products/:id/edit',async(req,res)=>{
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit',{product,categories} );
})

//Put (for updating product)
app.put('/products/:id',async(req,res)=>{
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id,req.body,{runValidators:true, new : true});
  res.redirect(`/products/${product._id}`);

})

//Delete
app.delete('/products/:id', async (req,res)=>{
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  res.redirect('/products');
})



app.listen(3000, () => {
  console.log('Listening Express');
})