
var svg = d3.select("#svgholder").append("svg")
	.attr("height",2000)
	.attr("width",2000);

svg.append("rect")
    .attr("x", 700)
    .attr("y", 343)
    .attr("height", 50)
    .attr("width", 50)
    .attr("fill", "blue")
    .attr("class", "but_rect")


my_scale = d3.scale.linear()
                    .domain([0,1])
                    .range(["#2750d7", "#000000"]);

var my_data = []

function set_data() {
  
  my_data=[]
  
  var num_elements = Math.random()*5000 
  num_col = Math.floor(Math.sqrt(num_elements))
  num_row = num_col
  element_size = Math.ceil(Math.random()*10)  
  for (var i = 0; i < num_elements; i++) {           
      var newNumber = Math.random() 
      my_data.push(newNumber)
     
      }
}



set_data()

var heat_rect = svg.selectAll("heat_rect")
    .data(my_data);

heat_rect.enter().append("rect")
	.attr("x", function(d, i) { return element_size*((i+1)%num_col); })
    .attr("y", function(d, i) { return element_size*(Math.ceil((i+1)/num_row)); })
    .attr("height", element_size)
	.attr("width", element_size)
	.attr("fill", function(d, i) { return my_scale(d); })
    .attr("class", "heat_rect");


d3.select(".but_rect").on("click", function() {
  
  set_data()
   
  // At this point D3 compared the new data with the current heatmap data and decides
  // variables require entering & exiting
  
  var heat_rect = svg.selectAll(".heat_rect").data(my_data);
  
  //alert(num_col + " " + num_row)
  
  heat_rect
  	.enter()
    .append("rect")
    .attr("x", function(d, i) { return element_size*((i+1)%num_col); })
    .attr("y", function(d, i) { return element_size*(Math.ceil((i+1)/num_row)); })
    .attr("height", 0)
	.attr("width", 0)
	.attr("fill", function(d, i) { return my_scale(d); })
    .attr("class", "heat_rect")
          
          
  
  heat_rect
    .transition()
    .duration(1000)
    .delay(function(d,i) {return i*0})
  	.attr("x", function(d, i) { return element_size*((i+1)%num_col); })
    .attr("y", function(d, i) { return element_size*(Math.ceil((i+1)/num_row)); })
    .attr("height", element_size)
	.attr("width", element_size)
	.attr("fill", function(d, i) { return my_scale(d); })

   heat_rect
    .exit()
    .transition()
    .duration(1000)
    .delay(function(d,i) {return i*0})
    .attr("height", 0)
	.attr("width", 0)
	.attr("fill", function(d, i) { return my_scale(d); })
   	.remove()
  
  

})
