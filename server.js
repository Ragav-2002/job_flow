const express = require('express');
const app = express();

app.use(express.json());

// Sample route
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
}); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});