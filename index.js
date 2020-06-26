(function () {
	
// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

var COLS = {
	"Input": ["Oral", "IV Fluids", "IV Drugs", "NG Feed", "Other"],
	"Output": ["Urine Continent", "Urine Incontinent", "Urine Catheterised", "Gastric", "Drain", "Stoma", "Other"]
};
	
const ROWS = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "AM", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "PM"];

const INDICATIONS = [
	"Scoring 3 or more for NEWS",
	"Patients who are nil by mouth or need assistance with drinking or eating",
	"Patients with diarrhoea and/or vomiting",
	"Patients experiencing any excessive fluid loss from surgical drains/cavity drains, wounds/stomas",
	"Patients discharged from ICU/HDU for a minimum of 48 hours post transfer",
	"Patients with a temperature greater than 38 degrees Centigrade",
	"Post-operative patients as part of routine post-operative patient managment",
	"Patients on Intravenous Fluids and/or parenteral nutrition",
	"Patients on a restricted fluid intake, with known or suspected renal impairment or cardiac conditions i.e electrolyte imbalance or upward trend in urea and creatinine etc",
	"Patients with urinary catheters, except for those with long term catheters who do not have an acute onset of illness",
	"Patients receiving a blood transfusion",
	"Patients who are not catheterisied and it is documented on the observation chart that they have not passed urine in 12 hours",
	"When any doubt exists over fluid status",
	"For 24hrs following contrast for radiology procedures",
];

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

var el = {};
var grid = {};
var data = [
	{"Id":1, "DT":"2020-06-25 11:00", "IO":"Input", "Type":"Oral", "Volume":50, "Comment":null, "Username":"gosn1fm"},
	{"Id":2, "DT":"2020-06-25 09:00", "IO":"Input", "Type":"Oral", "Volume":75, "Comment":null, "Username":"gosn1fm"},
	{"Id":3, "DT":"2020-06-25 09:00", "IO":"Output", "Type":"Other", "Volume":-500, "Comment":"Runny nose", "Username":"gosn1fm"},
];

function showSection ($pg) {
	var el = document.querySelector("main")
	el.parentNode.replaceChild($pg, el);
};

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

(function () { // Summary

$.summary = function () {
	build();
	showSection(section);
};

var section = document.createElement("main");
section.style.flex = "1 1 auto";
section.style.display = "grid";
section.style.gridTemplateColumns = "repeat(" + (COLS.Input.length + COLS.Output.length + 4) + ", 1fr)";
section.style.gridGap = "1px";

var style = document.createElement("style"); section.appendChild(style);
style.textContent = [
	"main button { padding:10px; border-radius:10px; margin:1px; }",
].join("\n");

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "1/1/2/1";
div.style.display = "flex";
div.style.alignItems = "center";
div.style.justifyContent = "center";

	var button = document.createElement("button"); div.appendChild(button);
	button.style.fontFamily = "FASolid";
	button.textContent = "";
	button.onpointerdown = function () {
		el.inputDate.valueAsDate = new Date(el.inputDate.valueAsDate.setDate(el.inputDate.valueAsDate.getDate() - 1));
		build();
	};

	el.buttonToday = document.createElement("button"); div.appendChild(el.buttonToday);
	el.buttonToday.style.fontFamily = "FARegular";
	el.buttonToday.textContent = "";
	el.buttonToday.onpointerdown = function () {
		el.inputDate.valueAsDate = new Date();
		build();
	};

	var button = document.createElement("button"); div.appendChild(button);
	button.style.fontFamily = "FASolid";
	button.textContent = "";
	button.onpointerdown = function () {
		el.inputDate.valueAsDate = new Date(el.inputDate.valueAsDate.setDate(el.inputDate.valueAsDate.getDate() + 1));
		build();
	};

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "2/1/3/1";

	el.inputDate = document.createElement("input"); div.appendChild(el.inputDate);
	el.inputDate.type = "date";
	el.inputDate.valueAsDate = new Date();
	el.inputDate.onchange = function () { build(); };

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "1/2/2/" + (COLS.Input.length + 3);
div.style.display = "flex";
div.style.textAlign = "center";
div.style.alignItems = "center";
div.style.justifyContent = "center";
div.textContent = "Input";

COLS.Input.forEach(function ($v, $i) {
	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = "2/" + ($i + 2) +"/3/" + ($i + 3);
	div.style.display = "flex";
	div.style.textAlign = "center";
	div.style.alignItems = "center";
	div.style.justifyContent = "center";
	div.textContent = $v;
});

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "2/" + (COLS.Input.length + 2) +"/3/" + (COLS.Input.length + 3);
div.style.display = "flex";
div.style.textAlign = "center";
div.style.alignItems = "center";
div.style.justifyContent = "center";
div.style.backgroundColor = "#98d6af";
div.textContent = "Total";

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "1/" + (COLS.Input.length + 3) + "/2/" + (COLS.Input.length + COLS.Output.length + 4);
div.style.display = "flex";
div.style.textAlign = "center";
div.style.alignItems = "center";
div.style.justifyContent = "center";
div.textContent = "Output";

COLS.Output.forEach(function ($v, $i) {
	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = "2/" + (COLS.Input.length + 3 + $i) +"/3/" + (COLS.Input.length + 4 + $i);
	div.style.display = "flex";
	div.style.textAlign = "center";
	div.style.alignItems = "center";
	div.style.justifyContent = "center";
	div.textContent = $v;
});

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "2/" + (COLS.Input.length + COLS.Output.length + 3) + "/3/" + (COLS.Input.length + COLS.Output.length + 4);
div.style.display = "flex";
div.style.textAlign = "center";
div.style.alignItems = "center";
div.style.justifyContent = "center";
div.style.backgroundColor = "#98d6af";
div.textContent = "Total";

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "1/" + (COLS.Input.length + COLS.Output.length + 4) + "/2/" + (COLS.Input.length + COLS.Output.length + 5);
div.style.display = "flex";
div.style.alignItems = "center";
div.style.justifyContent = "center";

	var button = document.createElement("button"); div.appendChild(button);
	button.style.fontFamily = "FASolid";
	button.textContent = "";
	button.onpointerdown = function () { $.settings(); };
	
	var button = document.createElement("button"); div.appendChild(button);
	button.style.fontFamily = "FASolid";
	button.textContent = "";
	button.onpointerdown = function () { $.list(); };

	var button = document.createElement("button"); div.appendChild(button);
	button.style.fontFamily = "FASolid";
	button.textContent = "";
	button.onpointerdown = function () { $.add(); };

var div = document.createElement("div"); section.appendChild(div);
div.style.gridArea = "2/" + (COLS.Input.length + COLS.Output.length + 4) + "/3/" + (COLS.Input.length + COLS.Output.length + 5);
div.style.display = "flex";
div.style.textAlign = "center";
div.style.alignItems = "center";
div.style.justifyContent = "center";
div.style.backgroundColor = "#98bee5";
div.textContent = "Balance";

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

ROWS.forEach(function ($v, $i) {
	var div = document.createElement("div"); section.appendChild(div);
	div.style.gridArea = ($i+3) + "/1/" + ($i+4) +"/2";
	div.style.display = "flex";
	div.style.textAlign = "center";
	div.style.alignItems = "center";
	div.style.justifyContent = "center";
	if (["AM", "PM"].indexOf($v) > -1) div.style.backgroundColor = "#fdf593";
	div.textContent = $v;
});

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

function createCell ($rc, $id) {
	var id = "|" + $id.join("|").replace(/ /g, "") + "|";
	var div = document.createElement("div"); section.appendChild(div);
	grid[id] = div;
	div.style.gridArea = [$rc[0], $rc[1], $rc[0]+1, $rc[1]+1].join("/");
	div.style.border = "1px solid #CCCCCC";
	div.style.display = "flex";
	div.style.textAlign = "center";
	div.style.alignItems = "center";
	div.style.justifyContent = "center";
	if (id.indexOf("|AM|") > -1 || id.indexOf("|PM|") > -1) {
		div.style.backgroundColor = "#fdf593";
	} else if (id.indexOf("|Total|") > -1) {
		div.style.backgroundColor = "#98d6af";
	} else if (id.indexOf("|Balance|") > -1) {
		div.style.backgroundColor = "#98bee5";
	} else {
		div.onpointerdown = function () { $.add([$id[0], $id[1], el.inputDate.value + "T" + $id[2] + ":30"]); };
	};
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
	
	var volume = {};
	var comment = {};
	
	data.forEach(function ($v, $i) {
	
		if ($v.DT.substring(0, 10) !== el.inputDate.value) return;
		
		[
			[$v.IO, $v.Type, $v.DT.substring(11, 13)],
			[$v.IO, "Total", $v.DT.substring(11, 13)],
			["Balance", $v.DT.substring(11, 13)],
			[$v.IO, $v.Type, ["AM", "PM"][Math.floor(parseInt($v.DT.substring(11, 13)) / 12)]],
			[$v.IO, "Total", ["AM", "PM"][Math.floor(parseInt($v.DT.substring(11, 13)) / 12)]],
			["Balance", ["AM", "PM"][Math.floor(parseInt($v.DT.substring(11, 13)) / 12)]]
		].forEach(function ($x, $xi) {
			var lbl = "|" + $x.join("|").replace(/ /g, "") + "|";
			if (volume[lbl] === undefined) volume[lbl] = 0;
			volume[lbl] += $v.Volume;
			if ($xi === 0 && $v.Comment !== null) {
				if (comment[lbl] === undefined) comment[lbl] = [];
				comment[lbl].push($v.Comment)
			};			
		});
		
	});
	
	Object.keys(grid).forEach(function ($v) {
		grid[$v].textContent = (volume[$v] === undefined) ? "" : (($v.indexOf("|Balance|") > -1) ? volume[$v] : Math.abs(volume[$v]));
		if (comment[$v] !== undefined) {
			grid[$v].textContent += " *";
			grid[$v].title = comment[$v].join(" | ");
		} else {
			grid[$v].title = "";
		};
	});

}; build();

}());

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

(function () { // List

$.list = function () {
	build();
	showSection(section);
};

var section = document.createElement("main");

var table = document.createElement("table"); section.appendChild(table);
table.style.width = "100%";
table.style.borderCollapse = "collapse";
var thead = document.createElement("thead"); table.appendChild(thead);
thead.style.fontWeight = "bold";
var tr = document.createElement("tr"); thead.appendChild(tr);
var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = "DT";
var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = "IO";
var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = "Type";
var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = "Volume";
var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = "Username";
var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.style.width = "1px";

function build () {
	
	table.querySelectorAll("tbody").forEach(function ($v) { $v.parentNode.removeChild($v); });
	
	data.forEach(function ($v, $i) {
		
		var tbody = document.createElement("tbody"); table.appendChild(tbody);
		tbody.style.backgroundColor = ($i % 2 === 0) ? "#d8f0fc" : "#fafbfd";
		var tr = document.createElement("tr"); tbody.appendChild(tr);
		var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = $v.DT;
		var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = $v.IO;
		var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = $v.Type;
		var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = $v.Volume;
		var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; td.textContent = $v.Username;
		var td = document.createElement("td"); tr.appendChild(td); td.style.padding = "20px"; 
			var button = document.createElement("button"); td.appendChild(button);
			button.textContent = "Delete";
			button.onpointerdown = function () { alert($v.Id); };
		if ($v.Comment !== null) {
			td.rowSpan = 2;
			var tr = document.createElement("tr"); tbody.appendChild(tr);
			var td = document.createElement("td"); tr.appendChild(td);
			td.colSpan = 5;
			td.style.padding = "20px"; 
			td.textContent = "Comment: "+ $v.Comment;
		};
		
	});
	
};

}());

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

(function () { // Add

$.add = function ($in) {
	// $in : [IO, Type, DT]

	if ($in === undefined) {
		
		var now = new Date(); now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
		inputDateTime.value = now.toISOString().slice(0, 16);
		
		section.querySelectorAll("*[name='IOType']:checked").forEach(function ($v) { $v.checked = false; });
		
	} else {
	
		inputDateTime.value = $in[2];
	
		section.querySelectorAll("*[name='IOType']").forEach(function ($v) {
			$v.checked = ($v.value === $in[0] + "|" + $in[1]) ? true : false;
		});
	
	};
	
	volume.value = "";
	comment.value = "";
	
	showSection(section);
	
};

var selectedIO = null;

var section = document.createElement("main");
	
var style = document.createElement("style"); section.appendChild(style);
style.textContent = [
	"main tbody + tbody { border-top:1px solid #768692; }",
	"main tbody tr:first-of-type td { padding-top:15px; }",
	"main tbody tr:last-of-type td { padding-bottom:15px; }",
	"main tr+tr  { border-top:1px solid #E8EDEE; }",
	"main td { padding:5px; }",
].join("\n");

var table = document.createElement("table"); section.appendChild(table);
table.style.borderCollapse = "collapse";
table.style.width = "100%";
	
var tbody = document.createElement("tbody"); table.appendChild(tbody);
var tr = document.createElement("tr"); tbody.appendChild(tr);
var td = document.createElement("td"); tr.appendChild(td); td.textContent = "Date Time";
var td = document.createElement("td"); tr.appendChild(td);

	var inputDateTime = document.createElement("input"); td.appendChild(inputDateTime);
	inputDateTime.type = "datetime-local";

var tbody = document.createElement("tbody"); table.appendChild(tbody);
var tr = document.createElement("tr"); tbody.appendChild(tr);
var td = document.createElement("td"); tr.appendChild(td); td.textContent = "Type";
var td = document.createElement("td"); tr.appendChild(td);

	Object.keys(COLS).forEach(function ($v) {
		
		var div = document.createElement("div"); td.appendChild(div);
		div.textContent = $v + ": ";
		
		COLS[$v].forEach(function ($v2) {
			var label = document.createElement("label"); div.appendChild(label);
			var input = document.createElement("input"); label.appendChild(input);
			input.type = "radio";
			input.name = "IOType";
			input.value = $v+"|"+$v2;
			label.appendChild(document.createTextNode($v2));
		});
		
	});

var tbody = document.createElement("tbody"); table.appendChild(tbody);
var tr = document.createElement("tr"); tbody.appendChild(tr);
var td = document.createElement("td"); tr.appendChild(td); td.textContent = "Volume";
var td = document.createElement("td"); tr.appendChild(td);

	var volume = document.createElement("input"); td.appendChild(volume);

var tbody = document.createElement("tbody"); table.appendChild(tbody);
var tr = document.createElement("tr"); tbody.appendChild(tr);
var td = document.createElement("td"); tr.appendChild(td); td.textContent = "Comment";
var td = document.createElement("td"); tr.appendChild(td);

	var comment = document.createElement("textarea"); td.appendChild(comment);

var tbody = document.createElement("tbody"); table.appendChild(tbody);
var tr = document.createElement("tr"); tbody.appendChild(tr);
var td = document.createElement("td"); tr.appendChild(td);
var td = document.createElement("td"); tr.appendChild(td);

	var button = document.createElement("button"); td.appendChild(button);
	var span = document.createElement("span"); button.appendChild(span); span.style.fontFamily = "FARegular"; span.textContent = "";
	button.appendChild(document.createTextNode(" Save"));
	button.onpointerdown = function () {
		
		var selected = section.querySelector("*[name='IOType']:checked").value.split("|");
		
		data.unshift({
			"Id":0,
			"DT": inputDateTime.value,
			"IO": selected[0],
			"Type": selected[1],
			"Volume": parseInt(volume.value) * ((selected[0] === "Output") ? -1 : 1),
			"Comment": (comment.value === "") ? null : comment.value,
			"Username":"gosn1fm"
		});
		$.summary();
	};

}());

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

(function () { // Settings

$.settings = function () {
	showSection(section);
};

var section = document.createElement("main");

var style = document.createElement("style"); section.appendChild(style);
style.textContent = [
	"main tbody + tbody { border-top:1px solid #768692; }",
	"main tbody tr:first-of-type td { padding-top:15px; }",
	"main tbody tr:last-of-type td { padding-bottom:15px; }",
	"main tr+tr  { border-top:1px solid #E8EDEE; }",
	"main td { padding:5px; }",
].join("\n");

var div = document.createElement("div"); section.appendChild(div);
div.style.textAlign = "center";
div.style.fontSize = "2em";
div.textContent = "Settings";

var table = document.createElement("table"); section.appendChild(table);
table.style.borderCollapse = "collapse";
table.style.width = "100%";

var tbody = document.createElement("tbody"); table.appendChild(tbody);
var tr = document.createElement("tr"); tbody.appendChild(tr);
var td = document.createElement("td"); tr.appendChild(td);
td.style.width = "20%";
td.textContent = "Weight";
var td = document.createElement("td"); tr.appendChild(td);
td.colSpan = 2;

	var weight = document.createElement("input"); td.appendChild(weight);
	td.appendChild(document.createTextNode(" kgs"));
	
var tbody = document.createElement("tbody"); table.appendChild(tbody);
var tr = document.createElement("tr"); tbody.appendChild(tr);
var td = document.createElement("td"); tr.appendChild(td);
td.style.width = "20%";
td.rowSpan = 2;
td.textContent = "Alerting";

	["Yes", "No"].forEach(function ($v, $i) {
		
		if ($i > 0) { tr = document.createElement("tr"); tbody.appendChild(tr); };
	
		var td = document.createElement("td"); tr.appendChild(td);
		var input = document.createElement("input"); td.appendChild(input);
		input.type = "radio";
		input.name =  "Alerting";
		input.id = $v.replace(/ /g, "");
		if ($i === 0) input.checked = true;
		
		var td = document.createElement("td"); tr.appendChild(td);
		var label = document.createElement("label"); td.appendChild(label);
		label.htmlFor = input.id;
		label.textContent = $v;
		
	});
	

var tbody = document.createElement("tbody"); table.appendChild(tbody);
var tr = document.createElement("tr"); tbody.appendChild(tr);
var td = document.createElement("td"); tr.appendChild(td);
td.rowSpan = INDICATIONS.length;
td.textContent = "Indications";

INDICATIONS.forEach(function ($v, $i) {
	
	if ($i > 0) { tr = document.createElement("tr"); tbody.appendChild(tr); };
	
	var td = document.createElement("td"); tr.appendChild(td);
	var input = document.createElement("input"); td.appendChild(input);
	input.type = "checkbox";
	input.id = $v.replace(/ /g, "");
	
	var td = document.createElement("td"); tr.appendChild(td);
	var label = document.createElement("label"); td.appendChild(label);
	label.htmlFor = input.id;
	label.textContent = $v;
	
});

var tbody = document.createElement("tbody"); table.appendChild(tbody);
var tr = document.createElement("tr"); tbody.appendChild(tr);
var td = document.createElement("td"); tr.appendChild(td);
var td = document.createElement("td"); tr.appendChild(td);
td.colSpan = 2;

	var button = document.createElement("button"); td.appendChild(button);
	button.style.width = "100%";
	button.style.padding = "10px";
	var span = document.createElement("span"); button.appendChild(span); span.style.fontFamily = "FARegular"; span.textContent = "";
	button.appendChild(document.createTextNode(" Save"));
	button.onpointerdown = function () { $.summary(); };

}());

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

}());
