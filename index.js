// get eletronics
function getEletronics() {
    return fetch('http://localhost:3000/eletronics')
        .then(res => res.json())
}
getEletronics().then((productsArr) => {
    // console.log(eleArr)
    productsArr.forEach(product)
})


//render product
function product(item) {
    //tag
    let itemCollection = document.getElementById('list-group')
    let itemLi = document.createElement('li')

    //set attribute
    itemLi.setAttribute('class', 'list-group-item')
    itemLi.setAttribute('id', item.id)

    //inner text
    itemLi.innerText = item.name

    //append
    itemCollection.append(itemLi)
}

//-----------------------------------------------------------------------------------------

// //create ele

// let eleSubmit = document.querySelector(".create-ele")
// eleSubmit.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     postEletronics(evt.target)
// })

// function postEletronics(stuff){
//     debugger
//     fetch(`http://localhost:3000/eletronics/${stuff.id}`,{
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//             name: stuff.name.value,
//             image: stuff.image.value,
//             description: stuff.description.value
//         })
//     })
//     .then(res => res.json())
//     .then((params) => {
        
//         let eleName = document.querySelector('.col-md-4')

//         eleName.innerHTML +=
//             `<li>${params.name}</li>`
//     })
// }

// //delete

// let deleteEle = document.getElementById('item-detail')
// deleteEle.addEventListener('click', (evt) => {
//     // debugger
//     let id = evt.target.dataset.id
//     if (evt.target.id === "clear") {
//         fetch(`http://localhost:3000/eletronics/${id}`, {
//             method: "DELETE"
//         })
//         .then(() => {
//             evt.target.parentElement.remove()
//         })
//     }
// })


//-----------------------------------------------------------------------------------------


//add event listner 
let itemButton = document.querySelector(".list-group")
itemButton.addEventListener('click', (evt) => {
    // debugger
    fetchItem(evt.target)
    fetchReview(evt.target)
})

//fetch Item
function fetchItem(itemInfo) {
    // debugger 
    fetch(`http://localhost:3000/eletronics/${itemInfo.id}`)
    .then(res => res.json())
    .then((product) => {
        let productDetail = document.getElementById('item-detail')
        let h1 = document.createElement('h1')
        let img = document.createElement('img')
        let p = document.createElement('p')
        let h2 = document.createElement('h2')
        let br7 = document.createElement('br')
        // let erase = document.createElement('button')

        img.setAttribute('src', product.image)
        // erase.setAttribute('class', 'asxerase')
        // erase.setAttribute('data-id', product.id)
        // erase.setAttribute('id', 'clear')

        h1.innerText = product.name
        p.innerText = product.description
        h2.innerText = 'Item Detail'
        // erase.innerText = 'delete'
        productDetail.innerText = ""

        productDetail.append(h2, h1, img, br7, p)

    })
}

//fetchReview
function fetchReview(reviewForm) {
    // debugger
    fetch(`http://localhost:3000/eletronics/${reviewForm.id}`)
    .then(res => res.json())
    .then((comment) => {
        // debugger   

        // console.log(comment);
        let userComment = document.querySelector(".user-comment")
        let label = document.createElement('label')
        let label2 = document.createElement('label')
        let input = document.createElement('input')
        let textarea = document.createElement('textarea')
        let button = document.createElement('button')
        let h2 = document.createElement('h2')
        let br = document.createElement('br')
        let br2 = document.createElement('br')
        let br3 = document.createElement('br')
        let br4 = document.createElement('br')
        let br5 = document.createElement('br')

        input.setAttribute('type', 'text')
        input.setAttribute('name', 'name')
        textarea.setAttribute('name', 'comment')
        textarea.setAttribute('id', 'comment-name')
        button.setAttribute('class', 'button-submit')
        button.setAttribute('data-id', comment.id)
        userComment.setAttribute('id', comment.id)

        label.innerText = 'Name:'
        label2.innerText = 'Comment:'
        button.innerText = 'submit'
        h2.innerText = 'Create Comment'
        userComment.innerText = ''

        userComment.append(h2, label, br4, input, br, label2, br2, textarea, br3, br5, button)

        comment.reviews.forEach(review => {
        userComment.innerHTML += 
        `<div id = "review-${review.id}">
            <div>name: ${review.name}</div>
            <div>comment: ${review.content}</div> 
            <button data-id=${review.id} class='clear' id='delete'>delete</button> 
            <input type='text'> <button data-id=${review.id} class='re-due' id='edit'>edit</button>
        </div >`

        })


    })
}





