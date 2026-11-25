console.log("CATEGORY.JS IS RUNNING!");

const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category");

console.log("Selected category:", selectedCategory);

async function loadProducts() {

    const container = document.getElementById("product-container");
    const title = document.getElementById("category-title");

    if (!container) {
        console.error("Product container not found!");
        return;
    }

    // Display category title
    if (title) {
        title.textContent = selectedCategory;
    }

    if (!selectedCategory) {
        console.error("No category selected!");
        return;
    }

    // 1. GET PRODUCTS IN THIS CATEGORY

    const { data: products, error } = await supabaseClient
        .from("products")
        .select("*")
        .eq("category", selectedCategory);

    if (error) {
        console.error("Error loading products:", error);
        return;
    }

    console.log("Category products:", products);

    // 2. CLEAR OLD PRODUCTS

    container.innerHTML = "";

    // 3. DISPLAY PRODUCTS

    products.forEach(product => {

        const productCard = document.createElement("div");
        productCard.className = "product-card";

        // Product image
        const image = document.createElement("img");

        image.src = product.image;
        image.alt = product.name;
        image.className = "product-image";

        // Product name
        const name = document.createElement("h3");

        name.textContent = product.name;

        // Product price
        const price = document.createElement("p");

        price.textContent = product.price + " DH";

        // Add elements to card
        productCard.appendChild(image);
        productCard.appendChild(name);
        productCard.appendChild(price);

        // CLICK CARD TO OPEN PRODUCT MODAL

        productCard.addEventListener("click", () => {

            console.log("Product clicked:", product.name);

            openProductModal(product);

        });

        // Add card to container
        container.appendChild(productCard);

    });

}


// 4. LOAD PRODUCTS WHEN PAGE LOADS

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});