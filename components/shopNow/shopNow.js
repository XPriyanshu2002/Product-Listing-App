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
    const homeLink = document.getElementById("homeLink");

    if (menuIcon && sideDrawer) {
      menuIcon.addEventListener("click", () => toggleDrawer(true));
      closeDrawer.addEventListener("click", () => toggleDrawer(false));
      overlay.addEventListener("click", () => toggleDrawer(false));
    }

    homeLink.addEventListener("click", function () {
      console.log(window.location.pathname)
      window.location.href = "/";
    });

    // Initialize mobile filters
    initFilters("mobile");
    initPriceRange("mobile");
  }

  // Initialize desktop filters
  function initDesktopComponents() {
    initFilters("desktop");
    initPriceRange("desktop");
  }

  // function initFilters(viewType) {
  //   const prefix = viewType === "mobile" ? "mobile-" : "";
  //   Object.keys(categories).forEach((id) => {
  //     const checkbox = document.getElementById(`${prefix}${id}`);
  //     if (checkbox) {
  //       checkbox.addEventListener("change", handleFilterChange);
  //       if (state.selectedCategories.has(id)) {
  //         checkbox.checked = true;
  //       }
  //     }
  //   });
  // }
  function initFilters(viewType) {
    const prefix = viewType === "mobile" ? "mobile-" : "";
    Object.keys(categories).forEach((id) => {
      const checkbox = document.getElementById(`${prefix}${id}`);
      if (checkbox) {
        checkbox.removeEventListener("change", handleFilterChange); // Prevent duplicates
        checkbox.addEventListener("change", handleFilterChange);
        checkbox.checked = state.selectedCategories.has(id);
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
    const id = e.target.id.replace(/^(mobile-)/, "");
    const isChecked = e.target.checked;

    // Update state
    if (isChecked) {
      state.selectedCategories.add(id);
    } else {
      state.selectedCategories.delete(id);
    }

    // Sync all checkboxes from state
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
      // if (desktopCheckbox) desktopCheckbox.checked = state.selectedCategories.has(id);
      // if (mobileCheckbox) mobileCheckbox.checked = state.selectedCategories.has(id);
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

  // function syncCheckboxStates() {
  //   Object.keys(categories).forEach((id) => {
  //     [document.getElementById(id), document.getElementById(`mobile-${id}`)]
  //       .filter(Boolean)
  //       .forEach((checkbox) => {
  //         checkbox.checked = state.selectedCategories.has(id);
  //       });
  //   });
  // }
  function syncCheckboxStates() {
    Object.keys(categories).forEach((id) => {
      const desktopCheckbox = document.getElementById(id);
      const mobileCheckbox = document.getElementById(`mobile-${id}`);

      // Update checkboxes from state
      if (desktopCheckbox)
        desktopCheckbox.checked = state.selectedCategories.has(id);
      if (mobileCheckbox)
        mobileCheckbox.checked = state.selectedCategories.has(id);
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

  // async function fetchAndDisplayProducts() {
  //   try {
  //     showShimmerEffect();

  //     if (state.selectedCategories.size === 0) {
  //       productsContainer.innerHTML = "<p>Please select a category.</p>";
  //       productCount.textContent = "0 Results";
  //       return;
  //     }

  //     const productPromises = Array.from(state.selectedCategories).map((id) =>
  //       fetch(
  //         `https://fakestoreapi.com/products/category/${categories[id]}`
  //       ).then((res) => res.json())
  //     );

  //     allProducts = (await Promise.all(productPromises)).flat();
  //     updatePriceRange();
  //     displayProducts();
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     productsContainer.innerHTML = "<p>Failed to load products.</p>";
  //   }
  // }
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

      // Force UI update after state change
      setTimeout(syncCheckboxStates, 0);
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
