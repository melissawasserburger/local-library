function findAuthorById(authors, id) {
  return authors.find((author) => id===author.id);
}

function findBookById(books, id) {
  return books.find((book) => id===book.id);
}

function partitionBooksByBorrowedStatus(books) {
  let returned = [];
let borrowed = [];
for (let i = 0; i < books.length; i++) {
  const borrowedArray = books[i].borrows;
    if (borrowedArray[0].returned === true) {
      returned.push(books[i])
    } else if (borrowedArray[0].returned === false) {
      borrowed.push(books[i])
    };
  };
  let finalArray = [borrowed, returned];
  return finalArray;
}

//helper function vvv
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}


function getBorrowersForBook(book, accounts) {
  let result = []; //return an array with <=10 holding entire obj of account PLUS 'returned' entry
  let obj = {};
  const transaction = book.borrows;
  for (let i=0; i<transaction.length; i++) {
    const accountInfo = findAccountById(accounts, transaction[i].id);
    obj = {
    ...transaction[i],
    ...accountInfo,
    };
    result.push(obj);
  }

  result.splice(10);
  return result;
}



module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
