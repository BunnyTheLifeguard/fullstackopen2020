const { ApolloServer, UserInputError, gql } = require('apollo-server');
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

// let authors = [
// 	{
// 		name: 'Robert Martin',
// 		id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
// 		born: 1952,
// 	},
// 	{
// 		name: 'Martin Fowler',
// 		id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
// 		born: 1963,
// 	},
// 	{
// 		name: 'Fyodor Dostoevsky',
// 		id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
// 		born: 1821,
// 	},
// 	{
// 		name: 'Joshua Kerievsky', // birthyear not known
// 		id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
// 	},
// 	{
// 		name: 'Sandi Metz', // birthyear not known
// 		id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
// 	},
// ];

// let books = [
// 	{
// 		title: 'Clean Code',
// 		published: 2008,
// 		author: 'Robert Martin',
// 		id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
// 		genres: ['refactoring'],
// 	},
// 	{
// 		title: 'Agile software development',
// 		published: 2002,
// 		author: 'Robert Martin',
// 		id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
// 		genres: ['agile', 'patterns', 'design'],
// 	},
// 	{
// 		title: 'Refactoring, edition 2',
// 		published: 2018,
// 		author: 'Martin Fowler',
// 		id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
// 		genres: ['refactoring'],
// 	},
// 	{
// 		title: 'Refactoring to patterns',
// 		published: 2008,
// 		author: 'Joshua Kerievsky',
// 		id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
// 		genres: ['refactoring', 'patterns'],
// 	},
// 	{
// 		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
// 		published: 2012,
// 		author: 'Sandi Metz',
// 		id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
// 		genres: ['refactoring', 'design'],
// 	},
// 	{
// 		title: 'Crime and punishment',
// 		published: 1866,
// 		author: 'Fyodor Dostoevsky',
// 		id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
// 		genres: ['classic', 'crime'],
// 	},
// 	{
// 		title: 'The Demon ',
// 		published: 1872,
// 		author: 'Fyodor Dostoevsky',
// 		id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
// 		genres: ['classic', 'revolution'],
// 	},
// ];

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
		bookCount: () => books.length,
		authorCount: () => authors.length,
		allBooks: (root, args) => {
			if (args.author !== undefined) {
				return books.filter((b) => b.author === args.author);
			} else if (args.genre !== undefined) {
				return books.filter((b) => b.genres.includes(args.genre));
			} else if (args.author !== undefined && args.genre !== undefined) {
				return books.filter(
					(b) => b.author === args.author && b.genres.includes(args.genre)
				);
			} else {
				return books;
			}
		},
		allAuthors: (root, args) => Author.find({}),
	},

	Mutation: {
		addBook: async (root, args) => {
			const authors = await Author.find({});

			if (authors.some((a) => a.name !== args.author) || authors.length === 0) {
				const author = new Author({ name: args.author, id: uuidv4() });
				await author.save();
			}

			const name = await Author.findOne({ name: args.author });

			const book = new Book({
				...args,
				id: uuidv4(),
				author: name,
			});

			try {
				await book.save();
			} catch (error) {
				throw new UserInputError(error.message, { invalidArgs: args });
			}
			return book;
		},
		editAuthor: (root, args) => {
			const author = authors.find((a) => a.name === args.name);
			if (!author) {
				return null;
			}

			const newBornAuthor = { ...author, born: args.setBornTo };
			authors = authors.map((a) => (a.name === args.name ? newBornAuthor : a));
			return newBornAuthor;
		},
	},

	Author: {
		name: (root) => root.name,
		born: (root) => root.born,
		bookCount: (root) => books.filter((b) => b.author === root.name).length,
	},

	Book: {
		title: (root) => root.title,
		author: (root) => root.author,
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
