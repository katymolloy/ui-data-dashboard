const chart2 = document.getElementById('chart-2');

d3.csv('./data/top_100_youtubers.csv').then(data => {

    // Width, height and padding
    svgWidth = 900;
    svgHeight = 400;
    padding = 100;

    // The SVG
    var svg = d3.select(chart2)
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    var innerWidth = svgWidth - padding;
    var innerHeight = svgHeight - padding;


    // Chart 2's data
    const chart2Data = data.map(row => ({
        subscribers: +row['followers'],
        comments: +row['CommentsAvg']
    }))
    console.log(chart2Data)
    
    var numberOfSubscribers = chart2Data.map((d) => d.subscribers)

    var g = svg.append('g')
        .attr('transform', 'translate(50, 50)')
        .attr('class', 'graph');

    var tooltip = d3.select(chart2)
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)


    // The X-scale and X-axis
    var xScale = d3.scaleLinear()
        .domain(numberOfSubscribers)
        .range([0, innerWidth]);

    var xAxis = d3.axisBottom()
        .scale(xScale);

    g.append('g')
        .attr('transform', 'translate(0, ' + innerWidth + ')')
        .call(xAxis);

    // The Y-scale and Y-axis
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(chart2Data, d => d.comments)])
        .range([innerHeight, 0]);

    var yAxis = d3.axisLeft()
        .scale(yScale);

    g.append('g')
        .call(yAxis);


    // Crafting the circles
    g.apppend('g')
        .selectAll('circle')
        .data(chart2Data)
        .join('circle')
        .attr('r', 3)
        .attr('cx', d => xScale(d.data.numberOfSubscribers))
        .attr('cy', d => yScale(d.data.comments))
        .style('fill', 'purple')
        .on('mouseover', function(d) {
            tooltip
                .transition()
                .duration(300)
                .style("opacity", .9)
            tooltip.html(`
                Subscribers: ${d.followers} <br> Average Comments: ${d.CommentsAvg}
            `)  
            .style("left", d3.select(this).attr("cx") + "px")
            .style("top", d3.select(this).attr("cy") + "px")
        })
        .on('mouseout', function(d) {
            tooltip.transition()
                .duration(300)
                .style('opacity', 0)
        })


    // Titles

    // X-axis Title
    svg.append("text")
       .attr("x", svgWidth / 2)
       .attr("y", svgHeight - 5)
       .style("text-anchor", "middle")
       .text("Subscribers");

    // Y-axis Title
    svg.append("text")
       .attr("transform", "rotate(-90)")
       .attr("x", -svgHeight / 2)
       .attr("y", 15)
       .style("text-anchor", "middle")
       .text("Avg. Comments");

    
    // Brush functionality

    // Creating the brush itself
    const brush = d3.brush()
        .extent([[0,0], [svgWidth, svgHeight]])
        .on('end', brushEnd);

    // Setting the area of the brush
    const brushArea = svg.append('g')
        .attr('class', 'brush')
        .call(brush);

    // The brush's ending functionality
    const brushEnd = (event) => {

        if (!event.selection) return;

        const [[x0, y0], [x1, y1]] = event.selection;
        const selectedPoints = data.filter(d => {
            xScale(d.x) >= x0 && xScale(d.x) <= x1 && 
            yScale(d.y) >= y0 && yScale(d.y) <= y1 
        });

    }


})