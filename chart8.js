// Load CSV data asynchronously
d3.csv("top_100_youtubers.csv").then(function (data) {
  // d3.rollup(data, reducer, key) performs data aggregation
  // returns a JS Map object
  var countryCounts = d3.rollup(
    data, // data being referenced
    (d) => d.length, // Count occurence of each country, or something else
    (d) => d.Country // Group data by country
  );

  // Create an array by passing countryCounts as the array-like
  // mapFn uses the destructuring assignment to extract the country, and count properties from countryCounts object
  // uses object literal shorthand to create an object with using the countryCounts object properties: Country, and Count
  var countryData = Array.from(countryCounts, ([country, count]) => ({
    country,
    count,
  }));

  var margin = { top: 20, right: 20, bottom: 50, left: 50 };
  var width = 800 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  var xScale = d3
    .scaleBand()
    .domain(countryData.map((d) => d.country))
    .range([0, width])
    .padding(0.1);

  var yScale = d3
    .scaleLinear()
    .domain([0, d3.max(countryData, (d) => d.count)])
    .range([height, 0]);

  var colorScale = d3
    .scaleOrdinal()
    .domain(countryData.map((d) => d.country))
    .range([
      "Red",
      "Blue",
      "Green",
      "Yellow",
      "Purple",
      "Orange",
      "Turquoise",
      "Pink",
      "Brown",
      "Cyan",
      "Magenta",
      "Lime",
      "Teal",
      "Black",
    ]);

  var svg = d3
    .select("#chart-8")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Create bars
  svg
    .selectAll("rect")
    .data(countryData)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.country))
    .attr("y", (d) => yScale(d.count))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - yScale(d.count))
    .attr("fill", (d) => colorScale(d.country));

  // Add x-axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

  // Add y-axis
  svg.append("g").call(d3.axisLeft(yScale));

  svg
    .append("text")
    .attr("x", (width / 2))
    .attr("y", height + 40  )
    .style("text-anchor", "middle")
    .style("text-weight","bold")
    .text("Countries");

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -35)
    .style("text-anchor", "middle")
    .text("Number of YouTubers");
});
