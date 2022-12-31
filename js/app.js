
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
                <button type="button" onclick="modalTrigger(${produto.id})">Quero este prato</button>
            </article>
            `

        parentDiv.insertAdjacentHTML("beforeend", html)
    });
};


const modalTrigger = (productId) => {
    const modal = document.querySelector(".modal");

    if (productId != null) {
        const produto = produtos.filter(produto => produto.id == productId)[0];
        if ( produto != null) {
            modal.querySelector("#title").value = produto.title;
        }
    }

    if (modal.classList.contains("hide")) {
        modal.classList.remove("hide");
    } else {
        modal.classList.add("hide");
    }
};


const whatsappLinkGeneration = (phoneNumber, productTitle, productQuantity, buyerName, buyerAddress, buyerPayment) => `https://api.whatsapp.com/send?phone=${phoneNumber}=&text=Olá, Eu quero: ${productQuantity} ${productTitle} - Entregar para, ${buyerName} no endereço: ${buyerAddress} - a forma de pagamento será: ${buyerPayment}`


const checkout = (phoneNumber) => {
    const form = document.querySelector("#form-product");
    form.addEventListener("submit", e => {
        e.preventDefault()

        const productTitle = form.querySelector("input#title").value
        const productQuantity = form.querySelector("input#quantity").value
        const buyerName = form.querySelector("input#name").value
        const buyerAddress = form.querySelector("input#address").value
        const buyerPayment = form.querySelector("select#payment").value
     
        const whatsappUrl = whatsappLinkGeneration(phoneNumber, productTitle, productQuantity, buyerName, buyerAddress, buyerPayment);
    
        window.location.href = whatsappUrl
    });
}

loadProducts(produtos, "#product-div")
checkout("5575999536167")



// https://picsum.photos/200