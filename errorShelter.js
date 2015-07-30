// errorShelter.js - Extends the native Error method and stores errors into localStorage obj
// https://github.com/crobinson42/error-shelter
// Cory Robinson

(function () {
	
	var config = {
		nameSpace : 'errorShelter',//can be changed to fit app needs
	};

	if (!localStorage) { return console.warn('errorShelter.js - localStorage not supported.'); }

	// initialize an empty object in localStorage
	localStorage.setItem(config.nameSpace, JSON.stringify({errors:[]}));

	var nativeError = Error;

	var errorShelter = function() {
		setErrorInStorage({
			'arguments' : arguments,
			'message' 	: arguments[0],
			'time'		: generateTime(),
			'browserInfo'	: {
				'navigator'	: navigator || window.navigator,//TODO fix this line, navigator is not showing up
				'location'	: window.location
			}
		});
		return nativeError.call(window,arguments);
	};

	// JSON.stringify the object and put back in localStorage
	var setErrorInStorage = function (err) {
		var storage = getStorage();
		if (storage && storage.errors) {
			storage.errors.push(err);
			return localStorage.setItem([config.nameSpace], JSON.stringify(storage));
		}
	};

	// Returns the localStorage after JSON.parse
	var getStorage = function () {
		return new Object(JSON.parse(localStorage[config.nameSpace]));
	};

	var generateTime = function () {
		return new Date().getTime();
	};


	window.Error = errorShelter;
	window.Error.errorShelter = this; // makes these methods accessible on the Error method

})();




