const library = document.querySelector(".library");
const addNewBook = document.querySelector(".newBook");
const newBookForm = document.querySelector("form");
const submitButton = document.querySelector("button[type='submit']");

const myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function displayBooks(array) {
  const newDiv = document.createElement("div");
  const removeButton = document.createElement("button");
  const displayAuthor = document.createElement("p");
  const displayTitle = document.createElement("p");
  const displayPages = document.createElement("p");
  const displayRead = document.createElement("p");
  const indexInLibrary = myLibrary
    .map((e) => e.author)
    .indexOf(array.slice(-1)[0]["author"]);

  newDiv.setAttribute("index", indexInLibrary);

  removeButton.textContent = "Remove book from library";
  removeButton.addEventListener("click", () => {
    newDiv.remove();
  });
  displayAuthor.textContent = "Author: " + array.slice(-1)[0]["author"];
  displayTitle.textContent = "Title: " + array.slice(-1)[0]["title"];
  displayPages.textContent = "Pages: " + array.slice(-1)[0]["pages"];
  displayRead.textContent = "Read: " + array.slice(-1)[0]["read"];

  library.appendChild(newDiv);
  newDiv.append(
    displayAuthor,
    displayTitle,
    displayPages,
    displayRead,
    removeButton
  );
}

addNewBook.addEventListener("click", () => {
  if (newBookForm.style.display === "none") {
    newBookForm.style.display = "block";
  }
});

newBookForm.addEventListener("submit", (form) => {
  form.preventDefault();
  const author = document.querySelector("#author");
  const title = document.querySelector("#title");
  const pages = document.querySelector("#pages");
  const read = document.querySelector("input[name='read']:checked");
  myLibrary.push(new Book(author.value, title.value, pages.value, read.value));
  newBookForm.reset();
  displayBooks(myLibrary);
});
