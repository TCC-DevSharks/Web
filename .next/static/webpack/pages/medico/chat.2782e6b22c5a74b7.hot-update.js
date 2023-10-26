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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ChatContainer; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var _styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../styles/Chat.module.css */ \"./styles/Chat.module.css\");\n/* harmony import */ var _styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _ChatInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChatInput */ \"./components/medico/chat/ChatInput.jsx\");\n\nvar _s = $RefreshSig$();\n\n\n\nfunction ChatContainer(param) {\n    let { currentChat, currentUser, socket } = param;\n    _s();\n    const [messages, setMessages] = useState([]);\n    const handleSendMsg = async (msg)=>{\n        console.log(currentChat);\n        axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"http://localhost:3000/chat\", {\n            from: currentUser._id,\n            to: currentChat._id,\n            sender: currentUser._id,\n            text: msg\n        });\n        console.log(msg);\n    };\n    if (currentChat) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: (_styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3___default()[\"container-conversa\"]),\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3___default()[\"chat-header\"]),\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3___default()[\"user-details\"]),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: (_styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3___default().avatar),\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                    src: currentChat.foto,\n                                    alt: \"\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n                                    lineNumber: 32,\n                                    columnNumber: 21\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n                                lineNumber: 31,\n                                columnNumber: 19\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: (_styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3___default().username),\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                    children: currentChat.nome\n                                }, void 0, false, {\n                                    fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n                                    lineNumber: 35,\n                                    columnNumber: 21\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n                                lineNumber: 34,\n                                columnNumber: 19\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n                        lineNumber: 30,\n                        columnNumber: 17\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n                    lineNumber: 29,\n                    columnNumber: 15\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3___default()[\"chat-messages\"]),\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"content \",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            children: message.message\n                        }, void 0, false, {\n                            fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n                            lineNumber: 41,\n                            columnNumber: 19\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n                        lineNumber: 40,\n                        columnNumber: 15\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n                    lineNumber: 39,\n                    columnNumber: 15\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ChatInput__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                    handleSendMsg: handleSendMsg\n                }, void 0, false, {\n                    fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n                    lineNumber: 44,\n                    columnNumber: 15\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n            lineNumber: 28,\n            columnNumber: 13\n        }, this);\n    } else {\n        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: (_styles_Chat_module_css__WEBPACK_IMPORTED_MODULE_3___default()[\"container-conversa\"])\n        }, void 0, false, {\n            fileName: \"/Users/22282081/Documents/GitHub/Web/components/medico/chat/ChatContainer.jsx\",\n            lineNumber: 50,\n            columnNumber: 9\n        }, this);\n    }\n}\n_s(ChatContainer, \"dxxfFX7fiXmC0h9Fk+B7I5VonqM=\");\n_c = ChatContainer;\nvar _c;\n$RefreshReg$(_c, \"ChatContainer\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL21lZGljby9jaGF0L0NoYXRDb250YWluZXIuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUEwQjtBQUMyQjtBQUNqQjtBQUNyQixTQUFTRyxjQUFjLEtBQW9DO1FBQXBDLEVBQUVDLFdBQVcsRUFBRUMsV0FBVyxFQUFFQyxNQUFNLEVBQUUsR0FBcEM7O0lBRXBDLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHQyxTQUFTLEVBQUU7SUFJekMsTUFBTUMsZ0JBQWdCLE9BQU9DO1FBQzNCQyxRQUFRQyxHQUFHLENBQUNUO1FBRVpKLGtEQUFVLENBQUMsOEJBQTZCO1lBRXBDZSxNQUFNVixZQUFZVyxHQUFHO1lBQ3JCQyxJQUFJYixZQUFZWSxHQUFHO1lBQ25CRSxRQUFRYixZQUFZVyxHQUFHO1lBQ3ZCRyxNQUFNUjtRQUVWO1FBRUFDLFFBQVFDLEdBQUcsQ0FBQ0Y7SUFFZDtJQUVBLElBQUlQLGFBQWE7UUFDYixxQkFDSSw4REFBQ2dCO1lBQUlDLFdBQVdwQixzRkFBNEI7OzhCQUMxQyw4REFBQ21CO29CQUFJQyxXQUFXcEIsK0VBQXFCOzhCQUNuQyw0RUFBQ21CO3dCQUFJQyxXQUFXcEIsZ0ZBQXNCOzswQ0FDcEMsOERBQUNtQjtnQ0FBSUMsV0FBV3BCLHVFQUFnQjswQ0FDOUIsNEVBQUNxQjtvQ0FBSUMsS0FBS25CLFlBQVlvQixJQUFJO29DQUFFQyxLQUFJOzs7Ozs7Ozs7OzswQ0FFbEMsOERBQUNMO2dDQUFJQyxXQUFXcEIseUVBQWtCOzBDQUNoQyw0RUFBQ3lCOzhDQUFJdEIsWUFBWXVCLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBSTNCLDhEQUFDUDtvQkFBSUMsV0FBV3BCLGlGQUF1Qjs4QkFDdkMsNEVBQUNtQjt3QkFBSUMsV0FBVTtrQ0FDWCw0RUFBQ087c0NBQUdDLFFBQVFBLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7OEJBR3ZCLDhEQUFDM0Isa0RBQVNBO29CQUNSUSxlQUFlQTs7Ozs7Ozs7Ozs7O0lBSTNCLE9BQUs7c0JBQ0QsOERBQUNVO1lBQUlDLFdBQVdwQixzRkFBNEI7Ozs7OztJQUNoRDtBQUVKO0dBakR3QkU7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9tZWRpY28vY2hhdC9DaGF0Q29udGFpbmVyLmpzeD9lOGUwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uLy4uLy4uL3N0eWxlcy9DaGF0Lm1vZHVsZS5jc3NcIjtcbmltcG9ydCBDaGF0SW5wdXQgZnJvbSBcIi4vQ2hhdElucHV0XCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDaGF0Q29udGFpbmVyKHsgY3VycmVudENoYXQsIGN1cnJlbnRVc2VyLCBzb2NrZXQgfSkge1xuXG4gIGNvbnN0IFttZXNzYWdlcywgc2V0TWVzc2FnZXNdID0gdXNlU3RhdGUoW10pO1xuXG5cbiBcbiAgICBjb25zdCBoYW5kbGVTZW5kTXNnID0gYXN5bmMgKG1zZykgPT4ge1xuICAgICAgY29uc29sZS5sb2coY3VycmVudENoYXQpO1xuXG4gICAgICBheGlvcy5wb3N0KFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2NoYXRcIix7XG5cbiAgICAgICAgICBmcm9tOiBjdXJyZW50VXNlci5faWQsXG4gICAgICAgICAgdG86IGN1cnJlbnRDaGF0Ll9pZCxcbiAgICAgICAgICBzZW5kZXI6IGN1cnJlbnRVc2VyLl9pZCxcbiAgICAgICAgICB0ZXh0OiBtc2dcbiAgICAgIFxuICAgICAgfSlcblxuICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICBcbiAgICB9XG4gICAgXG4gICAgaWYgKGN1cnJlbnRDaGF0KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzWydjb250YWluZXItY29udmVyc2EnXX0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbXCJjaGF0LWhlYWRlclwiXX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlc1tcInVzZXItZGV0YWlsc1wiXX0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzW1wiYXZhdGFyXCJdfT5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2N1cnJlbnRDaGF0LmZvdG99IGFsdD1cIlwiIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbXCJ1c2VybmFtZVwiXX0+XG4gICAgICAgICAgICAgICAgICAgIDxoMz57Y3VycmVudENoYXQubm9tZX08L2gzPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzW1wiY2hhdC1tZXNzYWdlc1wiXX0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudCBcIj5cbiAgICAgICAgICAgICAgICAgIDxwPnttZXNzYWdlLm1lc3NhZ2V9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPENoYXRJbnB1dFxuICAgICAgICAgICAgICAgIGhhbmRsZVNlbmRNc2c9e2hhbmRsZVNlbmRNc2d9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgIH1lbHNle1xuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzWydjb250YWluZXItY29udmVyc2EnXX0+PC9kaXY+XG4gICAgfVxuXG59XG4iXSwibmFtZXMiOlsiYXhpb3MiLCJzdHlsZXMiLCJDaGF0SW5wdXQiLCJDaGF0Q29udGFpbmVyIiwiY3VycmVudENoYXQiLCJjdXJyZW50VXNlciIsInNvY2tldCIsIm1lc3NhZ2VzIiwic2V0TWVzc2FnZXMiLCJ1c2VTdGF0ZSIsImhhbmRsZVNlbmRNc2ciLCJtc2ciLCJjb25zb2xlIiwibG9nIiwicG9zdCIsImZyb20iLCJfaWQiLCJ0byIsInNlbmRlciIsInRleHQiLCJkaXYiLCJjbGFzc05hbWUiLCJpbWciLCJzcmMiLCJmb3RvIiwiYWx0IiwiaDMiLCJub21lIiwicCIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/medico/chat/ChatContainer.jsx\n"));

/***/ })

});