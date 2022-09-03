const allCategory = async () => {
    const url = ` https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}

const displayCategory = allCategory => {
  
    const categoryContainer = document.getElementById('category');

    allCategory.forEach(category => {
    
    //    console.log(category)
        const div = document.createElement('div')
        div.classList.add('list-group', 'd-flex')
        const { category_id, category_name } = category;
        div.innerHTML = `
        <p class="category" onclick="loadData('${category_id}')">${category_name}</p>
        `
        categoryContainer.appendChild(div);
        
    });
    
}

const loadData = async (id) => {
    spinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url);
    const data = await res.json();
    
    displayData(data.data);
     
}


const displayData = allData => {
  
   try {
    
    const dataContainer = document.getElementById('data-container');
    dataContainer.textContent = '';
  
    const itemCount = document.getElementById('item-count');
    const foundNon = document.getElementById('found-non');
    itemCount.innerText = allData.length;
    if(allData.length === 0){
        
        itemCount.classList.add('text-danger');
        itemCount.innerText = 'No Data Available';
        foundNon.innerText ='No Data Found';
        spinner(false);
        
    }else{
        itemCount.classList.remove('text-danger')
        itemCount.classList.add('text-primary')
        foundNon.innerText = '';
        spinner(true)
    }
    
    const sortData = allData.sort(function (a, b) { return b.total_view - a.total_view });
    allData.forEach(data => {
    
    
        const { id, others_info, thumbnail_url, author, title, _id, total_view, details } = data
        const { name, img, published_date } = author
        const dataDiv = document.createElement('div');
        dataDiv.classList.add('card', 'mb-3');
        
        dataDiv.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
          <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8 mt-5">
          <div class="card-body">
            <h5 class="card-title text-info">${title}</h5>
            <p class="card-text">${details.length > 200 ? details.slice(0, 200) + '...' : details}</p>
            <div>
              <div class="d-flex justify-content-between mt-5">
                <div class="d-flex">
                  <div class="author-img">
                    <img src="${img}" class="img-fluid wide" alt="...">
                  </div>
                  <div class="date-div">
                    <p class="fs-6 mb-1 text-primary">${name?.length === 0 || name === null? 'No Data Available' : name}</p>
                    <p class="date">${published_date === null ? 'No Data Available' : published_date}</p>
                  </div> 
                </div>
                <p><i class="fa-regular fa-eye"></i> ${total_view === null || total_view === 0? 'No Data Available' : total_view}</p>
                <button onclick="newsDetails('${_id}')" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Show Details</button>
            </div>
        
        </div>
          </div>
        </div>
      </div>
        `;
        
        dataContainer.appendChild(dataDiv);
       spinner(false)
        
    });
    
   } catch (error) {
     console.log(error)
   }
}
// spinner 

const spinner = isSpiner =>{
  const spiner = document.getElementById('spiner');
  if(isSpiner){
    spiner.classList.remove('d-none')  
}else{
    spiner.classList.add('d-none')
}
}

// details 

const newsDetails = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    openModal(data.data)
}

// modal 

const openModal = details =>{
    
   try {
    const modalBody = document.getElementById('modal');
    details.forEach(detail => {
        const { id, others_info, thumbnail_url, author, title, _id, total_view, details } = detail;
        const { name, img, published_date } = author;
        modalBody.innerHTML =`
        <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
        <h5 class="card-title text-info">${title}</h5>
        <p class="card-text">${details}</p>
        <div>
              <div class="d-flex justify-content-between mt-5">
                <div class="d-flex">
                  <div class="author-img">
                    <img src="${img}" class="img-fluid wide" alt="...">
                  </div>
                  <div class="date-div">
                    <p class="fs-6 mb-1 text-primary">${name?.length === 0 || name === null? 'No Data Available' : name}</p>
                    <p class="date">${published_date === null ? 'No Data Available' : published_date}</p>
                  </div> 
                </div>
                <p><i class="fa-regular fa-eye"></i> ${total_view === null || total_view === 0? 'No Data Available' : total_view}</p>
                <button onclick="newsDetails('${_id}')" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Show Details</button>
            </div>
        `
    })
   } catch (error) {
      console.log(error)
   }

}
 

allCategory()