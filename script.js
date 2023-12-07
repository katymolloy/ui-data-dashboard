const chart5 = document.getElementById('chart-5');
const chart7 = document.getElementById('chart-7')

// d3.select(chart5).append('h1').text('Top 5 Youtube Channels Quarterly Income')

d3.csv('./data/top_100_youtubers.csv').then(data => {
    var svgwidth = 600;
    var svgheight = 600;
    var padding = 100;

    var inner_width = svgwidth - padding;
    var inner_height = svgheight - padding;

    // GROUPED BAR CHART
    const parsedData = [];
    data.forEach(row => {
        const channelName = row['ChannelName'];
        const followerCount = +row['followers'];
        const views = +row['Views'];
        const category = row['Category']
        const quarters = [{ quarter: 'q1', value: +row['Income q1'] }, { quarter: 'q2', value: +row['Income q2'] },
        { quarter: 'q3', value: +row['Income q3'] }, { quarter: 'q4', value: +row['Income q4'] }];
        parsedData.push({ channelName, followerCount, views, category, quarters })

    })
    parsedData.sort(d3.descending);

    const top5youtubers = parsedData.splice(0, 5)

    // getting all channel names for x axis
    var channels = top5youtubers.map((d) => d.channelName)
    // abbreviating ABCkidTV - Nursery Rhymes to better fit
    var abbr1 = channels[1].split(' - ')
    var abbr2 = abbr1[0]
    channels.splice(1, 1, abbr2)

    console.log(top5youtubers)


    var svg = d3.select(chart5)
        .append('svg')
        .attr('width', svgheight)
        .attr('height', svgwidth)

    var g = svg
        .append("g")
        .attr("transform", "translate(60, 50)")
        .attr("class", "graph");


    var xscale = d3
        .scaleBand()
        .domain(top5youtubers.map(d=> d.channelName))
        .range([0, inner_width])
        .padding([0.7]);
    var xaxis = d3.axisBottom().scale(xscale);

    var yscale = d3
        .scaleLinear()
        .domain([0, d3.max(top5youtubers, d => d3.max(d.quarters, q => q.value))])
        .range([inner_height, 0])
    var yaxis = d3.axisLeft().scale(yscale);

    g.append("g").
        call(yaxis);

    g.append("g")
        .attr("transform", "translate(0, " + inner_height + ")")
        .call(xaxis);


    var color = d3
        .scaleOrdinal()
        .domain(top5youtubers.map(d => d.channelName))
        .range(["#B21666", "#c95c94", "#7d0f47", "#35021c"]);


    const channelGroup = g.selectAll('.graph')
        .data(top5youtubers)
        .enter().append('g')
        .attr('class', 'channelGroup')
        .attr('transform', (d) => `(${d.channelName}, 0)`)

    channelGroup.selectAll('rect')
        .data(d => d.quarters)
        .enter().append('rect')
        .attr('width', xscale.bandwidth())
        .attr('y', d => yscale(d.value))
        .attr('height', d => inner_height - yscale(d.value))
        .attr('fill', (d) => color(d.quarter));



    /////////////////////////////////////////////////////////////////////////////////////////// SV CHART SEVEN 


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
