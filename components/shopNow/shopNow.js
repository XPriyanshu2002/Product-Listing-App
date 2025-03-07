document.addEventListener("DOMContentLoaded", () => {
  const categories = {
    jewellery: "jewelery",
    electronics: "electronics",
    men: "men's clothing",
    women: "women's clothing",
  };

  const productsContainer = document.getElementById("shopNowProducts");
  const productCount = document.getElementById("productCount");
  const sortSelect = document.getElementById("sortSelect");
  const priceRange = document.getElementById("priceRange");
  const maxPriceLabel = document.getElementById("maxPriceLabel");
  const searchInput = document.getElementById("searchInput");
  const shopNowBtn = document.getElementById("shopNow");

  let allProducts = []; // Store fetched products for sorting

  // Function to fetch and display products for selected categories
  const fetchAndDisplayProducts = async () => {
    try {
      // Show shimmer effect initially
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
      allProducts = []; // Reset product array

      const selectedCategories = Object.keys(categories).filter(
        (id) => document.getElementById(id)?.checked
      );

      if (selectedCategories.length === 0) {
        productsContainer.innerHTML = "<p>Please select a category.</p>";
        productCount.textContent = "0 Products Found";
        return;
      }

      // Fetch products for all selected categories
      const productPromises = selectedCategories.map((id) =>
        fetch(
          `https://fakestoreapi.com/products/category/${categories[id]}`
        ).then((res) => res.json())
      );

      allProducts = (await Promise.all(productPromises)).flat();

      // Set max price dynamically based on fetched products
      const maxPrice = Math.max(...allProducts.map((p) => p.price));
      priceRange.max = Math.ceil(maxPrice);
      priceRange.value = maxPrice;
      maxPriceLabel.textContent = `$${maxPrice.toFixed(2)}`;

      productCount.textContent = `${allProducts.length} Products Found`;

      displayProducts(); // Initially display products
    } catch (error) {
      console.error("Error fetching products:", error);
      productsContainer.innerHTML = "<p>Failed to load products.</p>";
    }
  };

  // Function to display products (sorted if necessary)
  const displayProducts = () => {
    productsContainer.innerHTML = "";

    let filteredProducts = allProducts
      .filter((p) => p.price <= parseFloat(priceRange.value)) // Filter by price
      .filter((p) =>
        p.title.toLowerCase().includes(searchInput.value.toLowerCase())
      ); // Filter by search

    // Apply sorting if a valid option is selected
    if (sortSelect.value === "low-to-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortSelect.value === "high-to-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
    productCount.textContent = `${filteredProducts.length} Results`;
    productCount.style.fontWeight = "bold";

    // Display products
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
  };

  // Attach event listeners to checkboxes
  Object.keys(categories).forEach((id) => {
    const checkbox = document.getElementById(id);
    if (checkbox) {
      checkbox.addEventListener("change", fetchAndDisplayProducts);
    } else {
      console.error(`Element with id '${id}' not found!`);
    }
  });

  // Listen for sorting changes
  sortSelect.addEventListener("change", displayProducts);

  fetchAndDisplayProducts(); // Fetch and display products initially

  priceRange.addEventListener("input", () => {
    maxPriceLabel.textContent = `$${parseFloat(priceRange.value).toFixed(2)}`;
    displayProducts();
  });

  // Listen for search input changes
  searchInput.addEventListener("input", displayProducts);

  // Load Header
  fetch("../header.html")
    .then((response) => response.text())
    .then((data) => {
      console.log("Header Loaded Successfully!");
      document.getElementById("header").innerHTML = data;
    })
    .catch((error) => console.error("Error loading header:", error));

  // Load Footer
  fetch("../footer.html")
    .then((response) => response.text())
    .then((data) => {
      console.log("Footer Loaded Successfully!");
      document.getElementById("footer").innerHTML = data;

      // Adjust image paths
      // document.querySelectorAll(".social-icons img").forEach(img => {
      //     let pathDepth = window.location.pathname.split("/").length - 2;
      //     let prefix = "../".repeat(pathDepth);
      //     img.src = prefix + img.src.split("/").pop();
      // });
      document.querySelectorAll(".social-icons img").forEach((img) => {
        if (window.location.pathname !== "/index.html") {
          img.src = img.src.replace("components", "../");
        }
      });
    })
    .catch((error) => console.error("Error loading footer:", error));

  // Use event delegation to handle clicks on dynamically created buttons
  productsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("shop-now-btn")) {
      console.log("Shop Now button clicked!");

      // Get the product ID from the button's `data-id` attribute
      const productId = event.target.getAttribute("data-id");
      console.log("Product ID:", productId); // Debugging log

      if (productId) {
        // Store the product ID in localStorage
        localStorage.setItem("selectedProductId", productId);

        // // Get the product details
        // const productCard = event.target.closest(".product");
        // const productTitle = productCard.querySelector("h4").textContent;
        // const productImage = productCard.querySelector("img").src;
        // const productPrice = productCard.querySelector(".product-price p").textContent;

        // // Store the selected product in localStorage (or use URL parameters)
        // localStorage.setItem("selectedProduct", JSON.stringify({
        //   title: productTitle,
        //   image: productImage,
        //   price: productPrice
        // }));

        // Redirect to the new page
        window.location.href = "../product/productDetails.html";
      } else {
        console.error("Product ID not found!");
      }
    }
  });
});
