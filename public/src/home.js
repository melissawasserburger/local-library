function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let counter = 0;
  for (let i=0; i<books.length; i++) {//loop through books
    const borrowed = books[i].borrows;
    for (let j=0; j<borrowed.length; j++) { // get to borrows array within book obj
      if (borrowed[j].returned === false) counter++ //increase counter if false
    }
  }
  return counter;
}

function getMostCommonGenres(books) {
  const final = books.reduce((acc, book) => {  //{genre: genreName, count: num}
    const genre = book.genre;
    const genreInfo = acc.find((ele) => ele.name === genre)
    if (!genreInfo) {
      let newGenre = {
        name: genre,
        count: 1
      }
      acc.push(newGenre)
    } else genreInfo.count++
    return acc
    }, [])

  final.sort((a, b) => b.count - a.count);
  final.splice(5);
  return final
}


//helper function vvv
function getAuthorNameById (authors, id) {
  let authorObj = authors.find(author => author.id === id);
  const {name} = authorObj;
  return `${name.first} ${name.last}`;
}


function getMostPopularBooks(books) {  // final form = {name: "", count: borrowsLength}
  let result = [];
  for (let book of books) {
    let bookObj = {};
    let bookTitle = book.title;
    let popularity = book.borrows.length;
    bookObj = {
      name: bookTitle,
      count: popularity
    }
    result.push(bookObj);
  }
  result.sort((a,b) => b.count - a.count);
  result.splice(5);
  return result;
}


function getMostPopularAuthors(books, authors) {
  let result = []; //form = {name: "Cristina Buchanan", count: 0}
  let authorObj = {};
  for (let author of authors) {
    let authorId = author.id;
    let authorName = getAuthorNameById(authors, authorId);
    let counter = 0;
    for (let i = 0; i<books.length; i++) {
      if (authorId === books[i].authorId) counter = books[i].borrows.length
    };
    if (authorObj.name !== authorName) {
      authorObj = {
        name: authorName,
        count: counter
      }
    } else authorObj.count+=counter;
    result.push(authorObj);
  }
  result.sort((a,b) => b.count - a.count);
  result.splice(5);
  return result;
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

