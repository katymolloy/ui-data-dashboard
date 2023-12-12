const chart4 = document.getElementById('chart-4');

var line = true; // For switching on and off between the lines and bars

d3.csv("./data/avg_view_every_month.csv").then((data) => {

    // parsing all data for the bar charts
    const tSeriesViews = data.map(row => ({
        month: row['Month'],
        views: +row['T-Series'],
    }))

    const abcKidViews = data.map(row => ({
        month: row['Month'],
        views: +row['ABCkidTV - Nursery Rhymes']
    }))

    const setIndiaViews = data.map(row => ({
        month: row['Month'],
        views: +row['SET India']
    }))

    const pewDiePieViews = data.map(row => ({
        month: row['Month'],
        views: +row['PewDiePie'],
    }))

    const mrBeastViews = data.map(row => ({
        month: row['Month'],
        views: +row['MrBeast']
    }))

    // Creating an array of months to use for the xscale
    const months = data.map(row => row['Month'])

    // The dataset for each channel's views
    const dataSets = [tSeriesViews, abcKidViews, setIndiaViews, pewDiePieViews, mrBeastViews]

    // The dropdown list
    const dropdownOptions = ['T-Series', 'ABCkidTV - Nursery Rhymes', 'SET India', 'PewDiePie', 'MrBeast'];


    // The sizes
    var svgWidth = 850;
    var svgHeight = 390;
    var padding = 50;

    // The inner widths
    var innerWidth = svgWidth - 2 * padding;
    var innerHeight = svgHeight - padding;


    // The SVG and Group defining
    var svg = d3.select(chart4)
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    var g = svg
        .append("g")
        .attr("transform", `translate(0, 10)`)
        .attr("class", "graph4");


    d3.select("#dataDropdown")
        .selectAll('myOptions')
        .data(dropdownOptions)
        .enter()
        .append('option')
        .text(function (d) { return d; })
        .attr("value", function (d, i) { return i; })


    console.log('all data', dataSets)


    // Creating the x-scale and x-axis
    var xScale = d3
        .scaleBand()
        .domain(months)
        .range([0, innerWidth])
        .padding(0.2);

    var xAxis = d3.axisBottom().scale(xScale);

    g.append("g")
        .attr("transform", "translate(90, " + innerHeight + ")")
        .call(xAxis);


    // Creating the y-scale and y-axis
    var yScale = d3
        .scaleLinear()
        .domain([0, 53434733])
        .range([innerHeight, 0])
    var yAxis = d3.axisLeft().scale(yScale);

    g.append("g")
        .attr("transform", `translate(90, 0)`)
        .call(yAxis);


    // Title on the X-axis
    svg.append('text')
        .attr('x', svgWidth / 2)
        .attr('y', svgHeight - 5)
        .style('text-anchor', 'middle')
        .text('Month');

    // Title on the Y-axis
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -svgHeight / 2)
        .attr('y', 15)
        .style('text-anchor', 'middle')
        .text('Avg. Views');


    // On dropdown change, the data set is passed to the update function
    d3.select("#dataDropdown").on("change", function () {

        var selectedIndex = this.value;
        var selectedDataset = dataSets[selectedIndex];

        // console.log('Selected Dataset:', selectedDataset);
        update(selectedDataset)
    })

    // Triggering the event on load so there will always be a chart displayed
    d3.select("#dataDropdown").dispatch("change");


    function update(data) {

        // Removing the line before appending new ones
        g.selectAll('.line').remove();


        // Switching between lines and bars
        if (line === true) {

            // Line function
            var channelLine = d3.line()
                .x(d => xScale(d.month) + xScale.bandwidth() / 2)
                .y(d => yScale(d.views));

            console.log(data)

            // Line drawing
            g.append('path')
                .data([data])
                .attr('d', channelLine)
                .attr("transform", "translate(90, 1)")
                .attr('fill', 'none')
                .style('stroke-width', '2px')
                .attr('class', 'line')
                .attr('stroke', '#B21666');

        } else {

            // Removing the bar before appending new ones
            g.selectAll('.bar').remove();

            console.log(data)

            // The bar
            g.append('g')
                .attr("transform", "translate(90, 1)")
                .selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', d => xScale(d.month))
                .attr('y', d => yScale(d.views))
                .attr('width', xScale.bandwidth())
                .attr('height', d => innerHeight - yScale(d.views))
                .attr('fill', "#B21666")

        }

    }

})