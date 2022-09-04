const getNews = async (id) => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    getDisplay(data.data);
  } catch (err) {
    console.log(err);
    
  }
};

const getDisplay = (items) => {
  const newsInfo = document.getElementById("newsInfo");
  const newsLength = document.getElementById("newsLength");

  newsLength.innerText = `This Catagory has ${items.length} news`;
  newsInfo.textContent = "";
  items.sort(function( a, b ){
     return b.total_view - a.total_view;
     
    
  })
  items.forEach((item) => {
   
    const newsContainer = document.createElement("div");
    newsContainer.classList.add("col-lg-12");
    newsContainer.classList.add("newsContainer");
    newsContainer.innerHTML = `

 <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-12 text-center" id="img_right">
            <img src="${item.thumbnail_url}" class="w-75 " alt="">
        </div>
    <div class="col-lg-8 col-md-8 col-sm-12 mt-5 p-2">
         <div>
          <div> 
          <h4>${item.title}</h4>
          <p>${item.details.slice(0, 100) + "......."}</p>
          
          </div>
            <!-- news autor details -->
            <div class="newsInfo">
                <div class="newsAuthot d-flex gap-4">
                        <div>
                            <img src="${item.author.img}" class="authorImg">
                     
                        </div>
                        <div>
                             <h5>${
                               item.author.name
                                 ? item.author.name
                                 : "Author Name is not found"
                             }</h5>
                            <p class="text-muted">${
                              item.author.published_date ? item.author.published_date : "No Date Found"
                            }</p>
                        </div>
                </div>

               <div>
                    <i class="fa-solid fa-eye text-muted"> ${
                      item.total_view ? item.total_view : "View not found"
                    }</i>
               </div>

                <div>
                    <button class="btn btn-primary" onClick="getDetails('${
                      item._id
                    }')" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Detail</button>
                </div>

            </div>
            <!-- author -->
           
        </div>
    </div>
</div>
        `;
   
    newsInfo.appendChild(newsContainer);
  });
  loadingData(false)
};

getNews("08");

// Category dispaly
const getDetails = async (id) => {
 try{
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
 const res = await fetch(url);
 const data = await res.json();

 getDetaildataDisplay(data.data);
 }
 catch(err){
  console.log(err)
 }
};

const getDetaildataDisplay = (data) => {
  const newsAuthorName = document.getElementById("modalTitle");
  newsAuthorName.innerText = `Author Name : ${
    data[0].author.name ? data[0].author.name : "Name is not found"
  }`;
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `

           <div class="newsAuthot d-flex gap-4">
                <div>
                    <img src="${data[0].author.img ? data[0].author.img : "Author Image is not found"}" class="authorImg">
       
                </div>
                <div>
                    <h5> ${
                        data[0].author.name ? data[0].author.name : "Name is not found"
                      }</h5>
                      <p class="text-muted">${
                        data[0].author.published_date ? data[0].author.published_date : "No data found"
                      }</p>
                </div>
         </div>
          <h6><span class="fw-bold" >News Titile:</span> ${
            data[0].title ? data[0].title : "Title is not found"
          } </h6>
          <h6><span class="fw-bold" >News Details:</span> ${
            data[0].details ? data[0].details.slice(0,100) + '....': "Details is not found"
          } </h6>
         <div class="d-flex justify-content-between">


             <div>  
                    <i class="fa-solid fa-eye text-muted">
                    ${
                        data[0].total_view ? data[0].total_view : "Total view is not found"
                    } </i>
              
              </div>

             <div> 
                        <p class="text-muted"><span class="fw-bold" >Rating:</span>  ${
                        data[0].rating.number ? data[0].rating.number : "Rating is not found"
                    } </p>
              </div>


         </div>

        
      `;
};
// catagory is start

const getCatagories = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    getCatagoryDisplay(data.data.news_category);
  } catch (err) {
    console.log(err);
    
  }
};

const getCatagoryDisplay = (items) => {

  const catagoryContainer = document.getElementById("navbar_nav");

  items.forEach((item) => {
   
    const catagoryName = document.createElement("li");
    catagoryName.classList.add("nav-item");

    // catagoryName.classList.add("px-1");
    catagoryName.innerHTML = `

       <a class="nav-link "  onClick="getCatagoryId('${item.category_id}') " href="#">${item.category_name}  </a>

       `;
      
    catagoryContainer.appendChild(catagoryName);
   
  });
  
};

const getCatagoryId = (id) => {

  loadingData(true)
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;

  getNews(id);
};
getCatagories();

//loading data

const loadingData = isLoading =>{
  const loadingSpiner = document.getElementById('loadingData') ;
  if(isLoading){
    loadingSpiner.classList.remove('d-none')
  }
  else{
    loadingSpiner.classList.add('d-none')
  }
}