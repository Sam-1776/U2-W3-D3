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
    console.log(arrayBook);
    const row = document.querySelector(".row")
    arrayBook.forEach(book => {
        const col = document.createElement("div")
        col.className = "col-6 col-md-4 col-lg-3 mb-3"
        const card = document.createElement("div")
        card.className = "card"
        const img = document.createElement("img");
        img.src = book.img
        img.className = "card-img-top"
        img.style.maxHeight = "350px" 
        const body = document.createElement("div")
        body.className = "card-body"
        const h4 = document.createElement("h4");
        h4.className = "card-title"
        h4.innerText = book.title
        const p = document.createElement("p")
        p.className = "card-text"
        p.innerText = book.price + "€"
        const button = document.createElement("button")
        button.className = "btn btn-outline-primary"
        button.innerText = "Scarta"


        body.appendChild(h4)
        body.appendChild(p)
        body.appendChild(button)
        card.appendChild(img)
        card.appendChild(body)
        col.appendChild(card)
        row.appendChild(col)
    });
})
.catch(error => console.log("CATCH BLOCK", error))