// // getReviews
// function getReviews() {
//     return fetch('http://localhost:3000/reviews')
//         .then(res => res.json())
// }
// getReviews().then((usersArr) => {
//     // console.log(eleArr)
//     usersArr.forEach(userReview)
// })


let submitButton = document.querySelector(".user-comment")
submitButton.addEventListener('submit', (evt) => {
    evt.preventDefault()
    postComment(evt.target)
})

function postComment(commentInfo) {
    // debugger
    // console.log(commentInfo.comment.value)
    fetch(`http://localhost:3000/reviews`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: commentInfo.name.value,
            content: commentInfo.comment.value,
            eletronic_id: commentInfo.id
        })
    })
    .then(res => res.json())
    .then((user) => {
        // debugger


        let reviewRev = document.querySelector('.user-comment')

        reviewRev.innerHTML += 
        `<div>name: ${user.name}</div>
        <div>comment: ${user.content}</div> 
        <button data-id=${user.id} class='clear' id='delete'>delete</button> 
        <input type='text'> <button data-id=${user.id} class='re-due' id='edit'>edit</button>
        <br>`

    })
    submitButton.reset()
}



let rCollect = document.querySelector('.user-comment')
rCollect.addEventListener("click", (e) => {
    // debugger 
    let id = e.target.dataset.id
    if (e.target.id === "delete") {
        fetch(`http://localhost:3000/reviews/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            e.target.parentElement.remove()

        })
    }
})


let reviewRev = document.querySelector('.user-comment')
reviewRev.addEventListener("click", (e) => {
    // debugger
    let editContent = e.target.previousElementSibling.value
    let id = e.target.dataset.id
    if (e.target.id === "edit") {
        fetch(`http://localhost:3000/reviews/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                content: editContent
            })
        })
        .then(response => response.json())
        .then((newReview) => {
            // debugger
            e.target.parentElement.children[1].innerText = `comment: ${newReview.content}`
            submitButton.reset()
        })
    }
})









































// //get eletronics

// function getEletronics(){
//     return fetch('http://localhost:3000/eletronics')
//     .then(res => res.json())
// }
// getEletronics().then((eleArr) => {
//     // console.log(eleArr)
//     eleArr.forEach(product)
// })

// function product(ele){
//     let listGroup = document.querySelector('.list-group')
//     let li = document.createElement('li')
    
//     li.setAttribute('id', ele.id)
//     li.setAttribute('class', 'list-group-item')

//     li.innerText += ele.name

//     listGroup.append(li)
// }


// let itemDetail = document.querySelector('.list-group')
// itemDetail.addEventListener('click', (evt) => {
//     // console.log("hello")
//     eleDetail(evt.target)
//     eleReview(evt.target)
// })

// function eleDetail(elest) {
//     return fetch(`http://localhost:3000/eletronics/${elest.id}`)
//     .then(res => res.json())
//     .then((se) => {
        
//         let itemDetail = document.getElementById('item-detail')
//         let h2 = document.createElement('h2')
//         let img = document.createElement('img')
//         let p = document.createElement('p')
    
//         img.setAttribute('src', se.image)
    
//         h2.innerText = se.name
//         p.innerText = se.description
//         itemDetail.innerText = ""
    
//         itemDetail.append(h2, img, p)
//     })
// }


// function eleReview(sw){
//     fetch(`http://localhost:3000/eletronics/${sw.id}`)
//     .then(res => res.json())
//     .then((params) => {      
//         let commentDel = document.querySelector('.user-comment')
//         let lable = document.createElement('lable')
//         let lable2 = document.createElement('lable')
//         let input = document.createElement('input')
//         let button = document.createElement('button')
//         let textarea = document.createElement('textarea')
    
//         input.setAttribute('type', 'text')
//         input.setAttribute('name', 'name')
//         textarea.setAttribute('name', 'comment')
//         textarea.setAttribute('id', 'comment-name')
    
//         lable.innerText = 'name'
//         lable2.innerText = 'comment'
//         button.innerText = 'submit'
//         commentDel.innerText = ""

//         commentDel.append(lable, input, lable2, textarea, button)
//         params.reviews.forEach((review) => {
//             commentDel.innerText +=
//         })
//     })
// }


// let create = document.querySelector('.user-comment')
// create.addEventListener('submit', (evt) => {
//     evt.preventDefault()
//     revCreate(evt.target)
// })
// function revCreate(sd){
//     fetch(`http://localhost:3000/reviews/${sd.id}`,{
//         method:'POST',
//         headers: {
//             "Content-type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify({
//             name:,
//             content:
//         })
//     })
// }

