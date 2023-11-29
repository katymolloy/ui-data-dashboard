const chart5 = document.getElementById('chart-5');

d3.select(chart5).append('h1').text('Top 5 Youtube Channels Quarterly Income')

d3.csv('./data/top_100_youtubers.csv').then(data => {
    var svgwidth = 600;
    var svgheight = 600;
    var padding = 100;

    var inner_width = svgwidth - padding;
    var inner_height = svgheight - padding;

    const income = []
    const parsedData = [];
    data.forEach(row => {
        const channelName = row['ChannelName'];
        const followerCount = +row['followers'];
        const q1income = +row['Income q1'];
        const q2income = +row['Income q2'];
        const q3income = +row['Income q3'];
        const q4income = +row['Income q4'];
        parsedData.push({ channelName, followerCount, q1income, q2income, q3income, q4income })
        income.push(q1income, q2income, q3income, q4income)
    })

    income.sort(d3.descending)
    console.log(income)
    parsedData.sort(d3.descending);


    const top5youtubers = parsedData.splice(0, 5)

    // getting all channel names for x axis
    var channels = top5youtubers.map((d) => d.channelName)

    // abbreviating ABCkidTV - Nursery Rhymes to better fit
    var abbr1 = channels[1].split(' - ')
    var abbr2 = abbr1[0]
    channels.splice(1, 1, abbr2)



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
        .domain(channels)
        .range([0, inner_width])
        .padding([0.7]);
    var xaxis = d3.axisBottom().scale(xscale);

    var yscale = d3
        .scaleLinear()
        .domain([0, 1000000])
        .range([inner_height, 0])


    var yaxis = d3.axisLeft().scale(yscale);

    g.append("g").
    call(yaxis);

    g.append("g")
        .attr("transform", "translate(0, " + inner_height + ")")
        .call(xaxis);


        var color = d3
          .scaleOrdinal()
          .domain()
          .range(["#B21666", "#c95c94", "#7d0f47", "#35021c"]);

})
