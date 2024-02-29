const loadData = async () => {
  const response = await fetch(` https://openapi.programming-hero.com/api/news/categories`);
  const data = await response.json();
  const allData = data.data;
  // console.log(allData.news_category
  // );
  const headerContainer = document.getElementById("header-container");
  allData.news_category.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick="loadNewsByCategory('${item.category_id}')" class="bg-white text-black p-3 rounded-md border border-black">${item.category_name}</button>
        `;
    headerContainer.appendChild(div);
    // console.log(item);
  
  });
}


const loadNewsByCategory = async (category) => {
  loadingSpinner(true)
  const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${category}`);
  const data = await response.json();
  const allNewsCategoryData = data.data;
  displayNewsContainer(allNewsCategoryData)

  // console.log(allNewsCategoryData);

};

const displayNewsContainer = (allNewsCategoryData) => {
  loadingSpinner(false)
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerText = " ";

  allNewsCategoryData.forEach((singleNews) => {
    console.log(singleNews);
    const div = document.createElement("div");
    div.classList.add("singleNews");
    div.innerHTML = `
        
                <div class="news-photo">
                  <img
                    src=${singleNews.image_url}
                    alt=""
                  />
                </div>
                <div class="news-info">
                  <div class="news-header">
                    <h4>${singleNews.title.slice(0, 20)}</h4>
                    <p class="news-badge">
                    ${singleNews.rating.badge} <sup> <h6 class="news-rating"> ${singleNews.rating.number
      }</h6></sup>
                    </p>
                  </div>
                  <p>
                  ${singleNews.details.slice(0, 200)}
                  </p>
        
                  <div class="news-footer">
                    <div class="author">
                      <div class="">
                        <img
                          class="author-img"
                          src=${singleNews.author.img}
                          alt=""
                        />
                      </div>
                      <div class="author-info">
                        <h6> ${singleNews.author.name}</h6>
                        <p>Date: ${singleNews.author.published_date}</p>
                      </div>
                    </div>
                    <div class="Views author">
                      <img
                        class="view-img"
                        src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/view-icon.png"
                        alt=""
                      />
                      <p>${singleNews.total_view}</p>
                    </div>
                    <div class="details-btn-container">
                      <button  class="details-btn">Details</button>
                    </div>
                </div>
              </div>
              `;
    cardContainer.appendChild(div);
    
  });

}

// get input value
const handleSearch = () => {
  const value = document.getElementById("input-value").value;
  if (value) {
    loadNewsByCategory(value);
  } else {
    alert("please provide correct value")
  }
}

const loadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loadingSpinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
}


loadNewsByCategory("01")

loadData()