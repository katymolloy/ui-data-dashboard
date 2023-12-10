const chart4 = document.getElementById('chart-4');

var svgWidth = 450;
var svgHeight = 450;
var padding = 40;

var svg = d3.select(chart4)
            .append('svg')
            .attr("viewBox", `0 0 450 450`)
            
var innerWidth = svgWidth - padding * 2;
var innerHeight = svgHeight - padding * 2;


d3.csv("./data/avg_view_every_month.csv").then((data) => {

    // Get the month name of the data
    var parseDate = d3.timeParse('%m/%d/%Y');
    var month = d3.timeFormat('%B');

    data.forEach((d) => {

        d.Month = parseDate(d.Month); // Parsing the date's data
        d.nameOfMonth = month(d.Month);

    })

    console.log('testing');

    // X-axis
    var xScale = d3.scaleTime()
        .domain(data.extent(data, (d) => d.Month))
        .range([padding, innerWidth + padding])
        .padding(0.1);

    svg.append('g')
        .attr('transform', 'translate(0,' + (innerHeight + padding) + ')')
        .call(d3.axisBottom(xScale));

    
    // Getting the column names into a variable, as some of them have spaces and dashes between them. It gets the first row
    var columnName = Object.keys(data[0]).slice(1); // Nothing the Month column    

    // The Y-axis
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => Math.max(d[columnName[0]], d[columnName[1]], d[columnName[2]], d[columnName[3]], d[columnName[4]]))])
        .range([innerHeight + padding, padding]);

    svg.append('g')
        .attr('transform', 'translate(' + padding + ', 0)')
        .call(d3.axisLeft(yScale));

    
    // Line Functions
    var tSeriesLine = d3.line()
        .x(d => xScale(d.Month) + xScale.bandwidth() / 2)
        .y(d => yScale(d[columnName[0]]));

    var abcKidTVLine = d3.line()
        .x(d => xScale(d.Month) + xScale.bandwidth() / 2)
        .y(d => yScale(d[columnName[1]]));

    var setIndiaLine = d3.line()
        .x(d => xScale(d.Month) + xScale.bandwidth() / 2)
        .y(d => yScale(d[columnName[2]]));

    var pewdiepieLine = d3.line()
        .x(d => xScale(d.Month) + xScale.bandwidth() / 2)
        .y(d => yScale(d[columnName[3]]));

    var mrBeastLine = d3.line()
        .x(d => xScale(d.Month) + xScale.bandwidth() / 2)
        .y(d => yScale(d[columnName[4]]));


    // Drawing the lines

    // T-Series
    svg.append('path')
        .data([data])
        .attr('d', tSeriesLine)
        .attr('fill', 'none')
        .attr('stroke', 'red');

    // ABCkidTV - Nursery Rhymes
    svg.append('path')
        .data([data])
        .attr('d', abcKidTVLine)
        .attr('fill', 'none')
        .attr('stroke', 'purple');

    // SET India
    svg.append('path')
        .data([data])
        .attr('d', setIndiaLine)
        .attr('fill', 'none')
        .attr('stroke', 'pink');

    // PewDiePie
    svg.append('path')
        .data([data])
        .attr('d', pewdiepieLine)
        .attr('fill', 'none')
        .attr('stroke', 'blue');

    // MrBeast
    svg.append('path')
        .data([data])
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