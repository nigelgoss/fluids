var $fluids = (function () {

	function forward () {
		back();
	};
	
	function back () {
		alert("Fluids");
	};
	
	return {
		"forward": forward,
		"back": back,
	};

}()};
