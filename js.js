
// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

var $data = [];

var $date = new Date(); $date.setHours(0,0,0,0);

var sections = {};

var elements = {};

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

var $saveVars = {};

function record ($d) {
	label.textContent = JSON.stringify($d);
	comment.value = "";
	$saveVars =  $d;
	main.textContent = "";
	main.appendChild(sections["Record"]);
};

var section = document.createElement("section"); sections["Record"] = section;
section.style.flex = "1 1 auto";
section.style.display = "flex";
section.style.flexDirection = "column";

var select = document.createElement("select"); section.appendChild(select);
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";
var option = document.createElement("option"); select.appendChild(option); option.textContent = "Now";

var label = document.createElement("div"); section.appendChild(label);

var comment = document.createElement("textarea"); section.appendChild(comment); 

var button = document.createElement("button"); section.appendChild(button);
button.textContent = "Save";
button.onpointerdown = function () {

	var $dt = new Date(); $dt.setMinutes(0, 0, 0);

	$data.push({
		"Created": new Date(),
		"DateTime": $dt,
		"Direction": $saveVars["Direction"],
		"Type": $saveVars["Type"],
		"Volume": 1,
		"Comment": comment.value,
		"Username": "gosn1fm"
	});
	
	build();

	main.textContent = "";
	main.appendChild(sections["Grid"]);
	
};

var button = document.createElement("button"); section.appendChild(button);
button.textContent = "Cancel";
button.onpointerdown = function () {
	main.textContent = "";
	main.appendChild(sections["Grid"]);
};

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

var section = document.createElement("section"); sections["List"] = section;
section.style.flex = "1 1 auto";
section.style.display = "flex";
section.style.flexDirection = "column";
section.style.overflow = "auto";

var button = document.createElement("button"); section.appendChild(button);
button.textContent = "Cancel";
button.onpointerdown = function () {
	main.textContent = "";
	main.appendChild(sections["Grid"]);
};

var table2 = document.createElement("table"); section.appendChild(table2);
table2.style.width = "100%";
table2.style.borderCollapse = "collapse";

var thead = document.createElement("thead"); table2.appendChild(thead);
var tr = document.createElement("tr"); thead.appendChild(tr);
var td = document.createElement("td"); tr.appendChild(td); td.textContent = "DateTime";
var td = document.createElement("td"); tr.appendChild(td); td.textContent = "Direction";
var td = document.createElement("td"); tr.appendChild(td); td.textContent = "Type";
var td = document.createElement("td"); tr.appendChild(td); td.textContent = "Volume";
var td = document.createElement("td"); tr.appendChild(td); td.textContent = "Recorded";
var td = document.createElement("td"); tr.appendChild(td); td.textContent = "Username";
var td = document.createElement("td"); tr.appendChild(td);

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

var section = document.createElement("section"); sections["Grid"] = section;
section.style.flex = "1 1 auto";
section.style.display = "grid"; /* IE11 */ section.style.display = "-ms-Grid";
section.style.gridTemplateRows = "min-content min-content min-content"; /* IE11 */ section.style.msGridRows = "min-content min-content min-content 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"; /* IE11 */ section.style.msGridColumns = "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr";

