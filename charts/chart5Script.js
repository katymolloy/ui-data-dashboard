const chart5 = document.getElementById('chart-5');

// d3.select(chart5).append('h1').text('Top 5 Youtube Channels Quarterly Income')
d3.csv('./data/top_100_youtubers.csv').then(data => {
    var svgwidth = 930;
    var svgheight = 450;
    var padding = 100;

    var inner_width = svgwidth - padding;
    var inner_height = svgheight - padding;

    // GROUPED BAR CHART
    const top5 = data.splice(0, 5);
    const top5data = top5.map(row => ({
        channel: row['ChannelName'],
        q1: +row['Income q1'],
        q2: +row['Income q2'],
        q3: +row['Income q3'],
        q4: +row['Income q4']
    }))
    console.log(top5data)
    // getting all channel names for x axis
    var channels = top5data.map((d) => d.channel)



    var svg = d3.select(chart5)
        .append('svg')
        .attr('width', svgwidth)
        .attr('height', svgheight)

    var g = svg
        .append("g")
        .attr("transform", `translate(80, 50)`)
        .attr("class", "graph5");


    var xscale = d3
        .scaleBand()
        .domain(channels)
        .range([0, inner_width])
        .padding([0.5]);
    var xaxis = d3.axisBottom().scale(xscale);

    var yscale = d3
        .scaleLinear()
        .domain([0, d3.max(top5data, d => d.q1 + d.q2 + d.q3 + d.q4)])
        .range([inner_height, 0])
    var yaxis = d3.axisLeft().scale(yscale);

    g.append("g").
        call(yaxis);

    g.append("g")
        .attr("transform", "translate(0, " + inner_height + ")")
        .call(xaxis);

    var stackedData = d3.stack()
        .keys(['q1', 'q2', 'q3', 'q4'])
        (top5data);

    var color = d3
        .scaleOrdinal()
        .domain(['q1', 'q2', 'q3', 'q4'])
        .range(["#B21666", "#c95c94", "#7d0f47", "#35021c"]);

    g.append('g')
        .selectAll('g')
        .data(stackedData)
        .join('g')
        .attr('fill', function (d) { return color(d.key); })
        .selectAll('rect')
        .data(d => d)
        .join('rect')
        .attr('x', d => xscale(d.data.channel))
        .attr('y', d => yscale(d[1]))
        .attr('width', xscale.bandwidth())
        .attr('height', d => yscale(d[0]) - yscale(d[1]));

    let zoom = d3.zoom()
        .scaleExtent([1, 5])
        .on("zoom", function (e) {
            d3.select('g.graph5')
                .attr('transform', e.transform)
        })

    d3.select('.graph5').call(zoom)

    
    // Title on the X-axis
    svg.append('text')
        .attr('x', svgwidth / 2)
        .attr('y', svgheight - 5)
        .style('text-anchor', 'middle')
        .text('YouTube Channel');

    // Title on the Y-axis
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -svgheight / 2)
        .attr('y', 15)
        .style('text-anchor', 'middle')
        .text('Quarterly Income');


})