"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/medico/chat",{

/***/ "./components/medico/chat/ChatContainer.jsx":
/*!**************************************************!*\
  !*** ./components/medico/chat/ChatContainer.jsx ***!
  \**************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ChatContainer; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var _styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../styles/Chat.module.css */ \"./styles/Chat.module.css\");\n/* harmony import */ var _styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _ChatInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChatInput */ \"./components/medico/chat/ChatInput.jsx\");\n\n\n\n\nfunction ChatContainer(param) {\n    let { currentChat, currentUser, socket } = param;\n    const handleSendMsg = async (msg)=>{\n        console.log(currentChat);\n        axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"http://localhost:3000/chat\", {\n            from: currentUser._id,\n            to: currentChat._id,\n            sender: currentUser._id,\n            text: msg\n        });\n        console.log(msg);\n    };\n    if (currentChat) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: (_styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3___default()[\"container-conversa\"]),\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3___default()[\"chat-header\"]),\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3___default()[\"user-details\"]),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: (_styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3___default().avatar),\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                    src: currentChat.foto,\n                                    alt: \"\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n                                    lineNumber: 29,\n                                    columnNumber: 21\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n                                lineNumber: 28,\n                                columnNumber: 19\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: (_styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3___default().username),\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                    children: currentChat.nome\n                                }, void 0, false, {\n                                    fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n                                    lineNumber: 32,\n                                    columnNumber: 21\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n                                lineNumber: 31,\n                                columnNumber: 19\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n                        lineNumber: 27,\n                        columnNumber: 17\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n                    lineNumber: 26,\n                    columnNumber: 15\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3___default()[\"chat-messages\"])\n                }, void 0, false, {\n                    fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n                    lineNumber: 36,\n                    columnNumber: 15\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ChatInput__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                    handleSendMsg: handleSendMsg\n                }, void 0, false, {\n                    fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n                    lineNumber: 37,\n                    columnNumber: 15\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n            lineNumber: 25,\n            columnNumber: 13\n        }, this);\n    } else {\n        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: (_styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3___default()[\"container-conversa\"])\n        }, void 0, false, {\n            fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n            lineNumber: 43,\n            columnNumber: 9\n        }, this);\n    }\n}\n_c = ChatContainer;\nvar _c;\n$RefreshReg$(_c, \"ChatContainer\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL21lZGljby9jaGF0L0NoYXRDb250YWluZXIuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQTBCO0FBQzJCO0FBQ2pCO0FBQ3JCLFNBQVNHLGNBQWMsS0FBb0M7UUFBcEMsRUFBRUMsV0FBVyxFQUFFQyxXQUFXLEVBQUVDLE1BQU0sRUFBRSxHQUFwQztJQUdsQyxNQUFNQyxnQkFBZ0IsT0FBT0M7UUFDM0JDLFFBQVFDLEdBQUcsQ0FBQ047UUFFWkosa0RBQVUsQ0FBQyw4QkFBNkI7WUFFcENZLE1BQU1QLFlBQVlRLEdBQUc7WUFDckJDLElBQUlWLFlBQVlTLEdBQUc7WUFDbkJFLFFBQVFWLFlBQVlRLEdBQUc7WUFDdkJHLE1BQU1SO1FBRVY7UUFFQUMsUUFBUUMsR0FBRyxDQUFDRjtJQUVkO0lBRUEsSUFBSUosYUFBYTtRQUNiLHFCQUNJLDhEQUFDYTtZQUFJQyxXQUFXakIsc0ZBQTRCOzs4QkFDMUMsOERBQUNnQjtvQkFBSUMsV0FBV2pCLCtFQUFxQjs4QkFDbkMsNEVBQUNnQjt3QkFBSUMsV0FBV2pCLGdGQUFzQjs7MENBQ3BDLDhEQUFDZ0I7Z0NBQUlDLFdBQVdqQix1RUFBZ0I7MENBQzlCLDRFQUFDa0I7b0NBQUlDLEtBQUtoQixZQUFZaUIsSUFBSTtvQ0FBRUMsS0FBSTs7Ozs7Ozs7Ozs7MENBRWxDLDhEQUFDTDtnQ0FBSUMsV0FBV2pCLHlFQUFrQjswQ0FDaEMsNEVBQUNzQjs4Q0FBSW5CLFlBQVlvQixJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQUkzQiw4REFBQ1A7b0JBQUlDLFdBQVdqQixpRkFBdUI7Ozs7Ozs4QkFDdkMsOERBQUNDLGtEQUFTQTtvQkFDUkssZUFBZUE7Ozs7Ozs7Ozs7OztJQUkzQixPQUFLO3NCQUNELDhEQUFDVTtZQUFJQyxXQUFXakIsc0ZBQTRCOzs7Ozs7SUFDaEQ7QUFFSjtLQTFDd0JFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvbWVkaWNvL2NoYXQvQ2hhdENvbnRhaW5lci5qc3g/ZThlMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuLi8uLi8uLi9zdHlsZXMvQ2hhdC5tb2R1bGUuY3NzXCI7XG5pbXBvcnQgQ2hhdElucHV0IGZyb20gXCIuL0NoYXRJbnB1dFwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2hhdENvbnRhaW5lcih7IGN1cnJlbnRDaGF0LCBjdXJyZW50VXNlciwgc29ja2V0IH0pIHtcblxuIFxuICAgIGNvbnN0IGhhbmRsZVNlbmRNc2cgPSBhc3luYyAobXNnKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhjdXJyZW50Q2hhdCk7XG5cbiAgICAgIGF4aW9zLnBvc3QoXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvY2hhdFwiLHtcblxuICAgICAgICAgIGZyb206IGN1cnJlbnRVc2VyLl9pZCxcbiAgICAgICAgICB0bzogY3VycmVudENoYXQuX2lkLFxuICAgICAgICAgIHNlbmRlcjogY3VycmVudFVzZXIuX2lkLFxuICAgICAgICAgIHRleHQ6IG1zZ1xuICAgICAgXG4gICAgICB9KVxuXG4gICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgIFxuICAgIH1cbiAgICBcbiAgICBpZiAoY3VycmVudENoYXQpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbJ2NvbnRhaW5lci1jb252ZXJzYSddfT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlc1tcImNoYXQtaGVhZGVyXCJdfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzW1widXNlci1kZXRhaWxzXCJdfT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbXCJhdmF0YXJcIl19PlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17Y3VycmVudENoYXQuZm90b30gYWx0PVwiXCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlc1tcInVzZXJuYW1lXCJdfT5cbiAgICAgICAgICAgICAgICAgICAgPGgzPntjdXJyZW50Q2hhdC5ub21lfTwvaDM+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbXCJjaGF0LW1lc3NhZ2VzXCJdfT48L2Rpdj5cbiAgICAgICAgICAgICAgPENoYXRJbnB1dFxuICAgICAgICAgICAgICAgIGhhbmRsZVNlbmRNc2c9e2hhbmRsZVNlbmRNc2d9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgIH1lbHNle1xuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzWydjb250YWluZXItY29udmVyc2EnXX0+PC9kaXY+XG4gICAgfVxuXG59XG4iXSwibmFtZXMiOlsiYXhpb3MiLCJzdHlsZXMiLCJDaGF0SW5wdXQiLCJDaGF0Q29udGFpbmVyIiwiY3VycmVudENoYXQiLCJjdXJyZW50VXNlciIsInNvY2tldCIsImhhbmRsZVNlbmRNc2ciLCJtc2ciLCJjb25zb2xlIiwibG9nIiwicG9zdCIsImZyb20iLCJfaWQiLCJ0byIsInNlbmRlciIsInRleHQiLCJkaXYiLCJjbGFzc05hbWUiLCJpbWciLCJzcmMiLCJmb3RvIiwiYWx0IiwiaDMiLCJub21lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/medico/chat/ChatContainer.jsx\n"));

/***/ })

});