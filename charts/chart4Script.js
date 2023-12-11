const chart4 = document.getElementById('chart-4');

d3.csv("./data/avg_view_every_month.csv").then((data) => {

    const tSeriesViews = data.map(row => ({
        month: row['Month'],
        tSeries: +row['T-Series'],
    }))

    const abcKidViews = data.map(row => ({
        month: row['Month'],
        abcKids: +row['ABCkidTV - Nursery Rhymes']
    }))

    const setIndiaViews = data.map(row => ({
        month: row['Month'],
        setIndia: +row['SET India']
    }))

    const pewDiePieViews = data.map(row => ({
        month: row['Month'],
        pewDiePie: +row['PewDiePie'],
    }))

    const mrBeastViews = data.map(row => ({
        month: row['Month'],
        mrBeast: +row['MrBeast']
    }))


    const dataSets = [tSeriesViews, abcKidViews, setIndiaViews, pewDiePieViews, mrBeastViews]


    const dropdownOptions = ['T-Series', 'ABCkidTV - Nursery Rhymes', 'SET India', 'PewDiePie', 'MrBeast'];
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

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
        // .attr("transform", `translate(${padding}, ${padding})`)  // Adjust the translation based on your layout
        .attr("class", "graph4");

    d3.select("#dataDropdown")
        .selectAll('myOptions')
        .data(dropdownOptions)
        .enter()
        .append('option')
        .text(function (d) { return d; })
        .attr("value", function (d, i) { return i; })





    const months = data.map(row => {
        const dateDivided = row['Month'].split('/').shift()
        const monthName = monthNames[dateDivided - 1]
        return {
            month: monthName
        }
    })

    console.log(months)


    const axisMonth = months.map(monthObj => monthObj.month);
    // Chart 4's data logic

    console.log('all data', dataSets)
    console.log('tseries', tSeriesViews)
    console.log('abckids', abcKidViews)
    console.log('setIndia', setIndiaViews)
    console.log('pewDiePie', pewDiePieViews)
    console.log('mrbeast', mrBeastViews)





    // defining x scale
    var xscale = d3
        .scaleBand()
        .domain(axisMonth)
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
        console.log(data)
        //  The Y-scale and Y-axis

        // // Bar
        // g.append('g')
        //     .selectAll('g')
        //     .data(data)
        //     .enter()
        //     .append('g')
        //     .attr('class', 'bar')
        // // .attr('transform', d => )
    }


    // let selectedValue = 'T-Series'

})