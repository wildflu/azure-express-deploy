
const express = require('express')

const app = express()

const mongoose = require('mongoose')

const Prod = require('./Modeles/Prod.model')

app.use(express.json())

// get all the product in the server
app.get('/prods', async (req, res) => {
    try {
        const documents = await Prod.find();
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// add a prod to the server 

app.post('/insertProd', async (req, res) => {
    try {
        const prod = Prod({
            name: req.body.name,
            description :req.body.description,
            price: req.body.price,
            image: req.body.ima
        })
        const result = await prod.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get ducument by id

app.get('/prod', async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ message: 'ID is required as a query parameter' });
    }
    try {
        const prod = await Prod.findById(id);
        if (!prod) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(prod);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// delete a decument by id
app.delete('/prod', async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ message: 'ID is required as a query parameter for deletion' });
    }
    try {
        const deletedProd = await Prod.findByIdAndDelete(id);
        if (!deletedProd) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(deletedProd);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// update

app.put('/prods', async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({ message: 'ID is required as a query parameter for updating' });
    }

    try {
        const updatedProd = await Prod.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProd) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProd);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




app.listen(5000, ()=>console.log("you here"))

mongoose.connect('mongodb://the-first-one:BtsKsxH63Uu8L0S5rRA3d1lQap1C5msMjVnxu2hTaMtnKS1zFteUflK2wWsSf1POduQUAMYfsz9VACDbmdmsrQ==@the-first-one.mongo.cosmos.azure.com:10255/test?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@the-first-one@',{
}).then(()=>console.log("done"))
    .catch((er)=> console.log(er))




