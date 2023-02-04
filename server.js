// Dependencies
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');


// Set up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = require('./config/connection');

const hbs = exphbs.create({});

// The following two lines of code are setting Handlebars.js as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



// Sets ip the routes
app.use(require('./controllers/'));

sequelize.sync({ force: false}).then(() =>{
    app.listen(PORT, () => {
        console.log('!SERVER RUNNING ON! http://localhost:' , PORT);
    });
});
