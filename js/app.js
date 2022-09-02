const allCategory = async () =>{
    const url = ` https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}

const displayCategory = allCategory =>{
    
    const categoryContainer = document.getElementById('category');
    
    allCategory.forEach(category => {
        
        const div = document.createElement('div')
        div.classList.add('list-group','d-flex')
        const {category_id, category_name} = category;
        div.innerHTML = `
        <p onclick="loadData('${category_id}')">${category_name}</p>
        ` 
        categoryContainer.appendChild(div); 
    });
    
    
}

const loadData = async (id) =>{
    const url =`https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayData(data);
}

const displayData = allData =>{
    const dataContainer = document.getElementById()
}

allCategory()