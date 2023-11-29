// Load CSV data asynchronously
d3.csv("top_100_youtubers.csv").then(function (data) {
  // Set up the dimensions of the SVG container
  const width = 500;
  const height = 500;
  const radius = Math.min(width, height) / 2;

  // Create a color scale
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // Create a pie chart layout
  const pie = d3.pie().value((d) => d.followers);

  // Append an SVG element to the container
  const svg = d3
    .select("#chart-1")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  // Generate the pie chart
  const arcs = svg.selectAll("arc").data(pie(data)).enter().append("g");

  arcs
    .append("path")
    .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
    .attr("fill", (d, i) => color(i));

  // Add labels
  // arcs.append("text")
  //   .attr("transform", d => `translate(${d3.arc().centroid(d)})`)
  //   .attr("dy", "0.35em")
  //   .text(d => d.data.country);
});
