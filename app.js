require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
//******************      Database Connection      *******************/
const db = require('./config/database')

//********************     Set Template Engine     ********************//
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));


//********************      Assets       ******************************/
const assetsPath = path.join(__dirname, "assets");
app.use(express.static(assetsPath));
app.use(express.static(__dirname + '/assets'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//********************     routes      ***************** */

app.use('/', require('./routes/index'));



// app.get('/', function (req, res) {
//     return res.render('hospital')
// })




app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})