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


    var svg = d3.select(chart6)
        .append('svg')
        .attr('width', svgwidth)
        .attr('height', svgheight)

        const title = d3.select('.yearTitle');


    var g = svg
        .append("g")
        .attr("transform", `translate(60, 12)`)
        .attr("class", "graph6");


    var xscale = d3
        .scaleBand()
        .domain(uniqueCategories)
        .range([0, inner_width])
        .padding([0.5]);
    var xaxis = d3.axisBottom().scale(xscale);


    var yscale = d3
        .scaleLinear()
        .domain([0, 39])
        .range([inner_height, 0])
    var yaxis = d3.axisLeft().scale(yscale);


    g.append("g").
        call(yaxis);

    g.append("g")
        .attr("transform", "translate(0, " + inner_height + ")")
        .call(xaxis);


    const slider = d3.select('#year-slider')




    slider.on('input', function () {

        g.selectAll('.line').remove();

        const sliderVal = this.value;
        title.select('.yearTitle').remove(); // Remove existing title
        title.append('text')
            .attr('class', 'yearTitle')
            .style('font-size', '20px')
            .style('font-weight', 'bold')
            .text(sliderVal);



        const selectedData = result.find(d => d.year === sliderVal)
        const lineData = selectedData.categories

        var categoryLine = d3.line()
            .x(d => xscale(d.category) + xscale.bandwidth())
            .y(d => yscale(d.channelNum));

        g.append('path')
            .data([lineData])
            .attr('d', categoryLine)
            .attr('fill', 'none')
            .style('stroke-width', '2px')
            .attr('class', 'line')
            .attr('stroke', '#B21666');
    })

    d3.select("#year-slider").dispatch("input");
})
