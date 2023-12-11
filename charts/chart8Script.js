

d3.csv("data/top_100_youtubers.csv").then((data) => {

  var countryCounts = d3.rollup(
    data, // data being referenced
    (d) => d.length, // Count occurence of each country, or something else
    (d) => d.Country // Group data by country
  );

  var countryData = Array.from(countryCounts, ([country, count]) => ({
    country,
    count,
  }));

  var maxCount = 0;
  var maxCountCountry = "";

  for (var i = 0; i < countryData.length; i++) {
    if (countryData[i].count > maxCount) {
      maxCount = countryData[i].count;
      maxCountCountry = countryData[i].country;
    }
  }

  let h2 = document.createElement("h2");
  h2.textContent = 'Country With The Most Channels In Top 100';
  let p = document.createElement('p');
  p.textContent = `The ${maxCountCountry} with ${maxCount}%`;
  let chart8 = document.getElementById("chart-8");
  chart8.appendChild(h2);
  chart8.appendChild(p);
});