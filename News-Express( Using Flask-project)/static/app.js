// const darkModeToggle = document.getElementById("darkModeToggle");

// let search=document.getElementById("search");
// let image1=document.getElementById("image1");
// let image2=document.getElementById("image2");
// let image3=document.getElementById("image3");

// const para1 = document.getElementById("para1");
// const para2 = document.getElementById("para2");
// const para3 = document.getElementById("para3");
// const body = document.body;

// // Function to toggle dark mode based on user preference
// function toggleDarkMode() {
//   if (darkModeToggle.checked) {
//     body.classList.add("dark-mode");
//   } else {
//     body.classList.remove("dark-mode");
//   }
// }

// // Event listener for dark mode toggle button
// darkModeToggle.addEventListener("change", toggleDarkMode);

// // Function to check and set initial dark mode state based on user preferences
// function setInitialDarkMode() {
//   const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

//   if (prefersDarkMode) {
//     body.classList.add("dark-mode");
//     darkModeToggle.checked = true;
//   }
// }

// // Call the function to set initial dark mode state
// //setInitialDarkMode();

// let newsBox = document.getElementById("newsBox");
// let spinner = document.getElementById("spinner");
// let newsCategory = [
//   "national",
//   "business",
//   "sports",
//   "world",
//   "politics",
//   "technology",
//   "startup",
//   "entertainment",
//   "miscellaneous",
//   "hatke",
//   "science",
//   "automobile",
// ];

// //
// function random() {
//   let randomNumber = Math.floor(Math.random() * 8);
//   return randomNumber;
// } 
// // console.log(random());

// // Create XMLHttpRequest Object
// const xhr = new XMLHttpRequest();

// function sendCategory(index) {
//   getNews(newsCategory[index]);
// }
// getNews("all");
// console.log(search.value)

// function getNews(newsCategoryName) {
//   xhr.open(
//     "GET",
//     `https://inshortsapi.vercel.app/news?category=${newsCategoryName}`,
//     true
//   );

//   xhr.getResponseHeader("Content-type", "application/json");

//   xhr.onload = function () {
//     if (this.status === 200) {
//       let json = JSON.parse(this.responseText);
//       let data = json.data;

//       let a = random();
//       let b = random();
//       let c = random();
      
//       image1.src=data[a].imageUrl;
//       image2.src=data[b].imageUrl;
//       image3.src=data[c].imageUrl;

//       para1.innerHTML = data[a].title;
//       para2.innerHTML = data[b].title;
//       para3.innerHTML = data[c].title;
//       let newsHTML = "";

//       function showSpinner() {
//         spinner.style.visibility = "hidden";
//         newsBox.style.visibility = "visible";
//       }

//       xhr.onprogress = showSpinner;
//       // for (key in data) {
//       for(let i=0; i<data.length-1; i++){
//         let key = data[i];
//         // console.log(key);
//         let news = `<div class="newsCard">
//         <div class="imageWrapper">
//         <img src="${key.imageUrl}"
//         class="thumnail" alt="Image">
//             </div>
//             <div class="card-body">
//             <div class="card-date">${key.date}</div>
//                       <h5 class="card-title">${key.title}</h5>
//                                 <h5 class="card-author">Author: ${key.author}</h5>
//                                 <p class="card-text">${key.content}</p>
//                                 <a target="_blank" href="${key.readMoreUrl}" class="btn btn-primary">Read more..</a>
//                             </div>
                           
//                         </div>`;
//         newsHTML += news;
//         // image2.src=${key.imageUrl};
       
//       }

//       newsBox.innerHTML = newsHTML;
//     } else {
//       console.log("Some Error Occurred");
//     }
//   };

//   xhr.send();
// }


const darkModeToggle = document.getElementById("darkModeToggle");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("search");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const para1 = document.getElementById("para1");
const para2 = document.getElementById("para2");
const para3 = document.getElementById("para3");
const body = document.body;

// Function to toggle dark mode based on user preference
function toggleDarkMode() {
  if (darkModeToggle.checked) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
}

// Event listener for dark mode toggle button
darkModeToggle.addEventListener("change", toggleDarkMode);

let newsBox = document.getElementById("newsBox");
let spinner = document.getElementById("spinner");
let newsCategory = [
  "national",
  "business",
  "sports",
  "world",
  "politics",
  "technology",
  "startup",
  "entertainment",
  "miscellaneous",
  "hatke",
  "science",
  "automobile",
];

// Function to generate a random number
function random() {
  return Math.floor(Math.random() * 8);
} 
function sendCategory(index) {
  getNews(newsCategory[index]);
}

// Function to fetch news based on category
function getNews(newsCategoryName) {
  const xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    `https://inshortsapi.vercel.app/news?category=${newsCategoryName}`,
    true
  );

  xhr.getResponseHeader("Content-type", "application/json");

  xhr.onload = function () {
    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      let data = json.data;

      if (data && data.length > 0) {
        let a = random();
        let b = random();
        let c = random();

        image1.src = data[a].imageUrl || '';
        image2.src = data[b].imageUrl || '';
        image3.src = data[c].imageUrl || '';

        para1.innerHTML = data[a].title || '';
        para2.innerHTML = data[b].title || '';
        para3.innerHTML = data[c].title || '';

        let newsHTML = "";

        for(let i = 0; i < data.length-1; i++) {
          let key = data[i];
          let news = `<div class="newsCard">
            <div class="imageWrapper">
              <img src="${key.imageUrl}" class="thumnail" alt="Image">
            </div>
            <div class="card-body">
              <div class="card-date">${key.date}</div>
              <h5 class="card-title">${key.title}</h5>
              <h5 class="card-author">Author: ${key.author}</h5>
              <p class="card-text">${key.content}</p>
              <a target="_blank" href="${key.readMoreUrl}" class="btn btn-primary">Read more..</a>
            </div>
          </div>`;
          newsHTML += news;
        }

        newsBox.innerHTML = newsHTML;
      } else {
        console.log('No data available.');
      }
    } else {
      console.log("Some Error Occurred");
    }
  };

  xhr.send();
}

// Event listener for search button click
searchButton.addEventListener("click", function() {
  let searchTerm = searchInput.value;
  // Call the getNews function with the search term
  // console.log(searchTerm);
  
  getNews(searchTerm);
});

// Call getNews with 'all' category initially
getNews("all");
