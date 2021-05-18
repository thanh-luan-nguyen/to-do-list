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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_DOMeffects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/DOMeffects */ \"./src/modules/DOMeffects.js\");\n\r\n(0,_modules_DOMeffects__WEBPACK_IMPORTED_MODULE_0__.performAllEffects)();\r\n\r\nfunction selectElement(e) {\r\n    return document.querySelector(e);\r\n}\r\n\r\nfunction selectAllElements(e) {\r\n    return document.querySelectorAll(e);\r\n}\r\n// class Task {\r\n//     constructor(project, title, description, date, priority) {\r\n//         this.project = project;\r\n//         this.title = title;\r\n//         this.description = description;\r\n//         this.date = date;\r\n//         this.priority = priority;\r\n//     }\r\n// }\r\n\r\n// class Project {\r\n//     constructor(title) {\r\n//         this.title = title;\r\n//     }\r\n//     addTask() {\r\n//         return {\r\n\r\n//         }\r\n//     }\r\n// }\r\n\r\n// (function displayTasks() {})()\r\n\r\n\r\n\r\nselectElement('[add-button]').addEventListener('click', (e) => {\r\n    e.preventDefault();\r\n    console.log(selectElement('#title').value, selectElement('#description').value, selectElement('#date').value, selectElement('#priority').value)\r\n})\n\n//# sourceURL=webpack://to-do-list.github.io/./src/index.js?");

/***/ }),

/***/ "./src/modules/DOMeffects.js":
/*!***********************************!*\
  !*** ./src/modules/DOMeffects.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"performAllEffects\": () => (/* binding */ performAllEffects)\n/* harmony export */ });\nconst performAllEffects = function() {\r\n    (function dropDownEffect() {\r\n        const dataProjectsDropdown = document.querySelector('[data-projects-dropdown]');\r\n        const caret = dataProjectsDropdown.querySelector('i');\r\n\r\n        dataProjectsDropdown.addEventListener('click', () => {\r\n            caret.classList.toggle(`fa-caret-down`);\r\n            caret.classList.toggle(`fa-caret-up`);\r\n        })\r\n    })();\r\n\r\n    (function navEffect() {\r\n        const aside = document.querySelector('aside');\r\n        document.querySelector('.openNav').addEventListener('click', () => {\r\n            if (aside.style.marginLeft === \"-250px\") {\r\n                aside.style.marginLeft = \"0\";\r\n            } else {\r\n                aside.style.marginLeft = \"-250px\";\r\n            }\r\n        });\r\n\r\n        const mq = window.matchMedia('(max-width: 850px)')\r\n        document.querySelector('section').addEventListener('click', () => {\r\n            if (mq.matches) {\r\n                aside.style.marginLeft = \"-250px\";\r\n            }\r\n        })\r\n\r\n        function checkMediaWidthAndDoTasks(x) {\r\n            if (x.matches) { aside.style.marginLeft = \"-250px\"; } else { aside.style.marginLeft = \"0px\"; }\r\n        }\r\n        checkMediaWidthAndDoTasks(mq);\r\n        mq.addListener(() => {\r\n            checkMediaWidthAndDoTasks(mq);\r\n        })\r\n    })();\r\n\r\n    (function sortSelectEffect() {\r\n        const dataSorts = document.querySelectorAll('[data-sort]');\r\n        const sortBy = document.querySelector('[sort-by]');\r\n        dataSorts.forEach(e => e.addEventListener('click', () => {\r\n            sortBy.innerText = e.innerText;\r\n        }))\r\n    })();\r\n\r\n    (function deleteProjectEffect() {\r\n        const dataProjectNames = document.querySelectorAll('[data-project-name]');\r\n        dataProjectNames.forEach(e => e.addEventListener('mouseover', () => {\r\n            const icon = e.querySelector('i');\r\n            icon.style.cssText = \"color:rgba(0, 0, 0, 0.2);\"\r\n            icon.classList.replace('fa-tasks', 'fa-trash-alt');\r\n\r\n        }))\r\n        dataProjectNames.forEach(e => e.addEventListener('mouseout', () => {\r\n            const icon = e.querySelector('i');\r\n            icon.classList.replace('fa-trash-alt', 'fa-tasks');\r\n            icon.style.color = \"black\"\r\n        }))\r\n    })();\r\n\r\n    (function countCharacterEffect() {\r\n        const xyz = document.querySelectorAll('[xyz]');\r\n        xyz.forEach(e => e.addEventListener('input', () => {\r\n            if (e.getAttribute('id') === \"title\") {\r\n                checkLength(30, \"title\");\r\n            }\r\n            if (e.getAttribute('id') === \"description\") {\r\n                checkLength(120, \"description\");\r\n            };\r\n\r\n            function checkLength(x, a) {\r\n                if (e.value.length < x) {\r\n                    document.querySelector(`[${a}-limit]`).style.color = \"rgba(0, 0, 0, 0.5)\";\r\n                    document.querySelector(`[${a}-count]`).innerText = e.value.length;\r\n                } else if (e.value.length === x) {\r\n                    document.querySelector(`[${a}-limit]`).style.color = \"red\";\r\n                    document.querySelector(`[${a}-count]`).innerText = e.value.length;\r\n                } else if (e.value.length > x) {\r\n                    e.value = e.value.slice(0, x);\r\n                }\r\n            }\r\n        }));\r\n    })();\r\n};\n\n//# sourceURL=webpack://to-do-list.github.io/./src/modules/DOMeffects.js?");

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