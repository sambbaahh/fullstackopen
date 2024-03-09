const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const Author = require("./models/author");
const Book = require("./models/book");

const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to", MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (args.author && args.genre) {
        return books.filter(
          (book) =>
            book.author === args.author && book.genres.includes(args.genre)
        );
      } else if (args.author) {
        return books.filter((book) => book.author === args.author);
      } else if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre));
      } else {
        return books;
      }
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (root) => {
      return books.filter((book) => book.author === root.name).length;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }

      const book = new Book({ ...args, author: author._id });
      await book.save();

      return book;
    },
    editAuthor: (root, args) => {
      const authorIndex = authors.findIndex(
        (value) => value.name === args.name
      );
      if (authorIndex === -1) return null;

      const modifiedAuthor = { ...authors[authorIndex], born: args.setBornTo };
      authors[authorIndex] = modifiedAuthor;

      return modifiedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
