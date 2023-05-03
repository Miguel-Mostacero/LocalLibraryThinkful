function findAccountById(accounts, id) {
  let found = accounts.find((accounts) => id === accounts.id);
  return found;
}

function sortAccountsByLastName(accounts) {

  accounts.sort((accountA,accountB) => 
  (accountA.name.last > accountB.name.last ? 1 : -1));

  return accounts
}

function getTotalNumberOfBorrows(account, books) {
  let count = 0;

  books.forEach(book => {
    const borrowedById = borrowsById(book, account);
    count += borrowedById.length;
  });

  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = books.filter(book => book.borrows.some(borrow => (!borrow.returned && borrow.id === account.id)));
  const result = [];

  borrowedBooks.forEach(book => {
    const bookAuthor = findAuthorById(authors, book.authorId);
    result.push({
      id: book.id,
      title: book.title,
      genre: book.genre,
      authorId: book.authorId,
      author: bookAuthor,
      borrows: book.borrows,
    });
  });
  
  return result;
}

// Helper starts here

function borrowsById (book, {id}) {
  return book.borrows.filter(borrow => borrow.id === id);
}

function findAuthorById(authors, id) {
  let found = authors.find((authors) => id === authors.id);
  return found;}

// Helper ends here

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
