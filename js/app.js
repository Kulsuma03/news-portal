const allCategory = async () => {
    const url = ` https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}

const displayCategory = allCategory => {

    const categoryContainer = document.getElementById('category');

    allCategory.forEach(category => {

        const div = document.createElement('div')
        div.classList.add('list-group', 'd-flex')
        const { category_id, category_name } = category;
        div.innerHTML = `
        <p onclick="loadData('${category_id}')">${category_name}</p>
        `
        categoryContainer.appendChild(div);
    });


}

const loadData = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data);
}

const displayData = allData => {
    console.log(allData)
    const dataContainer = document.getElementById('data-container');
    dataContainer.textContent = '';
    allData.forEach(data => {
        const {id, others_info, thumbnail_url, author,title, _id, total_view, details} = data
        const dataDiv = document.createElement('div');
        dataDiv.classList.add('card', 'mb-3');
        dataDiv.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
          <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title text-info">${title}</h5>
            <p class="card-text">${details.length > 200 ? details.slice(0, 200)+'...' : details}</p>
             
          </div>
        </div>
      </div>
        `;
        dataContainer.appendChild(dataDiv);
    });
}

allCategory()