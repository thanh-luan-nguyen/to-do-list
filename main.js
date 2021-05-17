/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/effects */ \"./src/modules/effects.js\");\n\r\n(function performAllEffects() {\r\n    (0,_modules_effects__WEBPACK_IMPORTED_MODULE_0__.dropDownEffect)();\r\n    (0,_modules_effects__WEBPACK_IMPORTED_MODULE_0__.navEffect)();\r\n})()\n\n//# sourceURL=webpack://to-do-list.github.io/./src/index.js?");

/***/ }),

/***/ "./src/modules/effects.js":
/*!********************************!*\
  !*** ./src/modules/effects.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"dropDownEffect\": () => (/* binding */ dropDownEffect),\n/* harmony export */   \"navEffect\": () => (/* binding */ navEffect)\n/* harmony export */ });\nconst dropDownEffect = () => {\r\n    const dataProjectsDropdown = document.querySelector('[data-projects-dropdown]');\r\n    const caret = dataProjectsDropdown.querySelector('i');\r\n\r\n    dataProjectsDropdown.addEventListener('click', () => {\r\n        caret.classList.toggle(`fa-caret-down`);\r\n        caret.classList.toggle(`fa-caret-up`);\r\n    })\r\n}\r\n\r\nconst navEffect = () => {\r\n    const aside = document.querySelector('aside');\r\n    document.querySelector('.openNav').addEventListener('click', () => {\r\n        if (aside.style.marginLeft === \"-200px\") {\r\n            aside.style.marginLeft = \"0\";\r\n        } else {\r\n            aside.style.marginLeft = \"-200px\";\r\n        }\r\n    });\r\n    const mq = window.matchMedia('(max-width: 850px)')\r\n\r\n    function checkMediaWidthAndDoTasks(x) {\r\n        if (x.matches) { aside.style.marginLeft = \"-200px\"; } else { aside.style.marginLeft = \"0px\"; }\r\n    }\r\n    checkMediaWidthAndDoTasks(mq);\r\n    mq.addListener(() => {\r\n        checkMediaWidthAndDoTasks(mq);\r\n    })\r\n}\r\n\r\n\n\n//# sourceURL=webpack://to-do-list.github.io/./src/modules/effects.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;