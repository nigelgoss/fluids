(function () {

var style = document.createElement("style"); document.head.appendChild(style);
style.textContent = "section > div { border:0 solid blue; border-width:0 1px 1px 0; }";	

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

var $data = [];
var el = {};
var elements = {};

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

const IO = [	
	["Oral", "IV Fluids", "NG Feed", "Other"],
	["Urine Continent", "Urine Incontinent", "Urine Catheterised", "Gastric", "Drain", "Stoma", "Other"]
];

const HOURS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, "AM", 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, "PM"]
	
var grid = [];

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

var section = document.createElement("section"); $.summary = section;
section.style.flex = "1 1 auto";
section.style.display = "grid";
section.style.gridTemplateColumns = "repeat(15, 1fr)";

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
	div.style.gridArea = "1/2/2/" + (IO[0].length + 3);
	div.style.display = "flex";
	div.style.textAlign = "center";
	div.style.alignItems = "center";
	div.style.justifyContent = "center";
	div.textContent = "Input";

	IO[0].forEach(function ($v, $i) {
		var div = document.createElement("div"); section.appendChild(div);
		div.style.gridArea = "2/" + ($i + 2) +"/3/" + ($i + 3);
		div.style.display = "flex";
		div.style.textAlign = "center";
		div.style.alignItems = "center";
		div.style.justifyContent = "center";
		div.textContent = $v;
	});
	
	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = "2/6/3/6";
	div.style.display = "flex";
	div.style.textAlign = "center";
	div.style.alignItems = "center";
	div.style.justifyContent = "center";
	div.style.backgroundColor = "lightgreen";
	div.textContent = "Total";
	
	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = "1/" + (IO[0].length + 3) + "/2/" + (IO[0].length + IO[1].length + 4);
	div.style.display = "flex";
	div.style.textAlign = "center";
	div.style.alignItems = "center";
	div.style.justifyContent = "center";
	div.textContent = "Output";

	IO[1].forEach(function ($v, $i) {
		var div = document.createElement("div"); section.appendChild(div);
		div.style.gridArea = "2/" + (IO[0].length + 3 + $i) +"/3/" + (IO[0].length + 4 + $i);
		div.style.display = "flex";
		div.style.textAlign = "center";
		div.style.alignItems = "center";
		div.style.justifyContent = "center";
		div.textContent = $v;
	});
	
	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = "2/" + (IO[0].length + IO[1].length + 3) + "/3/" + (IO[0].length + IO[1].length + 4);
	div.style.display = "flex";
	div.style.textAlign = "center";
	div.style.alignItems = "center";
	div.style.justifyContent = "center";
	div.style.backgroundColor = "green";
	div.textContent = "Total";

	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = "1/" + (IO[0].length + IO[1].length + 4) + "/3/" + (IO[0].length + IO[1].length + 5);
	div.style.display = "flex";
	div.style.textAlign = "center";
	div.style.alignItems = "center";
	div.style.justifyContent = "center";
	div.style.backgroundColor = "lightblue";
	div.textContent = "Balance";

	// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
	
	HOURS.forEach(function ($v, $i) {
		var div = document.createElement("div"); section.appendChild(div);
		div.style.gridArea = ($i+3) + "/1/" + ($i+4) +"/2";
		div.style.display = "flex";
		div.style.textAlign = "center";
		div.style.alignItems = "center";
		div.style.justifyContent = "center";
		if (["AM", "PM"].indexOf($v) > -1) div.style.backgroundColor = "yellow";
		div.textContent = $v;
	});
	
	
	
	
var COLS = {
	"Input": ["Oral", "IV Fluids", "NG Feed", "Other"],
	"Output": ["Urine Continent", "Urine Incontinent", "Urine Catheterised", "Gastric", "Drain", "Stoma", "Other"]
};

var ROWS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, "AM", 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, "PM"];

function createCell ($rc, $r, $c) {
	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = [$rc[0], $rc[1], $rc[0]+1, $rc[1]+1].join("/");
	div.classList.add("r-"+$r, "c-"+$c);
}
	
ROWS.forEach(function ($r, $ri) {
	var $ci = 0;
	Object.keys(COLS).forEach(function ($io) {
		COLS[$io].forEach(function ($v) {
			createCell( [$ri + 3, $ci++ + 2], $r, $io+"-"+$v );
		});
		createCell( [$ri + 3, $ci++ + 2], $r, $io+"-"+Total" );
	});
	createCell( [$ri + 3, $ci++ + 2], $r, "Balance" );
});
	
	
	
	
	
/*
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

*/
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
