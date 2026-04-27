const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());


const users = []; 
let cart = []; 


app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ email, password });
    res.status(201).json({ message: 'Registration successful' });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.json({ message: 'Login successful', token: 'fake-token' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});


app.get('/api/products', async (req, res) => {
    try {
        const response = await axios.get('https://dummyjson.com/products');
        res.json(response.data.products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});

app.get('/api/cart', (req, res) => {
    res.json(cart);
});

app.post('/api/cart', (req, res) => {
    const { id, title, price } = req.body;
    cart.push({ id, title, price });
    res.json({ message: 'Added to cart successfully', cart });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));