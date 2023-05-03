function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let borrowed = 0;
  for( let i=0; i< books.length; i++){
    for(let j=0; j<books[i].borrows.length;j++){
      if(books[i].borrows[j].returned === false){
        borrowed += 1
      }
    }
  }
  return borrowed
}

function getMostCommonGenres(books) {
  const genres = getAllGenres(books);
  const countList = [];
  
  genres.forEach(genre => {

    const genreBooks = books.filter(book => book.genre === genre);
    countList.push(genreBooks.length);
  });

  return thisMakesTopFiveAndNameCount(genres, countList);
}


function getMostPopularBooks(books) {
  const bookList = [];
  const countList = [];
  const bookIdList = [];

  books.forEach(book => {
    if(!bookIdList.includes(book.id)){
      bookIdList.push(book.id);
      bookList.push(book.title);
      countList.push(book.borrows.length);
    };
  });
  
  return thisMakesTopFiveAndNameCount(bookList, countList);
}

function getMostPopularAuthors(books, authors) {
  const authorList = [];
  const countList = [];
  const authorIdList = [];

  authors.forEach(author => {
    if (!authorIdList.includes(author.id)) {
    authorIdList.push(author.id);
    authorList.push(`${author.name.first} ${author.name.last}`);
    const authorBooks = books.filter(book => book.authorId === author.id);
    const authorBooksBorrows = authorBooks.map(book => book.borrows.length);

    countList.push(authorBooksBorrows.reduce((acc, count) => acc + count));
    }
  });
  
  return thisMakesTopFiveAndNameCount(authorList, countList);
}




// Helpers starting here


function getAllGenres (books) {
  const genres = [];
  books.forEach(book => {

    if (!genres.includes(book.genre)) genres.push(book.genre);
  });
  return genres;
}

function thisMakesNameAndCountArray (nameList, countList) {
  const result = nameList.reduce((acc, desc, index) => {
    acc.push({name: desc, count: countList[index]});
    return acc;
  }, []);
  return result;
}

function orderByCount (nameCount) {
  return nameCount.sort((placeA, placeB) => (placeB.count - placeA.count));
}

function listsTheTopFive (list) {
  while (list.length > 5) {
    list.pop();
  }
  return list;
}

function thisMakesTopFiveAndNameCount (nameList, countList)
{
  const result = thisMakesNameAndCountArray(nameList, countList);
  orderByCount(result);
  return listsTheTopFive(result);
}


// Helpers ending here

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