var $grid = [

	[1, 1, 3, 1, function () {
	var div = document.createElement("div");
	
	var button = document.createElement("button"); div.appendChild(button);
	button.textContent = "<";
	button.onpointerdown = function () {
		$date.setDate($date.getDate() - 1);
		build();
	};
	
	var buttonToday = document.createElement("button"); div.appendChild(buttonToday);
	buttonToday.textContent = "X";
	buttonToday.onpointerdown = function () {
		$date = new Date(); $date.setHours(0,0,0,0);
		build();
	};
	
	var button = document.createElement("button"); div.appendChild(button);
	button.textContent = ">";
	button.onpointerdown = function () {
		$date.setDate($date.getDate() + 1);
		build();
	};
	
	return div;
	}],

	[3, 1, 4, 1, function () {
	var div = document.createElement("div");
	var select = document.createElement("select"); div.appendChild(select);
	var option = document.createElement("option"); select.appendChild(option); option.textContent = new Date().toDateString();
	return div;
	}],
	
	[1, 2, 2, 7, function () {
	var div = document.createElement("div");
	div.textContent = "Input";
	return div;
	}],
	
	[2, 2, 4, 3, function () {
	var div = document.createElement("div");
	var button = document.createElement("button"); div.appendChild(button);
	button.textContent = "Oral";
	button.onpointerdown = function () { record({"Direction":"Input", "Type":"Oral"}); };
	return div;
	}],
	
	[2, 3, 4, 4, function () {
	var div = document.createElement("div");
	var button = document.createElement("button"); div.appendChild(button);
	button.textContent = "IV Fluids";
	button.onpointerdown = function () { record({"Direction":"Input", "Type":"IV Fluids"}); };
	return div;
	}],
	
	[2, 4, 4, 5, function () {
	var div = document.createElement("div");
	var button = document.createElement("button"); div.appendChild(button);
	button.textContent = "NG Feed";
	button.onpointerdown = function () { record({"Direction":"Input", "Type":"NG Feed"}); };
	return div;
	}],
	
	[2, 5, 4, 6, function () {
	var div = document.createElement("div");
	var button = document.createElement("button"); div.appendChild(button);
	button.textContent = "Other";
	button.onpointerdown = function () { record({"Direction":"Input", "Type":"Other"}); };
	return div;
	}],
	
	[2, 6, 4, 6, function () {
	var div = document.createElement("div");
	div.textContent = "Total";
	return div;
	}],
	
	[1, 7, 2, 15, function () {
	var div = document.createElement("div");
	div.textContent = "Output";
	return div;
	}],
	
	[2, 7, 3, 10, function () {
	var div = document.createElement("div");
	div.textContent = "Urine";
	return div;
	}],
	
	[3, 7, 4, 8, function () {
	var div = document.createElement("div");
	var button = document.createElement("button"); div.appendChild(button);
	button.textContent = "Continent";
	button.onpointerdown = function () { record({"Direction":"Output", "Type":"Urine - Continent"}); };
	return div;
	}],
	
	[3, 8, 4, 9, function () {
	var div = document.createElement("div");
	var button = document.createElement("button"); div.appendChild(button);
	button.textContent = "Incontinent";
	button.onpointerdown = function () { record({"Direction":"Output", "Type":"Urine - Incontinent"}); };
	return div;
	}],
	
	[3, 9, 4, 10, function () {
	var div = document.createElement("div");
	var button = document.createElement("button"); div.appendChild(button);
	button.textContent = "Catheterised";
	button.onpointerdown = function () { record({"Direction":"Output", "Type":"Urine - Catheterised"}); };
	return div;
	}],
	
	[2, 10, 4, 11, function () {
	var div = document.createElement("div");
	var button = document.createElement("button"); div.appendChild(button);
	button.textContent = "Gastric";
	button.onpointerdown = function () { record({"Direction":"Output", "Type":"Gastric"}); };
	return div;
	}],
	
	[2, 11, 4, 12, function () {
	var div = document.createElement("div");
	var button = document.createElement("button"); div.appendChild(button);
	button.textContent = "Drain";
	button.onpointerdown = function () { record({"Direction":"Output", "Type":"Drain"}); };
	return div;
	}],
	
	[2, 12, 4, 13, function () {
	var div = document.createElement("div");
	var button = document.createElement("button"); div.appendChild(button);
	button.textContent = "Stoma";
	button.onpointerdown = function () { record({"Direction":"Output", "Type":"Stoma"}); };
	return div;
	}],
	
	[2, 13, 4, 14, function () {
	var div = document.createElement("div");
	var button = document.createElement("button"); div.appendChild(button);
	button.textContent = "Other";
	button.onpointerdown = function () { record({"Direction":"Output", "Type":"Other"}); };
	return div;
	}],
	
	[2, 14, 4, 15, function () {
	var div = document.createElement("div");
	div.textContent = "Total";
	return div;
	}],
	
	[1, 15, 4, 16, function () {
	var div = document.createElement("div");
	div.textContent = "Balance";
	return div;
	}],
	
	// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
	
];

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
	
	div.style.gridRowStart = $x[0]; /* IE11 */ div.style.msGridRow = $x[0];
    div.style.gridColumnStart = $x[1]; /* IE11 */ div.style.msGridColumn = $x[1];
    div.style.gridRowEnd = $x[2]; /* IE11 */ div.style.msGridRowSpan = $x[2] - $x[0];
    div.style.gridColumnEnd = $x[3]; /* IE11 */ div.style.msGridColumnSpan = $x[3] -$x[1];
		
	div.style.display = "flex";
	div.style.alignItems = "center";
	div.style.justifyContent = "center";
	
	section.appendChild(div);
		
});

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

function build () {
	
	//table2.querySelectorAll("tbody").forEach(function ($v) { $v.parentElement.removeChild($v); });
	
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
	
}; build();

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

var main = document.querySelector("main");
main.textContent = "";
main.appendChild(sections["Grid"]);

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
