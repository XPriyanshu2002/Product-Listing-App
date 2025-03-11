// document.addEventListener("DOMContentLoaded", () => {
//   // Load Header
//   // fetch("../header.html")
//   //   .then((response) => response.text())
//   //   .then((data) => {
//   //     console.log("Header Loaded Successfully!");
//   //     document.getElementById("header").innerHTML = data;
//   //   })
//   //   .catch((error) => console.error("Error loading header:", error));
//   fetch("../header.html")
//     .then((response) => response.text())
//     .then(async (data) => {
//       document.getElementById("header").innerHTML = data;

//       // Initialize the side drawer functionality
//       let allProducts = []; // Store fetched products for sorting
//       const menuIcon = document.getElementById("menuIcon");
//       const sideDrawer = document.getElementById("sideDrawer");
//       const closeDrawer = document.getElementById("closeDrawer");
//       const overlay = document.getElementById("overlay");
//       const priceRange = document.getElementById("priceRange");
//       const maxPriceLabel = document.getElementById("maxPriceLabel");
//       const categories = {
//         jewellery: "jewelery",
//         electronics: "electronics",
//         men: "men's clothing",
//         women: "women's clothing",
//       };

//       if (menuIcon && sideDrawer && closeDrawer && overlay) {
//         // Open Side Drawer
//         menuIcon.addEventListener("click", function () {
//           sideDrawer.classList.add("show-drawer");
//           overlay.classList.add("show-overlay");
//         });

//         // Close Side Drawer
//         closeDrawer.addEventListener("click", function () {
//           sideDrawer.classList.remove("show-drawer");
//           overlay.classList.remove("show-overlay");
//         });

//         // Close when clicking outside the drawer
//         overlay.addEventListener("click", function () {
//           sideDrawer.classList.remove("show-drawer");
//           overlay.classList.remove("show-overlay");
//         });

//         const selectedCategories = Object.keys(categories).filter(
//           (id) => document.getElementById(id)?.checked
//         );

//         console.log("Selected Categories:", selectedCategories);
//         console.log(window.location.pathname === "/");

//         // Attach event listeners to checkboxes
//         Object.keys(categories).forEach((id) => {
//           const checkbox = document.getElementById(id);
//           if (checkbox) {
//             checkbox.addEventListener("change", fetchAndDisplayProducts);
//           } else {
//             console.error(`Element with id '${id}' not found!`);
//           }
//         });

//         const productPromises = selectedCategories.map((id) =>
//               fetch(
//                 `https://fakestoreapi.com/products/category/${categories[id]}`
//               ).then((res) => res.json())
//             );

//             allProducts = (await Promise.all(productPromises)).flat();

//         // Set max price dynamically based on fetched products
//         const maxPrice = Math.max(...allProducts.map((p) => p.price));
//         priceRange.max = Math.ceil(maxPrice);
//         priceRange.value = maxPrice;
//         maxPriceLabel.textContent = `$${maxPrice.toFixed(2)}`;

//         priceRange.addEventListener("input", () => {
//           maxPriceLabel.textContent = `$${parseFloat(priceRange.value).toFixed(2)}`;
//           displayProducts(priceRange.value, allProducts);
//         });

//         const displayProducts = () => {
//           productsContainer.innerHTML = "";

//           let filteredProducts = allProducts
//             .filter((p) => p.price <= parseFloat(priceRange.value)); // Filter by price

//           // Display products
//           filteredProducts.forEach((product) => {
//             productsContainer.innerHTML += `
//               <div class="product">
//                        <div class="product-image">
//                            <img src="${product.image}" alt="${
//               product.title
//             }" loading="lazy">
//                            <button class="shop-now-btn" data-id="${
//                              product.id
//                            }" id="shopNow">Shop Now</button>
//                        </div>
//                        <h4>${product.title.substring(0, 28)}...</h4>
//                        <div class="product-details">
//                          <div class="product-price">
//                          <p>$${product.price}</p>
//                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
//                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
//                          </svg>
//                          </div>
//                        </div>
//                    </div>
//             `;
//           });
//         };

