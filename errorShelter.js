// errorShelter.js - Extends the native Error method and stores errors into localStorage obj
// https://github.com/crobinson42/error-shelter
// Cory Robinson

(function () {

	var config = {
		nameSpace : 'errorShelter', //can be changed to fit app needs
		availableGlobal : true, // make the nameSpace available either GLOBAL.nameSpace || window.nameSpace
	};

	// The available methods exposed for API consumption
	var publicApi = {
		getStorage : getStorage,
		emptyStorage : initializeEmptyStorage
	};

	if (!localStorage) { return console.warn('errorShelter.js - localStorage not supported.'); }

	var initializeEmptyStorage = function () {
		localStorage.setItem(config.nameSpace, JSON.stringify({errors:[]}));
	};

	// check for existing errorShelter in storage and if non exists initialize empty
	if (!localStorage.getItem(config.nameSpace)) {
		initializeEmptyStorage();
	}


	var nativeError = Error;

	var errorShelter = function() {
		// get navigator props, varies from browser to browser.. simple solution:
		var navigator = {};
		for (var np in window.navigator) {
			navigator[np] = window.navigator[np];
		}

		// invoke the Error
		var e = nativeError.apply(window,arguments);

		setErrorInStorage({
			'arguments' : arguments,
			'message' 	: arguments[0],
			'time'		: generateTime(),
			'browserInfo'	: {
				'navigator'	: navigator,
				'location'	: location.origin + '' + location.pathname
			},
			'stack' 	:  e.stack,
			'options' : {}
		});

		return e;
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
		return JSON.parse(localStorage[config.nameSpace]);
	};

	var generateTime = function () {
		return new Date().getTime();
	};



	if (config.availableGlobal) {
		if (window) {
			window[config.nameSpace] = publicApi;
		}
	}

	window.Error = errorShelter;
	window.Error[config.nameSpace] = publicApi;

})();
