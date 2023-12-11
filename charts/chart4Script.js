/*const chart4 = document.getElementById('chart-4');


d3.csv("./data/avg_view_every_month.csv").then((data) => {

    var svgWidth = 950;
    var svgHeight = 450;
    var padding = 40;

    var svg = d3.select(chart4)
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight);
                
    var innerWidth = svgWidth - padding * 2;
    var innerHeight = svgHeight - padding * 2;


    const top5Channels = data.splice(0, 5);
    const chart4Data = top5Channels.map(row => ({
        month: row['Month'],
        tSeriesViews: +row['T-Series'],
        abcKidViews: +row['ABCkidTV - Nursery Rhymes'],
        setIndiaViews: +row['SET India'],
        pewdiepieViews: +row['PewDiePie'],
        mrbeastViews: +row['MrBeast']
    }))
    
    console.log(top5Channels)


    // Setting the month format as well as the month names for the x-axis
    var month = d3.timeFormat('%B');
    var months = chart4Data.map((d) => month(d.month));


    // Tooltip
    var tooltip = d3.select(chart4)
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


    // The X-scale
    var xScale = d3.scaleBand()
        .domain(months)
        .range([padding, innerWidth + padding])
        .padding(0.1);

    svg.append('g')
        .attr('transform', 'translate(0,' + (innerHeight + padding) + ')')
        .call(d3.axisBottom(xScale));


    // The Y-scale
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(chart4Data, (d) => Math.max(d.tSeriesViews, d.abcKidViews, d.setIndiaViews, d.pewdiepieViews, d.mrbeastViews) / 1000000)])
        .range([innerHeight + padding, padding]);

    svg.append('g')
        .attr('transform', 'translate(' + padding + ', 0)')
        .call(d3.axisLeft(yScale));

    
    // Line Functions
    var tSeriesLine = d3.line()
    .x(d => xScale(month(d.month)) + xScale.bandwidth() / 2)
    .y(d => yScale(d.tSeriesViews));

    var abcKidTVLine = d3.line()
        .x(d => xScale(month(d.month)) + xScale.bandwidth() / 2)
        .y(d => yScale(d.abcKidViews));

    var setIndiaLine = d3.line()
        .x(d => xScale(month(d.month)) + xScale.bandwidth() / 2)
        .y(d => yScale(d.setIndiaViews));

    var pewdiepieLine = d3.line()
        .x(d => xScale(month(d.month)) + xScale.bandwidth() / 2)
        .y(d => yScale(d.pewdiepieViews));

    var mrBeastLine = d3.line()
        .x(d => xScale(month(d.month)) + xScale.bandwidth() / 2)
        .y(d => yScale(d.mrbeastViews));

    // Original    
    var tSeriesLine = d3.line()
        .x(chart4Data, d => xScale(month(d.month)) + xScale.bandwidth() / 2)
        .y(chart4Data, d => yScale(d.tSeriesViews));

    var abcKidTVLine = d3.line()
        .x(chart4Data, d => xScale(month(d.month)) + xScale.bandwidth() / 2)
        .y(chart4Data, d => yScale(d.abcKidViews));

    var setIndiaLine = d3.line()
        .x(chart4Data, d => xScale(month(d.month)) + xScale.bandwidth() / 2)
        .y(chart4Data, d => yScale(d.setIndiaViews));

    var pewdiepieLine = d3.line()
        .x(chart4Data, d => xScale(month(d.month)) + xScale.bandwidth() / 2)
        .y(chart4Data, d => yScale(d.pewdiepieViews));

    var mrBeastLine = d3.line()
        .x(chart4Data, d => xScale(month(d.month)) + xScale.bandwidth() / 2)
        .y(chart4Data, d => yScale(d.pewdiepieViews));


    // Drawing the lines

    // T-Series
    svg.append('path')
        .data([chart4Data])
        .attr('d', tSeriesLine)
        .attr('fill', 'none')
        .attr('stroke', 'red');

    // ABCkidTV - Nursery Rhymes
    svg.append('path')
        .data([chart4Data])
        .attr('d', abcKidTVLine)
        .attr('fill', 'none')
        .attr('stroke', 'purple');

    // SET India
    svg.append('path')
        .data([chart4Data])
        .attr('d', setIndiaLine)
        .attr('fill', 'none')
        .attr('stroke', 'pink');

    // PewDiePie
    svg.append('path')
        .data([chart4Data])
        .attr('d', pewdiepieLine)
        .attr('fill', 'none')
        .attr('stroke', 'blue');

    // MrBeast
    svg.append('path')
        .data([chart4Data])
        .attr('d', mrBeastLine)
        .attr('fill', 'none')
        .attr('stroke', 'dark blue');


    // Title on the X-axis
    svg.append('text')
        .attr('x', svgWidth / 2)
        .attr('y', svgHeight - 5)
        .style('text-anchor', 'middle')
        .text('Month - 2020');

    // Title on the Y-axis
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -svgHeight / 2)
        .attr('y', 15)
        .style('text-anchor', 'middle')
        .text('Avg. Views (In Milions)');

})
*/


const chart4 = document.getElementById('chart-4');


d3.csv("./data/avg_view_every_month.csv").then((data) => {

    var svgWidth = 950;
    var svgHeight = 450;
    var padding = 40;

    var svg = d3.select(chart4)
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight);
                
    var innerWidth = svgWidth - padding;
    var innerHeight = svgHeight - padding;


    // Chart 4's data logic
    const top5Channels = data.splice(0, 5);
    const chart4Data = top5Channels.map(row => ({
        month: row['Month'],
        tSeriesViews: +row['T-Series'],
        abcKidViews: +row['ABCkidTV - Nursery Rhymes'],
        setIndiaViews: +row['SET India'],
        pewdiepieViews: +row['PewDiePie'],
        mrbeastViews: +row['MrBeast']
    }))
    
    console.log(top5Channels)


    var g = svg
        .append("g")
        .attr("transform", `translate(65, 50)`)
        .attr("class", "graph5");


    // Setting the month format as well as the month names for the x-axis
    var month = d3.timeFormat('%B');
    var months = chart4Data.map((d) => month(d.month));


    // The X-scale and X-axis
    var xScale = d3.scaleBand()
        .domain(months)
        .range([0, innerWidth])
        .padding(0.2);

    var xAxis = d3.axisBottom()
        .scale(xScale);

    g.append('g')
        .attr('transform', 'translate(0,' + innerHeight + ')')
        .call(d3.axisBottom(xScale));


    // The Y-scale and Y-axis
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(chart4Data, (d) => Math.max(d.tSeriesViews, d.abcKidViews, d.setIndiaViews, d.pewdiepieViews, d.mrbeastViews) / 1000000)])
        .range([innerHeight + 0]);

    g.append('g')
        .call(d3.axisLeft(yScale));


    // Bar
    g.append('g')
        .selectAll('g')
        .data(chart4Data)
        .enter()
        .append('g')
        .attr('class', 'bar')
        .attr('transform', d => )


    // Title on the X-axis
    svg.append('text')
        .attr('x', svgWidth / 2)
        .attr('y', svgHeight - 5)
        .style('text-anchor', 'middle')
        .text('Month - 2020');

    // Title on the Y-axis
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -svgHeight / 2)
        .attr('y', 15)
        .style('text-anchor', 'middle')
        .text('Avg. Views (In Milions)');

})