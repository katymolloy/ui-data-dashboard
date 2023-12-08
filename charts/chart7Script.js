const chart7 = document.getElementById('chart-7')

// d3.select(chart5).append('h1').text('Top 5 Youtube Channels Quarterly Income')
d3.csv('./data/top_100_youtubers.csv').then(data => {   

    // GROUPED BAR CHART
    const parsedData = [];
    data.forEach(row => {
        const views = +row['Views'];
        const category = row['Category']
        parsedData.push({ views, category })

    })
    parsedData.sort(d3.descending);

    
    // creating an array of all categories, using the Set object to ensure values are unique
    const uniqueCategories = [... new Set(parsedData.map(obj => obj.category))]

    // a new array of objects is created by mapping over array of categories to track the category and its total views
    // views are intialized at 0
    const viewsByCategory = uniqueCategories.map(category => ({ Category: category, Views: 0 }));

    // iterating over viewsByCategory to add all views 
    viewsByCategory.forEach((obj) => {
        // iterates through all data
        for (let i = 0; i < parsedData.length; i++) {
            // if the data category is the same as the current category, the views are added to the total
            if (parsedData[i].category === obj.Category) {
                obj.Views += parsedData[i].views
            }
        }
    })

    // sorting into descending order
    viewsByCategory.sort((a, b) => b.Views - a.Views)

    // creating new array of objects for readability, commas are added
    const mostViews = viewsByCategory.map((obj) => ({
        Category: obj.Category,
        Views: obj.Views.toLocaleString()
    }))
    console.log(mostViews)

    // data is output in a readable way
    d3.select(chart7).append('h2').text('Highest Views per Category')
    d3.select(chart7).append('p').text(`${mostViews[0].Category} has the most views, with ${mostViews[0].Views} total views`)

})