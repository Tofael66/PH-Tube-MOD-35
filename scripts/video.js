

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




// active btn calss remove
const removeActiveClass = () => {
 const buttons = document.getElementsByClassName("category-btn") ;
 console.log(buttons) ;
 for( let btn of buttons){
  btn.classList.remove("active") ;
 }
}



 // 3- create displayCategories 
const displayCategories = (categories) => {

    const cateriContainer = document.getElementById('categories')
    
// category: "Music"
// category_id: "1001"

    // serial-10
 categories.forEach( (item) => {  
    console.log(item) ;

 //create a buton 
    const buttonContainer = document.createElement("div") ;
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCaterigoriesVideos(${item.category_id})" class="btn  category-btn"> ${item.category}</button>

    `
   
   
    // add button to category container 
    cateriContainer.appendChild( buttonContainer) ;
 });
}




//loadvideos

const loadVideos = (searchText = "") =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`) 
    .then((res) => res.json())
    .then((data) => displayLoad(data.videos)) 
    .catch((err) => console.log(err))
}



// serial-11

const loadCaterigoriesVideos =(id) =>{
  // alert(id) ;
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`) 
    .then((res) => res.json())
    .then((data) => {
      // sob btn a active class remove koro
 removeActiveClass()
      // id ar class k active koro 
      const activeBtn = document.getElementById(`btn-${id}`)
      // console.log(activeBtn) ;
      activeBtn.classList.add('active');
      displayLoad(data.category)
    })  
    .catch((err) => console.log(err))



}



// time setup st

function getTimeSpend(time){
    //get our and rest second 

    const hour = parseInt(time/3600) ;
    const remainigSecond = parseFloat(time % 3600)
    const minite = parseInt( remainigSecond / 60) ;
    second = remainigSecond % 60 ;

    return `${hour} hour  ${minite} minute   ${second} second ago`  ;
}
// time setup end


// display shaow videos

const displayLoad = ((videos) => {
    const videoContainer = document.getElementById('videos') ;
     videoContainer.innerHTML = " " ;
       
     if(videos.length == 0){
      videoContainer.classList.remove("grid") ;
      videoContainer.innerHTML = `
      <div class="min-h-[300px] w-full flex flex-col  gap-5 justify-center items-center ">

      <img src="Icon.png "/>
      <h2 class = "text-center text-xl font-bold "> No Content Here in this Category </h2>
      </div>
      
      ` ;
      return ; 
     }

     else{

      videoContainer.classList.add("grid") ;

     }


  videos.forEach((video) => {
     // console.log(video)

    const card =document.createElement('div') ;
    card.classList = "card card-compact "
    card.innerHTML =`
    
    <figure class = "h-[200px] relative ">
    <img 
      src=${video.thumbnail}
      alt="Shoes" class ="h-full w-full object-cover"  />

      ${video.others.posted_date?.length== 0 ? "" : ` <span class ="absolute right-2 bottom-2 text-sm text-white bg-black p-1 rounded ">${getTimeSpend(video.others.posted_date)}</span>`}

     
  </figure>

  <div class="px-0 py-2 flex gap-2">
    <div>
    <img  class ="w-10 h-10 rounded-full object-cover"  src="${video.authors[0].profile_picture}  "/>
    </div>

    <div>
    <h2 class = " font-bold" >${video.title}</h2>
<div class=" flex items-center gap-2 ">
<p class = "text-gray-400">${video.authors[0].profile_name}</p>
${video.authors[0].verified === true ?  `<img class ="w-5 "  src="https://img.icons8.com/?size=48&id=91kLZWvmd4sg&format=png"/>` :""}

</div>
    <p> <button onclick="loadDetails('${video.video_id}')"  class ="btn btn-sm btn-error">details</button></p>
    </div>

    </div>
  </div>
    
    
    `

    videoContainer.append(card)
  })
})


// load video details 
const loadDetails =async (videoId) =>{
   // console.log(videoId)
   const url =`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}` ;

   const res = await fetch(url) ;
   const data = await res.json() ;
    // console.log(data)
    dipayDetails(data.video)
} ;

const dipayDetails =(video) => {
  console.log(video)
  const detailsContainer = document.getElementById('modal-content') ;
  
  // ata 2 vabe dekano jay jomon:
  // way-1
  // document.getElementById("showModalData").click();
  // way-2
  document.getElementById("customModal").showModal() ;
   detailsContainer.innerHTML =`
   <img src =${video.thumbnail}/>
   <p>${video.description}</p>
   `

}

//  search kor
document.getElementById("search-input").addEventListener("keyup", (e) =>{
  loadVideos(e.target.value) ;
}) ;

loadCaterigories()
loadVideos()
// demo
// {
//     "category_id": "1001",
//     "video_id": "aaad",
//     "thumbnail": "https://i.ibb.co/f9FBQwz/smells.jpg",
//     "title": "Smells Like Teen Spirit",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/k4tkc42/oliviar-harris.jpg",
//             "profile_name": "Oliver Harris",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "5.4K",
//         "posted_date": "1672656000"
//     },
//     "description": "'Smells Like Teen Spirit' by Oliver Harris captures the raw energy and rebellious spirit of youth. With over 5.4K views, this track brings a grunge rock vibe, featuring powerful guitar riffs and compelling vocals. Oliver's verified profile guarantees a quality musical journey that resonates with fans of dynamic, high-energy performances."
// }