//       } else {
//         console.error("One or more elements are missing!");
//       }
//     })
//     .catch((error) => console.error("Error loading header:", error));

//   // Load Footer
//   fetch("../footer.html")
//     .then((response) => response.text())
//     .then((data) => {
//       console.log("Footer Loaded Successfully!");
//       document.getElementById("footer").innerHTML = data;

//       // Adjust image paths
//       // document.querySelectorAll(".social-icons img").forEach(img => {
//       //     let pathDepth = window.location.pathname.split("/").length - 2;
//       //     let prefix = "../".repeat(pathDepth);
//       //     img.src = prefix + img.src.split("/").pop();
//       // });
//       document.querySelectorAll(".social-icons img").forEach((img) => {
//         if (window.location.pathname !== "/index.html") {
//           img.src = img.src.replace("components", "../");
//         }
//       });
//     })
//     .catch((error) => console.error("Error loading footer:", error));
//   const categories = {
//     jewellery: "jewelery",
//     electronics: "electronics",
//     men: "men's clothing",
//     women: "women's clothing",
//   };

//   const productsContainer = document.getElementById("shopNowProducts");
//   const productCount = document.getElementById("productCount");
//   const sortSelect = document.getElementById("sortSelect");
//   const priceRange = document.getElementById("priceRange");
//   const maxPriceLabel = document.getElementById("maxPriceLabel");
//   const searchInput = document.getElementById("searchInput");
//   const shopNowBtn = document.getElementById("shopNow");
//   const menuIcon = document.getElementById("menuIcon");

//   let allProducts = []; // Store fetched products for sorting

//   // Function to fetch and display products for selected categories
//   const fetchAndDisplayProducts = async () => {
//     try {
//       // Show shimmer effect initially
//       productsContainer.innerHTML = `
//             <div class="shimmer-container">
//                 <div class="shimmer-image"></div>
//                 <div class="shimmer-text title"></div>
//                 <div class="shimmer-text price"></div>
//                 <div class="shimmer-text rating"></div>
//                 <div class="shimmer-text description"></div>
//                 <div class="shimmer-quantity"></div>
//                 <div class="shimmer-button"></div>
//             </div>
// `;
//       allProducts = []; // Reset product array

//       const selectedCategories = Object.keys(categories).filter(
//         (id) => document.getElementById(id)?.checked
//       );

//       if (selectedCategories.length === 0) {
//         productsContainer.innerHTML = "<p>Please select a category.</p>";
//         productCount.textContent = "0 Products Found";
//         return;
//       }

//       // Fetch products for all selected categories
//       const productPromises = selectedCategories.map((id) =>
//         fetch(
//           `https://fakestoreapi.com/products/category/${categories[id]}`
//         ).then((res) => res.json())
//       );

//       allProducts = (await Promise.all(productPromises)).flat();

//       // Set max price dynamically based on fetched products
//       const maxPrice = Math.max(...allProducts.map((p) => p.price));
//       priceRange.max = Math.ceil(maxPrice);
//       priceRange.value = maxPrice;
//       maxPriceLabel.textContent = `$${maxPrice.toFixed(2)}`;

//       productCount.textContent = `${allProducts.length} Products Found`;

//       displayProducts(); // Initially display products
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       productsContainer.innerHTML = "<p>Failed to load products.</p>";
//     }
//   };

//   // Function to display products (sorted if necessary)
//   const displayProducts = () => {
//     productsContainer.innerHTML = "";

//     let filteredProducts = allProducts
//       .filter((p) => p.price <= parseFloat(priceRange.value)) // Filter by price
//       .filter((p) =>
//         p.title.toLowerCase().includes(searchInput.value.toLowerCase())
//       ); // Filter by search

//     // Apply sorting if a valid option is selected
//     if (sortSelect.value === "low-to-high") {
//       filteredProducts.sort((a, b) => a.price - b.price);
//     } else if (sortSelect.value === "high-to-low") {
//       filteredProducts.sort((a, b) => b.price - a.price);
//     }
//     productCount.textContent = `${filteredProducts.length} Results`;
//     productCount.style.fontWeight = "bold";

