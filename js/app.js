
// Montador de HTML
const loadProducts = (produtos, idDivParent) => {
    const parentDiv = document.querySelector(idDivParent);
    produtos.forEach((produto) => {
        
        const html = `
            <article class="prato">
                <img src="${produto.image}" alt="${produto.title}">
                <h4>${produto.title}</h4>
                <h4>${produto.value}</h4>
                <p>${produto.description}</p>
                <button type="button" onclick="modalTrigger()">Quero este prato</button>
            </article>
            `

        parentDiv.insertAdjacentHTML("beforeend", html)
    });
};

const modalTrigger = (productId) => {
    const modal = document.querySelector(".modal");

    if (modal.classList.contains("hide")) {
        modal.classList.remove("hide");
    } else {
        modal.classList.add("hide");
    }
};

loadProducts(produtos, "#product-div")




// https://picsum.photos/200