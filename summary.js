(function () {

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
	
var $data = [];
var el = {};
var elements = {};

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

const IO = [	
	["Oral", "IV Fluids", "NG Feed", "Other", "Total"],
	["Urine - Continent", "Urine - Incontinent", "Urine - Catheterised", "Gastric", "Drain", "Stoma", "Other", "Total"],
	["Balance"]
];
	
// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
	
var section = document.createElement("section"); $.summary = section;
section.style.flex = "1 1 auto";
section.style.display = "grid";
section.style.gridTemplateRows = "min-content min-content min-content";

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
	
	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = "1/1/2/1";
	
		var button = document.createElement("button"); div.appendChild(button);
		button.textContent = "<";
		button.onpointerdown = function () {
			el.inputDate.valueAsDate = new Date(el.inputDate.valueAsDate.setDate(el.inputDate.valueAsDate.getDate() - 1));
			build();
		};

		el.buttonToday = document.createElement("button"); div.appendChild(el.buttonToday);
		el.buttonToday.textContent = "Today";
		el.buttonToday.onpointerdown = function () {
			el.inputDate.valueAsDate = new Date();
			build();
		};

		var button = document.createElement("button"); div.appendChild(button);
		button.textContent = ">";
		button.onpointerdown = function () {
			el.inputDate.valueAsDate = new Date(el.inputDate.valueAsDate.setDate(el.inputDate.valueAsDate.getDate() + 1));
			build();
		};

	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = "2/1/3/1";

		el.inputDate = document.createElement("input"); div.appendChild(el.inputDate);
		el.inputDate.type = "date";
	
	// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = "1/2/2/" + (IO[0].length + 2);
	div.style.textAlign = "center";
	div.textContent = "Input";

	IO[0].forEach(function ($v, $i) {
		var div = document.createElement("div"); section.appendChild(div);
		div.style.gridArea = "2/" + ($i + 1) +"/4/" + ($i + 2);
		div.textContent = $v;
	});
	
	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = "2/6/4/6";
	div.textContent = "Total";
	
	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = "1/7/2/15";
	div.textContent = "Output";

	IO[1].forEach(function ($v, $i) {
		var div = document.createElement("div"); section.appendChild(div);
		div.style.gridArea = "2/" + IO[1].length+$i+1 +"/4/" + IO[1].length+$i+2;
		div.textContent = $v;
	});
	
	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = "2/14/4/15";
	div.textContent = "Total";

	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = "1/15/4/16";
	div.textContent = "Balance";

	// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

$grid = [];
	
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].forEach(function ($v) {

	$x = $v;
	if ($v > 11) $x += 1;

	$grid.push(
		[4+$x, 1, 5+$x, 2, function () {
		var div = document.createElement("div");
		div.textContent = $v;
		return div;
		}]
	);

});	

["AM", "PM"].forEach(function ($v, $i) {
	if ($i == 1) $i = 13;
	$grid.push(
		[16+$i, 1, 17+$i, 2, function () {
		var div = document.createElement("div");
		div.style.backgroundColor = "yellow";
		div.textContent = $v;
		return div;
		}]
	);
});

["Input|Oral", "Input|IV Fluids", "Input|NG Feed", "Input|Other", "Input|Total", "Output|Urine - Continent", "Output|Urine - Incontinent", "Output|Urine - Catheterised", "Output|Gastric", "Output|Drain", "Output|Stoma", "Output|Other", "Output|Total", "Balance"].forEach(function ($cv, $ci) {
	["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "AM", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "PM"].forEach(function ($rv, $ri) {
		
		$grid.push(
			[$ri+4, $ci+2, $ri+5, $ci+3, function () {
			var div = document.createElement("div"); elements[[$cv, $rv].join("|")] = div;
			if (["Input|Total", "Output|Total"].indexOf($cv) > -1) div.style.backgroundColor = "palegreen";
			if (["Balance"].indexOf($cv) > -1) div.style.backgroundColor = "palegreen";
			if (["AM", "PM"].indexOf($rv) > -1) div.style.backgroundColor = "yellow";
			div.onpointerdown = function () {
				main.textContent = "";
				main.appendChild(sections["List"]);
			};
			return div;
			}]
		);

	});
});

for (var r = 4; r <= 29; r++) {
	for (var c = 2; c <= 15; c++) {
		
	};
};

$grid.forEach(function ($x) {

	var div = $x[4]();
	
	div.style.gridArea = [$x[0], $x[1], $x[2], $x[3]].join("/");
	div.style.border = "1px solid red";
		
	div.style.display = "flex";
	div.style.alignItems = "center";
	div.style.justifyContent = "center";
	
	section.appendChild(div);
		
});

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

function build () {
	
	$calc = {};
	
	$data.forEach(function ($x, $i) {
	
		if (new Date().toDateString() !== $x.DateTime.toDateString()) return;
	
		[
			[$x.Direction, $x.Type, $x.DateTime.getHours()].join("|"),
			[$x.Direction, "Total", $x.DateTime.getHours()].join("|"),
			["Balance", $x.DateTime.getHours()].join("|"),
			[$x.Direction, $x.Type, (($x.DateTime.getHours() <= 11) ? "AM" : "PM")].join("|"),
			[$x.Direction, "Total", (($x.DateTime.getHours() <= 11) ? "AM" : "PM")].join("|"),
			["Balance", (($x.DateTime.getHours() <= 11) ? "AM" : "PM")].join("|"),
		].forEach(function ($v) {
			if ($calc[$v] === undefined) $calc[$v] = 0;
			$calc[$v] += $x.Volume * (($x.Direction == "Input") ? 1 : -1);
		});
		
		var tbody = document.createElement("tbody"); table2.appendChild(tbody);
		tbody.style.border = "3px solid grey";
		
		var tr = document.createElement("tr"); tbody.appendChild(tr);
		
		var td = document.createElement("td"); tr.appendChild(td);
		td.textContent = new Date($x.DateTime).toDateString() + " " + new Date($x.DateTime).toTimeString().substr(0, 8);
		
		var td = document.createElement("td"); tr.appendChild(td);
		td.textContent = $x.Direction;
		
		var td = document.createElement("td"); tr.appendChild(td);
		td.textContent = $x.Type;
		
		var td = document.createElement("td"); tr.appendChild(td);
		td.textContent = $x.Volume;
		
		var td = document.createElement("td"); tr.appendChild(td);
		td.textContent = new Date($x.Created).toDateString() + " " + new Date($x.Created).toTimeString().substr(0, 8);
		
		var td = document.createElement("td"); tr.appendChild(td);
		td.textContent = $x.Username;
		
		var td = document.createElement("td"); tr.appendChild(td);
		td.textContent = "X";
		td.onpointerdown = function () {
			if (confirm("Sure?") == false) return; 
			$data.splice($i, 1);
			build();
		};
		
		if ($x.Comment !== "") {
			var tr = document.createElement("tr"); tbody.appendChild(tr);
			var td = document.createElement("td"); tr.appendChild(td);
				td.colSpan = 7;
			td.textContent = "Comment: " + $x.Comment;
		};

	});
	
	Object.keys($calc).forEach(function ($v) {
		elements[$v].textContent = $calc[$v];
	});
	
};
	
el.buttonToday.onpointerdown();

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

}());
