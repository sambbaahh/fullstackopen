var _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return likes = blogs.reduce((sum, order) => {
        return sum + order.likes
        console.log(likes)
    }, 0)

}

const favoriteBlog = (blogs) => {
    const mostLiked = blogs.reduce((prev, current) =>{
        return (prev.likes >= current.likes)
        ? prev
        : current
    }, 0)

    return favorite = {
        title : mostLiked.title,
        authoer : mostLiked.author,
        likes : mostLiked.likes
    }
}

const mostBlogs = (blogs) => {
    return {
        author: _.maxBy(blogs, "author").author,
        blogs: _.max(_.values(_.countBy(blogs, "author"))),
    }
}

const mostLikes = (blogs) => {
    const authorLikes = blogs.reduce((op, {author, likes}) => {
        op[author] = op[author] || 0
        op[author] += likes
        return op
      },{})

    const mostLiked = Object.keys(authorLikes).sort((prev, cur) => authorLikes[cur] - authorLikes[prev])[0]
    
    return author = {
        author: mostLiked,
        likes: authorLikes[mostLiked]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}