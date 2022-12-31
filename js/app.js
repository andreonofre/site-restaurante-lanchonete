
// Montador de HTML
const loadProducts = (produtos, idDivParent) => {
    const parentDiv = document.querySelector(idDivParent);
    produtos.forEach((produto) => {
        
        const html = `
            <article class="prato">
                <img src="${produto.image}" alt="${produto.title}">
                <h4>${produto.title}</h4>
                <h4>R$${produto.value},00</h4>
                <p>${produto.description}</p>
                <button type="button" onclick="modalTrigger(${produto.id})">Quero este prato</button>
            </article>
            `

        parentDiv.insertAdjacentHTML("beforeend", html)
    });
};



//MODAL
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


//SEND MESSAGE WHATSAPP
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


// BUSCADOR
const search = (products, searchTerm) => products.filter( product => product.title.toLowerCase().includes(`${searchTerm.toLowerCase()}`) || 
product.description.includes(`${searchTerm.toLowerCase()}`));


const loadSearch = (form, productsDivId) => {
    const producstDiv = document.querySelector(productsDivId);
    const inputSearch = form.querySelector("#inputSearch")

    //removendo pratos
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (inputSearch.value != "") {
            producstDiv.querySelectorAll(".prato").forEach( (prato) => {
                prato.remove()
            })

            const results = search(produtos, inputSearch.value)
            // console.log(results);

            results.forEach((produto) => {
        
                const html = `
                    <article class="prato">
                        <img src="${produto.image}" alt="${produto.title}">
                        <h4>${produto.title}</h4>
                        <h4>R$${produto.value},00</h4>
                        <p>${produto.description}</p>
                        <button type="button" onclick="modalTrigger(${produto.id})">Quero este prato</button>
                    </article>
                `
        
                producstDiv.insertAdjacentHTML("beforeend", html)
            });
        }

    })
}



loadProducts(produtos, "#product-div")

checkout("5575998927538")

loadSearch(document.querySelector("#formSearch"), "#product-div");


// https://picsum.photos/200