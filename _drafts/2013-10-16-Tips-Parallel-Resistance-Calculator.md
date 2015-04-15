---
layout: post
title: Parallel Resistance Calculator
category : Embedded Design Tips
tagline: Embedded Design
tags : [embedded, calculator, circuit]
---
The equation to calculate the parallel resistance of n resistors is:

<img class="post_equation" src="{{ BASE_PATH }}/images/parallel-resistance.svg" />

To calculate series resistance is just simple addition. The above formula is also 
helpful in calculating combined inductance and capacitance. While 
inductance combines the same way resistance does, capacitance combines 
differently. Parallel capacitance uses simple addition while series 
capacitance is calculated using the above formula (just replace the 
R's with C's). To sum it up:

Series Resistance:
<img class="post_equation" src="{{ BASE_PATH }}/images/series-resistance.svg" />

Parallel Inductance:
<img class="post_equation" src="{{ BASE_PATH }}/images/parallel-inductance.svg" />

Series Inductance:
<img class="post_equation" src="{{ BASE_PATH }}/images/series-inductance.svg" />

Parallel Capacitance:
<img class="post_equation" src="{{ BASE_PATH }}/images/parallel-capacitance.svg" />

Series Capacitance:
<img class="post_equation" src="{{ BASE_PATH }}/images/series-capacitance.svg" />

<div class="alert alert-info"><span class="label label-danger">Remember</span> The 
equivalent, parallel resistance will always be less than the smallest 
resistor value.</div>

The following calculator gives the output of the parallel resistance formula.

<script\> 

function add_button(num){
	var string;
	
	string = '<p><div class="form-group">';
	string += '<label for="R' + num + '">R<sub>' + num + '</sub></label>';
	string += '<input class="form-control" name="R' + num + '" id="R' + num + '" style="width: 75%" />';
	string += '</div></p>';
	
	$("#inputs").append(string);
}

$(document).ready(function(){

	add_button(1);
	add_button(2);

	$("#add").click(function(){
	
	});
	
	$("#calc").click(function(){
	
	});


});

</script\>

<form id="calculator" class="form-inline" role="form">

<div id="#inputs"></div>


<p>
	<div class="form-group">
		<button type="button" id="calc" class="btn btn-default">Calc</button>
		<button type="button" id="add" class="btn btn-default"><i class="fa fa-plus"> </i></button>
	</div>
</p>
</form>


