const {
	ApolloServer,
	UserInputError,
	gql,
	ValidationError,
	AuthenticationError,
} = require('apollo-server');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const config = require('./utils/config');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

console.log('Connecting to', config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to MongoDB'))
	.catch((error) => console.log('Error connecting to MongoDB:', error.message));

const JWT_SECRET = 'Some_Secret';

const typeDefs = gql`
	type Book {
		title: String!
		author: Author!
		published: Int!
		genres: [String!]!
		id: ID!
	}

	type Author {
		name: String!
		born: Int
		bookCount: Int
		id: ID!
	}

	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		me: User
	}

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String]
		): Book
		editAuthor(name: String!, setBornTo: Int!): Author
		createUser(username: String!, favoriteGenre: String!): User
		login(username: String!, password: String!): Token
	}
`;

const resolvers = {
	Query: {
		authorCount: async () => {
			const authors = await Author.find({});
			return authors.length;
		},
		allBooks: async () => {
			const books = await Book.find({});
			return books;
		},
		allAuthors: async () => {
			const authors = await Author.find({});
			return authors;
		},
		me: (root, args, context) => {
			return context.currentUser;
		},
	},

	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser;

			if (!currentUser) {
				throw new AuthenticationError('Not authenticated');
			}

			try {
				const authors = await Author.find({});

				if (
					authors.length === 0 ||
					(await Author.findOne({ name: args.author })) === null
				) {
					var author = new Author({ name: args.author, id: uuidv4() });
				}

				const name = await Author.findOne({ name: args.author });

				var book = new Book({
					...args,
					id: uuidv4(),
					author: name,
				});
				if (author) {
					await author.save();
				}
				await book.save();
			} catch (error) {
				if (error.name === 'ValidationError') {
					throw new ValidationError(error.message);
				}
				throw new UserInputError(error.message, { invalidArgs: args });
			}
			return book;
		},
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser;

			if (!currentUser) {
				throw new AuthenticationError('Not authenticated');
			}

			try {
				const newBornAuthor = await Author.findOneAndUpdate(
					{ name: args.name },
					{ born: args.setBornTo },
					{ new: true }
				);
				return newBornAuthor;
			} catch (error) {
				throw new UserInputError(error.message, { invalidArgs: args });
			}
		},
		createUser: (root, args) => {
			const user = new User({ ...args, id: uuidv4() });

			return user.save().catch((error) => {
				throw new UserInputError(error.message, { invalidArgs: args });
			});
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== 'donut') {
				throw new UserInputError('Wrong credentials');
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, JWT_SECRET) };
		},
	},

	Author: {
		name: async (root) => {
			return root.name;
		},
		born: async (root) => {
			return root.born;
		},
		bookCount: async (root) => {
			const books = await Book.find({ author: root._id });
			return books.filter((b) => b.author.toString() === root._id.toString())
				.length;
		},
		id: async (root) => {
			return root._id;
		},
	},

	Book: {
		title: (root) => root.title,
		author: async (root) => {
			const author = await Author.findById(root.author);
			return author;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null;
		if (auth && auth.toLowerCase().startsWith('bearer')) {
			const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
			const currentUser = await (
				await User.findById(decodedToken.id)
			).populate();
			return { currentUser };
		}
	},
});

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