//     // Display products
//     filteredProducts.forEach((product) => {
//       productsContainer.innerHTML += `
//         <div class="product">
//                  <div class="product-image">
//                      <img src="${product.image}" alt="${
//         product.title
//       }" loading="lazy">
//                      <button class="shop-now-btn" data-id="${
//                        product.id
//                      }" id="shopNow">Shop Now</button>
//                  </div>
//                  <h4>${product.title.substring(0, 28)}...</h4>
//                  <div class="product-details">
//                    <div class="product-price">
//                    <p>$${product.price}</p>
//                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
//                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
//                    </svg>
//                    </div>
//                  </div>
//              </div>
//       `;
//     });
//   };

//   // Attach event listeners to checkboxes
//   Object.keys(categories).forEach((id) => {
//     const checkbox = document.getElementById(id);
//     if (checkbox) {
//       checkbox.addEventListener("change", fetchAndDisplayProducts);
//     } else {
//       console.error(`Element with id '${id}' not found!`);
//     }
//   });

//   // Listen for sorting changes
//   sortSelect.addEventListener("change", displayProducts);

//   fetchAndDisplayProducts(); // Fetch and display products initially

//   priceRange.addEventListener("input", () => {
//     maxPriceLabel.textContent = `$${parseFloat(priceRange.value).toFixed(2)}`;
//     displayProducts();
//   });

//   // Listen for search input changes
//   searchInput.addEventListener("input", displayProducts);

//   // Use event delegation to handle clicks on dynamically created buttons
//   productsContainer.addEventListener("click", function (event) {
//     if (event.target.classList.contains("shop-now-btn") || shopNowBtn) {
//       console.log("Shop Now button clicked!");

//       // Get the product ID from the button's `data-id` attribute
//       const productId = event.target.getAttribute("data-id");
//       console.log("Product ID:", productId); // Debugging log

//       if (productId) {
//         // Store the product ID in localStorage
//         localStorage.setItem("selectedProductId", productId);

//         // // Get the product details
//         // const productCard = event.target.closest(".product");
//         // const productTitle = productCard.querySelector("h4").textContent;
//         // const productImage = productCard.querySelector("img").src;
//         // const productPrice = productCard.querySelector(".product-price p").textContent;

//         // // Store the selected product in localStorage (or use URL parameters)
//         // localStorage.setItem("selectedProduct", JSON.stringify({
//         //   title: productTitle,
//         //   image: productImage,
//         //   price: productPrice
//         // }));

