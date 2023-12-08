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
    const top5data = [];
    top5.forEach(row => {
        const channel = row['ChannelName'];
        const quarters = [+row['Income q1'], +row['Income q2'], +row['Income q3'], +row['Income q4']];

        top5data.push({ channel, quarters })
    })
    console.log(top5data)
    // getting all channel names for x axis
    var channels = top5data.map((d) => d.channel)


    var svg = d3.select(chart5)
        .append('svg')
        // .attr('viewBox', '0 0 600 600')
        .attr('width', svgheight)
        .attr('height', svgwidth)

    var g = svg
        .append("g")
        .attr("transform", `translate(60, 50)`)
        .attr("class", "graph");


    var xscale = d3
        .scaleBand()
        .domain(channels)
        .range([0, inner_width])
        .padding([0.7]);
    var xaxis = d3.axisBottom().scale(xscale);

    var yscale = d3
        .scaleLinear()
        .domain([0, d3.max(top5data, d => d3.max(d.quarters))])
        .range([inner_height, 0])
    var yaxis = d3.axisLeft().scale(yscale);

    g.append("g").
        call(yaxis);

    g.append("g")
        .attr("transform", "translate(0, " + inner_height + ")")
        .call(xaxis);

    var subgroups = ['q1', 'q2', 'q3', 'q4'];

    var color = d3
        .scaleOrdinal()
        .domain(subgroups)
        .range(["#B21666", "#c95c94", "#7d0f47", "#35021c"]);

    g.append('g')
        .selectAll('g')
        .data(stackedData)
        .join('g')
        .attr('fill', function (d) { return color(d.key); })
        .selectAll('rect')
        .data(function (d) {
            return d;
        })
        .join('rect')
        .attr('x', function (d) {
            return xscale(d.channelName)
        })
        .attr('y', function (d) {
            return yscale(d[1]);
        })
        .attr('width', xscale.bandwidth())
        .attr('height', function (d) {
            return yscale(d[0]) - yscale(d[1])
        })

})