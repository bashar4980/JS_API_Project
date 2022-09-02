const getNews = async(id) =>{
     try{
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        getDisplay(data.data)
        
        
     }
     catch(err){
        console.log(err)
        console.log(err.message)
     }
}


const getDisplay = (items) =>{
    // console.log(items.length)
    const newsInfo = document.getElementById('newsInfo');
    console.log(items.length)
    newsInfo.textContent = ''
    items.forEach(item => {
        const newsContainer = document.createElement('div');
        newsContainer.classList.add("col-lg-12");
        newsContainer.classList.add('newsContainer')
        newsContainer.innerHTML = `

        <div class="row gx-5">
        <div class="col-lg-4">
            <img src="${item.image_url}" class="img-fluid w-100" alt="">
        </div>
        <div class="col-lg-8">
            <h4>${item.title}</h4>
            <p>${item.details.slice(0,200) + "......."}</p>
            <!-- news autor details -->
            <div class="newsInfo">
                <div class="newsAuthot d-flex gap-4">
                        <div>
                            <img src="${item.author.img}" class="authorImg">
                     
                        </div>
                        <div>
                             <h5>${item.author.name}</h5>
                            <p class="text-muted">${item.author.published_date}</p>
                        </div>
                </div>

               <div>
                    <i class="fa-solid fa-eye text-muted"> ${item.total_view}</i>
               </div>

                <div>
                    <button class="btn btn-primary">Show Detail</button>
                </div>

            <div>
        </div>
    </div>
        `
        newsInfo.appendChild(newsContainer)
       
        
    });
}



getNews('08')

// Category dispaly 


// catagory is start

const getCatagories = async () =>{
    try{
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        getCatagoryDisplay(data.data.news_category)
     }
     catch(err){
        console.log(err)
        console.log(err.message)
     }
}


const  getCatagoryDisplay = items =>{

    const catagoryContainer = document.getElementById('navbar_nav');
   
    items.forEach(item=>{
       const catagoryName = document.createElement('li');
       catagoryName.classList.add('nav-item');

      
       catagoryName.classList.add('px-2')
       catagoryName.innerHTML = `

       <a class="nav-link " onClick="getCatagoryId('${item.category_id}')" href="#">${item.category_name}</a>
       `
       catagoryContainer.appendChild(catagoryName)
      
      
    })
}


const getCatagoryId = (id)=>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;


 
  getNews(id)
}
getCatagories()