//         // Redirect to the new page
//         window.location.href = "../product/productDetails.html";
//       } else {
//         console.error("Product ID not found!");
//       }
//     }
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const categories = {
//     jewellery: "jewelery",
//     electronics: "electronics",
//     men: "men's clothing",
//     women: "women's clothing",
//   };

//   let allProducts = []; // Store fetched products for sorting
//   const productsContainer = document.getElementById("shopNowProducts");
//   const productCount = document.getElementById("productCount");
//   const sortSelect = document.getElementById("sortSelect");
//   const priceRange = document.getElementById("priceRange");
//   const maxPriceLabel = document.getElementById("maxPriceLabel");
//   const searchInput = document.getElementById("searchInput");

//   // Load Header
//   loadHTML("../header.html", "header", initHeader);

//   // Load Footer
//   loadHTML("../footer.html", "footer", initFooter);

//   // Function to load HTML content
//   function loadHTML(url, elementId, callback) {
//     fetch(url)
//       .then((response) => response.text())
//       .then((data) => {
//         document.getElementById(elementId).innerHTML = data;
//         if (callback) callback();
//       })
//       .catch((error) => console.error(`Error loading ${elementId}:`, error));
//   }

//   // Initialize header functionality
//   function initHeader() {
//     const menuIcon = document.getElementById("menuIcon");
//     const sideDrawer = document.getElementById("sideDrawer");
//     const closeDrawer = document.getElementById("closeDrawer");
//     const overlay = document.getElementById("overlay");

//     if (menuIcon && sideDrawer && closeDrawer && overlay) {
//       menuIcon.addEventListener("click", () => toggleDrawer(true));
//       closeDrawer.addEventListener("click", () => toggleDrawer(false));
//       overlay.addEventListener("click", () => toggleDrawer(false));
//     } else {
//       console.error("One or more elements are missing!");
//     }

//     // Initialize checkboxes INSIDE THE DRAWER
//   const drawerCheckboxes = sideDrawer.querySelectorAll('input[type="checkbox"]');
//   drawerCheckboxes.forEach(checkbox => {
//     checkbox.addEventListener("change", fetchAndDisplayProducts);
//   });

//     productsContainer.addEventListener("click", (event) => {
//       if (event.target.classList.contains("shop-now-btn")) {
//         const productId = event.target.getAttribute("data-id");
//         if (productId) {
//           localStorage.setItem("selectedProductId", productId);
//           window.location.href = "../product/productDetails.html";
//         } else {
//           console.error("Product ID not found!");
//         }
//       }
//     });

//     priceRange.addEventListener("input", () => {
//       maxPriceLabel.textContent = `$${parseFloat(priceRange.value).toFixed(2)}`;
//       displayProducts();
//     });

//     fetchAndDisplayProducts();
//   }

//   // Initialize footer functionality
//   function initFooter() {
//     document.querySelectorAll(".social-icons img").forEach((img) => {
//       if (window.location.pathname !== "/index.html") {
//         img.src = img.src.replace("components", "../");
//       }
//     });
//   }

//   // Function to toggle side drawer
//   function toggleDrawer(show) {
//     const sideDrawer = document.getElementById("sideDrawer");
//     const overlay = document.getElementById("overlay");
//     sideDrawer.classList.toggle("show-drawer", show);
//     overlay.classList.toggle("show-overlay", show);
//   }

//   // Function to fetch and display products for selected categories
//   async function fetchAndDisplayProducts() {
//     try {
//       showShimmerEffect();
//       const selectedCategories = Object.keys(categories).filter(
//         (id) => document.getElementById(id)?.checked
//       );

//       if (selectedCategories.length === 0) {
//         productsContainer.innerHTML = "<p>Please select a category.</p>";
//         productCount.textContent = "0 Products Found";
//         return;
//       }
//       console.log("Selected Categories:", selectedCategories);
//       const productPromises = selectedCategories.map((id) =>
//         fetch(
//           `https://fakestoreapi.com/products/category/${categories[id]}`
//         ).then((res) => res.json())
//       );

//       allProducts = (await Promise.all(productPromises)).flat();
//       updatePriceRange();
//       productCount.textContent = `${allProducts.length} Products Found`;
//       displayProducts();
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       productsContainer.innerHTML = "<p>Failed to load products.</p>";
//     }
//   }

//   // Function to display shimmer effect
//   function showShimmerEffect() {
//     productsContainer.innerHTML = `
//       <div class="shimmer-container">
//         <div class="shimmer-image"></div>
//         <div class="shimmer-text title"></div>
//         <div class="shimmer-text price"></div>
//         <div class="shimmer-text rating"></div>
//         <div class="shimmer-text description"></div>
//         <div class="shimmer-quantity"></div>
//         <div class="shimmer-button"></div>
//       </div>
//     `;
//   }

//   // Function to update price range
//   function updatePriceRange() {
//     const maxPrice = Math.max(...allProducts.map((p) => p.price));
//     priceRange.max = Math.ceil(maxPrice);
//     priceRange.value = maxPrice;
//     maxPriceLabel.textContent = `$${maxPrice.toFixed(2)}`;
//   }

//   // Function to display products (sorted if necessary)
//   function displayProducts() {
//     productsContainer.innerHTML = "";

//     let filteredProducts = allProducts
//       .filter((p) => p.price <= parseFloat(priceRange.value))
//       .filter((p) =>
//         p.title.toLowerCase().includes(searchInput.value.toLowerCase())
//       );

//     if (sortSelect.value === "low-to-high") {
//       filteredProducts.sort((a, b) => a.price - b.price);
//     } else if (sortSelect.value === "high-to-low") {
//       filteredProducts.sort((a, b) => b.price - a.price);
//     }

//     productCount.textContent = `${filteredProducts.length} Results`;
//     productCount.style.fontWeight = "bold";

//     filteredProducts.forEach((product) => {
//       productsContainer.innerHTML += `
//         <div class="product">
//           <div class="product-image">
//             <img src="${product.image}" alt="${product.title}" loading="lazy">
//             <button class="shop-now-btn" data-id="${
//               product.id
//             }" id="shopNow">Shop Now</button>
//           </div>
//           <h4>${product.title.substring(0, 28)}...</h4>
//           <div class="product-details">
//             <div class="product-price">
//               <p>$${product.price}</p>
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
//                 <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
//               </svg>
//             </div>
//           </div>
//         </div>
//       `;
//     });
//   }

//   // Event listeners
//   Object.keys(categories).forEach((id) => {
//     const checkbox = document.getElementById(id);
//     console.log("Body Checkbox:", checkbox);
//     if (checkbox) {
//       checkbox.addEventListener("change", fetchAndDisplayProducts);
//     } else {
//       console.error(`Element with id '${id}' not found!`);
//     }
//   });
//   sortSelect.addEventListener("change", displayProducts);
//   priceRange.addEventListener("input", () => {
//     maxPriceLabel.textContent = `$${parseFloat(priceRange.value).toFixed(2)}`;
//     displayProducts();
//   });
//   searchInput.addEventListener("input", displayProducts);

//   // Event delegation for shop now buttons
//   productsContainer.addEventListener("click", (event) => {
//     if (event.target.classList.contains("shop-now-btn")) {
//       const productId = event.target.getAttribute("data-id");
//       if (productId) {
//         localStorage.setItem("selectedProductId", productId);
//         window.location.href = "../product/productDetails.html";
//       } else {
//         console.error("Product ID not found!");
//       }
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("shopNowProducts");
  const productCount = document.getElementById("productCount");
  const sortSelect = document.getElementById("sortSelect");
  // const priceRange = document.getElementById("priceRange");
  // const maxPriceLabel = document.getElementById("maxPriceLabel");
  const searchInput = document.getElementById("searchInput");
  const categories = {
    jewellery: "jewelery",
    electronics: "electronics",
    men: "men's clothing",
    women: "women's clothing",
  };

  // Shared state
  let allProducts = [];
  let currentPrice = 0;
  const state = {
    selectedCategories: new Set(["jewellery", "electronics", "men", "women"]),
    priceRange: 0,
  };

  sortSelect.addEventListener("change", displayProducts);
  searchInput.addEventListener("input", displayProducts);

  // Load Header
  loadHTML("../header.html", "header", () => {
    initMobileComponents();
    initDesktopComponents(); // Initialize desktop filters after header loads
    syncFilterStates();
  });

  // Load Footer
  loadHTML("../footer.html", "footer", initFooter);

  // Core Functions
  function loadHTML(url, elementId, callback) {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById(elementId).innerHTML = data;
        if (callback) callback();
      })
      .catch((error) => console.error(`Error loading ${elementId}:`, error));
  }

  function initFooter() {
    document.querySelectorAll(".social-icons img").forEach((img) => {
      if (window.location.pathname !== "/index.html") {
        img.src = img.src.replace("components", "../");
      }
    });
  }

  function initMobileComponents() {
    const menuIcon = document.getElementById("menuIcon");
    const sideDrawer = document.getElementById("sideDrawer");
    const closeDrawer = document.getElementById("closeDrawer");
    const overlay = document.getElementById("overlay");

    if (menuIcon && sideDrawer) {
      menuIcon.addEventListener("click", () => toggleDrawer(true));
      closeDrawer.addEventListener("click", () => toggleDrawer(false));
      overlay.addEventListener("click", () => toggleDrawer(false));
    }

    // Initialize mobile filters
    initFilters("mobile");
    initPriceRange("mobile");
  }

  // Initialize desktop filters
  function initDesktopComponents() {
    initFilters("desktop");
    initPriceRange("desktop");
  }

  function initFilters(viewType) {
    const prefix = viewType === "mobile" ? "mobile-" : "";
    Object.keys(categories).forEach((id) => {
      const checkbox = document.getElementById(`${prefix}${id}`);
      if (checkbox) {
        checkbox.addEventListener("change", handleFilterChange);
        if (state.selectedCategories.has(id)) {
          checkbox.checked = true;
        }
      }
    });
  }

  function initPriceRange(viewType) {
    const prefix = viewType === "mobile" ? "mobile-" : "";
    const range = document.getElementById(`${prefix}priceRange`);
    const label = document.getElementById(`${prefix}maxPriceLabel`);

    if (range && label) {
      range.addEventListener("input", handlePriceChange);
      range.value = state.priceRange;
      label.textContent = `$${state.priceRange.toFixed(2)}`;
    }
  }

  // function displayProducts() {
  //   productsContainer.innerHTML = "";

  //   let filteredProducts = allProducts
  //     .filter((p) => p.price <= parseFloat(priceRange.value))
  //     .filter((p) =>
  //       p.title.toLowerCase().includes(searchInput.value.toLowerCase())
  //     );

  //   if (sortSelect.value === "low-to-high") {
  //     filteredProducts.sort((a, b) => a.price - b.price);
  //   } else if (sortSelect.value === "high-to-low") {
  //     filteredProducts.sort((a, b) => b.price - a.price);
  //   }

  //   productCount.textContent = `${filteredProducts.length} Results`;
  //   productCount.style.fontWeight = "bold";

  //   filteredProducts.forEach((product) => {
  //     productsContainer.innerHTML += `
  //           <div class="product">
  //             <div class="product-image">
  //               <img src="${product.image}" alt="${
  //       product.title
  //     }" loading="lazy">
  //               <button class="shop-now-btn" data-id="${
  //                 product.id
  //               }" id="shopNow">Shop Now</button>
  //             </div>
  //             <h4>${product.title.substring(0, 28)}...</h4>
  //             <div class="product-details">
  //               <div class="product-price">
  //                 <p>$${product.price}</p>
  //                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  //                   <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
  //                 </svg>
  //               </div>
  //             </div>
  //           </div>
  //         `;
  //   });
  // }

  // Function to display shimmer effect

  function showShimmerEffect() {
    productsContainer.innerHTML = `
      <div class="shimmer-container">
        <div class="shimmer-image"></div>
        <div class="shimmer-text title"></div>
        <div class="shimmer-text price"></div>
        <div class="shimmer-text rating"></div>
        <div class="shimmer-text description"></div>
        <div class="shimmer-quantity"></div>
        <div class="shimmer-button"></div>
      </div>
    `;
  }

  function displayProducts() {
    productsContainer.innerHTML = "";

    let filteredProducts = allProducts
      .filter((p) => p.price <= state.priceRange)
      .filter((p) =>
        p.title.toLowerCase().includes(searchInput.value.toLowerCase())
      );

    if (sortSelect.value === "low-to-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortSelect.value === "high-to-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    productCount.textContent = `${filteredProducts.length} Results`;
    productCount.style.fontWeight = "bold";

    filteredProducts.forEach((product) => {
      productsContainer.innerHTML += `
        <div class="product">
               <div class="product-image">
                 <img src="${product.image}" alt="${
        product.title
      }" loading="lazy">
                <button class="shop-now-btn" data-id="${
                  product.id
                }" id="shopNow">Shop Now</button>
              </div>
              <h4>${product.title.substring(0, 28)}...</h4>
              <div class="product-details">
                <div class="product-price">
                  <p>$${product.price}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                  </svg>
                </div>
              </div>
            </div>
      `;
    });
  }

  // State Management
  function handleFilterChange(e) {
    const id = e.target.id.replace("mobile-", "");
    if (e.target.checked) {
      state.selectedCategories.add(id);
    } else {
      state.selectedCategories.delete(id);
    }
    syncCheckboxStates();
    fetchAndDisplayProducts();
  }

  function syncFilterStates() {
    // Sync checkbox states
    Object.keys(categories).forEach((id) => {
      const desktopCheckbox = document.getElementById(id);
      const mobileCheckbox = document.getElementById(`mobile-${id}`);

      // if (desktopCheckbox && mobileCheckbox) {
      //   desktopCheckbox.checked = mobileCheckbox.checked;
      //   mobileCheckbox.checked = desktopCheckbox.checked;
      // }
    });

    // Sync price range
    const desktopRange = document.getElementById("priceRange");
    const mobileRange = document.getElementById("mobile-priceRange");
    if (desktopRange && mobileRange) {
      desktopRange.value = mobileRange.value;
      mobileRange.value = desktopRange.value;
    }
  }

  // Update filter initialization
  function initFilters(viewType) {
    const prefix = viewType === "mobile" ? "mobile-" : "";
    Object.keys(categories).forEach((id) => {
      const checkbox = document.getElementById(`${prefix}${id}`);
      if (checkbox) {
        checkbox.addEventListener("change", () => {
          // Update state and sync
          state.selectedCategories[checkbox.checked ? "add" : "delete"](id);
          syncFilterStates();
          fetchAndDisplayProducts();
        });
      }
    });
  }

  function handlePriceChange(e) {
    state.priceRange = parseFloat(e.target.value);
    syncPriceRangeStates();
    displayProducts();
  }

  function syncCheckboxStates() {
    Object.keys(categories).forEach((id) => {
      [document.getElementById(id), document.getElementById(`mobile-${id}`)]
        .filter(Boolean)
        .forEach((checkbox) => {
          checkbox.checked = state.selectedCategories.has(id);
        });
    });
  }

  function syncPriceRangeStates() {
    ["", "mobile-"].forEach((prefix) => {
      const range = document.getElementById(`${prefix}priceRange`);
      const label = document.getElementById(`${prefix}maxPriceLabel`);
      if (range && label) {
        range.value = state.priceRange;
        label.textContent = `$${state.priceRange.toFixed(2)}`;
      }
    });
  }

  // UI Updates
  function toggleDrawer(show) {
    document.getElementById("sideDrawer").classList.toggle("show-drawer", show);
    document.getElementById("overlay").classList.toggle("show-overlay", show);
  }

  async function fetchAndDisplayProducts() {
    try {
      showShimmerEffect();

      if (state.selectedCategories.size === 0) {
        productsContainer.innerHTML = "<p>Please select a category.</p>";
        productCount.textContent = "0 Results";
        return;
      }

      const productPromises = Array.from(state.selectedCategories).map((id) =>
        fetch(
          `https://fakestoreapi.com/products/category/${categories[id]}`
        ).then((res) => res.json())
      );

      allProducts = (await Promise.all(productPromises)).flat();
      updatePriceRange();
      displayProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
      productsContainer.innerHTML = "<p>Failed to load products.</p>";
    }
  }

  function updatePriceRange() {
    const maxPrice = Math.max(...allProducts.map((p) => p.price));
    state.priceRange = maxPrice;
    syncPriceRangeStates();
  }

  // Event delegation for shop now buttons
  productsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("shop-now-btn")) {
      const productId = event.target.getAttribute("data-id");
      if (productId) {
        localStorage.setItem("selectedProductId", productId);
        window.location.href = "../product/productDetails.html";
      } else {
        console.error("Product ID not found!");
      }
    }
  });

  // Initialize after DOM loads
  setTimeout(() => {
    initDesktopComponents();
    fetchAndDisplayProducts();
  }, 0);
});
