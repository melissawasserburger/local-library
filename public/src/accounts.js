function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}


function sortAccountsByLastName(accounts) {
  return accounts.sort((a,b) => {
      return a.name.last < b.name.last ? -1:1;
  })
};


function getTotalNumberOfBorrows(account, books) {
let counter = 0;
for (let i=0; i<books.length; i++) {
    for (let j=0; j<books[i].borrows.length; j++) {
      if (account.id === books[i].borrows[j].id) counter++
    }
  };
  return counter;
}


//helper function vvv
function _getAuthorByID(author, id) { 
  return author.find((author) => author.id===id);
}


function getBooksPossessedByAccount(account, books, authors) {
  const accountID = account.id;
  let result = [];
  result = books.filter((book) => {
    return book.borrows.some((borrow) => borrow.id === accountID && !borrow.returned)
  })
  result = result.map((book) => {
    const author = _getAuthorByID(authors, book.authorId)
    const newBook = {
      ...book,
      author,
    }
return newBook;

  })
  return result;
}
  
 

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
