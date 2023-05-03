function findAuthorById(authors, id) {
  let found = authors.find((authors) => id === authors.id);
  return found;
}

function findBookById(books, id) {
  let found = books.find((books) => id === books.id);
  return found
}

function partitionBooksByBorrowedStatus(books) {

  let returnedBooks = books.filter((book)=> book.borrows[0].returned === true);
  let borrowedBooks = books.filter((book)=> book.borrows[0].returned === false);

  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  const borrowed = book.borrows;
  const borrowedForBook = [];

  borrowed.forEach(borrow => {
    if (borrowedForBook.length >= 10) return;
    const borrower = accounts.find(account => account.id === borrow.id);
    const formattedBorrow = {
      ...borrow,
      ...borrower,
    };
    borrowedForBook.push(formattedBorrow);
  });
  return borrowedForBook;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
