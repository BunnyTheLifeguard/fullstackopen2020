const {
	ApolloServer,
	UserInputError,
	gql,
	ValidationError,
} = require('apollo-server');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const config = require('./utils/config');
const Book = require('./models/book');
const Author = require('./models/author');

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

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		specificAuthor(name: String!): Author
	}

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String]
		): Book
		editAuthor(name: String!, setBornTo: Int!): Author
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
	},

	Mutation: {
		addBook: async (root, args) => {
			try {
				const authors = await Author.find({});

				if (
					authors.length === 0 ||
					(await Author.findOne({ name: args.author })) === null
				) {
					var author = new Author({ name: args.author, id: uuidv4() });
				}

				const name = await Author.findOne({ name: args.author });

				const book = new Book({
					...args,
					id: uuidv4(),
					author: name,
				});
				if (author && book.title.length >= 2) {
					await author.save();
				}
				await book.save();
			} catch (error) {
				if (error.name === 'ValidationError') {
					throw new ValidationError(error.message);
				}
				throw new UserInputError(error.message, { invalidArgs: args });
			}
		},
		editAuthor: async (root, args) => {
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
});

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
