"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 6123:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
;// CONCATENATED MODULE: external "@mui/icons-material/Menu"
const Menu_namespaceObject = require("@mui/icons-material/Menu");
var Menu_default = /*#__PURE__*/__webpack_require__.n(Menu_namespaceObject);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
;// CONCATENATED MODULE: ./components/NavBar.js





const NavBar = ({ address , connect  })=>{
    const [anchorElNav, setAnchorElNav] = external_react_.useState(null);
    const handleOpenNavMenu = (event)=>{
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = ()=>{
        setAnchorElNav(null);
    };
    return(/*#__PURE__*/ jsx_runtime_.jsx(material_.AppBar, {
        position: "static",
        children: /*#__PURE__*/ jsx_runtime_.jsx(material_.Container, {
            maxWidth: "xl",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(material_.Toolbar, {
                disableGutters: true,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(material_.Box, {
                        sx: {
                            flexGrow: 1,
                            display: {
                                xs: "flex",
                                md: "none"
                            }
                        },
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(material_.IconButton, {
                                size: "large",
                                "aria-label": "account of current user",
                                "aria-controls": "menu-appbar",
                                "aria-haspopup": "true",
                                onClick: handleOpenNavMenu,
                                color: "inherit",
                                children: /*#__PURE__*/ jsx_runtime_.jsx((Menu_default()), {})
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(material_.Menu, {
                                id: "menu-appbar",
                                anchorEl: anchorElNav,
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left"
                                },
                                keepMounted: true,
                                transformOrigin: {
                                    vertical: "top",
                                    horizontal: "left"
                                },
                                open: Boolean(anchorElNav),
                                onClose: handleCloseNavMenu,
                                sx: {
                                    display: {
                                        xs: "block",
                                        md: "none"
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(material_.MenuItem, {
                                        onClick: handleCloseNavMenu,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                            href: "/",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(material_.Typography, {
                                                textAlign: "center",
                                                children: "Home"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(material_.MenuItem, {
                                        onClick: handleCloseNavMenu,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                            href: "/create",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(material_.Typography, {
                                                textAlign: "center",
                                                children: "Create"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(material_.MenuItem, {
                                        onClick: handleCloseNavMenu,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                            href: "/myassets",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(material_.Typography, {
                                                textAlign: "center",
                                                children: "My assets"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(material_.MenuItem, {
                                        onClick: handleCloseNavMenu,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                            href: "/collections",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(material_.Typography, {
                                                textAlign: "center",
                                                children: "collections"
                                            })
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(material_.Box, {
                        sx: {
                            flexGrow: 1,
                            display: {
                                xs: "none",
                                md: "flex"
                            }
                        },
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                href: "/",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(material_.Button, {
                                    onClick: handleCloseNavMenu,
                                    sx: {
                                        my: 2,
                                        color: "white",
                                        display: "block"
                                    },
                                    children: "Home"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                href: "/create",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(material_.Button, {
                                    onClick: handleCloseNavMenu,
                                    sx: {
                                        my: 2,
                                        color: "white",
                                        display: "block"
                                    },
                                    children: "Create"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                href: "/myassets",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(material_.Button, {
                                    onClick: handleCloseNavMenu,
                                    sx: {
                                        my: 2,
                                        color: "white",
                                        display: "block"
                                    },
                                    children: "My assets"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                href: "/collections",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(material_.Button, {
                                    onClick: handleCloseNavMenu,
                                    sx: {
                                        my: 2,
                                        color: "white",
                                        display: "block"
                                    },
                                    children: "collections"
                                })
                            })
                        ]
                    }),
                    address ? `${address.slice(0, 4)}...${address.slice(address.length - 4)}` : /*#__PURE__*/ jsx_runtime_.jsx(material_.Button, {
                        variant: "contained",
                        color: "secondary",
                        onClick: connect,
                        children: "connect"
                    })
                ]
            })
        })
    }));
};
/* harmony default export */ const components_NavBar = (NavBar);

;// CONCATENATED MODULE: external "@mui/material/Container"
const Container_namespaceObject = require("@mui/material/Container");
var Container_default = /*#__PURE__*/__webpack_require__.n(Container_namespaceObject);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
// EXTERNAL MODULE: external "web3modal"
var external_web3modal_ = __webpack_require__(2840);
var external_web3modal_default = /*#__PURE__*/__webpack_require__.n(external_web3modal_);
// EXTERNAL MODULE: external "ethers"
var external_ethers_ = __webpack_require__(1982);
;// CONCATENATED MODULE: ./pages/_app.js








function MyApp({ Component , pageProps  }) {
    const { 0: provider , 1: setProvider  } = (0,external_react_.useState)();
    const { 0: signer , 1: setSigner  } = (0,external_react_.useState)();
    const { 0: address , 1: setAddress  } = (0,external_react_.useState)();
    (0,external_react_.useEffect)(()=>{
        connect();
    }, []);
    async function connect() {
        try {
            const web3Modal = new (external_web3modal_default())();
            const connection = await web3Modal.connect();
            const _provider = new external_ethers_.ethers.providers.Web3Provider(connection);
            const _signer = _provider.getSigner();
            const _address = await _signer.getAddress();
            setProvider(_provider);
            setSigner(_signer);
            setAddress(_address);
        } catch (error) {}
    }
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "NFT MARKET"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: "NFT MARKET"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "icon",
                        href: "/favicon.ico"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components_NavBar, {
                address: address,
                connect: connect
            }),
            signer ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                children: /*#__PURE__*/ jsx_runtime_.jsx((Container_default()), {
                    maxWidth: "lg",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                        signer: signer,
                        provider: provider,
                        address: address,
                        ...pageProps
                    })
                })
            }) : /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                children: "please connect your wallet"
            })
        ]
    }));
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 5692:
/***/ ((module) => {

module.exports = require("@mui/material");

/***/ }),

/***/ 1982:
/***/ ((module) => {

module.exports = require("ethers");

/***/ }),

/***/ 562:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 2840:
/***/ ((module) => {

module.exports = require("web3modal");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [730,664], () => (__webpack_exec__(6123)));
module.exports = __webpack_exports__;

})();