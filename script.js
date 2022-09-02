const getNews = async() =>{
      const url = `https://openapi.programming-hero.com/api/news/category/08`;
      const res = await fetch(url);
      const data = await res.json();
      getDisplay(data.data)
}


const getDisplay = (items) =>{
    console.log(items.length)
    const newsInfo = document.getElementById('newsInfo');
    items.forEach(item => {
        const newsContainer = document.createElement('div');
        newsContainer.classList.add("col-lg-12");
        newsContainer.classList.add('newsContainer')
        newsContainer.innerHTML = `

        <div class="row">
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
                       <p>${item.author.published_date}</p>
                   </div>
               <div>
            <div>
        </div>
    </div>
        `
        newsInfo.appendChild(newsContainer)
        console.log(item)
        
    });
}



getNews()