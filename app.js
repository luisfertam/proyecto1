const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const exp = require('constants')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, 'public')))

const uri  = 'mongodb+srv://luisfertam:4567283694Fo@pro1db.qtlvsjj.mongodb.net/test?retryWrites=true&w=majority'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(uri, options)
  .then(() => {
    console.log('Conexión a MongoDB Atlas exitosa');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB Atlas:', error);
});


 app.listen(3000, () => {
    console.log('server started')
}) 

module.exports = app