(function () {

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
section.style.gridGap = "1px";

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
	div.style.backgroundColor = "palegreen";
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
	div.style.backgroundColor = "palegreen";
	div.textContent = "Total";

	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = "1/" + (IO[0].length + IO[1].length + 4) + "/2/" + (IO[0].length + IO[1].length + 5);
	div.style.display = "flex";
	div.style.textAlign = "center";
	div.style.alignItems = "center";
	div.style.justifyContent = "center";
	
		var button = document.createElement("button"); div.appendChild(button);
		button.textContent = "+ Add";
		button.onpointerdown = function () {
			alert(1);
		};
	
	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = "2/" + (IO[0].length + IO[1].length + 4) + "/3/" + (IO[0].length + IO[1].length + 5);
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

function createCell ($rc, $id) {
	$id = "|" + $id.join("|").replace(/ /g, "") + "|";
	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = [$rc[0], $rc[1], $rc[0]+1, $rc[1]+1].join("/");
	div.style.border = "1px solid #CCCCCC";
	if ($id.indexOf("|Total|") > -1) div.style.backgroundColor = "palegreen";
	if ($id.indexOf("|Balance|") > -1) div.style.backgroundColor = "lightblue";
	if ($id.indexOf("|AM|") > -1 || $id.indexOf("|PM|") > -1) div.style.backgroundColor = "yellow";
};
	
ROWS.forEach(function ($r, $ri) {
	var $ci = 0;
	Object.keys(COLS).forEach(function ($io) {
		COLS[$io].forEach(function ($v) {
			createCell( [$ri + 3, $ci++ + 2], [$io, $v, $r] );
		});
		createCell( [$ri + 3, $ci++ + 2], [$io, "Total", $r] );
	});
	createCell( [$ri + 3, $ci++ + 2], ["Balance", $r] );
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
