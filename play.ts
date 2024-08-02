const library: HTMLDivElement | null = document.querySelector(".library");
const addNewBook: HTMLButtonElement | null = document.querySelector(".newBook");
const newBookForm: HTMLFormElement | null = document.querySelector("form");
const formDiv: HTMLDivElement | null = document.querySelector(".formDiv");
const submitButton: HTMLButtonElement | null = document.querySelector(
  "button[type='submit']"
);

interface libraryObjects {
  author: string;
  title: string;
  pages?: string;
  read: string;
}

const myLibrary: libraryObjects[] = [];

class Book {
  author: string;
  title: string;
  pages: string;
  read: string;

  constructor(author: string, title: string, pages: string, read: string) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
}

function displayBooks(array: libraryObjects[]) {
  const newDiv = document.createElement("div");
  const removeButton = document.createElement("button");
  const readButton = document.createElement("button");
  const displayAuthor = document.createElement("p");
  const displayTitle = document.createElement("p");
  const displayPages = document.createElement("p");
  const displayRead = document.createElement("p");
  const indexInLibrary: number = myLibrary
    .map((e) => e.author)
    .indexOf(array.slice(-1)[0]["author"]);
  const readIcon = document.createElement("i");
  readIcon.setAttribute("class", "material-icons");
  readIcon.textContent = "check box";
  const notReadIcon = document.createElement("i");
  notReadIcon.setAttribute("class", "material-icons");
  notReadIcon.textContent = "clear";

  if (myLibrary[indexInLibrary]["read"] === "yes") {
    readIcon.style.display = "";
    notReadIcon.style.display = "none";
  } else {
    readIcon.style.display = "none";
    notReadIcon.style.display = "";
  }

  newDiv.setAttribute("index", indexInLibrary.toString());

  removeButton.textContent = "Remove book from library";
  removeButton.addEventListener("click", () => {
    newDiv.remove();
  });
  readButton.textContent = "Change read/unread";
  readButton.addEventListener("click", () => {
    if (myLibrary[indexInLibrary]["read"] === "yes") {
      myLibrary[indexInLibrary]["read"] = "no";
      displayRead.textContent = "Read: no";
      readIcon.style.display = "none";
      notReadIcon.style.display = "";
    } else {
      myLibrary[indexInLibrary]["read"] = "yes";
      displayRead.textContent = "Read: yes";
      readIcon.style.display = "";
      notReadIcon.style.display = "none";
    }
  });
  displayAuthor.textContent = "Author: " + array.slice(-1)[0]["author"];
  displayTitle.textContent = "Title: " + array.slice(-1)[0]["title"];
  displayPages.textContent = "Pages: " + array.slice(-1)[0]["pages"];
  displayRead.textContent = "Read: " + array.slice(-1)[0]["read"];

  if (library) {
    library.appendChild(newDiv);
    newDiv.append(
      displayAuthor,
      displayTitle,
      displayPages,
      displayRead,
      removeButton,
      readButton,
      readIcon,
      notReadIcon
    );
  }
}

if (addNewBook && newBookForm && formDiv) {
  addNewBook.addEventListener("click", () => {
    if (formDiv.style.display === "none") {
      formDiv.style.display = "";
    }
  });

  newBookForm.addEventListener("submit", (form) => {
    form.preventDefault();
    const author = document.querySelector("#author") as HTMLInputElement;
    const title = document.querySelector("#title") as HTMLInputElement;
    const pages = document.querySelector("#pages") as HTMLInputElement;
    const read = document.querySelector(
      "input[name='read']:checked"
    ) as HTMLInputElement;
    myLibrary.push(
      new Book(author.value, title.value, pages.value, read.value)
    );
    newBookForm.reset();
    displayBooks(myLibrary);
    formDiv.style.display = "none";
  });
}
