const Product = require('../models/product');

module.exports = {
    create: (req, res)=>{
        let product = req.body;
        let p = new Product(product);

        p.save((err, product)=>{
            if(err) throw err;

            res.json(product);
        });
    },
    list: (req, res)=>{
        console.log('here');
        Product.find().populate('category','name').
        exec((err, products)=> {

            if (err) throw err;
            console.log('here');
            console.log('products '+ products.length);
            res.json(products);
        });
    },
    byId: (req, res)=>{
        let pId = req.params.id;

        Product.findOne({_id:pId}).populate('category','name').
        exec((err, product)=> {
            if (err) throw err;

            res.json(product);
        });
    },
    update: (req, res)=>{
        let pId = req.params.id;
        let product = req.body;

        Product.findOne({_id:pId}, (err, p)=>{
            if(err) throw err;

            p.name = product.name;
            p.price = product.price;
            p.category = product.category;
            p.image = product.image;

            p.save((err,newProduct)=>{
                if(err) throw err;

                res.json(newProduct);
            });

        });
    }


};