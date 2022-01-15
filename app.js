const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const { dbConnect } = require('./app/config/mongo')

require('dotenv/config');


const PORT = process.env.PORT || 3000;

const api = process.env.API_URL;

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('tiny'));


app.use(api, require('./app/routes/products'));
app.use(api, require('./app/routes/category'));
app.use(api, require('./app/routes/auth'));
app.use(api, require('./app/routes/users'));
app.use(api, require('./app/routes/orders'));

dbConnect();

app.listen(PORT, () => {
  console.log(`🚀 App corriendo el puerto ${PORT}`);
})