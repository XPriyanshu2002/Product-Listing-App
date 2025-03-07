const apiUrl = "https://fakestoreapi.com/products";
let allProducts = [];
let displayedProducts = 10;

// Fetch data from API
async function fetchProducts() {
  try {
    showLoading();
    const response = await fetch(apiUrl);
    allProducts = await response.json();
    displayProducts(allProducts.slice(0, displayedProducts));
    const firstProductOfEachCategory = Object.values(
      allProducts.reduce((acc, product) => {
        if (!acc[product.category]) {
          acc[product.category] = product;
        }
        return acc;
      }, {})
    );
    //   console.log("Abc",firstProductOfEachCategory);
    displayCategoryProducts(firstProductOfEachCategory);
    // populateCategories();
  } catch (error) {
    console.error("Error fetching products:", error);
    document.getElementById("productContainer").innerHTML =
      "<p>Failed to load products.</p>";
  } finally {
    hideLoading();
  }
}

// async function fetchFirstProducts() {
//     try {
//         showLoading();
//         const response = await fetch(apiUrl);
//         allProducts = await response.json();
//         displayProducts(allProducts.slice(0, displayedProducts));
//         populateCategories();
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         document.getElementById("productContainer").innerHTML = "<p>Failed to load products.</p>";
//     } finally {
//         hideLoading();
//     }
// }

// Populate Categories Dynamically
// function populateCategories() {
//   const categoryContainer = document.getElementById("categoryContainer");
//   categoryContainer.innerHTML = ""; // Clear previous content

//   if (!allProducts.length) {
//     console.error("No products available to extract categories.");
//     return;
//   }

//   // Extract unique categories
//   const categories = [
//     ...new Set(allProducts.map((product) => product.category)),
//   ];

//   categories.forEach((category) => {
//     const categoryElement = document.createElement("div");
//     categoryElement.classList.add("category");
//     categoryElement.innerHTML = `<h3>${category}</h3>`;
//     categoryContainer.appendChild(categoryElement);
//   });
// }

// Display Products
function displayProducts(products) {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";
  products.forEach((product) => {
    const productHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${
      product.title
    }" loading="lazy">
                <h3>${product.title}</h3>
                <p>${product.description.substring(0, 50)}...</p>
                <p>$${product.price}</p>
            </div>
        `;
    // console.log(productHTML); // Debugging
    container.innerHTML += productHTML;
  });
}

// Display Category Products
function displayCategoryProducts(products) {
//   console.log("ProductsXYZ", products);
  const container = document.getElementById("category");
  container.innerHTML = "";
  products.forEach((product) => {
    const productHTML = `
        <div class="category-card">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <div class="category-overlay">
                <h3>${product.category}</h3>
                <p>Lorem ipsum dolor sit amet</p>
            </div>
        </div>
        `;
    // console.log(productHTML); // Debugging
    container.innerHTML += productHTML;
  });
}

// Display Shop Now Products
// function displayShopNowProducts(products) {
// //   console.log("Products", products);
//   const container = document.getElementById("shopNowProducts");
//   container.innerHTML = "";
//   products.forEach((product) => {
//     const productHTML = `
//             <div class="product">
//                 <img src="${product.image}" alt="${product.title}" loading="lazy">
//                 <h3>${product.title}</h3>
//                 <p>${product.price}</p>
//             </div>
//         `;
//     // console.log(productHTML); // Debugging
//     container.innerHTML += productHTML;
//   });
// }

// Show/Hide loading indicator
function showLoading() {
  document.getElementById("productContainer").innerHTML = "<p>Loading...</p>";
}

function hideLoading() {
  document.getElementById("productContainer").innerHTML = "";
}

// Load more products
document.getElementById("loadMore").addEventListener("click", () => {
  displayedProducts += 5;
  displayProducts(allProducts.slice(0, displayedProducts));
});

// Loda less products
document.getElementById("loadLess").addEventListener("click", () => {
  displayedProducts -= 8;
  displayProducts(allProducts.slice(0, displayedProducts));
});

// Loda shopMore products
document.addEventListener("DOMContentLoaded", function () {
    const shopNowBtn = document.getElementById("shopNow");

    if (shopNowBtn) {
        shopNowBtn.addEventListener("click", function () {
            console.log("Shop Now button clicked!");
            window.location.href = "./components/shopNow/shopNow.html"; // Replace with your actual page
            // displayShopNowProducts(allProducts);
        });
    } else {
        console.error("Button with ID 'shopNow' not found!");
    }
});


fetchProducts();

// Load Header Dynamically
fetch("components/header.html")
  .then((response) => response.text())
  .then((data) => {
    console.log("Header Loaded Successfully!"); // Debugging
    document.getElementById("header").innerHTML = data;
  })
  .catch((error) => console.error("Error loading header:", error));

// Load Dashboard1 Dynamically
// fetch("components/home/dashboard1.html")
//   .then((response) => response.text())
//   .then((data) => {
//     console.log("Dashboard1 Loaded Successfully!"); // Debugging
//     document.getElementById("dashboard1").innerHTML = data;
//   })
//   .catch((error) => console.error("Error loading Dashboard1:", error));

// Load Footer Dynamically
fetch("components/footer.html")
  .then((response) => response.text())
  .then((data) => {
    console.log("Footer Loaded Successfully!"); // Debugging
    document.getElementById("footer").innerHTML = data;
  })
  .catch((error) => console.error("Error loading footer:", error));
