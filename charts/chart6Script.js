const chart6 = document.getElementById('chart-6');

d3.csv('./data/top_100_youtubers.csv').then(data => {

    var svgwidth = 930;
    var svgheight = 450;
    var padding = 100;

    var inner_width = svgwidth - padding;
    var inner_height = svgheight - padding;

    const updateData = data.map((row) => ({
        category: row['Category'],
        channels: row['ChannelName'],
        est: row['started']
    }))

    // creating an array of all categories, using the Set object to ensure values are unique
    const uniqueCategories = [... new Set(updateData.map(obj => obj.category))]

    const uniqueYears = [...new Set(updateData.map(obj => obj.est))]


    uniqueYears.sort((a, b) => a - b)

    const result = uniqueYears.map(obj => ({
        year: obj,
        categories: uniqueCategories.map(category => ({
            category: category,
            channelNum: 0
        }))
    }))

    let count = 0
    for (let i = 0; i < updateData.length; i++) {
        let currChannel = updateData[i];
    
        for (let j = 0; j < result.length; j++) {
            let resYear = result[j].year;
            let resCategory = result[j].categories;
    
            if (currChannel.est <= resYear) {
                for (let k = 0; k < resCategory.length; k++) {
                    if (currChannel.category === resCategory[k].category) {
                       
                       ++result[j].categories[k].channelNum;
                    }
                }
            }
        }
    }
    console.log(result)






    var svg = d3.select(chart6)
        .append('svg')
        .attr('width', svgwidth)
        .attr('height', svgheight)

    var g = svg
        .append("g")
        .attr("transform", `translate(50, 50)`)
        .attr("class", "graph6");


    var xscale = d3
        .scaleBand()
        .domain(uniqueCategories)
        .range([0, inner_width])
        .padding([0.5]);
    var xaxis = d3.axisBottom().scale(xscale);


    g.append("g")
        .attr("transform", "translate(0, " + inner_height + ")")
        .call(xaxis);
})
