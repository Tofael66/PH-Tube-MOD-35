

/**
 * 1- fetch , load and show cateries on html 
 * */
 // 2 - create load categories
 
 const loadCaterigories = () =>{
    
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(( res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch ((error) => console.log(error))
}

loadCaterigories()




 // 3- create displayCategories 
 
const displayCategories = (categories) => {

    const cateriContainer = document.getElementById('categories')
    
// category: "Music"
// category_id: "1001"
    
 categories.forEach( (item) => {
    
    console.log(item) ;
    //create a buton 

    const button = document.createElement("button") ;
    button.classList = 'btn'
    button.innerText = item.category ;

    // add button to category container 
    cateriContainer.appendChild(button) ;
 });
}

// displayCategories()