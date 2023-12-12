const chart3 = document.getElementById('chart-3');

d3.csv('./data/top_100_youtubers.csv').then(data => {
    var svgwidth = 450;
    var svgheight = 400;
    var padding = 100;

    var inner_width = svgwidth - padding;
    var inner_height = svgheight - padding;

    const updateData = data.map((row) => ({
        category: row['Category']
    }))
    const uniqueCategories = [... new Set(updateData.map(obj => obj.category))]
    console.log(uniqueCategories)
    console.log(updateData)

    const categoryCounts = d3.rollup(
        updateData,
        (d) => d.length,
        (d) => d.category
    );

    console.log(categoryCounts);

    const categoryData = Array.from(categoryCounts, ([category, count]) => ({
        category,
        count
    }));
    console.log(categoryData)

    var svg = d3.select(chart3)
        .append('svg')
        .attr('width', svgwidth)
        .attr('height', svgheight);

    var g = svg
        .append("g")
        .attr("transform", `translate(50, 38)`)
        .attr("class", "chart3");


    var xscale = d3
        .scaleBand()
        .domain(uniqueCategories)
        .range([0, inner_width])
        .padding([0.5]);

    var xaxis = d3.axisBottom()
        .scale(xscale);

    var yscale = d3
        .scaleLinear()
        .domain([0, 39])
        .range([inner_height, 0])
    var yaxis = d3.axisLeft().scale(yscale);

    g.append("g").
        call(yaxis);

    g.append("g")
        .attr("transform", "translate(0, " + inner_height + ")")
        .call(xaxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "0px")
        .attr("dy", "10px")
        .attr("transform", "rotate(-45)");

    g.append('g')

        .selectAll('rect')
        .data(categoryData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xscale(d.category))
        .attr('y', d => yscale(d.count)) // Adjust property based on your data structure
        .attr('width', xscale.bandwidth())
        .attr('height', d => inner_height - yscale(d.count))
        .attr('fill', "#B21666")


}
)