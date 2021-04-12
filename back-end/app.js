if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const engine = require('ejs-mate');
const passport = require('passport');
const localStrategy = require('passport-local');
const session = require('express-session');
const helmet = require('helmet');
const User = require('./models/user');
const MongoStore = require('connect-mongo');

const secret = process.env.SECRET || 'thisisbadsecret';
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/HT-Company';

const userRouter = require('./router/userRouter');
const projectRouter = require('./router/projectRouter');
const blogRouter = require('./router/blogRouter');
const uploadRouter = require('./router/uploadRouter');
const reviewRouter = require('./router/reviewRouter');

mongoose
	.connect(mongodbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => {
		console.log('mongosoe connection open');
	})
	.catch((e) => {
		console.log('mongoose connection error', e);
	});

app.engine('ejs', engine);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const store = MongoStore.create({
	secret,
	touchAfter: 30 * 24 * 60 * 60,
	mongoUrl: mongodbUrl
});

store.on('error', function(e) {
	console.log('session store error', e);
});

const sessionConfig = {
	store,
	name: 'session',
	secret,
	saveUninitialized: false,
	resave: false,
	cookie: {
		httponly: true,
		// secure:true,
		expires: Date.now() + 1000 * 60 * 60 * 24,
		maxAge: 1000 * 60 * 60 * 24
	}
};
app.use(session(sessionConfig));
app.use(helmet({ contentSecurityPolicy: false }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/user', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/blog', blogRouter);
app.use('/', uploadRouter);
app.use('/api/review', reviewRouter);

if (process.env.NODE_ENV === 'production') {
	// app.use(express.static(path.join(__dirname, '../front-end/build')));
	// const publicPath = path.join(__dirname, '../front-end', 'public');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'public/index.html'));
	});
} else {
	app.get('/', (req, res) => {
		res.send('API is running ...');
	});
}

app.use('*', (req, res, next) => {
	next(new Error('api not found'));
});

app.use((err, req, res, next) => {
	const { status = 200 } = err;
	if (!err.message) err.message = 'invalid data';
	res.status(status).json({ message: err.message });
});

app.listen(process.env.PORT || 4000, () => {
	console.log('listening on pory 4000');
});
