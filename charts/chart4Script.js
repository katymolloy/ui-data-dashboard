const chart4 = document.getElementById('chart-4');

d3.csv("./data/avg_view_every_month.csv").then((data) => {

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

const months = data.map(row => row['Month'])
console.log(months)

    const dataSets = [tSeriesViews, abcKidViews, setIndiaViews, pewDiePieViews, mrBeastViews]


    const dropdownOptions = ['T-Series', 'ABCkidTV - Nursery Rhymes', 'SET India', 'PewDiePie', 'MrBeast'];
    // const monthNames = [
    //     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    //     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    // ];

    var svgWidth = 950;
    var svgHeight = 420;
    var padding = 50;


    var innerWidth = svgWidth - 2 * padding;
    var innerHeight = svgHeight - padding;

    var svg = d3.select(chart4)
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    var g = svg
        .append("g")
        .attr("transform", `translate(0, 10)`)  // Adjust the translation based on your layout
        .attr("class", "graph4");

    d3.select("#dataDropdown")
        .selectAll('myOptions')
        .data(dropdownOptions)
        .enter()
        .append('option')
        .text(function (d) { return d; })
        .attr("value", function (d, i) { return i; })


    // const months = data.map(row => {
    //     const dateDivided = row['Month'].split('/').shift()
    //     const monthName = monthNames[dateDivided - 1]
    //     return {
    //         month: monthName
    //     }
    // })



    // const axisMonth = months.map(monthObj => monthObj.month);
    // Chart 4's data logic

    console.log('all data', dataSets)



    // defining x scale
    var xscale = d3
        .scaleBand()
        .domain(months)
        .range([0, innerWidth])
        .padding(0.2);
    var xaxis = d3.axisBottom().scale(xscale);


    // defining y scale, appending it to g element
    var yscale = d3
        .scaleLinear()
        .domain([0, 30923440])
        .range([innerHeight, 0])
    var yaxis = d3.axisLeft().scale(yscale);

    g.append("g")
        .attr("transform", `translate(90, 0)`)
        .call(yaxis);

    g.append("g")
        .attr("transform", "translate(90, " + innerHeight + ")")
        .call(xaxis);


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
        .text('Avg. Views');


    d3.select("#dataDropdown").on("change", function (d) {

        var selectedIndex = this.value;
        var selectedDataset = dataSets[selectedIndex];

        // console.log('Selected Dataset:', selectedDataset);
        update(selectedDataset)
    })


    function update(data) {
        // removing bars before appending new ones
        g.selectAll('.bar').remove();

        console.log(data)
        // Bar
        g.append('g')
        .attr("transform", "translate(90, 1)")
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xscale(d.month))
            .attr('y', d => yscale(d.views)) // Adjust property based on your data structure
            .attr('width', xscale.bandwidth())
            .attr('height', d => innerHeight - yscale(d.views))
            .attr('fill', "#B21666")
    }



})