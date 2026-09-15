d3.csv("../Cleaned_CSV/Star_Size.csv").then(function(data) {
  data.forEach(d => {
    d.Screensize_inches = +d.Screensize_inches;
    d["Star Rating Index"] = +d["Star Rating Index"];
  });

  // Convert numeric fields from strings to numbers
  data.forEach(d => {
    d.Screensize_inches = +d.Screensize_inches;
    d["Star Rating Index"] = +d["Star Rating Index"];
  });

  // Add X axis (screensize)
  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Screensize_inches)) // auto-fit to your data
    .range([0, width]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis (star rating)
  const y = d3.scaleLinear()
    .domain(d3.extent(data, d => d["Star Rating Index"])) // auto-fit to your data
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("cx", d => x(d.Screensize_inches))
      .attr("cy", d => y(d["Star Rating Index"]))
      .attr("r", 3)
      .style("fill", "#69b3a2");
});
