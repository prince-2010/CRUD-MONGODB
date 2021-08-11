const mongoose = require('mongoose')
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand',{useNewUrlParser : true , useUnifiedTopology: true})
  .then(()=>{
      console.log('Connected Mongo ji');
  })
  .catch(err=>{
       console.log("Error in mongo connection");
       console.log(err);
  })

const seed = [
    {
        name: "Bigan",
        price: 100,
        category: 'vegetable'
    },
    {
        name: "Cake",
        price: 100,
        category: 'diary'
    },
    {
        name: "Banana",
        price: 100,
        category: 'fruit'
    }
]

Product.insertMany(seed)
.then(res=>{
    console.log(res)
})
.catch(e=>{
    console.log(e)
})

const p = new Product({
    name: "Apple",
    price: 100,
    category: 'fruit'
}) 
p.save()
.then(p=>{
    console.log(p);
})
.catch(e=>{
    console.log(e);
})