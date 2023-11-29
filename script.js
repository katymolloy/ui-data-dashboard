const chart5 = document.getElementById('chart-5');


d3.csv('./data/top_100_youtubers.csv').then(data => {

    const parsedData = [];
    data.forEach(row => {
        const channelName = row['ChannelName'];
        const followerCount = +row['followers'];
        const q1income = +row['Income q1'];
        const q2income = +row['Income q2'];
        const q3income = +row['Income q3'];
        const q4income = +row['Income q4'];
        parsedData.push({ channelName, followerCount, q1income, q2income, q3income, q4income })
    })


    parsedData.sort(d3.descending);

    const top5youtubers = parsedData.splice(0, 5)
    console.log(top5youtubers)


    var svg = d3.select(chart5)
        .append('svg')
        .attr('width', 400)
        .attr('height', 400)

    var g = svg
        .append("g")
        .attr("transform", "translate(50, 50)")
        .attr("class", "graph");

})
