// Load CSV data asynchronously
d3.csv("data/top_100_youtubers.csv").then(function (data) {
  // d3.rollup(data, reducer, key) performs data aggregation
  // returns a JS Map object
  var countryCounts = d3.rollup(
    data, // data being referenced
    (d) => d.length, // Count occurence of each country, or something else
    (d) => d.Country // Group data by country
  );

  // get() method retrieves the count of selected country code
  // console.log("United States: ", countryCounts.get("US"));

  d3.select("#chart-1")
    .append("h2")
    .text("Distribution of Top 100 YouTubers by Country");

  d3.select("#chart-1")
    .append("p")
    .text(
      `The United States has the largest portion of the top 100 youtubers with ${countryCounts.get(
        "US"
      )}%`
    );

  // Create an array by passing countryCounts as the array-like
  // mapFn uses the destructuring assignment to extract the country, and count properties from countryCounts object
  // uses object literal shorthand to create an object with using the countryCounts object properties: Country, and Count
  var countryData = Array.from(countryCounts, ([country, count]) => ({
    country,
    count,
  }));

  countryData;
  var width = 600;
  var height = 600;
  var radius = Math.min(width, height) / 2;

  var colorScale = d3
    .scaleOrdinal()
    .domain(countryData.map((d) => d.country))
    .range([
      "Red", // IN
      "Blue", // US
      "Green", // KR
      "Yellow", // CA
      "Purple", // BR
      "Orange", // MX
      "Turquoise", // SV
      "Pink", // CL
      "Brown", // NO
      "Cyan", // PR
      "Magenta", // BY
      "Lime", // RU
      "Teal", // PH
      "Black", // TH
    ]);

  var arc = d3
    .arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var svg = d3
    .select("#chart-1")
    .append("svg")
    .attr("width", width * 2)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

  // Creates pie chart configuration to be used for var arc;
  var pie = d3.pie().value((d) => d.count);

  var arcs = svg
    .selectAll("arc")
    .data(pie(countryData)) // This line is what allows var pie to refer to the data in countryData
    .enter()
    .append("g")
    .attr("class", "arc");

  arcs
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => colorScale(d.data.country));

  arcs
    .append("text")
    .filter((d) => d.endAngle - d.startAngle > 0.1) // Display Country code depending on slice size 0.1 = 1%
    .attr("transform", (d) => "translate(" + arc.centroid(d) + ")")
    .attr("y", ".4em")
    .style("text-anchor", "middle")
    .text((d) => d.data.country);

  arcs
    .append("text")
    .filter((d) => d.endAngle - d.startAngle > 0.2) // Display portion percentage
    .attr("transform", (d) => "translate(" + arc.centroid(d) + ")")
    .attr("y", "1.4em")
    .attr("x", "0.3em")
    .style("text-anchor", "middle")
    .text((d) => d.data.count + "%");


  d3.select('#chart-1')
    .append("h2")
    .text("DISCLAIMER");
  d3.select("#chart-1")
    .append("p")
    .text(
      "**Countries not labelled on the chart contributed 1%, or less, and were excluded from being displayed"
    );
  d3.select("#chart-1")
    .append("p")
    .text(
      "**Countries that contributed 2%, or less, of the overall proportion had their percentages excluded from being displayed"
    );




    var legendContainer = svg
    .append("g")
    .attr("transform", function (d, i) {
      return "translate(" + 50 + "," + i * -20 + ")";
    });

    legendContainer
    .append("text")
    .attr("x", 300)
    .attr("y", -280)
    .style("text-anchor", "middle")
    .style("font-weight", "bold")
    .style("font-size", 20)
    .text("Legend:");

  var legend = legendContainer
    .selectAll(".legend")
    .data(countryData)
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) {
      return "translate(" + 50 + "," + i * -20 + ")";
    });

  legend
    .append("rect")
    .attr("x", (width / 2) - 25)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function (d) {
      return colorScale(d.country);
    });

  legend
    .append("text")
    .attr("x", (width / 2) + 10)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function (d) {
      return d.country;
    });
});
