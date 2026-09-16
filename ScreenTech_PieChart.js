const data = [
  { Technology: "LCD", Units: 484 },
  { Technology: "LCD (LED)", Units: 3794 },
  { Technology: "OLED", Units: 292 }
];

const width = 400, height = 400;
const radius = Math.min(width, height) / 2 - 40;

const color = d3.scaleOrdinal()
  .domain(data.map(d => d.Technology))
  .range(["#0070C0", "#FFA500", "#ff0000"]);

const svg = d3.select("#ScreenTech_PieChart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${width/2},${height/2})`);

const pie = d3.pie().value(d => d.Units);
const arc = d3.arc().outerRadius(radius).innerRadius(0);
const arcOver = d3.arc().outerRadius(radius + 20).innerRadius(0);

// Tooltip div
const tooltip = d3.select("body").append("div")
  .style("position", "absolute")
  .style("background", "#fff")
  .style("border", "1px solid #ccc")
  .style("padding", "5px")
  .style("border-radius", "4px")
  .style("pointer-events", "none")
  .style("opacity", 0);

const g = svg.selectAll("arc")
  .data(pie(data))
  .enter().append("g")
  .attr("class", "slice");

g.append("path")
  .attr("d", arc)
  .attr("fill", d => color(d.data.Technology));

g.append("text")
  .attr("transform", d => `translate(${arc.centroid(d)})`)
  .attr("dy", ".35em")
  .attr("text-anchor", "middle")
  .text(d => d.data.Technology);

// Hover events on the whole group (slice + text)
g.on("mouseenter", function(event, d) {
    d3.select(this).select("path")
      .transition().duration(200)
      .attr("d", arcOver);

    tooltip.transition().duration(200).style("opacity", 1);
    tooltip.html(`${d.data.Technology}: ${d.data.Units} units`)
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY - 20) + "px");
  })
  .on("mousemove", function(event) {
    tooltip.style("left", (event.pageX + 10) + "px")
           .style("top", (event.pageY - 20) + "px");
  })
  .on("mouseleave", function(event, d) {
    d3.select(this).select("path")
      .transition().duration(200)
      .attr("d", arc);

    tooltip.transition().duration(200).style("opacity", 0);
  });
