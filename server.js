// Dependencies
const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require ('./utils/helper')
const routes = require('./controllers');
const sequelize = require('./config/connection');

// Set up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize
  })
};
  
app.use(session(sess));

const hbs = exphbs.create({helpers});

// The following two lines of code are setting Handlebars.js as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



// Sets ip the routes
app.use(routes);

sequelize.sync({ force: false}).then(() =>{
    app.listen(PORT, () => {
        console.log('!SERVER RUNNING ON! http://localhost:' , PORT);
    });
});
