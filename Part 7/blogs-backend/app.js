const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./utils/config');
require('express-async-errors');

const app = express();
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const testingRouter = require('./controllers/testing');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

logger.info('Connecting to', config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => logger.info('Connected to MongoDB'))
	.catch((error) => logger.error('Error connecting to MongoDB', error.message));

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
	app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
