import {loadAndProcessData} from "../loadAndProcessData.js"

var svg = d3.select("#WorldMap").append("svg")
		        .attr("width", 1000)
            .attr("height", 600)
    
svg.append("text")
            .attr("class", "title")
            .attr("y", 25)
            .attr("x", innerWidth/4)
            .text("Total Number of Import&Export Volume of Turkey Between 2004-2019")
            .style("font-size", "20px")


const projection = d3.geoNaturalEarth1() ;
const pathGenerator = d3.geoPath().projection(projection);


const g = svg.append("g")
.attr(`transform`, `translate(0, 50)`)


g.append("path")
    .attr("class", "sphere")
    .attr("d", pathGenerator({type:"Sphere"}))

g.call(d3.zoom().on("zoom", zoomed))

  function zoomed({transform}) {
    g.attr("transform", transform);
  }

 const colorValue = d => d.properties.Total;

loadAndProcessData().then(countries => {


    g.selectAll("path")
    .data(countries.features)  
    .enter().append("path")
    .attr("class", "country")
    .attr("d", pathGenerator)
    .attr("fill", d => colorValue(d) ? d3.interpolateOrRd((colorValue(d)/585017876)) : d3.interpolateOrRd(0))
    .append("title")
      .text(d => d.properties.name + ` : ` + colorValue(d) + `Ton`);

  

var LegendScale = d3.scaleLinear()
.domain([0,1000,1000000,10000000,100000000,200000000,300000000,500000000]) 
.range([d3.interpolateOrRd(0),d3.interpolateOrRd(1000/300000000),
      d3.interpolateOrRd(1000000/300000000),d3.interpolateOrRd(10000000/300000000),d3.interpolateOrRd(100000000/300000000),
      d3.interpolateOrRd(200000000/300000000),d3.interpolateOrRd(300000000/500000000),d3.interpolateOrRd(1)])

 svg.append("g")
    .attr("class", "legendLog")
    .attr("transform", "translate(100,300)");
  

    var MyLegend = d3.legendColor()
      .cells([0,1000000,10000000,100000000,200000000,300000000,500000000])
      .scale(LegendScale)
      .title("Total Import&Export Volume")
      .labels(["0","1 MTon","10 MTon","100 MTon","200 MTon","300 MTon","500 MTon"])

  svg.select(".legendLog")
    .call(MyLegend)
 

    });






