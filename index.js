const express = require('express')
const app = express()
const port = process.env.PORT || 3000


const db = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'devshop'
    }
})

const category = require('./models/category')
const product = require('./models/product')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', async (req, res) => {
    const categories = await category.getCategories(db)()
    res.render('home', {
        categories
    })
})

app.get('/categoria/:id/:slug', async(req, res) => {
    const categories = await category.getCategories(db)()
    const products = await product.getProductsByCategoryId(db)(req.params.id)
    const cat = await category.getCategoyById(db)(req.params.id)

    res.render('category', {
        products,
        categories,
        category: cat
    })
})

app.listen(port, err => {
    if(err){
        console.log('Não foi possível iniciar o servidor...')
    } else{
        console.log('DevShop server rodando...')
    }
})