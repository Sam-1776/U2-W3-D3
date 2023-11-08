fetch("https://striveschool-api.herokuapp.com/books")
.then((response) =>{
    if (!response.ok) { 
        if (response.status === 400){throw new Error("Bad request")}
        if (response.status === 401){throw new Error("Unauthorized")}
        if (response.status === 403){throw new Error("Forbidden")}
        if (response.status === 404){throw new Error("Not found")}

        throw new Error("Generic Fetching error")
    }
    return  response.json();
})
.then((arrayBook) =>{
    const row = document.querySelector(".row")
    const a = [];
    arrayBook.forEach(book => {
        const col = document.createElement("div")
        col.className = "col-6 col-md-4 col-lg-3 mb-3"
        const card = document.createElement("div")
        card.className = "card"
        card.style.minHeight = "420px" 
        const img = document.createElement("img");
        img.src = book.img
        img.className = "card-img-top img-fluid"
        img.style = "object-fit: cover ; height: 260px";
        const body = document.createElement("div")
        body.className = "card-body position-relative"
        const h4 = document.createElement("h4");
        h4.className = "card-title"
        h4.style = "display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;  overflow: hidden;" ; 
        h4.innerText = book.title
        const p = document.createElement("p")
        p.className = "card-text"
        p.innerText = book.price + "€"
        const button = document.createElement("button")
        button.className = "btn btn-outline-danger position-absolute"
        button.style.bottom = "10px"
        button.innerText = "Scarta"
        button.onclick = () =>{
            col.remove()
        }
        const shop = document.createElement("button");
        shop.className = "btn btn-outline-primary position-absolute"
        shop.innerText = "Add to cart"
        shop.style = "bottom: 10px; right: 15px"
        shop.onclick = () =>{
            a.push(book.title)
            localStorage.setItem("bookArray", JSON.stringify(a))
            const ul = document.querySelector("ul")
            const li = document.createElement("li")
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            const item = JSON.parse(localStorage.getItem("bookArray"))
            for (let i = 0; i < item.length; i++) {
                const element = item[i];
               li.innerText = `${element}`;
               const delet = document.createElement("button")
               delet.innerText = "X"
               delet.className = "btn btn-outline-danger"

               delet.onclick = () =>{
                li.remove()
               }
               li.appendChild(delet)
                
               ul.appendChild(li);
                
            }

        }


        body.appendChild(h4)
        body.appendChild(p)
        body.appendChild(shop)
        body.appendChild(button)
        card.appendChild(img)
        card.appendChild(body)
        col.appendChild(card)
        row.appendChild(col)
    });
    loadPage()

})
.catch(error => console.log("CATCH BLOCK", error))

const loadPage = () =>{
    const ul = document.querySelector("ul")
    const item = JSON.parse(localStorage.getItem("bookArray"))
    console.log(item);
    for (let i = 0; i < item.length; i++) {
                const li = document.createElement("li")
                li.className = "list-group-item d-flex justify-content-between align-items-center";
                const element = item[i];
               li.innerText = `${element}`;
               const delet = document.createElement("button")
               delet.innerText = "X"
               delet.className = "btn btn-outline-danger"

               delet.onclick = () =>{
                li.remove()
               }

               li.appendChild(delet)
               ul.appendChild(li);
                
            }

}