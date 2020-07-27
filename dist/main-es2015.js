(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/@core/core.module.ts":
/*!**************************************!*\
  !*** ./src/app/@core/core.module.ts ***!
  \**************************************/
/*! exports provided: NbSimpleRoleProvider, NB_CORE_PROVIDERS, CoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NbSimpleRoleProvider", function() { return NbSimpleRoleProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NB_CORE_PROVIDERS", function() { return NB_CORE_PROVIDERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreModule", function() { return CoreModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _nebular_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nebular/auth */ "./node_modules/@nebular/auth/fesm2015/index.js");
/* harmony import */ var _nebular_security__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nebular/security */ "./node_modules/@nebular/security/fesm2015/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _module_import_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./module-import-guard */ "./src/app/@core/module-import-guard.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "./src/app/@core/utils/index.ts");
/* harmony import */ var _data_users__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./data/users */ "./src/app/@core/data/users.ts");
/* harmony import */ var _mock_users_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mock/users.service */ "./src/app/@core/mock/users.service.ts");
/* harmony import */ var _mock_mock_data_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mock/mock-data.module */ "./src/app/@core/mock/mock-data.module.ts");









const socialLinks = [
    {
        url: 'https://github.com/akveo/nebular',
        target: '_blank',
        icon: 'github',
    },
    {
        url: 'https://www.facebook.com/akveo/',
        target: '_blank',
        icon: 'facebook',
    },
    {
        url: 'https://twitter.com/akveo_inc',
        target: '_blank',
        icon: 'twitter',
    },
];
const DATA_SERVICES = [
    { provide: _data_users__WEBPACK_IMPORTED_MODULE_6__["UserData"], useClass: _mock_users_service__WEBPACK_IMPORTED_MODULE_7__["UserService"] },
];
class NbSimpleRoleProvider extends _nebular_security__WEBPACK_IMPORTED_MODULE_2__["NbRoleProvider"] {
    getRole() {
        // here you could provide any role based on any auth flow
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])('guest');
    }
}
const NB_CORE_PROVIDERS = [
    ..._mock_mock_data_module__WEBPACK_IMPORTED_MODULE_8__["MockDataModule"].forRoot().providers,
    ...DATA_SERVICES,
    ..._nebular_auth__WEBPACK_IMPORTED_MODULE_1__["NbAuthModule"].forRoot({
        strategies: [
            _nebular_auth__WEBPACK_IMPORTED_MODULE_1__["NbDummyAuthStrategy"].setup({
                name: 'email',
                delay: 3000,
            }),
        ],
        forms: {
            login: {
                socialLinks: socialLinks,
            },
            register: {
                socialLinks: socialLinks,
            },
        },
    }).providers,
    _nebular_security__WEBPACK_IMPORTED_MODULE_2__["NbSecurityModule"].forRoot({
        accessControl: {
            guest: {
                view: '*',
            },
            user: {
                parent: 'guest',
                create: '*',
                edit: '*',
                remove: '*',
            },
        },
    }).providers,
    {
        provide: _nebular_security__WEBPACK_IMPORTED_MODULE_2__["NbRoleProvider"], useClass: NbSimpleRoleProvider,
    },
    _utils__WEBPACK_IMPORTED_MODULE_5__["AnalyticsService"],
    _utils__WEBPACK_IMPORTED_MODULE_5__["LayoutService"],
    _utils__WEBPACK_IMPORTED_MODULE_5__["PlayerService"],
    _utils__WEBPACK_IMPORTED_MODULE_5__["SeoService"],
    _utils__WEBPACK_IMPORTED_MODULE_5__["StateService"],
];
class CoreModule {
    constructor(parentModule) {
        Object(_module_import_guard__WEBPACK_IMPORTED_MODULE_4__["throwIfAlreadyLoaded"])(parentModule, 'CoreModule');
    }
    static forRoot() {
        return {
            ngModule: CoreModule,
            providers: [
                ...NB_CORE_PROVIDERS,
            ],
        };
    }
}


/***/ }),

/***/ "./src/app/@core/data/users.ts":
/*!*************************************!*\
  !*** ./src/app/@core/data/users.ts ***!
  \*************************************/
/*! exports provided: UserData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserData", function() { return UserData; });
class UserData {
}


/***/ }),

/***/ "./src/app/@core/mock/mock-data.module.ts":
/*!************************************************!*\
  !*** ./src/app/@core/mock/mock-data.module.ts ***!
  \************************************************/
/*! exports provided: MockDataModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MockDataModule", function() { return MockDataModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./users.service */ "./src/app/@core/mock/users.service.ts");


const SERVICES = [
    _users_service__WEBPACK_IMPORTED_MODULE_1__["UserService"],
];
class MockDataModule {
    static forRoot() {
        return {
            ngModule: MockDataModule,
            providers: [
                ...SERVICES,
            ],
        };
    }
}


/***/ }),

/***/ "./src/app/@core/mock/users.service.ts":
/*!*********************************************!*\
  !*** ./src/app/@core/mock/users.service.ts ***!
  \*********************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _data_users__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/users */ "./src/app/@core/data/users.ts");


class UserService extends _data_users__WEBPACK_IMPORTED_MODULE_1__["UserData"] {
    constructor() {
        super(...arguments);
        this.users = {
            nick: { name: 'Nick Jones', picture: 'assets/images/nick.png' },
            eva: { name: 'Eva Moor', picture: 'assets/images/eva.png' },
            jack: { name: 'Jack Williams', picture: 'assets/images/jack.png' },
            lee: { name: 'Lee Wong', picture: 'assets/images/lee.png' },
            alan: { name: 'Alan Thompson', picture: 'assets/images/alan.png' },
            kate: { name: 'Kate Martinez', picture: 'assets/images/kate.png' },
        };
        /*   private types = {
            mobile: 'mobile',
            home: 'home',
            work: 'work',
          }; */
        this.contacts = [
        /* { user: this.users.nick, type: this.types.mobile },
        { user: this.users.eva, type: this.types.home },
        { user: this.users.jack, type: this.types.mobile },
        { user: this.users.lee, type: this.types.mobile },
        { user: this.users.alan, type: this.types.home },
        { user: this.users.kate, type: this.types.work }, */
        ];
        this.recentUsers = [
        /* { user: this.users.alan, type: this.types.home, time: this.time.setHours(21, 12)},
        { user: this.users.eva, type: this.types.home, time: this.time.setHours(17, 45)},
        { user: this.users.nick, type: this.types.mobile, time: this.time.setHours(5, 29)},
        { user: this.users.lee, type: this.types.mobile, time: this.time.setHours(11, 24)},
        { user: this.users.jack, type: this.types.mobile, time: this.time.setHours(10, 45)},
        { user: this.users.kate, type: this.types.work, time: this.time.setHours(9, 42)},
        { user: this.users.kate, type: this.types.work, time: this.time.setHours(9, 31)},
        { user: this.users.jack, type: this.types.mobile, time: this.time.setHours(8, 0)}, */
        ];
    }
    getUsers() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(this.users);
    }
    getContacts() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(this.contacts);
    }
    getRecentUsers() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(this.recentUsers);
    }
}


/***/ }),

/***/ "./src/app/@core/module-import-guard.ts":
/*!**********************************************!*\
  !*** ./src/app/@core/module-import-guard.ts ***!
  \**********************************************/
/*! exports provided: throwIfAlreadyLoaded */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throwIfAlreadyLoaded", function() { return throwIfAlreadyLoaded; });
function throwIfAlreadyLoaded(parentModule, moduleName) {
    if (parentModule) {
        throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
    }
}


/***/ }),

/***/ "./src/app/@core/utils/analytics.service.ts":
/*!**************************************************!*\
  !*** ./src/app/@core/utils/analytics.service.ts ***!
  \**************************************************/
/*! exports provided: AnalyticsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsService", function() { return AnalyticsService; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");



class AnalyticsService {
    constructor(location, router) {
        this.location = location;
        this.router = router;
        this.enabled = false;
    }
    trackPageViews() {
        if (this.enabled) {
            this.router.events.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])((event) => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_0__["NavigationEnd"]))
                .subscribe(() => {
                ga('send', { hitType: 'pageview', page: this.location.path() });
            });
        }
    }
    trackEvent(eventName) {
        if (this.enabled) {
            ga('send', 'event', eventName);
        }
    }
}


/***/ }),

/***/ "./src/app/@core/utils/index.ts":
/*!**************************************!*\
  !*** ./src/app/@core/utils/index.ts ***!
  \**************************************/
/*! exports provided: LayoutService, AnalyticsService, PlayerService, SeoService, StateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layout_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout.service */ "./src/app/@core/utils/layout.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutService", function() { return _layout_service__WEBPACK_IMPORTED_MODULE_0__["LayoutService"]; });

/* harmony import */ var _analytics_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./analytics.service */ "./src/app/@core/utils/analytics.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnalyticsService", function() { return _analytics_service__WEBPACK_IMPORTED_MODULE_1__["AnalyticsService"]; });

/* harmony import */ var _player_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player.service */ "./src/app/@core/utils/player.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlayerService", function() { return _player_service__WEBPACK_IMPORTED_MODULE_2__["PlayerService"]; });

/* harmony import */ var _state_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state.service */ "./src/app/@core/utils/state.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StateService", function() { return _state_service__WEBPACK_IMPORTED_MODULE_3__["StateService"]; });

/* harmony import */ var _seo_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./seo.service */ "./src/app/@core/utils/seo.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SeoService", function() { return _seo_service__WEBPACK_IMPORTED_MODULE_4__["SeoService"]; });









/***/ }),

/***/ "./src/app/@core/utils/layout.service.ts":
/*!***********************************************!*\
  !*** ./src/app/@core/utils/layout.service.ts ***!
  \***********************************************/
/*! exports provided: LayoutService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutService", function() { return LayoutService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");


class LayoutService {
    constructor() {
        this.layoutSize$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    }
    changeLayoutSize() {
        this.layoutSize$.next();
    }
    onChangeLayoutSize() {
        return this.layoutSize$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["delay"])(1));
    }
}


/***/ }),

/***/ "./src/app/@core/utils/player.service.ts":
/*!***********************************************!*\
  !*** ./src/app/@core/utils/player.service.ts ***!
  \***********************************************/
/*! exports provided: Track, PlayerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Track", function() { return Track; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerService", function() { return PlayerService; });
class Track {
}
class PlayerService {
    constructor() {
        this.playlist = [
            {
                name: 'Don\'t Wanna Fight',
                artist: 'Alabama Shakes',
                url: 'https://p.scdn.co/mp3-preview/6156cdbca425a894972c02fca9d76c0b70e001af',
                cover: 'assets/images/cover1.jpg',
            },
            {
                name: 'Harder',
                artist: 'Daft Punk',
                url: 'https://p.scdn.co/mp3-preview/92a04c7c0e96bf93a1b1b1cae7dfff1921969a7b',
                cover: 'assets/images/cover2.jpg',
            },
            {
                name: 'Come Together',
                artist: 'Beatles',
                url: 'https://p.scdn.co/mp3-preview/83090a4db6899eaca689ae35f69126dbe65d94c9',
                cover: 'assets/images/cover3.jpg',
            },
        ];
    }
    random() {
        this.current = Math.floor(Math.random() * this.playlist.length);
        return this.playlist[this.current];
    }
    next() {
        return this.getNextTrack();
    }
    prev() {
        return this.getPrevTrack();
    }
    getNextTrack() {
        if (this.current === this.playlist.length - 1) {
            this.current = 0;
        }
        else {
            this.current++;
        }
        return this.playlist[this.current];
    }
    getPrevTrack() {
        if (this.current === 0) {
            this.current = this.playlist.length - 1;
        }
        else {
            this.current--;
        }
        return this.playlist[this.current];
    }
}


/***/ }),

/***/ "./src/app/@core/utils/seo.service.ts":
/*!********************************************!*\
  !*** ./src/app/@core/utils/seo.service.ts ***!
  \********************************************/
/*! exports provided: SeoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SeoService", function() { return SeoService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");





class SeoService {
    constructor(router, document, platformId) {
        this.router = router;
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.isBrowser = Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformBrowser"])(platformId);
        this.dom = document;
        if (this.isBrowser) {
            this.createCanonicalTag();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    createCanonicalTag() {
        this.linkCanonical = this.dom.createElement('link');
        this.linkCanonical.setAttribute('rel', 'canonical');
        this.dom.head.appendChild(this.linkCanonical);
        this.linkCanonical.setAttribute('href', this.getCanonicalUrl());
    }
    trackCanonicalChanges() {
        if (!this.isBrowser) {
            return;
        }
        this.router.events.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])((event) => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroy$))
            .subscribe(() => {
            this.linkCanonical.setAttribute('href', this.getCanonicalUrl());
        });
    }
    getCanonicalUrl() {
        return this.dom.location.origin + this.dom.location.pathname;
    }
}


/***/ }),

/***/ "./src/app/@core/utils/state.service.ts":
/*!**********************************************!*\
  !*** ./src/app/@core/utils/state.service.ts ***!
  \**********************************************/
/*! exports provided: StateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateService", function() { return StateService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nebular/theme */ "./node_modules/@nebular/theme/fesm2015/index.js");




class StateService {
    constructor(directionService) {
        this.layouts = [
            {
                name: 'One Column',
                icon: 'nb-layout-default',
                id: 'one-column',
                selected: true,
            },
            {
                name: 'Two Column',
                icon: 'nb-layout-two-column',
                id: 'two-column',
            },
            {
                name: 'Center Column',
                icon: 'nb-layout-centre',
                id: 'center-column',
            },
        ];
        this.sidebars = [
            {
                name: 'Sidebar at layout start',
                icon: 'nb-layout-sidebar-left',
                id: 'start',
                selected: true,
            },
            {
                name: 'Sidebar at layout end',
                icon: 'nb-layout-sidebar-right',
                id: 'end',
            },
        ];
        this.layoutState$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](this.layouts[0]);
        this.sidebarState$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](this.sidebars[0]);
        this.alive = true;
        directionService.onDirectionChange()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeWhile"])(() => this.alive))
            .subscribe(direction => this.updateSidebarIcons(direction));
        this.updateSidebarIcons(directionService.getDirection());
    }
    ngOnDestroy() {
        this.alive = false;
    }
    updateSidebarIcons(direction) {
        const [startSidebar, endSidebar] = this.sidebars;
        const isLtr = direction === _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbLayoutDirection"].LTR;
        const startIconClass = isLtr ? 'nb-layout-sidebar-left' : 'nb-layout-sidebar-right';
        const endIconClass = isLtr ? 'nb-layout-sidebar-right' : 'nb-layout-sidebar-left';
        startSidebar.icon = startIconClass;
        endSidebar.icon = endIconClass;
    }
    setLayoutState(state) {
        this.layoutState$.next(state);
    }
    getLayoutStates() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(this.layouts);
    }
    onLayoutState() {
        return this.layoutState$.asObservable();
    }
    setSidebarState(state) {
        this.sidebarState$.next(state);
    }
    getSidebarStates() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(this.sidebars);
    }
    onSidebarState() {
        return this.sidebarState$.asObservable();
    }
}


/***/ }),

/***/ "./src/app/@core/utils/web-api.ts":
/*!****************************************!*\
  !*** ./src/app/@core/utils/web-api.ts ***!
  \****************************************/
/*! exports provided: WebApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebApi", function() { return WebApi; });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");

var WebApi;
(function (WebApi) {
    class TWQXOrganizationApi {
    }
    TWQXOrganizationApi.connectTest = (orgId, typ) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/org/connectTest?orgId=${orgId}&typ=${typ}`;
    TWQXOrganizationApi.getTOeUsersNotInOrganization = (orgId) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/org/getTOeUsersNotInOrganization?orgId=${orgId}`;
    TWQXOrganizationApi.getTOeUsersInOrganization = (orgId) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/org/getTOeUsersInOrganization?orgId=${orgId}`;
    TWQXOrganizationApi.getTWqxRefData = (table, actInd, usedInd) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/org/getTWqxRefData?table=${table}&actInd=${actInd}&usedInd=${usedInd}`;
    TWQXOrganizationApi.approveRejectTWqxUserOrgs = (orgID, userIDX, ApproveRejectCode) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/org/ApproveRejectTWqxUserOrgs?orgID=${orgID}&userIDX=${userIDX}&ApproveRejectCode=${ApproveRejectCode}`;
    TWQXOrganizationApi.getUserOrgsByUserIDX = (userIDX, excludePendingInd) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/org/getUserOrgsByUserIDX?userIDX=${userIDX}&excludePendingInd=${excludePendingInd}`;
    TWQXOrganizationApi.getVWQXAllOrgs = () => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/org/getVWQXAllOrgs`;
    TWQXOrganizationApi.GetWQXOrganizationById = (orgID) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/org/GetWQXOrganizationById?OrgID=${orgID}`;
    TWQXOrganizationApi.getTEPAOrgByOrgId = (orgID) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/org/GetT_EPA_ORGS_ByOrgID?OrgID=${orgID}`;
    TWQXOrganizationApi.InsertOrUpdateTWQXOrganization = (oRG_ID, oRG_NAME, oRG_DESC, tRIBAL_CODE, eLECTRONIC_ADDRESS, eLECTRONICADDRESSTYPE, tELEPHONE_NUM, tELEPHONE_NUM_TYPE, TELEPHONE_EXT, cDX_SUBMITTER_ID, cDX_SUBMITTER_PWD, cDX_SUBMIT_IND, dEFAULT_TIMEZONE, cREATE_USER, mAIL_ADDRESS, mAIL_ADD_CITY, mAIL_ADD_STATE, mAIL_ADD_ZIP) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/org/InsertOrUpdateTWQXOrganization?oRG_ID=${oRG_ID}&oRG_NAME=${oRG_NAME}&oRG_DESC=${oRG_DESC}&tRIBAL_CODE=${tRIBAL_CODE}&eLECTRONIC_ADDRESS=${eLECTRONIC_ADDRESS}&eLECTRONICADDRESSTYPE=${eLECTRONICADDRESSTYPE}&tELEPHONE_NUM=${tELEPHONE_NUM}&tELEPHONE_NUM_TYPE=${tELEPHONE_NUM_TYPE}&TELEPHONE_EXT=${TELEPHONE_EXT}&cDX_SUBMITTER_ID=${cDX_SUBMITTER_ID}&cDX_SUBMITTER_PWD=${cDX_SUBMITTER_PWD}&cDX_SUBMIT_IND=${cDX_SUBMIT_IND}&dEFAULT_TIMEZONE=${dEFAULT_TIMEZONE}&cREATE_USER=${cREATE_USER}&mAIL_ADDRESS=${mAIL_ADDRESS}&mAIL_ADD_CITY=${mAIL_ADD_CITY}&mAIL_ADD_STATE=${mAIL_ADD_STATE}&mAIL_ADD_ZIP=${mAIL_ADD_ZIP}`;
    TWQXOrganizationApi.GetWQXUserOrgsAdminsByOrg = (orgID) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/org/GetWQXUserOrgsAdminsByOrg?OrgID=${orgID}`;
    TWQXOrganizationApi.insertTWQXUserOrgs = (orgID, userIDX, roleCD, createUser) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/org/InsertTWQXUserOrgs?oRG_ID=${orgID}&uSER_IDX=${userIDX}&rOLE_CD=${roleCD}&cREATE_USER=${createUser}`;
    TWQXOrganizationApi.deleteTWqxUserOrgs = (orgID, userIDX) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/org/deleteTWqxUserOrgs?orgId=${orgID}&userIdx=${userIDX}`;
    TWQXOrganizationApi.getAdminTaskData = (userName, OrgID) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/org/GetAdminTaskData?userName=${userName}&OrgID=${OrgID}`;
    TWQXOrganizationApi.GetWqxImportTranslatebyOrg = (orgId) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/org/GetWqxImportTranslatebyOrg?orgId=${orgId}`;
    TWQXOrganizationApi.canUserEditOrg = (userIdx, orgId) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/org/canUserEditOrg?UserIDX=${userIdx}&OrgID=${orgId}`;
    WebApi.TWQXOrganizationApi = TWQXOrganizationApi;
    class TWQXMonlocApi {
    }
    TWQXMonlocApi.getWQXMonLoc = (actInd, orgId, wqxPending) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/monloc/getWQXMonLoc?ActInd=${actInd}&OrgID=${orgId}&WQXPending=${wqxPending}`;
    TWQXMonlocApi.GetWQXMonLocByID = (monlocIdx) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/monloc/GetWQXMonLocByID?MonLocIDX=${monlocIdx}`;
    TWQXMonlocApi.getWqxMonlocByOrgId = (orgId) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/monloc/getWqxMonlocByOrgId?OrgID=${orgId}`;
    WebApi.TWQXMonlocApi = TWQXMonlocApi;
    class TWQXProjectApi {
    }
    TWQXProjectApi.getAllProjects = () => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/project/getAllProjects`;
    TWQXProjectApi.getWQXProjectMyOrgCount = (userIDX) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/project/getWQXProjectMyOrgCount?UserIDX=${userIDX}`;
    TWQXProjectApi.getWQXMonLocMyOrgCount = (userIDX) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/monloc/getWQXMonlocMyOrgCount?UserIDX=${userIDX}`;
    TWQXProjectApi.getWqxProject = (actInd, orgId, wqxPending) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/project/getWqxProject?ActInd=${actInd}&OrgID=${orgId}&WQXPending=${wqxPending}`;
    TWQXProjectApi.getWQXProjectByID = (projectIdx) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/project/getWQXProjectByID?ProjectIDX=${projectIdx}`;
    TWQXProjectApi.InsertOrUpdateWQXProject = (projectIdx, orgId, projectId, projectName, projectDesc, sampDesignTypeCd, qAppApprovalInd, qAppApprovalAgency, wQxSubmitStatus, wQxSubmitDt, actInd, wqxInd, createUser) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/project/InsertOrUpdateWQXProject?pROJECT_IDX=${projectIdx}&oRG_ID=${orgId}&pROJECT_ID=${projectId}&pROJECT_NAME=${projectName}&pROJECT_DESC=${projectDesc}&sAMP_DESIGN_TYPE_CD=${sampDesignTypeCd}&qAPP_APPROVAL_IND=${qAppApprovalInd}&qAPP_APPROVAL_AGENCY=${qAppApprovalAgency}&wQX_SUBMIT_STATUS=${wQxSubmitStatus}&wQX_SUBMIT_DT=${wQxSubmitDt}&aCT_IND=${actInd}&wQX_IND=${wqxInd}&cREATE_USER=${createUser}`;
    WebApi.TWQXProjectApi = TWQXProjectApi;
    class TWQXActivityApi {
    }
    TWQXActivityApi.getAllActivities = (ActInd, OrgID, MonLocIDX, startDt, endDt, ActType, WQXPending, ProjectIDX) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/activity/getAllActivities?ActInd=${ActInd}&OrgID=${OrgID}&MonLocIDX=${MonLocIDX}&startDt=${startDt}&endDt=${endDt}&ActType=${ActType}&WQXPending=${WQXPending}&ProjectIDX=${ProjectIDX}`;
    TWQXActivityApi.getTWQXResulTCount = (OrgID) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/activity/getTWQXResulTCount?OrgID=${OrgID}`;
    TWQXActivityApi.getWQXActivityMyOrgCount = (userIDX) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/activity/getWQXActivityMyOrgCount?UserIDX=${userIDX}`;
    TWQXActivityApi.getWqxActivityDisplay = (actInd, orgId, monLocIdx, startDt, endDt, actType, wQXPending, projectIdx, wQXStatus) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/activity/getWqxActivityDisplay?ActInd=${actInd}&OrgID=${orgId}&MonLocIDX=${monLocIdx}&startDt=${startDt}&endDt=${endDt}&ActType=${actType}&WQXPending=${wQXPending}&ProjectIDX=${projectIdx}&WQXStatus=${wQXStatus}`;
    TWQXActivityApi.deleteTWqxActivity = (activityIdx, userId) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/activity/deleteTWqxActivity?ActivityIDX=${activityIdx}&UserID=${userId}`;
    TWQXActivityApi.getTWqxRefDataActivityTypeUsed = (orgId) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/activity/getTWqxRefDataActivityTypeUsed?OrgID=${orgId}`;
    TWQXActivityApi.getWqxActivityById = (activityIdx) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/activity/getWqxActivityById?ActivityIDX=${activityIdx}`;
    TWQXActivityApi.getTWqxResult = (activityIdx) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/activity/getTWqxResult?ActivityIDX=${activityIdx}`;
    WebApi.TWQXActivityApi = TWQXActivityApi;
    class TWQXRefDataApi {
    }
    TWQXRefDataApi.getTWqxRefDefaultTimeZone = () => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/getTWqxRefDefaultTimeZone`;
    TWQXRefDataApi.InsertOrUpdateTWQXOrganization = (orgId, orgName, orgDesc, tribalCode, electronicAddress, electtronicAddressType, telephoneNum, telephoneNumType, telephoneExt, cdxSubmitterId, cdxSubmitterPWD, cdxSubmitterInd, defaultTimeZone, createUser, mailAddress, mailAddCity, mailAddState, mailAddZip) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/org/InsertOrUpdateTWQXOrganization?oRG_ID=${orgId}&oRG_NAME=${orgName}&oRG_DESC=${orgDesc}&tRIBAL_CODE=${tribalCode}&eLECTRONIC_ADDRESS=${electronicAddress}&eLECTRONICADDRESSTYPE=${electtronicAddressType}&tELEPHONE_NUM=${telephoneNum}&tELEPHONE_NUM_TYPE=${telephoneNumType}&TELEPHONE_EXT=${telephoneExt}&cDX_SUBMITTER_ID=${cdxSubmitterId}&cDX_SUBMITTER_PWD=${cdxSubmitterPWD}&cDX_SUBMIT_IND=${cdxSubmitterInd}&dEFAULT_TIMEZONE=${defaultTimeZone}&cREATE_USER=${createUser}&mAIL_ADDRESS${mailAddress}&mAIL_ADD_CITY=${mailAddCity}&mAIL_ADD_STATE=${mailAddState}&mAIL_ADD_ZIP=${mailAddZip}`;
    TWQXRefDataApi.GetTWqxRefCharacteristic = (actInd, onlyUsedInd) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/GetTWqxRefCharacteristic?ActInd=${actInd}&onlyUsedInd=${onlyUsedInd}`;
    TWQXRefDataApi.GetTWqxRefAnalMethod = (actInd) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/GetTWqxRefAnalMethod?ActInd=${actInd}`;
    TWQXRefDataApi.GetTWqxRefData = (table, actInd, usedInd) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/GetTWqxRefData?table=${table}&actInd=${actInd}&usedInd=${usedInd}`;
    TWQXRefDataApi.InsertOrUpdateTWqxRefCharOrg = (charName, orgName, createUserId, defaultDetectLimit, defaultUnit, defaultAnalMethodIdx, defaultSampFraction, defaultResultStatus, defaultResultTypeValue, defaultLowerQuantLimit, defaultUpperQuantLimit) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/InsertOrUpdateTWqxRefCharOrg?charName=${charName}&orgName=${orgName}&createUserId=${createUserId}&defaultDetectLimit=${defaultDetectLimit}&defaultUnit=${defaultUnit}&defaultAnalMethodIdx=${defaultAnalMethodIdx}&defaultSampFraction=${defaultSampFraction}&defaultResultStatus=${defaultResultStatus}&defaultResultTypeValue=${defaultResultTypeValue}&defaultLowerQuantLimit=${defaultLowerQuantLimit}&defaultUpperQuantLimit=${defaultUpperQuantLimit}`;
    TWQXRefDataApi.insertOrUpdateTWqxRefTaxaOrg = (bioSubjectTaxanomy, orgName, createUserId) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/insertOrUpdateTWqxRefTaxaOrg?bioSubjectTaxanomy=${bioSubjectTaxanomy}&orgName=${orgName}&createUserId=${createUserId}`;
    TWQXRefDataApi.GetTWqxRefTaxaOrg = (orgName) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/GetTWqxRefTaxaOrg?orgName=${orgName}`;
    TWQXRefDataApi.getAllColumnBasic = (importType) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/getAllColumnBasic?importType=${importType}`;
    TWQXRefDataApi.insertOrUpdateWqxImportTranslate = (translateIdx, orgId, colName, dataFrom, dataTo, createUser) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/insertOrUpdateWqxImportTranslate?translateIdx=${translateIdx}&orgId=${orgId}&colName=${colName}&dataFrom=${dataFrom}&dataTo=${dataTo}&createUser=${createUser}`;
    TWQXRefDataApi.GetTWqxRefCharOrg = (orgName) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/GetTWqxRefCharOrg?orgName=${orgName}`;
    TWQXRefDataApi.GetTWqxRefCounty = (stateCode) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/GetTWqxRefCounty?stateCode=${stateCode}`;
    TWQXRefDataApi.InsertOrUpdateWQXMonLoc = (monlocIdx, orgId, monlocId, monlocName, monlocType, monlocDesc, hucHeight, hucTwelve, tribalLandInd, tribalLandName, latitudeMsr, longitudeMsr, sourceMapScale, horizAccuracy, horizAccuracyUnit, horizCollMethod, horizRefDatum, vertMeasure, vertMeasureUnit, vertCollMethod, vertRefDatum, countryCode, stateCode, countyCode, wellType, aquiferName, formationType, wellholeDepthMsr, wellholeDepthMsrUnit, wqxSubmitStatus, wqxUpdateDate, actInd, wqxInd, createUser) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/monloc/InsertOrUpdateWQXMonLoc?mONLOC_IDX=${monlocIdx}&oRG_ID=${orgId}&mONLOC_ID=${monlocId}&mONLOC_NAME=${monlocName}&mONLOC_TYPE=${monlocType}&mONLOC_DESC=${monlocDesc}&hUC_EIGHT=${hucHeight}&HUC_TWELVE=${hucTwelve}&tRIBAL_LAND_IND=${tribalLandInd}&tRIBAL_LAND_NAME=${tribalLandName}&lATITUDE_MSR=${latitudeMsr}&lONGITUDE_MSR=${longitudeMsr}&sOURCE_MAP_SCALE=${sourceMapScale}&hORIZ_ACCURACY=${horizAccuracy}&hORIZ_ACCURACY_UNIT=${horizAccuracyUnit}&hORIZ_COLL_METHOD=${horizCollMethod}&hORIZ_REF_DATUM=${horizRefDatum}&vERT_MEASURE=${vertMeasure}&vERT_MEASURE_UNIT=${vertMeasureUnit}&vERT_COLL_METHOD=${vertCollMethod}&vERT_REF_DATUM=${vertRefDatum}&cOUNTRY_CODE=${countryCode}&sTATE_CODE=${stateCode}&cOUNTY_CODE=${countyCode}&wELL_TYPE=${wellType}&aQUIFER_NAME=${aquiferName}&fORMATION_TYPE=${formationType}&wELLHOLE_DEPTH_MSR=${wellholeDepthMsr}&wELLHOLE_DEPTH_MSR_UNIT=${wellholeDepthMsrUnit}&wQX_SUBMIT_STATUS=${wqxSubmitStatus}&wQXUpdateDate=${wqxUpdateDate}&aCT_IND=${actInd}&wQX_IND=${wqxInd}&cREATE_USER=${createUser}`;
    TWQXRefDataApi.deleteTWqxRefTaxaOrg = (orgName, charName) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/deleteTWqxRefTaxaOrg?orgName=${orgName}&charName=${charName}`;
    TWQXRefDataApi.deleteTWqxImportTranslate = (translateId) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/deleteTWqxImportTranslate?TranslateID=${translateId}`;
    TWQXRefDataApi.deleteWqxRefCharOrg = (orgName, charName) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/deleteWqxRefCharOrg?orgName=${orgName}&charName=${charName}`;
    TWQXRefDataApi.getTWqxRefDataCount = () => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/getTWqxRefDataCount`;
    TWQXRefDataApi.GetTWqxRefCharOrgCount = (orgName) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/getTWqxRefDataCount?orgName=${orgName}`;
    TWQXRefDataApi.GetTWqxRefSampColMethodByContext = (context) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/GetTWqxRefSampColMethodByContext?Context=${context}`;
    TWQXRefDataApi.insertOrUpdateWqxActivity = (activityIdx, orgId, projectIdx, monlocIdx, activityId, actType, actMedia, actSubMedia, actStartDate, actEndDt, actTimeZone, relativeDepthName, actDepthHeightMsr, actDepthHeightMsrUnit, topDepthHeightMsr, topDepthHeightMsrUnit, botDepthHeightMsr, botDepthHeightMsrUnit, depthRefPoint, actComment, bioAssemblageSampled, bioDurationMsr, bioDurationMsrUnit, bioSampComponent, bioSampComponentSeq, bioReachLenMsr, bioReachLenMsrUnit, bioReachWidMsr, bioReachWidMsrUnit, bioPassCount, bioNetType, bioNetAreaMsr, bioNetAreaMsrUnit, bioNetMeshsizeMsr, bioMeshsizeMsrUnit, bioBoatSpeedMsr, bioBoatSpeedMsrUnit, bioCurrSpeedMsr, bioCurrSpeedMsrUnit, bioToxicityTestType, sampCollMethodIdx, sampCollEquip, sampCollEquipComment, sampPrepIdx, sampPrepCountType, sampPrepContColor, sampPrepChemPeserv, sampPrepThermPreserv, sampPrepStorageDesc, wqxSubmitStatus, actInd, wqxInd, creatUser, entryType) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/activity/insertOrUpdateWqxActivity?aCTIVITY_IDX=${activityIdx}&oRG_ID=${orgId}&pROJECT_IDX=${projectIdx}&mONLOC_IDX=${monlocIdx}&aCTIVITY_ID=${activityId}&aCT_TYPE=${actType}&aCT_MEDIA=${actMedia}&aCT_SUBMEDIA=${actSubMedia}&aCT_START_DT=${actStartDate}&aCT_END_DT=${actEndDt}&aCT_TIME_ZONE=${actTimeZone}&rELATIVE_DEPTH_NAME=${relativeDepthName}&aCT_DEPTHHEIGHT_MSR=${actDepthHeightMsr}&aCT_DEPTHHEIGHT_MSR_UNIT=${actDepthHeightMsrUnit}&tOP_DEPTHHEIGHT_MSR${topDepthHeightMsr}&tOP_DEPTHHEIGHT_MSR_UNIT=${topDepthHeightMsrUnit}&bOT_DEPTHHEIGHT_MSR=${botDepthHeightMsr}&bOT_DEPTHHEIGHT_MSR_UNIT=${botDepthHeightMsrUnit}&dEPTH_REF_POINT=${depthRefPoint}&aCT_COMMENT=${actComment}&bIO_ASSEMBLAGE_SAMPLED=${bioAssemblageSampled}&bIO_DURATION_MSR=${bioDurationMsr}&bIO_DURATION_MSR_UNIT=${bioDurationMsrUnit}&bIO_SAMP_COMPONENT=${bioSampComponent}&bIO_SAMP_COMPONENT_SEQ=${bioSampComponentSeq}&bIO_REACH_LEN_MSR=${bioReachLenMsr}&bIO_REACH_LEN_MSR_UNIT=${bioReachLenMsrUnit}&bIO_REACH_WID_MSR=${bioReachWidMsr}&bIO_REACH_WID_MSR_UNIT=${bioReachWidMsrUnit}&bIO_PASS_COUNT=${bioPassCount}&bIO_NET_TYPE=${bioNetType}&bIO_NET_AREA_MSR=${bioNetAreaMsr}&bIO_NET_AREA_MSR_UNIT=${bioNetAreaMsrUnit}&bIO_NET_MESHSIZE_MSR=${bioNetMeshsizeMsr}&bIO_MESHSIZE_MSR_UNIT=${bioMeshsizeMsrUnit}&bIO_BOAT_SPEED_MSR=${bioBoatSpeedMsr}&bIO_BOAT_SPEED_MSR_UNIT=${bioBoatSpeedMsrUnit}&bIO_CURR_SPEED_MSR=${bioCurrSpeedMsr}&bIO_CURR_SPEED_MSR_UNIT=${bioCurrSpeedMsrUnit}&bIO_TOXICITY_TEST_TYPE=${bioToxicityTestType}&sAMP_COLL_METHOD_IDX=${sampCollMethodIdx}&sAMP_COLL_EQUIP=${sampCollEquip}&sAMP_COLL_EQUIP_COMMENT=${sampCollEquipComment}&sAMP_PREP_IDX=${sampPrepIdx}&sAMP_PREP_CONT_TYPE=${sampPrepCountType}&sAMP_PREP_CONT_COLOR=${sampPrepContColor}&sAMP_PREP_CHEM_PRESERV=${sampPrepChemPeserv}&sAMP_PREP_THERM_PRESERV=${sampPrepThermPreserv}&sAMP_PREP_STORAGE_DESC=${sampPrepStorageDesc}&wQX_SUBMIT_STATUS=${wqxSubmitStatus}&aCT_IND=${actInd}&wQX_IND=${wqxInd}&cREATE_USER=${creatUser}&eNTRY_TYPE=${entryType}`;
    TWQXRefDataApi.getTWqxRefCharacteristicByOrg = (orgId, rbpInd) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/getTWqxRefCharacteristicByOrg?OrgID=${orgId}&RBPInd=${rbpInd}`;
    TWQXRefDataApi.insertOrUpdateTWqxResult = (resultIdx, activityIdx, resultDetectCondition, charName, resultSampFraction, resultMsr, resultMsrUnit, resultStatus, resultValueType, resultComment, bioIntentName, bioIndividualId, bioTaxonomy, bioSampleTissueAnatomy, analyticMethodIdx, labIdx, labanalysisStartDt, detectionLimit, pql, lowerQuantLimit, upperQuantLimit, labSampPrepIdx, labSampPrepStartDt, dilutionFactor, freqClassCode, freqClassUnit, createUser) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/insertOrUpdateTWqxResult?rESULT_IDX=${resultIdx}&aCTIVITY_IDX=${activityIdx}&rESULT_DETECT_CONDITION=${resultDetectCondition}&cHAR_NAME=${charName}&rESULT_SAMP_FRACTION=${resultSampFraction}&rESULT_MSR=${resultMsr}&rESULT_MSR_UNIT=${resultMsrUnit}&rESULT_STATUS=${resultStatus}&rESULT_VALUE_TYPE=${resultValueType}&rESULT_COMMENT=${resultComment}&bIO_INTENT_NAME=${bioIntentName}&bIO_INDIVIDUAL_ID=${bioIndividualId}&bIO_TAXONOMY=${bioTaxonomy}&bIO_SAMPLE_TISSUE_ANATOMY=${bioSampleTissueAnatomy}&aNALYTIC_METHOD_IDX=${analyticMethodIdx}&lAB_IDX=${labIdx}&lAB_ANALYSIS_START_DT=${labanalysisStartDt}&dETECTION_LIMIT=${detectionLimit}&pQL=${pql}&lOWER_QUANT_LIMIT=${lowerQuantLimit}&uPPER_QUANT_LIMIT=${upperQuantLimit}&lAB_SAMP_PREP_IDX=${labSampPrepIdx}&lAB_SAMP_PREP_START_DT=${labSampPrepStartDt}&dILUTION_FACTOR=${dilutionFactor}&fREQ_CLASS_CODE=${freqClassCode}&fREQ_CLASS_UNIT=${freqClassUnit}&cREATE_USER=${createUser}`;
    TWQXRefDataApi.getTWqxRefTaxaByOrg = (orgId) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/getTWqxRefTaxaByOrg?OrgID=${orgId}`;
    TWQXRefDataApi.getTWqxRefCharLimitsByNameUnit = (charName, unitName) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/getTWqxRefCharLimitsByNameUnit?CharName=${charName}&UnitName=${unitName}`;
    TWQXRefDataApi.updateWqxActivityWqxStatus = (activityIdx, wqxSubmitStatus, actInd, wqxInd, createUser) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/activity/updateWqxActivityWqxStatus?aCTIVITY_IDX=${activityIdx}&wQX_SUBMIT_STATUS=${wqxSubmitStatus}&aCT_IND=${actInd}&wQX_IND=${wqxInd}&cREATE_USER=${createUser}`;
    TWQXRefDataApi.deleteTWqxResult = (resultIdx) => `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].api.owUrl}/api/refdata/deleteTWqxResult?ResultIdx=${resultIdx}`;
    WebApi.TWQXRefDataApi = TWQXRefDataApi;
})(WebApi || (WebApi = {}));


/***/ }),

/***/ "./src/app/@core/wqx-data/wqx-activity.ts":
/*!************************************************!*\
  !*** ./src/app/@core/wqx-data/wqx-activity.ts ***!
  \************************************************/
/*! exports provided: WqxActivityData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WqxActivityData", function() { return WqxActivityData; });
class WqxActivityData {
}


/***/ }),

/***/ "./src/app/@core/wqx-data/wqx-monloc.ts":
/*!**********************************************!*\
  !*** ./src/app/@core/wqx-data/wqx-monloc.ts ***!
  \**********************************************/
/*! exports provided: WqxMonlocData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WqxMonlocData", function() { return WqxMonlocData; });
class WqxMonlocData {
}


/***/ }),

/***/ "./src/app/@core/wqx-data/wqx-organization.ts":
/*!****************************************************!*\
  !*** ./src/app/@core/wqx-data/wqx-organization.ts ***!
  \****************************************************/
/*! exports provided: WqxOrganizationData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WqxOrganizationData", function() { return WqxOrganizationData; });
class WqxOrganizationData {
}


/***/ }),

/***/ "./src/app/@core/wqx-data/wqx-project.ts":
/*!***********************************************!*\
  !*** ./src/app/@core/wqx-data/wqx-project.ts ***!
  \***********************************************/
/*! exports provided: WqxProjectData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WqxProjectData", function() { return WqxProjectData; });
class WqxProjectData {
}


/***/ }),

/***/ "./src/app/@core/wqx-services/wqx-activity-service.ts":
/*!************************************************************!*\
  !*** ./src/app/@core/wqx-services/wqx-activity-service.ts ***!
  \************************************************************/
/*! exports provided: WQXActivityService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WQXActivityService", function() { return WQXActivityService; });
/* harmony import */ var _wqx_data_wqx_activity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../wqx-data/wqx-activity */ "./src/app/@core/wqx-data/wqx-activity.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _utils_web_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/web-api */ "./src/app/@core/utils/web-api.ts");



class WQXActivityService extends _wqx_data_wqx_activity__WEBPACK_IMPORTED_MODULE_0__["WqxActivityData"] {
    constructor(http) {
        super();
        this.http = http;
    }
    GetWQX_Activities(ActInd, OrgID, MonLocIDX, startDt, endDt, ActType, WQXPending, ProjectIDX) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXActivityApi.getAllActivities(ActInd, OrgID, MonLocIDX, startDt, endDt, ActType, WQXPending, ProjectIDX));
    }
    GetT_WQX_RESULTCount(OrgID) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXActivityApi.getTWQXResulTCount(OrgID));
    }
    getWQXActivityMyOrgCount(userIDX) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXActivityApi.getWQXActivityMyOrgCount(userIDX));
    }
    getWqxActivityDisplay(actInd, orgId, monLocIdx, startDt, endDt, actType, wQXPending, projectIdx, wQXStatus) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXActivityApi.getWqxActivityDisplay(actInd, orgId, monLocIdx, startDt, endDt, actType, wQXPending, projectIdx, wQXStatus));
    }
    DeleteT_WQX_ACTIVITY(activityIdx, userId) {
        return this.http.delete(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXActivityApi.deleteTWqxActivity(activityIdx, userId));
    }
    InsertOrUpdateWQX_ACTIVITY(activityIdx, orgId, projectIdx, monlocIdx, activityId, actType, actMedia, actSubMedia, actStartDate, actEndDt, actTimeZone, relativeDepthName, actDepthHeightMsr, actDepthHeightMsrUnit, topDepthHeightMsr, topDepthHeightMsrUnit, botDepthHeightMsr, botDepthHeightMsrUnit, depthRefPoint, actComment, bioAssemblageSampled, bioDurationMsr, bioDurationMsrUnit, bioSampComponent, bioSampComponentSeq, bioReachLenMsr, bioReachLenMsrUnit, bioReachWidMsr, bioReachWidMsrUnit, bioPassCount, bioNetType, bioNetAreaMsr, bioNetAreaMsrUnit, bioNetMeshsizeMsr, bioMeshsizeMsrUnit, bioBoatSpeedMsr, bioBoatSpeedMsrUnit, bioCurrSpeedMsr, bioCurrSpeedMsrUnit, bioToxicityTestType, sampCollMethodIdx, sampCollEquip, sampCollEquipComment, sampPrepIdx, sampPrepCountType, sampPrepContColor, sampPrepChemPeserv, sampPrepThermPreserv, sampPrepStorageDesc, wqxSubmitStatus, actInd, wqxInd, creatUser, entryType) {
        const httpOptions = {};
        return this.http.post(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXRefDataApi.insertOrUpdateWqxActivity(activityIdx, orgId, projectIdx, monlocIdx, activityId, actType, actMedia, actSubMedia, actStartDate, actEndDt, actTimeZone, relativeDepthName, actDepthHeightMsr, actDepthHeightMsrUnit, topDepthHeightMsr, topDepthHeightMsrUnit, botDepthHeightMsr, botDepthHeightMsrUnit, depthRefPoint, actComment, bioAssemblageSampled, bioDurationMsr, bioDurationMsrUnit, bioSampComponent, bioSampComponentSeq, bioReachLenMsr, bioReachLenMsrUnit, bioReachWidMsr, bioReachWidMsrUnit, bioPassCount, bioNetType, bioNetAreaMsr, bioNetAreaMsrUnit, bioNetMeshsizeMsr, bioMeshsizeMsrUnit, bioBoatSpeedMsr, bioBoatSpeedMsrUnit, bioCurrSpeedMsr, bioCurrSpeedMsrUnit, bioToxicityTestType, sampCollMethodIdx, sampCollEquip, sampCollEquipComment, sampPrepIdx, sampPrepCountType, sampPrepContColor, sampPrepChemPeserv, sampPrepThermPreserv, sampPrepStorageDesc, wqxSubmitStatus, actInd, wqxInd, creatUser, entryType), '', httpOptions);
    }
    GetT_WQX_REF_DATA_ActivityTypeUsed(orgId) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXActivityApi.getTWqxRefDataActivityTypeUsed(orgId));
    }
    GetWQX_ACTIVITY_ByID(activityIdx) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXActivityApi.getWqxActivityById(activityIdx));
    }
    GetT_WQX_RESULT(activityIdx) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXActivityApi.getTWqxResult(activityIdx));
    }
    UpdateWQX_ACTIVITY_WQXStatus(activityIdx, wqxSubmitStatus, actInd, wqxInd, createUser) {
        const httpOptions = {};
        return this.http.put(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXRefDataApi.updateWqxActivityWqxStatus(activityIdx, wqxSubmitStatus, actInd, wqxInd, createUser), '', httpOptions);
    }
}


/***/ }),

/***/ "./src/app/@core/wqx-services/wqx-monloc.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/@core/wqx-services/wqx-monloc.service.ts ***!
  \**********************************************************/
/*! exports provided: WqxMonlocService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WqxMonlocService", function() { return WqxMonlocService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _utils_web_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/web-api */ "./src/app/@core/utils/web-api.ts");
/* harmony import */ var _wqx_data_wqx_monloc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../wqx-data/wqx-monloc */ "./src/app/@core/wqx-data/wqx-monloc.ts");



class WqxMonlocService extends _wqx_data_wqx_monloc__WEBPACK_IMPORTED_MODULE_2__["WqxMonlocData"] {
    constructor(http) {
        super();
        this.http = http;
    }
    GetWQX_MONLOC(ActInd, OrgID, WQXPending) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_1__["WebApi"].TWQXMonlocApi.getWQXMonLoc(ActInd, OrgID, WQXPending));
    }
    InsertOrUpdateWQX_MONLOC(monlocIdx, orgId, monlocId, monlocName, monlocType, monlocDesc, hucHeight, hucTwelve, tribalLandInd, tribalLandName, latitudeMsr, longitudeMsr, sourceMapScale, horizAccuracy, horizAccuracyUnit, horizCollMethod, horizRefDatum, vertMeasure, vertMeasureUnit, vertCollMethod, vertRefDatum, countryCode, stateCode, countyCode, wellType, aquiferName, formationType, wellholeDepthMsr, wellholeDepthMsrUnit, wqxSubmitStatus, wqxUpdateDate, actInd, wqxInd, createUser) {
        const httpOptions = {};
        return this.http.post(_utils_web_api__WEBPACK_IMPORTED_MODULE_1__["WebApi"].TWQXRefDataApi.InsertOrUpdateWQXMonLoc(monlocIdx, orgId, monlocId, monlocName, monlocType, monlocDesc, hucHeight, hucTwelve, tribalLandInd, tribalLandName, latitudeMsr, longitudeMsr, sourceMapScale, horizAccuracy, horizAccuracyUnit, horizCollMethod, horizRefDatum, vertMeasure, vertMeasureUnit, vertCollMethod, vertRefDatum, countryCode, stateCode, countyCode, wellType, aquiferName, formationType, wellholeDepthMsr, wellholeDepthMsrUnit, wqxSubmitStatus, wqxUpdateDate, actInd, wqxInd, createUser), '', httpOptions);
    }
    GetWQX_MONLOC_ByID(monlocIdx) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_1__["WebApi"].TWQXMonlocApi.GetWQXMonLocByID(monlocIdx));
    }
    GetWQX_MONLOC_ByOrgID(orgId) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_1__["WebApi"].TWQXMonlocApi.getWqxMonlocByOrgId(orgId));
    }
}


/***/ }),

/***/ "./src/app/@core/wqx-services/wqx-organization-service.ts":
/*!****************************************************************!*\
  !*** ./src/app/@core/wqx-services/wqx-organization-service.ts ***!
  \****************************************************************/
/*! exports provided: WQXOrganizationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WQXOrganizationService", function() { return WQXOrganizationService; });
/* harmony import */ var _wqx_data_wqx_organization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../wqx-data/wqx-organization */ "./src/app/@core/wqx-data/wqx-organization.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _utils_web_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/web-api */ "./src/app/@core/utils/web-api.ts");



class WQXOrganizationService extends _wqx_data_wqx_organization__WEBPACK_IMPORTED_MODULE_0__["WqxOrganizationData"] {
    constructor(http) {
        super();
        this.http = http;
    }
    ConnectTestResult(orgId, typ) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXOrganizationApi.connectTest(orgId, typ));
    }
    GetWQX_USER_ORGS_ByUserIDX(userIDX, excludePendingInd) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXOrganizationApi.getUserOrgsByUserIDX(userIDX, excludePendingInd));
    }
    GetWQX_USER_ORGS_AdminsByOrg(OrgID) {
    }
    GetWQX_ORGANIZATION_ByID(orgID) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXOrganizationApi.GetWQXOrganizationById(orgID));
    }
    ApproveRejectTWqxUserOrgs(orgID, userIDX, ApproveRejectCode) {
        const httpOptions = {};
        return this.http.post(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXOrganizationApi.approveRejectTWqxUserOrgs(orgID, userIDX, ApproveRejectCode), '', httpOptions);
    }
    getVWQXAllOrgs() {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXOrganizationApi.getVWQXAllOrgs());
    }
    getAdminTaskData(userName, OrgID) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXOrganizationApi.getAdminTaskData(userName, OrgID));
    }
    getWQXOrganizationById(orgID) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXOrganizationApi.GetWQXOrganizationById(orgID));
    }
    getTEPAOrgsByOrgId(userIDX) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXOrganizationApi.getTEPAOrgByOrgId(userIDX));
    }
    InsertOrUpdateTWQXOrganization(oRG_ID, oRG_NAME, oRG_DESC, tRIBAL_CODE, eLECTRONIC_ADDRESS, eLECTRONICADDRESSTYPE, tELEPHONE_NUM, tELEPHONE_NUM_TYPE, TELEPHONE_EXT, cDX_SUBMITTER_ID, cDX_SUBMITTER_PWD, cDX_SUBMIT_IND, dEFAULT_TIMEZONE, cREATE_USER, mAIL_ADDRESS, mAIL_ADD_CITY, mAIL_ADD_STATE, mAIL_ADD_ZIP) {
        const httpOptions = {};
        return this.http.post(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXOrganizationApi.InsertOrUpdateTWQXOrganization(oRG_ID, oRG_NAME, oRG_DESC, tRIBAL_CODE, eLECTRONIC_ADDRESS, eLECTRONICADDRESSTYPE, tELEPHONE_NUM, tELEPHONE_NUM_TYPE, TELEPHONE_EXT, cDX_SUBMITTER_ID, cDX_SUBMITTER_PWD, cDX_SUBMIT_IND, dEFAULT_TIMEZONE, cREATE_USER, mAIL_ADDRESS, mAIL_ADD_CITY, mAIL_ADD_STATE, mAIL_ADD_ZIP), '', httpOptions);
    }
    getWQXUserOrgsAdminsByOrg(orgID) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXOrganizationApi.GetWQXUserOrgsAdminsByOrg(orgID));
    }
    insertTWQXUserOrgs(orgID, userIDX, roleCD, createUser) {
        const httpOptions = {};
        return this.http.post(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXOrganizationApi.insertTWQXUserOrgs(orgID, userIDX, roleCD, createUser), '', httpOptions);
    }
    GetT_WQX_REF_DATA(table, actInd, usedInd) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXOrganizationApi.getTWqxRefData(table, actInd, usedInd));
    }
    GetT_OE_USERSInOrganization(orgId) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXOrganizationApi.getTOeUsersInOrganization(orgId));
    }
    GetT_OE_USERSNotInOrganization(orgId) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXOrganizationApi.getTOeUsersNotInOrganization(orgId));
    }
    deleteTWqxUserOrgs(orgId, userIdx) {
        const httpOptions = {};
        return this.http.post(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXOrganizationApi.deleteTWqxUserOrgs(orgId, userIdx), '', httpOptions);
    }
    GetWQX_IMPORT_TRANSLATE_byOrg(orgId) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXOrganizationApi.GetWqxImportTranslatebyOrg(orgId));
    }
    CanUserEditOrg(userIdx, orgId) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXOrganizationApi.canUserEditOrg(userIdx, orgId));
    }
}


/***/ }),

/***/ "./src/app/@core/wqx-services/wqx-project-service.ts":
/*!***********************************************************!*\
  !*** ./src/app/@core/wqx-services/wqx-project-service.ts ***!
  \***********************************************************/
/*! exports provided: WQXProjectService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WQXProjectService", function() { return WQXProjectService; });
/* harmony import */ var _wqx_data_wqx_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../wqx-data/wqx-project */ "./src/app/@core/wqx-data/wqx-project.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _utils_web_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/web-api */ "./src/app/@core/utils/web-api.ts");



class WQXProjectService extends _wqx_data_wqx_project__WEBPACK_IMPORTED_MODULE_0__["WqxProjectData"] {
    constructor(http) {
        super();
        this.http = http;
    }
    GetWQX_PROJECTS() {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXProjectApi.getAllProjects());
    }
    GetWQXProjectMyOrgCount(userIDX) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXProjectApi.getWQXProjectMyOrgCount(userIDX));
    }
    GetWQXMonlocMyOrgCount(userIDX) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXProjectApi.getWQXMonLocMyOrgCount(userIDX));
    }
    GetWQX_PROJECT(actInd, orgId, wqxPending) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXProjectApi.getWqxProject(actInd, orgId, wqxPending));
    }
    GetWQX_PROJECT_ByID(projectIdx) {
        return this.http.get(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXProjectApi.getWQXProjectByID(projectIdx));
    }
    InsertOrUpdateWQX_PROJECT(projectIdx, orgId, projectId, projectName, projectDesc, sampDesignTypeCd, qAppApprovalInd, qAppApprovalAgency, wQxSubmitStatus, wQxSubmitDt, actInd, wqxInd, createUser) {
        const httpOptions = {};
        return this.http.post(_utils_web_api__WEBPACK_IMPORTED_MODULE_2__["WebApi"].TWQXProjectApi.InsertOrUpdateWQXProject(projectIdx, orgId, projectId, projectName, projectDesc, sampDesignTypeCd, qAppApprovalInd, qAppApprovalAgency, wQxSubmitStatus, wQxSubmitDt, actInd, wqxInd, createUser), '', httpOptions);
    }
}


/***/ }),

/***/ "./src/app/@core/wqx-services/wqx-pubsub-service.service.ts":
/*!******************************************************************!*\
  !*** ./src/app/@core/wqx-services/wqx-pubsub-service.service.ts ***!
  \******************************************************************/
/*! exports provided: WqxPubsubServiceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WqxPubsubServiceService", function() { return WqxPubsubServiceService; });
/* harmony import */ var rxjs_internal_ReplaySubject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/internal/ReplaySubject */ "./node_modules/rxjs/internal/ReplaySubject.js");
/* harmony import */ var rxjs_internal_ReplaySubject__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_ReplaySubject__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


class WqxPubsubServiceService {
    constructor() {
        this.loadData = new rxjs_internal_ReplaySubject__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"]();
        this.fieldData = new rxjs_internal_ReplaySubject__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"]();
        this.charData = new rxjs_internal_ReplaySubject__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"]();
        this.monlocChkData = new rxjs_internal_ReplaySubject__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"]();
        this.projectChkData = new rxjs_internal_ReplaySubject__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"]();
        this.activityChkData = new rxjs_internal_ReplaySubject__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"]();
    }
    setData(data) {
        this.loadData.next(data);
    }
    fieldChanged(data) {
        this.fieldData.next(data);
    }
    charChanged(data) {
        this.fieldData.next(data);
    }
    setMonLocData(data) {
        this.monlocChkData.next(data);
    }
    setProjectData(data) {
        this.projectChkData.next(data);
    }
    setActivityData(data) {
        this.activityChkData.next(data);
    }
}
WqxPubsubServiceService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ factory: function WqxPubsubServiceService_Factory() { return new WqxPubsubServiceService(); }, token: WqxPubsubServiceService, providedIn: "root" });


/***/ }),

/***/ "./src/app/@theme/components/footer/footer.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/@theme/components/footer/footer.component.ts ***!
  \**************************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
class FooterComponent {
}


/***/ }),

/***/ "./src/app/@theme/components/header/header.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/@theme/components/header/header.component.ts ***!
  \**************************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nebular/theme */ "./node_modules/@nebular/theme/fesm2015/index.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../@core/utils */ "./src/app/@core/utils/index.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _nebular_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nebular/auth */ "./node_modules/@nebular/auth/fesm2015/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _core_wqx_services_wqx_organization_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../@core/wqx-services/wqx-organization-service */ "./src/app/@core/wqx-services/wqx-organization-service.ts");
/* harmony import */ var _core_wqx_services_wqx_pubsub_service_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../@core/wqx-services/wqx-pubsub-service.service */ "./src/app/@core/wqx-services/wqx-pubsub-service.service.ts");








class HeaderComponent {
    constructor(sidebarService, menuService, 
    // private themeService: NbThemeService,
    layoutService, authService, router, organizationService, pubSubService) {
        this.sidebarService = sidebarService;
        this.menuService = menuService;
        this.layoutService = layoutService;
        this.authService = authService;
        this.router = router;
        this.organizationService = organizationService;
        this.pubSubService = pubSubService;
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.userPictureOnly = false;
        /* themes = [
          {
            value: 'default',
            name: 'Light',
          },
          {
            value: 'dark',
            name: 'Dark',
          },
          {
            value: 'cosmic',
            name: 'Cosmic',
          },
          {
            value: 'corporate',
            name: 'Corporate',
          },
        ]; */
        this.orgs = [];
        // currentTheme = 'default';
        this.userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
        this.authService.onTokenChange()
            .subscribe((token) => {
            if (token.isValid()) {
                this.user = token.getPayload();
            }
        });
    }
    ngOnInit() {
        if (this.user.UserIDX !== null) {
            this.organizationService.GetWQX_USER_ORGS_ByUserIDX(+this.user.UserIDX, true).subscribe((data) => {
                data.forEach(element => {
                    const newOrg = {};
                    newOrg.orgId = element.orgId;
                    newOrg.orgFormalName = element.orgFormalName;
                    this.orgs.push(newOrg);
                });
            }, (err) => {
                console.log(err);
            });
        }
        else {
            console.log('user not initialized!');
        }
        this.menuService.onItemClick().subscribe((event) => {
            this.onItemSelection(event.item.title);
        });
        // this.currentTheme = this.themeService.currentTheme;
        /* this.userService.getUsers()
          .pipe(takeUntil(this.destroy$))
          .subscribe((users: any) => this.user = users.nick); */
        // const { xl } = this.breakpointService.getBreakpointsMap();
        /* this.themeService.onMediaQueryChange()
          .pipe(
            map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
            takeUntil(this.destroy$),
          )
          .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);
    
        this.themeService.onThemeChange()
          .pipe(
            map(({ name }) => name),
            takeUntil(this.destroy$),
          )
          .subscribe(themeName => this.currentTheme = themeName);
           this.menuService.onItemClick().subscribe(( event ) => {
            this.onItemSelection(event.item.title);
          }); */
    }
    onItemSelection(title) {
        if (title === 'Log out') {
            this.authService.logout('email').subscribe((result) => {
                console.log(result);
                this.router.navigateByUrl('/auth/login');
            }, (err) => { console.log(err); });
        }
        else if (title === 'Profile') {
            // Do something on Profile
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    /*   changeTheme(themeName: string) {
        this.themeService.changeTheme(themeName);
      } */
    changeOrg(orgName) {
        console.log(orgName);
        this.pubSubService.setData(orgName);
    }
    toggleSidebar() {
        this.sidebarService.toggle(true, 'menu-sidebar');
        this.layoutService.changeLayoutSize();
        return false;
    }
    navigateHome() {
        this.menuService.navigateHome();
        return false;
    }
}


/***/ }),

/***/ "./src/app/@theme/components/index.ts":
/*!********************************************!*\
  !*** ./src/app/@theme/components/index.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent, FooterComponent, SearchInputComponent, TinyMCEComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header/header.component */ "./src/app/@theme/components/header/header.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return _header_header_component__WEBPACK_IMPORTED_MODULE_0__["HeaderComponent"]; });

/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/@theme/components/footer/footer.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return _footer_footer_component__WEBPACK_IMPORTED_MODULE_1__["FooterComponent"]; });

/* harmony import */ var _search_input_search_input_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search-input/search-input.component */ "./src/app/@theme/components/search-input/search-input.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SearchInputComponent", function() { return _search_input_search_input_component__WEBPACK_IMPORTED_MODULE_2__["SearchInputComponent"]; });

/* harmony import */ var _tiny_mce_tiny_mce_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tiny-mce/tiny-mce.component */ "./src/app/@theme/components/tiny-mce/tiny-mce.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TinyMCEComponent", function() { return _tiny_mce_tiny_mce_component__WEBPACK_IMPORTED_MODULE_3__["TinyMCEComponent"]; });







/***/ }),

/***/ "./src/app/@theme/components/search-input/search-input.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/@theme/components/search-input/search-input.component.ts ***!
  \**************************************************************************/
/*! exports provided: SearchInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchInputComponent", function() { return SearchInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");

class SearchInputComponent {
    constructor() {
        this.search = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.isInputShown = false;
    }
    showInput() {
        this.isInputShown = true;
        this.input.nativeElement.focus();
    }
    hideInput() {
        this.isInputShown = false;
    }
    onInput(val) {
        this.search.emit(val);
    }
}


/***/ }),

/***/ "./src/app/@theme/components/tiny-mce/tiny-mce.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/@theme/components/tiny-mce/tiny-mce.component.ts ***!
  \******************************************************************/
/*! exports provided: TinyMCEComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TinyMCEComponent", function() { return TinyMCEComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");


class TinyMCEComponent {
    constructor(host, locationStrategy) {
        this.host = host;
        this.locationStrategy = locationStrategy;
        this.editorKeyup = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngAfterViewInit() {
        tinymce.init({
            target: this.host.nativeElement,
            plugins: ['link', 'paste', 'table'],
            skin_url: `${this.locationStrategy.getBaseHref()}assets/skins/lightgray`,
            setup: editor => {
                this.editor = editor;
                editor.on('keyup', () => {
                    this.editorKeyup.emit(editor.getContent());
                });
            },
            height: '320',
        });
    }
    ngOnDestroy() {
        tinymce.remove(this.editor);
    }
}


/***/ }),

/***/ "./src/app/@theme/layouts/index.ts":
/*!*****************************************!*\
  !*** ./src/app/@theme/layouts/index.ts ***!
  \*****************************************/
/*! exports provided: OneColumnLayoutComponent, TwoColumnsLayoutComponent, ThreeColumnsLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _one_column_one_column_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./one-column/one-column.layout */ "./src/app/@theme/layouts/one-column/one-column.layout.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OneColumnLayoutComponent", function() { return _one_column_one_column_layout__WEBPACK_IMPORTED_MODULE_0__["OneColumnLayoutComponent"]; });

/* harmony import */ var _two_columns_two_columns_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./two-columns/two-columns.layout */ "./src/app/@theme/layouts/two-columns/two-columns.layout.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TwoColumnsLayoutComponent", function() { return _two_columns_two_columns_layout__WEBPACK_IMPORTED_MODULE_1__["TwoColumnsLayoutComponent"]; });

/* harmony import */ var _three_columns_three_columns_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./three-columns/three-columns.layout */ "./src/app/@theme/layouts/three-columns/three-columns.layout.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThreeColumnsLayoutComponent", function() { return _three_columns_three_columns_layout__WEBPACK_IMPORTED_MODULE_2__["ThreeColumnsLayoutComponent"]; });






/***/ }),

/***/ "./src/app/@theme/layouts/one-column/one-column.layout.ts":
/*!****************************************************************!*\
  !*** ./src/app/@theme/layouts/one-column/one-column.layout.ts ***!
  \****************************************************************/
/*! exports provided: OneColumnLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OneColumnLayoutComponent", function() { return OneColumnLayoutComponent; });
class OneColumnLayoutComponent {
}


/***/ }),

/***/ "./src/app/@theme/layouts/three-columns/three-columns.layout.ts":
/*!**********************************************************************!*\
  !*** ./src/app/@theme/layouts/three-columns/three-columns.layout.ts ***!
  \**********************************************************************/
/*! exports provided: ThreeColumnsLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeColumnsLayoutComponent", function() { return ThreeColumnsLayoutComponent; });
class ThreeColumnsLayoutComponent {
}


/***/ }),

/***/ "./src/app/@theme/layouts/two-columns/two-columns.layout.ts":
/*!******************************************************************!*\
  !*** ./src/app/@theme/layouts/two-columns/two-columns.layout.ts ***!
  \******************************************************************/
/*! exports provided: TwoColumnsLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TwoColumnsLayoutComponent", function() { return TwoColumnsLayoutComponent; });
class TwoColumnsLayoutComponent {
}


/***/ }),

/***/ "./src/app/@theme/pipes/capitalize.pipe.ts":
/*!*************************************************!*\
  !*** ./src/app/@theme/pipes/capitalize.pipe.ts ***!
  \*************************************************/
/*! exports provided: CapitalizePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CapitalizePipe", function() { return CapitalizePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");

class CapitalizePipe {
    transform(input) {
        return input && input.length
            ? (input.charAt(0).toUpperCase() + input.slice(1).toLowerCase())
            : input;
    }
}


/***/ }),

/***/ "./src/app/@theme/pipes/index.ts":
/*!***************************************!*\
  !*** ./src/app/@theme/pipes/index.ts ***!
  \***************************************/
/*! exports provided: CapitalizePipe, PluralPipe, RoundPipe, TimingPipe, NumberWithCommasPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _capitalize_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./capitalize.pipe */ "./src/app/@theme/pipes/capitalize.pipe.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CapitalizePipe", function() { return _capitalize_pipe__WEBPACK_IMPORTED_MODULE_0__["CapitalizePipe"]; });

/* harmony import */ var _plural_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plural.pipe */ "./src/app/@theme/pipes/plural.pipe.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PluralPipe", function() { return _plural_pipe__WEBPACK_IMPORTED_MODULE_1__["PluralPipe"]; });

/* harmony import */ var _round_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./round.pipe */ "./src/app/@theme/pipes/round.pipe.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RoundPipe", function() { return _round_pipe__WEBPACK_IMPORTED_MODULE_2__["RoundPipe"]; });

/* harmony import */ var _timing_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./timing.pipe */ "./src/app/@theme/pipes/timing.pipe.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimingPipe", function() { return _timing_pipe__WEBPACK_IMPORTED_MODULE_3__["TimingPipe"]; });

/* harmony import */ var _number_with_commas_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./number-with-commas.pipe */ "./src/app/@theme/pipes/number-with-commas.pipe.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NumberWithCommasPipe", function() { return _number_with_commas_pipe__WEBPACK_IMPORTED_MODULE_4__["NumberWithCommasPipe"]; });








/***/ }),

/***/ "./src/app/@theme/pipes/number-with-commas.pipe.ts":
/*!*********************************************************!*\
  !*** ./src/app/@theme/pipes/number-with-commas.pipe.ts ***!
  \*********************************************************/
/*! exports provided: NumberWithCommasPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumberWithCommasPipe", function() { return NumberWithCommasPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");

class NumberWithCommasPipe {
    transform(input) {
        return new Intl.NumberFormat().format(input);
    }
}


/***/ }),

/***/ "./src/app/@theme/pipes/plural.pipe.ts":
/*!*********************************************!*\
  !*** ./src/app/@theme/pipes/plural.pipe.ts ***!
  \*********************************************/
/*! exports provided: PluralPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluralPipe", function() { return PluralPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");

class PluralPipe {
    transform(input, label, pluralLabel = '') {
        input = input || 0;
        return input === 1
            ? `${input} ${label}`
            : pluralLabel
                ? `${input} ${pluralLabel}`
                : `${input} ${label}s`;
    }
}


/***/ }),

/***/ "./src/app/@theme/pipes/round.pipe.ts":
/*!********************************************!*\
  !*** ./src/app/@theme/pipes/round.pipe.ts ***!
  \********************************************/
/*! exports provided: RoundPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoundPipe", function() { return RoundPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");

class RoundPipe {
    transform(input) {
        return Math.round(input);
    }
}


/***/ }),

/***/ "./src/app/@theme/pipes/timing.pipe.ts":
/*!*********************************************!*\
  !*** ./src/app/@theme/pipes/timing.pipe.ts ***!
  \*********************************************/
/*! exports provided: TimingPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimingPipe", function() { return TimingPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");

class TimingPipe {
    transform(time) {
        if (time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${this.initZero(minutes)}${minutes}:${this.initZero(seconds)}${seconds}`;
        }
        return '00:00';
    }
    initZero(time) {
        return time < 10 ? '0' : '';
    }
}


/***/ }),

/***/ "./src/app/@theme/styles/theme.corporate.ts":
/*!**************************************************!*\
  !*** ./src/app/@theme/styles/theme.corporate.ts ***!
  \**************************************************/
/*! exports provided: CORPORATE_THEME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CORPORATE_THEME", function() { return CORPORATE_THEME; });
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nebular/theme */ "./node_modules/@nebular/theme/fesm2015/index.js");

const baseThemeVariables = _nebular_theme__WEBPACK_IMPORTED_MODULE_0__["CORPORATE_THEME"].variables;
const CORPORATE_THEME = {
    name: 'corporate',
    base: 'corporate',
    variables: {
        temperature: {
            arcFill: ['#ffa36b', '#ffa36b', '#ff9e7a', '#ff9888', '#ff8ea0'],
            arcEmpty: baseThemeVariables.bg2,
            thumbBg: baseThemeVariables.bg2,
            thumbBorder: '#ffa36b',
        },
        solar: {
            gradientLeft: baseThemeVariables.primary,
            gradientRight: baseThemeVariables.primary,
            shadowColor: 'rgba(0, 0, 0, 0)',
            secondSeriesFill: baseThemeVariables.bg2,
            radius: ['80%', '90%'],
        },
        traffic: {
            tooltipBg: baseThemeVariables.bg,
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            yAxisSplitLine: 'rgba(0, 0, 0, 0)',
            lineBg: baseThemeVariables.primary,
            lineShadowBlur: '0',
            itemColor: baseThemeVariables.border4,
            itemBorderColor: baseThemeVariables.border4,
            itemEmphasisBorderColor: baseThemeVariables.primaryLight,
            shadowLineDarkBg: 'rgba(0, 0, 0, 0)',
            shadowLineShadow: 'rgba(0, 0, 0, 0)',
            gradFrom: baseThemeVariables.bg,
            gradTo: baseThemeVariables.bg,
        },
        electricity: {
            tooltipBg: baseThemeVariables.bg,
            tooltipLineColor: baseThemeVariables.fgText,
            tooltipLineWidth: '0',
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            axisLineColor: baseThemeVariables.border3,
            xAxisTextColor: baseThemeVariables.fg,
            yAxisSplitLine: baseThemeVariables.separator,
            itemBorderColor: baseThemeVariables.primary,
            lineStyle: 'solid',
            lineWidth: '4',
            lineGradFrom: baseThemeVariables.primary,
            lineGradTo: baseThemeVariables.primary,
            lineShadow: 'rgba(0, 0, 0, 0)',
            areaGradFrom: 'rgba(0, 0, 0, 0)',
            areaGradTo: 'rgba(0, 0, 0, 0)',
            shadowLineDarkBg: 'rgba(0, 0, 0, 0)',
        },
        bubbleMap: {
            titleColor: baseThemeVariables.fgText,
            areaColor: baseThemeVariables.bg4,
            areaHoverColor: baseThemeVariables.fgHighlight,
            areaBorderColor: baseThemeVariables.border5,
        },
        profitBarAnimationEchart: {
            textColor: baseThemeVariables.fgText,
            firstAnimationBarColor: baseThemeVariables.primary,
            secondAnimationBarColor: baseThemeVariables.success,
            splitLineStyleOpacity: '1',
            splitLineStyleWidth: '1',
            splitLineStyleColor: baseThemeVariables.separator,
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            tooltipFontSize: '16',
            tooltipBg: baseThemeVariables.bg,
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipBorderWidth: '1',
            tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
        },
        trafficBarEchart: {
            gradientFrom: baseThemeVariables.warningLight,
            gradientTo: baseThemeVariables.warning,
            shadow: baseThemeVariables.warningLight,
            shadowBlur: '0',
            axisTextColor: baseThemeVariables.fgText,
            axisFontSize: '12',
            tooltipBg: baseThemeVariables.bg,
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
        },
        countryOrders: {
            countryBorderColor: baseThemeVariables.border4,
            countryFillColor: baseThemeVariables.bg4,
            countryBorderWidth: '1',
            hoveredCountryBorderColor: baseThemeVariables.primary,
            hoveredCountryFillColor: baseThemeVariables.primaryLight,
            hoveredCountryBorderWidth: '1',
            chartAxisLineColor: baseThemeVariables.border4,
            chartAxisTextColor: baseThemeVariables.fg,
            chartAxisFontSize: '16',
            chartGradientTo: baseThemeVariables.primary,
            chartGradientFrom: baseThemeVariables.primaryLight,
            chartAxisSplitLine: baseThemeVariables.separator,
            chartShadowLineColor: baseThemeVariables.primaryLight,
            chartLineBottomShadowColor: baseThemeVariables.primary,
            chartInnerLineColor: baseThemeVariables.bg2,
        },
        echarts: {
            bg: baseThemeVariables.bg,
            textColor: baseThemeVariables.fgText,
            axisLineColor: baseThemeVariables.fgText,
            splitLineColor: baseThemeVariables.separator,
            itemHoverShadowColor: 'rgba(0, 0, 0, 0.5)',
            tooltipBackgroundColor: baseThemeVariables.primary,
            areaOpacity: '0.7',
        },
        chartjs: {
            axisLineColor: baseThemeVariables.separator,
            textColor: baseThemeVariables.fgText,
        },
        orders: {
            tooltipBg: baseThemeVariables.bg,
            tooltipLineColor: 'rgba(0, 0, 0, 0)',
            tooltipLineWidth: '0',
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            tooltipFontSize: '20',
            axisLineColor: baseThemeVariables.border4,
            axisFontSize: '16',
            axisTextColor: baseThemeVariables.fg,
            yAxisSplitLine: baseThemeVariables.separator,
            itemBorderColor: baseThemeVariables.primary,
            lineStyle: 'solid',
            lineWidth: '4',
            // first line
            firstAreaGradFrom: baseThemeVariables.bg3,
            firstAreaGradTo: baseThemeVariables.bg3,
            firstShadowLineDarkBg: 'rgba(0, 0, 0, 0)',
            // second line
            secondLineGradFrom: baseThemeVariables.primary,
            secondLineGradTo: baseThemeVariables.primary,
            secondAreaGradFrom: 'rgba(0, 0, 0, 0)',
            secondAreaGradTo: 'rgba(0, 0, 0, 0)',
            secondShadowLineDarkBg: 'rgba(0, 0, 0, 0)',
            // third line
            thirdLineGradFrom: baseThemeVariables.success,
            thirdLineGradTo: baseThemeVariables.successLight,
            thirdAreaGradFrom: 'rgba(0, 0, 0, 0)',
            thirdAreaGradTo: 'rgba(0, 0, 0, 0)',
            thirdShadowLineDarkBg: 'rgba(0, 0, 0, 0)',
        },
        profit: {
            bg: baseThemeVariables.bg,
            textColor: baseThemeVariables.fgText,
            axisLineColor: baseThemeVariables.border4,
            splitLineColor: baseThemeVariables.separator,
            areaOpacity: '1',
            axisFontSize: '16',
            axisTextColor: baseThemeVariables.fg,
            // first bar
            firstLineGradFrom: baseThemeVariables.bg3,
            firstLineGradTo: baseThemeVariables.bg3,
            firstLineShadow: 'rgba(0, 0, 0, 0)',
            // second bar
            secondLineGradFrom: baseThemeVariables.primary,
            secondLineGradTo: baseThemeVariables.primary,
            secondLineShadow: 'rgba(0, 0, 0, 0)',
            // third bar
            thirdLineGradFrom: baseThemeVariables.success,
            thirdLineGradTo: baseThemeVariables.success,
            thirdLineShadow: 'rgba(0, 0, 0, 0)',
        },
        orderProfitLegend: {
            firstItem: baseThemeVariables.success,
            secondItem: baseThemeVariables.primary,
            thirdItem: baseThemeVariables.bg3,
        },
        visitors: {
            tooltipBg: baseThemeVariables.bg,
            tooltipLineColor: 'rgba(0, 0, 0, 0)',
            tooltipLineWidth: '1',
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            tooltipFontSize: '20',
            axisLineColor: baseThemeVariables.border4,
            axisFontSize: '16',
            axisTextColor: baseThemeVariables.fg,
            yAxisSplitLine: baseThemeVariables.separator,
            itemBorderColor: baseThemeVariables.primary,
            lineStyle: 'dotted',
            lineWidth: '6',
            lineGradFrom: '#ffffff',
            lineGradTo: '#ffffff',
            lineShadow: 'rgba(0, 0, 0, 0)',
            areaGradFrom: baseThemeVariables.primary,
            areaGradTo: baseThemeVariables.primaryLight,
            innerLineStyle: 'solid',
            innerLineWidth: '1',
            innerAreaGradFrom: baseThemeVariables.success,
            innerAreaGradTo: baseThemeVariables.success,
        },
        visitorsLegend: {
            firstIcon: baseThemeVariables.success,
            secondIcon: baseThemeVariables.primary,
        },
        visitorsPie: {
            firstPieGradientLeft: baseThemeVariables.success,
            firstPieGradientRight: baseThemeVariables.success,
            firstPieShadowColor: 'rgba(0, 0, 0, 0)',
            firstPieRadius: ['65%', '90%'],
            secondPieGradientLeft: baseThemeVariables.warning,
            secondPieGradientRight: baseThemeVariables.warningLight,
            secondPieShadowColor: 'rgba(0, 0, 0, 0)',
            secondPieRadius: ['63%', '92%'],
            shadowOffsetX: '-4',
            shadowOffsetY: '-4',
        },
        visitorsPieLegend: {
            firstSection: baseThemeVariables.warning,
            secondSection: baseThemeVariables.success,
        },
        earningPie: {
            radius: ['65%', '100%'],
            center: ['50%', '50%'],
            fontSize: '22',
            firstPieGradientLeft: baseThemeVariables.success,
            firstPieGradientRight: baseThemeVariables.success,
            firstPieShadowColor: 'rgba(0, 0, 0, 0)',
            secondPieGradientLeft: baseThemeVariables.primary,
            secondPieGradientRight: baseThemeVariables.primary,
            secondPieShadowColor: 'rgba(0, 0, 0, 0)',
            thirdPieGradientLeft: baseThemeVariables.warning,
            thirdPieGradientRight: baseThemeVariables.warning,
            thirdPieShadowColor: 'rgba(0, 0, 0, 0)',
        },
        earningLine: {
            gradFrom: baseThemeVariables.primary,
            gradTo: baseThemeVariables.primary,
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            tooltipFontSize: '16',
            tooltipBg: baseThemeVariables.bg,
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipBorderWidth: '1',
            tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
        },
    },
};


/***/ }),

/***/ "./src/app/@theme/styles/theme.cosmic.ts":
/*!***********************************************!*\
  !*** ./src/app/@theme/styles/theme.cosmic.ts ***!
  \***********************************************/
/*! exports provided: COSMIC_THEME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COSMIC_THEME", function() { return COSMIC_THEME; });
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nebular/theme */ "./node_modules/@nebular/theme/fesm2015/index.js");

const baseThemeVariables = _nebular_theme__WEBPACK_IMPORTED_MODULE_0__["COSMIC_THEME"].variables;
const COSMIC_THEME = {
    name: 'cosmic',
    base: 'cosmic',
    variables: {
        temperature: {
            arcFill: ['#2ec7fe', '#31ffad', '#7bff24', '#fff024', '#f7bd59'],
            arcEmpty: baseThemeVariables.bg2,
            thumbBg: '#ffffff',
            thumbBorder: '#ffffff',
        },
        solar: {
            gradientLeft: baseThemeVariables.primary,
            gradientRight: baseThemeVariables.primary,
            shadowColor: 'rgba(0, 0, 0, 0)',
            secondSeriesFill: baseThemeVariables.bg2,
            radius: ['70%', '90%'],
        },
        traffic: {
            tooltipBg: baseThemeVariables.bg,
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'box-shadow: 0px 2px 46px 0 rgba(50, 50, 89); border-radius: 10px; padding: 4px 16px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            yAxisSplitLine: baseThemeVariables.separator,
            lineBg: baseThemeVariables.border2,
            lineShadowBlur: '14',
            itemColor: baseThemeVariables.border2,
            itemBorderColor: baseThemeVariables.border2,
            itemEmphasisBorderColor: baseThemeVariables.primary,
            shadowLineDarkBg: baseThemeVariables.border3,
            shadowLineShadow: baseThemeVariables.border3,
            gradFrom: baseThemeVariables.bg,
            gradTo: baseThemeVariables.bg2,
        },
        electricity: {
            tooltipBg: baseThemeVariables.bg,
            tooltipLineColor: baseThemeVariables.fgText,
            tooltipLineWidth: '0',
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'box-shadow: 0px 2px 46px 0 rgba(0, 255, 170, 0.35); border-radius: 10px; padding: 8px 24px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            axisLineColor: baseThemeVariables.border3,
            xAxisTextColor: baseThemeVariables.fg,
            yAxisSplitLine: baseThemeVariables.separator,
            itemBorderColor: baseThemeVariables.border2,
            lineStyle: 'dotted',
            lineWidth: '6',
            lineGradFrom: baseThemeVariables.success,
            lineGradTo: baseThemeVariables.warning,
            lineShadow: baseThemeVariables.bg4,
            areaGradFrom: baseThemeVariables.bg2,
            areaGradTo: baseThemeVariables.bg3,
            shadowLineDarkBg: baseThemeVariables.bg3,
        },
        bubbleMap: {
            titleColor: baseThemeVariables.fgText,
            areaColor: baseThemeVariables.bg4,
            areaHoverColor: baseThemeVariables.fgHighlight,
            areaBorderColor: baseThemeVariables.border5,
        },
        profitBarAnimationEchart: {
            textColor: baseThemeVariables.fgText,
            firstAnimationBarColor: baseThemeVariables.primary,
            secondAnimationBarColor: baseThemeVariables.success,
            splitLineStyleOpacity: '1',
            splitLineStyleWidth: '1',
            splitLineStyleColor: baseThemeVariables.border2,
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            tooltipFontSize: '16',
            tooltipBg: baseThemeVariables.bg,
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipBorderWidth: '1',
            tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
        },
        trafficBarEchart: {
            gradientFrom: baseThemeVariables.warningLight,
            gradientTo: baseThemeVariables.warning,
            shadow: baseThemeVariables.warningLight,
            shadowBlur: '5',
            axisTextColor: baseThemeVariables.fgText,
            axisFontSize: '12',
            tooltipBg: baseThemeVariables.bg,
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
        },
        countryOrders: {
            countryBorderColor: baseThemeVariables.border4,
            countryFillColor: baseThemeVariables.bg3,
            countryBorderWidth: '1',
            hoveredCountryBorderColor: baseThemeVariables.primary,
            hoveredCountryFillColor: baseThemeVariables.primaryLight,
            hoveredCountryBorderWidth: '1',
            chartAxisLineColor: baseThemeVariables.border4,
            chartAxisTextColor: baseThemeVariables.fg,
            chartAxisFontSize: '16',
            chartGradientTo: baseThemeVariables.primary,
            chartGradientFrom: baseThemeVariables.primaryLight,
            chartAxisSplitLine: baseThemeVariables.separator,
            chartShadowLineColor: baseThemeVariables.primaryLight,
            chartLineBottomShadowColor: baseThemeVariables.primary,
            chartInnerLineColor: baseThemeVariables.bg2,
        },
        echarts: {
            bg: baseThemeVariables.bg,
            textColor: baseThemeVariables.fgText,
            axisLineColor: baseThemeVariables.fgText,
            splitLineColor: baseThemeVariables.separator,
            itemHoverShadowColor: 'rgba(0, 0, 0, 0.5)',
            tooltipBackgroundColor: baseThemeVariables.primary,
            areaOpacity: '1',
        },
        chartjs: {
            axisLineColor: baseThemeVariables.separator,
            textColor: baseThemeVariables.fgText,
        },
        orders: {
            tooltipBg: baseThemeVariables.bg,
            tooltipLineColor: 'rgba(0, 0, 0, 0)',
            tooltipLineWidth: '0',
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            tooltipFontSize: '20',
            axisLineColor: baseThemeVariables.border4,
            axisFontSize: '16',
            axisTextColor: baseThemeVariables.fg,
            yAxisSplitLine: baseThemeVariables.separator,
            itemBorderColor: baseThemeVariables.primary,
            lineStyle: 'solid',
            lineWidth: '4',
            // first line
            firstAreaGradFrom: baseThemeVariables.bg2,
            firstAreaGradTo: baseThemeVariables.bg2,
            firstShadowLineDarkBg: baseThemeVariables.bg2,
            // second line
            secondLineGradFrom: baseThemeVariables.primary,
            secondLineGradTo: baseThemeVariables.primary,
            secondAreaGradFrom: 'rgba(161, 110, 255, 0.8)',
            secondAreaGradTo: 'rgba(161, 110, 255, 0.5)',
            secondShadowLineDarkBg: baseThemeVariables.primary,
            // third line
            thirdLineGradFrom: baseThemeVariables.success,
            thirdLineGradTo: baseThemeVariables.successLight,
            thirdAreaGradFrom: 'rgba(0, 214, 143, 0.7)',
            thirdAreaGradTo: 'rgba(0, 214, 143, 0.4)',
            thirdShadowLineDarkBg: baseThemeVariables.success,
        },
        profit: {
            bg: baseThemeVariables.bg,
            textColor: baseThemeVariables.fgText,
            axisLineColor: baseThemeVariables.border4,
            splitLineColor: baseThemeVariables.separator,
            areaOpacity: '1',
            axisFontSize: '16',
            axisTextColor: baseThemeVariables.fg,
            // first bar
            firstLineGradFrom: baseThemeVariables.bg2,
            firstLineGradTo: baseThemeVariables.bg2,
            firstLineShadow: 'rgba(0, 0, 0, 0)',
            // second bar
            secondLineGradFrom: baseThemeVariables.primary,
            secondLineGradTo: baseThemeVariables.primary,
            secondLineShadow: 'rgba(0, 0, 0, 0)',
            // third bar
            thirdLineGradFrom: baseThemeVariables.success,
            thirdLineGradTo: baseThemeVariables.successLight,
            thirdLineShadow: 'rgba(0, 0, 0, 0)',
        },
        orderProfitLegend: {
            firstItem: baseThemeVariables.success,
            secondItem: baseThemeVariables.primary,
            thirdItem: baseThemeVariables.bg2,
        },
        visitors: {
            tooltipBg: baseThemeVariables.bg,
            tooltipLineColor: 'rgba(0, 0, 0, 0)',
            tooltipLineWidth: '1',
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            tooltipFontSize: '20',
            axisLineColor: baseThemeVariables.border4,
            axisFontSize: '16',
            axisTextColor: baseThemeVariables.fg,
            yAxisSplitLine: baseThemeVariables.separator,
            itemBorderColor: baseThemeVariables.primary,
            lineStyle: 'dotted',
            lineWidth: '6',
            lineGradFrom: '#ffffff',
            lineGradTo: '#ffffff',
            lineShadow: 'rgba(0, 0, 0, 0)',
            areaGradFrom: baseThemeVariables.primary,
            areaGradTo: baseThemeVariables.primaryLight,
            innerLineStyle: 'solid',
            innerLineWidth: '1',
            innerAreaGradFrom: baseThemeVariables.success,
            innerAreaGradTo: baseThemeVariables.success,
        },
        visitorsLegend: {
            firstIcon: baseThemeVariables.success,
            secondIcon: baseThemeVariables.primary,
        },
        visitorsPie: {
            firstPieGradientLeft: baseThemeVariables.success,
            firstPieGradientRight: baseThemeVariables.successLight,
            firstPieShadowColor: 'rgba(0, 0, 0, 0)',
            firstPieRadius: ['70%', '90%'],
            secondPieGradientLeft: baseThemeVariables.warning,
            secondPieGradientRight: baseThemeVariables.warningLight,
            secondPieShadowColor: 'rgba(0, 0, 0, 0)',
            secondPieRadius: ['60%', '95%'],
            shadowOffsetX: '0',
            shadowOffsetY: '3',
        },
        visitorsPieLegend: {
            firstSection: baseThemeVariables.warning,
            secondSection: baseThemeVariables.success,
        },
        earningPie: {
            radius: ['65%', '100%'],
            center: ['50%', '50%'],
            fontSize: '22',
            firstPieGradientLeft: baseThemeVariables.success,
            firstPieGradientRight: baseThemeVariables.success,
            firstPieShadowColor: 'rgba(0, 0, 0, 0)',
            secondPieGradientLeft: baseThemeVariables.primary,
            secondPieGradientRight: baseThemeVariables.primary,
            secondPieShadowColor: 'rgba(0, 0, 0, 0)',
            thirdPieGradientLeft: baseThemeVariables.warning,
            thirdPieGradientRight: baseThemeVariables.warning,
            thirdPieShadowColor: 'rgba(0, 0, 0, 0)',
        },
        earningLine: {
            gradFrom: baseThemeVariables.primary,
            gradTo: baseThemeVariables.primary,
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            tooltipFontSize: '16',
            tooltipBg: baseThemeVariables.bg,
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipBorderWidth: '1',
            tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
        },
    },
};


/***/ }),

/***/ "./src/app/@theme/styles/theme.dark.ts":
/*!*********************************************!*\
  !*** ./src/app/@theme/styles/theme.dark.ts ***!
  \*********************************************/
/*! exports provided: DARK_THEME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DARK_THEME", function() { return DARK_THEME; });
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nebular/theme */ "./node_modules/@nebular/theme/fesm2015/index.js");

const baseThemeVariables = _nebular_theme__WEBPACK_IMPORTED_MODULE_0__["DARK_THEME"].variables;
const DARK_THEME = {
    name: 'dark',
    base: 'dark',
    variables: {
        temperature: {
            arcFill: [
                baseThemeVariables.primary,
                baseThemeVariables.primary,
                baseThemeVariables.primary,
                baseThemeVariables.primary,
                baseThemeVariables.primary,
            ],
            arcEmpty: baseThemeVariables.bg2,
            thumbBg: baseThemeVariables.bg2,
            thumbBorder: baseThemeVariables.primary,
        },
        solar: {
            gradientLeft: baseThemeVariables.primary,
            gradientRight: baseThemeVariables.primary,
            shadowColor: 'rgba(0, 0, 0, 0)',
            secondSeriesFill: baseThemeVariables.bg2,
            radius: ['80%', '90%'],
        },
        traffic: {
            tooltipBg: baseThemeVariables.bg,
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            yAxisSplitLine: baseThemeVariables.separator,
            lineBg: baseThemeVariables.border4,
            lineShadowBlur: '1',
            itemColor: baseThemeVariables.border4,
            itemBorderColor: baseThemeVariables.border4,
            itemEmphasisBorderColor: baseThemeVariables.primary,
            shadowLineDarkBg: 'rgba(0, 0, 0, 0)',
            shadowLineShadow: 'rgba(0, 0, 0, 0)',
            gradFrom: baseThemeVariables.bg2,
            gradTo: baseThemeVariables.bg2,
        },
        electricity: {
            tooltipBg: baseThemeVariables.bg,
            tooltipLineColor: baseThemeVariables.fgText,
            tooltipLineWidth: '0',
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            axisLineColor: baseThemeVariables.border3,
            xAxisTextColor: baseThemeVariables.fg,
            yAxisSplitLine: baseThemeVariables.separator,
            itemBorderColor: baseThemeVariables.primary,
            lineStyle: 'solid',
            lineWidth: '4',
            lineGradFrom: baseThemeVariables.primary,
            lineGradTo: baseThemeVariables.primary,
            lineShadow: 'rgba(0, 0, 0, 0)',
            areaGradFrom: baseThemeVariables.bg2,
            areaGradTo: baseThemeVariables.bg2,
            shadowLineDarkBg: 'rgba(0, 0, 0, 0)',
        },
        bubbleMap: {
            titleColor: baseThemeVariables.fgText,
            areaColor: baseThemeVariables.bg4,
            areaHoverColor: baseThemeVariables.fgHighlight,
            areaBorderColor: baseThemeVariables.border5,
        },
        profitBarAnimationEchart: {
            textColor: baseThemeVariables.fgText,
            firstAnimationBarColor: baseThemeVariables.primary,
            secondAnimationBarColor: baseThemeVariables.success,
            splitLineStyleOpacity: '1',
            splitLineStyleWidth: '1',
            splitLineStyleColor: baseThemeVariables.separator,
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            tooltipFontSize: '16',
            tooltipBg: baseThemeVariables.bg,
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipBorderWidth: '1',
            tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
        },
        trafficBarEchart: {
            gradientFrom: baseThemeVariables.warningLight,
            gradientTo: baseThemeVariables.warning,
            shadow: baseThemeVariables.warningLight,
            shadowBlur: '0',
            axisTextColor: baseThemeVariables.fgText,
            axisFontSize: '12',
            tooltipBg: baseThemeVariables.bg,
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
        },
        countryOrders: {
            countryBorderColor: baseThemeVariables.border4,
            countryFillColor: baseThemeVariables.bg3,
            countryBorderWidth: '1',
            hoveredCountryBorderColor: baseThemeVariables.primary,
            hoveredCountryFillColor: baseThemeVariables.primaryLight,
            hoveredCountryBorderWidth: '1',
            chartAxisLineColor: baseThemeVariables.border4,
            chartAxisTextColor: baseThemeVariables.fg,
            chartAxisFontSize: '16',
            chartGradientTo: baseThemeVariables.primary,
            chartGradientFrom: baseThemeVariables.primaryLight,
            chartAxisSplitLine: baseThemeVariables.separator,
            chartShadowLineColor: baseThemeVariables.primaryLight,
            chartLineBottomShadowColor: baseThemeVariables.primary,
            chartInnerLineColor: baseThemeVariables.bg2,
        },
        echarts: {
            bg: baseThemeVariables.bg,
            textColor: baseThemeVariables.fgText,
            axisLineColor: baseThemeVariables.fgText,
            splitLineColor: baseThemeVariables.separator,
            itemHoverShadowColor: 'rgba(0, 0, 0, 0.5)',
            tooltipBackgroundColor: baseThemeVariables.primary,
            areaOpacity: '0.7',
        },
        chartjs: {
            axisLineColor: baseThemeVariables.separator,
            textColor: baseThemeVariables.fgText,
        },
        orders: {
            tooltipBg: baseThemeVariables.bg,
            tooltipLineColor: 'rgba(0, 0, 0, 0)',
            tooltipLineWidth: '0',
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            tooltipFontSize: '20',
            axisLineColor: baseThemeVariables.border4,
            axisFontSize: '16',
            axisTextColor: baseThemeVariables.fg,
            yAxisSplitLine: baseThemeVariables.separator,
            itemBorderColor: baseThemeVariables.primary,
            lineStyle: 'solid',
            lineWidth: '4',
            // first line
            firstAreaGradFrom: baseThemeVariables.bg3,
            firstAreaGradTo: baseThemeVariables.bg3,
            firstShadowLineDarkBg: 'rgba(0, 0, 0, 0)',
            // second line
            secondLineGradFrom: baseThemeVariables.primary,
            secondLineGradTo: baseThemeVariables.primary,
            secondAreaGradFrom: 'rgba(51, 102, 255, 0.2)',
            secondAreaGradTo: 'rgba(51, 102, 255, 0)',
            secondShadowLineDarkBg: 'rgba(0, 0, 0, 0)',
            // third line
            thirdLineGradFrom: baseThemeVariables.success,
            thirdLineGradTo: baseThemeVariables.successLight,
            thirdAreaGradFrom: 'rgba(0, 214, 143, 0.2)',
            thirdAreaGradTo: 'rgba(0, 214, 143, 0)',
            thirdShadowLineDarkBg: 'rgba(0, 0, 0, 0)',
        },
        profit: {
            bg: baseThemeVariables.bg,
            textColor: baseThemeVariables.fgText,
            axisLineColor: baseThemeVariables.border4,
            splitLineColor: baseThemeVariables.separator,
            areaOpacity: '1',
            axisFontSize: '16',
            axisTextColor: baseThemeVariables.fg,
            // first bar
            firstLineGradFrom: baseThemeVariables.bg3,
            firstLineGradTo: baseThemeVariables.bg3,
            firstLineShadow: 'rgba(0, 0, 0, 0)',
            // second bar
            secondLineGradFrom: baseThemeVariables.primary,
            secondLineGradTo: baseThemeVariables.primary,
            secondLineShadow: 'rgba(0, 0, 0, 0)',
            // third bar
            thirdLineGradFrom: baseThemeVariables.success,
            thirdLineGradTo: baseThemeVariables.successLight,
            thirdLineShadow: 'rgba(0, 0, 0, 0)',
        },
        orderProfitLegend: {
            firstItem: baseThemeVariables.success,
            secondItem: baseThemeVariables.primary,
            thirdItem: baseThemeVariables.bg3,
        },
        visitors: {
            tooltipBg: baseThemeVariables.bg,
            tooltipLineColor: 'rgba(0, 0, 0, 0)',
            tooltipLineWidth: '0',
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            tooltipFontSize: '20',
            axisLineColor: baseThemeVariables.border4,
            axisFontSize: '16',
            axisTextColor: baseThemeVariables.fg,
            yAxisSplitLine: baseThemeVariables.separator,
            itemBorderColor: baseThemeVariables.primary,
            lineStyle: 'dotted',
            lineWidth: '6',
            lineGradFrom: '#ffffff',
            lineGradTo: '#ffffff',
            lineShadow: 'rgba(0, 0, 0, 0)',
            areaGradFrom: baseThemeVariables.primary,
            areaGradTo: baseThemeVariables.primaryLight,
            innerLineStyle: 'solid',
            innerLineWidth: '1',
            innerAreaGradFrom: baseThemeVariables.success,
            innerAreaGradTo: baseThemeVariables.success,
        },
        visitorsLegend: {
            firstIcon: baseThemeVariables.success,
            secondIcon: baseThemeVariables.primary,
        },
        visitorsPie: {
            firstPieGradientLeft: baseThemeVariables.success,
            firstPieGradientRight: baseThemeVariables.success,
            firstPieShadowColor: 'rgba(0, 0, 0, 0)',
            firstPieRadius: ['70%', '90%'],
            secondPieGradientLeft: baseThemeVariables.warning,
            secondPieGradientRight: baseThemeVariables.warningLight,
            secondPieShadowColor: 'rgba(0, 0, 0, 0)',
            secondPieRadius: ['60%', '97%'],
            shadowOffsetX: '0',
            shadowOffsetY: '0',
        },
        visitorsPieLegend: {
            firstSection: baseThemeVariables.warning,
            secondSection: baseThemeVariables.success,
        },
        earningPie: {
            radius: ['65%', '100%'],
            center: ['50%', '50%'],
            fontSize: '22',
            firstPieGradientLeft: baseThemeVariables.success,
            firstPieGradientRight: baseThemeVariables.success,
            firstPieShadowColor: 'rgba(0, 0, 0, 0)',
            secondPieGradientLeft: baseThemeVariables.primary,
            secondPieGradientRight: baseThemeVariables.primary,
            secondPieShadowColor: 'rgba(0, 0, 0, 0)',
            thirdPieGradientLeft: baseThemeVariables.warning,
            thirdPieGradientRight: baseThemeVariables.warning,
            thirdPieShadowColor: 'rgba(0, 0, 0, 0)',
        },
        earningLine: {
            gradFrom: baseThemeVariables.primary,
            gradTo: baseThemeVariables.primary,
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            tooltipFontSize: '16',
            tooltipBg: baseThemeVariables.bg,
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipBorderWidth: '1',
            tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
        },
    },
};


/***/ }),

/***/ "./src/app/@theme/styles/theme.default.ts":
/*!************************************************!*\
  !*** ./src/app/@theme/styles/theme.default.ts ***!
  \************************************************/
/*! exports provided: DEFAULT_THEME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_THEME", function() { return DEFAULT_THEME; });
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nebular/theme */ "./node_modules/@nebular/theme/fesm2015/index.js");

const baseThemeVariables = _nebular_theme__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_THEME"].variables;
const DEFAULT_THEME = {
    name: 'default',
    base: 'default',
    variables: {
        temperature: {
            arcFill: [
                baseThemeVariables.primary,
                baseThemeVariables.primary,
                baseThemeVariables.primary,
                baseThemeVariables.primary,
                baseThemeVariables.primary,
            ],
            arcEmpty: baseThemeVariables.bg2,
            thumbBg: baseThemeVariables.bg2,
            thumbBorder: baseThemeVariables.primary,
        },
        solar: {
            gradientLeft: baseThemeVariables.primary,
            gradientRight: baseThemeVariables.primary,
            shadowColor: 'rgba(0, 0, 0, 0)',
            secondSeriesFill: baseThemeVariables.bg2,
            radius: ['80%', '90%'],
        },
        traffic: {
            tooltipBg: baseThemeVariables.bg,
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            yAxisSplitLine: baseThemeVariables.separator,
            lineBg: baseThemeVariables.border4,
            lineShadowBlur: '1',
            itemColor: baseThemeVariables.border4,
            itemBorderColor: baseThemeVariables.border4,
            itemEmphasisBorderColor: baseThemeVariables.primary,
            shadowLineDarkBg: 'rgba(0, 0, 0, 0)',
            shadowLineShadow: 'rgba(0, 0, 0, 0)',
            gradFrom: baseThemeVariables.bg2,
            gradTo: baseThemeVariables.bg2,
        },
        electricity: {
            tooltipBg: baseThemeVariables.bg,
            tooltipLineColor: baseThemeVariables.fgText,
            tooltipLineWidth: '0',
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            axisLineColor: baseThemeVariables.border3,
            xAxisTextColor: baseThemeVariables.fg,
            yAxisSplitLine: baseThemeVariables.separator,
            itemBorderColor: baseThemeVariables.primary,
            lineStyle: 'solid',
            lineWidth: '4',
            lineGradFrom: baseThemeVariables.primary,
            lineGradTo: baseThemeVariables.primary,
            lineShadow: 'rgba(0, 0, 0, 0)',
            areaGradFrom: baseThemeVariables.bg2,
            areaGradTo: baseThemeVariables.bg2,
            shadowLineDarkBg: 'rgba(0, 0, 0, 0)',
        },
        bubbleMap: {
            titleColor: baseThemeVariables.fgText,
            areaColor: baseThemeVariables.bg4,
            areaHoverColor: baseThemeVariables.fgHighlight,
            areaBorderColor: baseThemeVariables.border5,
        },
        profitBarAnimationEchart: {
            textColor: baseThemeVariables.fgText,
            firstAnimationBarColor: baseThemeVariables.primary,
            secondAnimationBarColor: baseThemeVariables.success,
            splitLineStyleOpacity: '1',
            splitLineStyleWidth: '1',
            splitLineStyleColor: baseThemeVariables.separator,
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            tooltipFontSize: '16',
            tooltipBg: baseThemeVariables.bg,
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipBorderWidth: '1',
            tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
        },
        trafficBarEchart: {
            gradientFrom: baseThemeVariables.warningLight,
            gradientTo: baseThemeVariables.warning,
            shadow: baseThemeVariables.warningLight,
            shadowBlur: '0',
            axisTextColor: baseThemeVariables.fgText,
            axisFontSize: '12',
            tooltipBg: baseThemeVariables.bg,
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
        },
        countryOrders: {
            countryBorderColor: baseThemeVariables.border4,
            countryFillColor: baseThemeVariables.bg3,
            countryBorderWidth: '1',
            hoveredCountryBorderColor: baseThemeVariables.primary,
            hoveredCountryFillColor: baseThemeVariables.primaryLight,
            hoveredCountryBorderWidth: '1',
            chartAxisLineColor: baseThemeVariables.border4,
            chartAxisTextColor: baseThemeVariables.fg,
            chartAxisFontSize: '16',
            chartGradientTo: baseThemeVariables.primary,
            chartGradientFrom: baseThemeVariables.primaryLight,
            chartAxisSplitLine: baseThemeVariables.separator,
            chartShadowLineColor: baseThemeVariables.primaryLight,
            chartLineBottomShadowColor: baseThemeVariables.primary,
            chartInnerLineColor: baseThemeVariables.bg2,
        },
        echarts: {
            bg: baseThemeVariables.bg,
            textColor: baseThemeVariables.fgText,
            axisLineColor: baseThemeVariables.fgText,
            splitLineColor: baseThemeVariables.separator,
            itemHoverShadowColor: 'rgba(0, 0, 0, 0.5)',
            tooltipBackgroundColor: baseThemeVariables.primary,
            areaOpacity: '0.7',
        },
        chartjs: {
            axisLineColor: baseThemeVariables.separator,
            textColor: baseThemeVariables.fgText,
        },
        orders: {
            tooltipBg: baseThemeVariables.bg,
            tooltipLineColor: 'rgba(0, 0, 0, 0)',
            tooltipLineWidth: '0',
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            tooltipFontSize: '20',
            axisLineColor: baseThemeVariables.border4,
            axisFontSize: '16',
            axisTextColor: baseThemeVariables.fg,
            yAxisSplitLine: baseThemeVariables.separator,
            itemBorderColor: baseThemeVariables.primary,
            lineStyle: 'solid',
            lineWidth: '4',
            // first line
            firstAreaGradFrom: baseThemeVariables.bg3,
            firstAreaGradTo: baseThemeVariables.bg3,
            firstShadowLineDarkBg: 'rgba(0, 0, 0, 0)',
            // second line
            secondLineGradFrom: baseThemeVariables.primary,
            secondLineGradTo: baseThemeVariables.primary,
            secondAreaGradFrom: 'rgba(51, 102, 255, 0.2)',
            secondAreaGradTo: 'rgba(51, 102, 255, 0)',
            secondShadowLineDarkBg: 'rgba(0, 0, 0, 0)',
            // third line
            thirdLineGradFrom: baseThemeVariables.success,
            thirdLineGradTo: baseThemeVariables.successLight,
            thirdAreaGradFrom: 'rgba(0, 214, 143, 0.2)',
            thirdAreaGradTo: 'rgba(0, 214, 143, 0)',
            thirdShadowLineDarkBg: 'rgba(0, 0, 0, 0)',
        },
        profit: {
            bg: baseThemeVariables.bg,
            textColor: baseThemeVariables.fgText,
            axisLineColor: baseThemeVariables.border4,
            splitLineColor: baseThemeVariables.separator,
            areaOpacity: '1',
            axisFontSize: '16',
            axisTextColor: baseThemeVariables.fg,
            // first bar
            firstLineGradFrom: baseThemeVariables.bg3,
            firstLineGradTo: baseThemeVariables.bg3,
            firstLineShadow: 'rgba(0, 0, 0, 0)',
            // second bar
            secondLineGradFrom: baseThemeVariables.primary,
            secondLineGradTo: baseThemeVariables.primary,
            secondLineShadow: 'rgba(0, 0, 0, 0)',
            // third bar
            thirdLineGradFrom: baseThemeVariables.success,
            thirdLineGradTo: baseThemeVariables.successLight,
            thirdLineShadow: 'rgba(0, 0, 0, 0)',
        },
        orderProfitLegend: {
            firstItem: baseThemeVariables.success,
            secondItem: baseThemeVariables.primary,
            thirdItem: baseThemeVariables.bg3,
        },
        visitors: {
            tooltipBg: baseThemeVariables.bg,
            tooltipLineColor: 'rgba(0, 0, 0, 0)',
            tooltipLineWidth: '1',
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            tooltipFontSize: '20',
            axisLineColor: baseThemeVariables.border4,
            axisFontSize: '16',
            axisTextColor: baseThemeVariables.fg,
            yAxisSplitLine: baseThemeVariables.separator,
            itemBorderColor: baseThemeVariables.primary,
            lineStyle: 'dotted',
            lineWidth: '6',
            lineGradFrom: '#ffffff',
            lineGradTo: '#ffffff',
            lineShadow: 'rgba(0, 0, 0, 0)',
            areaGradFrom: baseThemeVariables.primary,
            areaGradTo: baseThemeVariables.primaryLight,
            innerLineStyle: 'solid',
            innerLineWidth: '1',
            innerAreaGradFrom: baseThemeVariables.success,
            innerAreaGradTo: baseThemeVariables.success,
        },
        visitorsLegend: {
            firstIcon: baseThemeVariables.success,
            secondIcon: baseThemeVariables.primary,
        },
        visitorsPie: {
            firstPieGradientLeft: baseThemeVariables.success,
            firstPieGradientRight: baseThemeVariables.success,
            firstPieShadowColor: 'rgba(0, 0, 0, 0)',
            firstPieRadius: ['70%', '90%'],
            secondPieGradientLeft: baseThemeVariables.warning,
            secondPieGradientRight: baseThemeVariables.warningLight,
            secondPieShadowColor: 'rgba(0, 0, 0, 0)',
            secondPieRadius: ['60%', '97%'],
            shadowOffsetX: '0',
            shadowOffsetY: '0',
        },
        visitorsPieLegend: {
            firstSection: baseThemeVariables.warning,
            secondSection: baseThemeVariables.success,
        },
        earningPie: {
            radius: ['65%', '100%'],
            center: ['50%', '50%'],
            fontSize: '22',
            firstPieGradientLeft: baseThemeVariables.success,
            firstPieGradientRight: baseThemeVariables.success,
            firstPieShadowColor: 'rgba(0, 0, 0, 0)',
            secondPieGradientLeft: baseThemeVariables.primary,
            secondPieGradientRight: baseThemeVariables.primary,
            secondPieShadowColor: 'rgba(0, 0, 0, 0)',
            thirdPieGradientLeft: baseThemeVariables.warning,
            thirdPieGradientRight: baseThemeVariables.warning,
            thirdPieShadowColor: 'rgba(0, 0, 0, 0)',
        },
        earningLine: {
            gradFrom: baseThemeVariables.primary,
            gradTo: baseThemeVariables.primary,
            tooltipTextColor: baseThemeVariables.fgText,
            tooltipFontWeight: 'normal',
            tooltipFontSize: '16',
            tooltipBg: baseThemeVariables.bg,
            tooltipBorderColor: baseThemeVariables.border2,
            tooltipBorderWidth: '1',
            tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
        },
    },
};


/***/ }),

/***/ "./src/app/@theme/theme.module.ts":
/*!****************************************!*\
  !*** ./src/app/@theme/theme.module.ts ***!
  \****************************************/
/*! exports provided: ThemeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeModule", function() { return ThemeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nebular/theme */ "./node_modules/@nebular/theme/fesm2015/index.js");
/* harmony import */ var _nebular_eva_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nebular/eva-icons */ "./node_modules/@nebular/eva-icons/fesm2015/index.js");
/* harmony import */ var _nebular_security__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nebular/security */ "./node_modules/@nebular/security/fesm2015/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components */ "./src/app/@theme/components/index.ts");
/* harmony import */ var _pipes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pipes */ "./src/app/@theme/pipes/index.ts");
/* harmony import */ var _layouts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./layouts */ "./src/app/@theme/layouts/index.ts");
/* harmony import */ var _styles_theme_default__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./styles/theme.default */ "./src/app/@theme/styles/theme.default.ts");
/* harmony import */ var _styles_theme_cosmic__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./styles/theme.cosmic */ "./src/app/@theme/styles/theme.cosmic.ts");
/* harmony import */ var _styles_theme_corporate__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./styles/theme.corporate */ "./src/app/@theme/styles/theme.corporate.ts");
/* harmony import */ var _styles_theme_dark__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./styles/theme.dark */ "./src/app/@theme/styles/theme.dark.ts");











const NB_MODULES = [
    _nebular_theme__WEBPACK_IMPORTED_MODULE_1__["NbLayoutModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_1__["NbMenuModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_1__["NbUserModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_1__["NbActionsModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_1__["NbSearchModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_1__["NbSidebarModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_1__["NbContextMenuModule"],
    _nebular_security__WEBPACK_IMPORTED_MODULE_3__["NbSecurityModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_1__["NbButtonModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_1__["NbSelectModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_1__["NbIconModule"],
    _nebular_eva_icons__WEBPACK_IMPORTED_MODULE_2__["NbEvaIconsModule"],
];
const COMPONENTS = [
    _components__WEBPACK_IMPORTED_MODULE_4__["HeaderComponent"],
    _components__WEBPACK_IMPORTED_MODULE_4__["FooterComponent"],
    _components__WEBPACK_IMPORTED_MODULE_4__["SearchInputComponent"],
    _components__WEBPACK_IMPORTED_MODULE_4__["TinyMCEComponent"],
    _layouts__WEBPACK_IMPORTED_MODULE_6__["OneColumnLayoutComponent"],
    _layouts__WEBPACK_IMPORTED_MODULE_6__["ThreeColumnsLayoutComponent"],
    _layouts__WEBPACK_IMPORTED_MODULE_6__["TwoColumnsLayoutComponent"],
];
const PIPES = [
    _pipes__WEBPACK_IMPORTED_MODULE_5__["CapitalizePipe"],
    _pipes__WEBPACK_IMPORTED_MODULE_5__["PluralPipe"],
    _pipes__WEBPACK_IMPORTED_MODULE_5__["RoundPipe"],
    _pipes__WEBPACK_IMPORTED_MODULE_5__["TimingPipe"],
    _pipes__WEBPACK_IMPORTED_MODULE_5__["NumberWithCommasPipe"],
];
class ThemeModule {
    static forRoot() {
        return {
            ngModule: ThemeModule,
            providers: [
                ..._nebular_theme__WEBPACK_IMPORTED_MODULE_1__["NbThemeModule"].forRoot({
                    name: 'default',
                }, [_styles_theme_default__WEBPACK_IMPORTED_MODULE_7__["DEFAULT_THEME"], _styles_theme_cosmic__WEBPACK_IMPORTED_MODULE_8__["COSMIC_THEME"], _styles_theme_corporate__WEBPACK_IMPORTED_MODULE_9__["CORPORATE_THEME"], _styles_theme_dark__WEBPACK_IMPORTED_MODULE_10__["DARK_THEME"]]).providers,
            ],
        };
    }
}


/***/ }),

/***/ "./src/app/ContentTypeInterceptor.ts":
/*!*******************************************!*\
  !*** ./src/app/ContentTypeInterceptor.ts ***!
  \*******************************************/
/*! exports provided: ContentTypeInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentTypeInterceptor", function() { return ContentTypeInterceptor; });
class ContentTypeInterceptor {
    constructor() { }
    intercept(req, next) {
        const ct = req.detectContentTypeHeader();
        if (ct != null) {
            return next.handle(req.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body),
            }));
        }
        else {
            return next.handle(req);
        }
    }
}


/***/ }),

/***/ "./src/app/NgxAuthJWTInterceptor.ts":
/*!******************************************!*\
  !*** ./src/app/NgxAuthJWTInterceptor.ts ***!
  \******************************************/
/*! exports provided: NgxAuthJWTInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxAuthJWTInterceptor", function() { return NgxAuthJWTInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _nebular_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nebular/auth */ "./node_modules/@nebular/auth/fesm2015/index.js");



class NgxAuthJWTInterceptor {
    constructor(injector, filter) {
        this.injector = injector;
        this.filter = filter;
    }
    intercept(req, next) {
        // do not intercept request whose urls are filtered by the injected filter
        return this.authService.isAuthenticated()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(authenticated => {
            if (authenticated) {
                return this.authService.getToken().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((token) => {
                    const JWT = `Bearer ${token.getValue()}`;
                    /* console.log('================');
                    console.log(req);
                    console.log(JWT);
                    console.log('================'); */
                    req = req.clone({
                        setHeaders: {
                            Authorization: JWT,
                        },
                    });
                    return next.handle(req);
                }));
            }
            else {
                // Request is sent to server without authentication so that the client code
                // receives the 401/403 error and can act as desired ('session expired', redirect to login, aso)
                return next.handle(req);
            }
        }));
    }
    get authService() {
        return this.injector.get(_nebular_auth__WEBPACK_IMPORTED_MODULE_2__["NbAuthService"]);
    }
}


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule, ɵ0, ɵ1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ0", function() { return ɵ0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ1", function() { return ɵ1; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _nebular_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nebular/auth */ "./node_modules/@nebular/auth/fesm2015/index.js");
/* harmony import */ var _auth_guard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth-guard.service */ "./src/app/auth-guard.service.ts");



const ɵ0 = () => Promise.all(/*! import() | pages-pages-module-ngfactory */[__webpack_require__.e("default~pages-pages-module-ngfactory~secure-wqx-pages-module-ngfactory"), __webpack_require__.e("pages-pages-module-ngfactory")]).then(__webpack_require__.bind(null, /*! ./pages/pages.module.ngfactory */ "./src/app/pages/pages.module.ngfactory.js"))
    .then(m => m.PagesModuleNgFactory), ɵ1 = () => Promise.all(/*! import() | secure-wqx-pages-module-ngfactory */[__webpack_require__.e("default~pages-pages-module-ngfactory~secure-wqx-pages-module-ngfactory"), __webpack_require__.e("secure-wqx-pages-module-ngfactory")]).then(__webpack_require__.bind(null, /*! ./secure/wqx-pages.module.ngfactory */ "./src/app/secure/wqx-pages.module.ngfactory.js"))
    .then(m => m.WqxPagesModuleNgFactory);
const routes = [
    {
        path: 'pages',
        canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]],
        loadChildren: ɵ0,
    },
    {
        path: 'secure',
        // canActivate: [AuthGuard],
        loadChildren: ɵ1,
    },
    {
        path: 'auth',
        component: _nebular_auth__WEBPACK_IMPORTED_MODULE_1__["NbAuthComponent"],
        children: [
            {
                path: '',
                component: _nebular_auth__WEBPACK_IMPORTED_MODULE_1__["NbLoginComponent"],
            },
            {
                path: 'login',
                component: _nebular_auth__WEBPACK_IMPORTED_MODULE_1__["NbLoginComponent"],
            },
            {
                path: 'register',
                component: _nebular_auth__WEBPACK_IMPORTED_MODULE_1__["NbRegisterComponent"],
            },
            {
                path: 'logout',
                component: _nebular_auth__WEBPACK_IMPORTED_MODULE_1__["NbLogoutComponent"],
            },
            {
                path: 'request-password',
                component: _nebular_auth__WEBPACK_IMPORTED_MODULE_1__["NbRequestPasswordComponent"],
            },
            {
                path: 'reset-password',
                component: _nebular_auth__WEBPACK_IMPORTED_MODULE_1__["NbResetPasswordComponent"],
            },
        ],
    },
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
    { path: '**', redirectTo: 'pages' },
];
const config = {
    useHash: false,
};
class AppRoutingModule {
}



/***/ }),

/***/ "./src/app/app.component.ngfactory.js":
/*!********************************************!*\
  !*** ./src/app/app.component.ngfactory.js ***!
  \********************************************/
/*! exports provided: RenderType_AppComponent, View_AppComponent_0, View_AppComponent_Host_0, AppComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_AppComponent", function() { return RenderType_AppComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AppComponent_0", function() { return View_AppComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AppComponent_Host_0", function() { return View_AppComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponentNgFactory", function() { return AppComponentNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _core_utils_analytics_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./@core/utils/analytics.service */ "./src/app/@core/utils/analytics.service.ts");
/* harmony import */ var _core_utils_seo_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./@core/utils/seo.service */ "./src/app/@core/utils/seo.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 





var styles_AppComponent = [];
var RenderType_AppComponent = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcrt"]({ encapsulation: 2, styles: styles_AppComponent, data: {} });

function View_AppComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 16777216, null, null, 1, "router-outlet", [], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](1, 212992, null, 0, _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"], [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ChildrenOutletContexts"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], [8, null], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
function View_AppComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵeld"](0, 0, null, null, 1, "ngx-app", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdid"](1, 114688, null, 0, _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"], [_core_utils_analytics_service__WEBPACK_IMPORTED_MODULE_3__["AnalyticsService"], _core_utils_seo_service__WEBPACK_IMPORTED_MODULE_4__["SeoService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AppComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵccf"]("ngx-app", _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"], View_AppComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _core_utils_analytics_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./@core/utils/analytics.service */ "./src/app/@core/utils/analytics.service.ts");
/* harmony import */ var _core_utils_seo_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./@core/utils/seo.service */ "./src/app/@core/utils/seo.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */




class AppComponent {
    constructor(analytics, seoService) {
        this.analytics = analytics;
        this.seoService = seoService;
    }
    ngOnInit() {
        this.analytics.trackPageViews();
        this.seoService.trackCanonicalChanges();
        localStorage.setItem('monlocConfig', JSON.stringify(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["globals"].monlocConfig));
        localStorage.setItem('projectConfig', JSON.stringify(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["globals"].projectConfig));
        localStorage.setItem('activityConfig', JSON.stringify(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["globals"].activityConfig));
    }
}


/***/ }),

/***/ "./src/app/app.module.ngfactory.js":
/*!*****************************************!*\
  !*** ./src/app/app.module.ngfactory.js ***!
  \*****************************************/
/*! exports provided: AppModuleNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModuleNgFactory", function() { return AppModuleNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.module */ "./src/app/app.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/@angular/router/router.ngfactory */ "./node_modules/@angular/router/router.ngfactory.js");
/* harmony import */ var _node_modules_nebular_auth_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../node_modules/@nebular/auth/index.ngfactory */ "./node_modules/@nebular/auth/index.ngfactory.js");
/* harmony import */ var _node_modules_nebular_theme_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../node_modules/@nebular/theme/index.ngfactory */ "./node_modules/@nebular/theme/index.ngfactory.js");
/* harmony import */ var _app_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component.ngfactory */ "./src/app/app.component.ngfactory.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_animations_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/animations/browser */ "./node_modules/@angular/animations/fesm2015/browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm2015/animations.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _NgxAuthJWTInterceptor__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./NgxAuthJWTInterceptor */ "./src/app/NgxAuthJWTInterceptor.ts");
/* harmony import */ var _ContentTypeInterceptor__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ContentTypeInterceptor */ "./src/app/ContentTypeInterceptor.ts");
/* harmony import */ var _nebular_auth__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @nebular/auth */ "./node_modules/@nebular/auth/fesm2015/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @nebular/theme */ "./node_modules/@nebular/theme/fesm2015/index.js");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/esm2015/scrolling.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/esm2015/overlay.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm2015/bidi.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm2015/platform.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm2015/a11y.js");
/* harmony import */ var _core_mock_users_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./@core/mock/users.service */ "./src/app/@core/mock/users.service.ts");
/* harmony import */ var _core_data_users__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./@core/data/users */ "./src/app/@core/data/users.ts");
/* harmony import */ var _nebular_security__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @nebular/security */ "./node_modules/@nebular/security/fesm2015/index.js");
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./@core/core.module */ "./src/app/@core/core.module.ts");
/* harmony import */ var _core_utils_analytics_service__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./@core/utils/analytics.service */ "./src/app/@core/utils/analytics.service.ts");
/* harmony import */ var _core_utils_layout_service__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./@core/utils/layout.service */ "./src/app/@core/utils/layout.service.ts");
/* harmony import */ var _core_utils_player_service__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./@core/utils/player.service */ "./src/app/@core/utils/player.service.ts");
/* harmony import */ var _core_utils_seo_service__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./@core/utils/seo.service */ "./src/app/@core/utils/seo.service.ts");
/* harmony import */ var _core_utils_state_service__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./@core/utils/state.service */ "./src/app/@core/utils/state.service.ts");
/* harmony import */ var _auth_guard_service__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./auth-guard.service */ "./src/app/auth-guard.service.ts");
/* harmony import */ var _core_wqx_services_wqx_organization_service__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./@core/wqx-services/wqx-organization-service */ "./src/app/@core/wqx-services/wqx-organization-service.ts");
/* harmony import */ var _core_wqx_services_wqx_project_service__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./@core/wqx-services/wqx-project-service */ "./src/app/@core/wqx-services/wqx-project-service.ts");
/* harmony import */ var _core_wqx_services_wqx_activity_service__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./@core/wqx-services/wqx-activity-service */ "./src/app/@core/wqx-services/wqx-activity-service.ts");
/* harmony import */ var _core_wqx_services_wqx_monloc_service__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./@core/wqx-services/wqx-monloc.service */ "./src/app/@core/wqx-services/wqx-monloc.service.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/cdk/portal */ "./node_modules/@angular/cdk/esm2015/portal.js");
/* harmony import */ var _nebular_eva_icons__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @nebular/eva-icons */ "./node_modules/@nebular/eva-icons/fesm2015/index.js");
/* harmony import */ var _theme_theme_module__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./@theme/theme.module */ "./src/app/@theme/theme.module.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 










































var AppModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"], [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]], function (_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, [_node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_router_router_lNgFactory"], _node_modules_nebular_auth_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["NbAuthComponentNgFactory"], _node_modules_nebular_auth_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["NbLoginComponentNgFactory"], _node_modules_nebular_auth_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["NbRegisterComponentNgFactory"], _node_modules_nebular_auth_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["NbLogoutComponentNgFactory"], _node_modules_nebular_auth_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["NbRequestPasswordComponentNgFactory"], _node_modules_nebular_auth_index_ngfactory__WEBPACK_IMPORTED_MODULE_4__["NbResetPasswordComponentNgFactory"], _node_modules_nebular_theme_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["NbSearchFieldComponentNgFactory"], _node_modules_nebular_theme_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["NbContextMenuComponentNgFactory"], _node_modules_nebular_theme_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["NbCalendarDayCellComponentNgFactory"], _node_modules_nebular_theme_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["NbCalendarMonthCellComponentNgFactory"], _node_modules_nebular_theme_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["NbCalendarYearCellComponentNgFactory"], _node_modules_nebular_theme_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["NbCalendarRangeDayCellComponentNgFactory"], _node_modules_nebular_theme_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["NbCalendarRangeYearCellComponentNgFactory"], _node_modules_nebular_theme_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["NbCalendarComponentNgFactory"], _node_modules_nebular_theme_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["NbCalendarRangeComponentNgFactory"], _node_modules_nebular_theme_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["NbDatepickerContainerComponentNgFactory"], _node_modules_nebular_theme_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["NbDialogContainerComponentNgFactory"], _node_modules_nebular_theme_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["NbWindowsContainerComponentNgFactory"], _node_modules_nebular_theme_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["NbWindowComponentNgFactory"], _node_modules_nebular_theme_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["NbToastrContainerComponentNgFactory"], _node_modules_nebular_theme_index_ngfactory__WEBPACK_IMPORTED_MODULE_5__["NbToastComponentNgFactory"], _app_component_ngfactory__WEBPACK_IMPORTED_MODULE_6__["AppComponentNgFactory"]]], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_core_core_q"], [[3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_7__["ɵangular_packages_common_common_a"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_core_core_bb"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_core_core_s"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_ID"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_core_core_f"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_core_core_o"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_core_core_p"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["DomSanitizer"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["ɵDomSanitizerImpl"], [_angular_common__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _angular_core__WEBPACK_IMPORTED_MODULE_0__["Sanitizer"], null, [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["DomSanitizer"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["HAMMER_GESTURE_CONFIG"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["HammerGestureConfig"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["EVENT_MANAGER_PLUGINS"], function (p0_0, p0_1, p0_2, p1_0, p2_0, p2_1, p2_2, p2_3) { return [new _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["ɵDomEventsPlugin"](p0_0, p0_1, p0_2), new _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["ɵKeyEventsPlugin"](p1_0), new _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["ɵHammerGesturesPlugin"](p2_0, p2_1, p2_2, p2_3)]; }, [_angular_common__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["HAMMER_GESTURE_CONFIG"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵConsole"], [2, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["HAMMER_LOADER"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["EventManager"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["EventManager"], [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["EVENT_MANAGER_PLUGINS"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](135680, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["ɵDomSharedStylesHost"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["ɵDomSharedStylesHost"], [_angular_common__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["ɵDomRendererFactory2"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["ɵDomRendererFactory2"], [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["EventManager"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["ɵDomSharedStylesHost"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_ID"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_animations_browser__WEBPACK_IMPORTED_MODULE_9__["AnimationDriver"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["ɵangular_packages_platform_browser_animations_animations_a"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_animations_browser__WEBPACK_IMPORTED_MODULE_9__["ɵAnimationStyleNormalizer"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["ɵangular_packages_platform_browser_animations_animations_b"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_animations_browser__WEBPACK_IMPORTED_MODULE_9__["ɵAnimationEngine"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["ɵInjectableAnimationEngine"], [_angular_common__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"], _angular_animations_browser__WEBPACK_IMPORTED_MODULE_9__["AnimationDriver"], _angular_animations_browser__WEBPACK_IMPORTED_MODULE_9__["ɵAnimationStyleNormalizer"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["RendererFactory2"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["ɵangular_packages_platform_browser_animations_animations_c"], [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["ɵDomRendererFactory2"], _angular_animations_browser__WEBPACK_IMPORTED_MODULE_9__["ɵAnimationEngine"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["ɵSharedStylesHost"], null, [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["ɵDomSharedStylesHost"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_core__WEBPACK_IMPORTED_MODULE_0__["Testability"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Testability"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_o"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_o"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormBuilder"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormBuilder"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_animations__WEBPACK_IMPORTED_MODULE_12__["AnimationBuilder"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["ɵBrowserAnimationBuilder"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["RendererFactory2"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpXsrfTokenExtractor"], _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["ɵangular_packages_common_http_http_g"], [_angular_common__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"], _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["ɵangular_packages_common_http_http_e"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["ɵangular_packages_common_http_http_h"], _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["ɵangular_packages_common_http_http_h"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpXsrfTokenExtractor"], _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["ɵangular_packages_common_http_http_f"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HTTP_INTERCEPTORS"], function (p0_0, p1_0, p1_1) { return [p0_0, new _NgxAuthJWTInterceptor__WEBPACK_IMPORTED_MODULE_14__["NgxAuthJWTInterceptor"](p1_0, p1_1), new _ContentTypeInterceptor__WEBPACK_IMPORTED_MODULE_15__["ContentTypeInterceptor"]()]; }, [_angular_common_http__WEBPACK_IMPORTED_MODULE_13__["ɵangular_packages_common_http_http_h"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NB_AUTH_TOKEN_INTERCEPTOR_FILTER"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["ɵangular_packages_common_http_http_d"], _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["ɵangular_packages_common_http_http_d"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["XhrFactory"], null, [_angular_common_http__WEBPACK_IMPORTED_MODULE_13__["ɵangular_packages_common_http_http_d"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpXhrBackend"], _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpXhrBackend"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_13__["XhrFactory"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpBackend"], null, [_angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpXhrBackend"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpHandler"], _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["ɵHttpInterceptingHandler"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpBackend"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClient"], _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClient"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpHandler"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_router__WEBPACK_IMPORTED_MODULE_17__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_router_router_g"], [_angular_router__WEBPACK_IMPORTED_MODULE_17__["Router"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_router__WEBPACK_IMPORTED_MODULE_17__["NoPreloading"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["NoPreloading"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _angular_router__WEBPACK_IMPORTED_MODULE_17__["PreloadingStrategy"], null, [_angular_router__WEBPACK_IMPORTED_MODULE_17__["NoPreloading"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](135680, _angular_router__WEBPACK_IMPORTED_MODULE_17__["RouterPreloader"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["RouterPreloader"], [_angular_router__WEBPACK_IMPORTED_MODULE_17__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleFactoryLoader"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Compiler"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["PreloadingStrategy"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_router__WEBPACK_IMPORTED_MODULE_17__["PreloadAllModules"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["PreloadAllModules"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_router__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_router_router_o"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_router_router_c"], [_angular_router__WEBPACK_IMPORTED_MODULE_17__["Router"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["ViewportScroller"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["ROUTER_CONFIGURATION"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_router__WEBPACK_IMPORTED_MODULE_17__["ROUTER_INITIALIZER"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_router_router_j"], [_angular_router__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_router_router_h"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_BOOTSTRAP_LISTENER"], function (p0_0) { return [p0_0]; }, [_angular_router__WEBPACK_IMPORTED_MODULE_17__["ROUTER_INITIALIZER"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbRestoreScrollTopHelper"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbRestoreScrollTopHelper"], [_angular_router__WEBPACK_IMPORTED_MODULE_17__["Router"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbLayoutScrollService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbLayoutScrollService"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbPlatform"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbPlatform"], [[2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_19__["ScrollDispatcher"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbScrollDispatcherAdapter"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbPlatform"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbLayoutScrollService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbLayoutRulerService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbLayoutRulerService"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](135680, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbViewportRulerAdapter"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbViewportRulerAdapter"], [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbPlatform"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbLayoutRulerService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbLayoutScrollService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_DOCUMENT"], null, [_angular_common__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__["ScrollStrategyOptions"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["ɵb"], [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbLayoutScrollService"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_19__["ScrollDispatcher"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbViewportRulerAdapter"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_DOCUMENT"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](135680, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlayContainerAdapter"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlayContainerAdapter"], [_angular_common__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__["OverlayContainer"], null, [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlayContainerAdapter"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__["Overlay"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__["Overlay"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__["ScrollStrategyOptions"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__["OverlayContainer"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__["OverlayPositionBuilder"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__["OverlayKeyboardDispatcher"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_21__["Directionality"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__["ɵc"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__["ɵd"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__["Overlay"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbSearchService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbSearchService"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbDateService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbNativeDateService"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_7__["DatePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["DatePipe"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbCalendarMonthModelService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbCalendarMonthModelService"], [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbDateService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_WINDOW"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["nbWindowFactory"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbJSThemesRegistry"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbJSThemesRegistry"], [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_BUILT_IN_JS_THEMES"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_JS_THEMES"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbMediaBreakpointsService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbMediaBreakpointsService"], [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_MEDIA_BREAKPOINTS"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbThemeService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbThemeService"], [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_THEME_OPTIONS"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbMediaBreakpointsService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbJSThemesRegistry"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbSpinnerService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbSpinnerService"], [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_DOCUMENT"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbLayoutDirectionService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbLayoutDirectionService"], [[2, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_LAYOUT_DIRECTION"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlayPositionBuilder"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlayPositionBuilder"], [_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_19__["ViewportRuler"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_22__["Platform"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__["OverlayContainer"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbPositionBuilderService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbPositionBuilderService"], [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_DOCUMENT"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbViewportRulerAdapter"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbPlatform"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlayPositionBuilder"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlayContainerAdapter"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbTriggerStrategyBuilderService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbTriggerStrategyBuilderService"], [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_DOCUMENT"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlay"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlay"], [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__["ScrollStrategyOptions"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__["OverlayContainer"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__["OverlayPositionBuilder"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__["OverlayKeyboardDispatcher"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_21__["Directionality"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlayService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlayService"], [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlay"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbLayoutDirectionService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbPositionHelper"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbPositionHelper"], [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbLayoutDirectionService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbBlockScrollStrategyAdapter"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbBlockScrollStrategyAdapter"], [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_DOCUMENT"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbViewportRulerAdapter"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbLayoutScrollService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlayContainer"], null, [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlayContainerAdapter"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbFocusTrapFactoryService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbFocusTrapFactoryService"], [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_23__["InteractivityChecker"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_DOCUMENT"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["ɵd"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["ɵd"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbSidebarService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbSidebarService"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbMenuService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbMenuService"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["ɵa"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["ɵa"], [_angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_DATE_ADAPTER"], function (p0_0, p1_0) { return [new _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbDateAdapterService"](p0_0), new _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbRangeAdapterService"](p1_0)]; }, [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbDateService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbDateService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbDialogService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbDialogService"], [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_DOCUMENT"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_DIALOG_CONFIG"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbPositionBuilderService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlayService"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbWindowService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbWindowService"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlayService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlayPositionBuilder"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbBlockScrollStrategyAdapter"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_WINDOW_CONFIG"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_DOCUMENT"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbToastrContainerRegistry"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbToastrContainerRegistry"], [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlayService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbPositionBuilderService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbPositionHelper"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_DOCUMENT"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbToastrService"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbToastrService"], [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_TOASTR_CONFIG"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbToastrContainerRegistry"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_mock_users_service__WEBPACK_IMPORTED_MODULE_24__["UserService"], _core_mock_users_service__WEBPACK_IMPORTED_MODULE_24__["UserService"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_data_users__WEBPACK_IMPORTED_MODULE_25__["UserData"], _core_mock_users_service__WEBPACK_IMPORTED_MODULE_24__["UserService"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NB_AUTH_OPTIONS"], _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["nbOptionsFactory"], [_nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NB_AUTH_USER_OPTIONS"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NB_AUTH_STRATEGIES"], _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["nbStrategiesFactory"], [_nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NB_AUTH_OPTIONS"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NB_AUTH_TOKENS"], _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["nbTokensFactory"], [_nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NB_AUTH_STRATEGIES"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbAuthTokenParceler"], _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbAuthTokenParceler"], [_nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NB_AUTH_FALLBACK_TOKEN"], _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NB_AUTH_TOKENS"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbTokenStorage"], _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbTokenLocalStorage"], [_nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbAuthTokenParceler"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbTokenService"], _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbTokenService"], [_nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbTokenStorage"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbAuthService"], _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbAuthService"], [_nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbTokenService"], _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NB_AUTH_STRATEGIES"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbDummyAuthStrategy"], _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbDummyAuthStrategy"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbPasswordAuthStrategy"], _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbPasswordAuthStrategy"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["ActivatedRoute"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbOAuth2AuthStrategy"], _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbOAuth2AuthStrategy"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["ActivatedRoute"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_WINDOW"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_security__WEBPACK_IMPORTED_MODULE_26__["NbAclService"], _nebular_security__WEBPACK_IMPORTED_MODULE_26__["NbAclService"], [[2, _nebular_security__WEBPACK_IMPORTED_MODULE_26__["NB_SECURITY_OPTIONS_TOKEN"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_security__WEBPACK_IMPORTED_MODULE_26__["NbRoleProvider"], _core_core_module__WEBPACK_IMPORTED_MODULE_27__["NbSimpleRoleProvider"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _nebular_security__WEBPACK_IMPORTED_MODULE_26__["NbAccessChecker"], _nebular_security__WEBPACK_IMPORTED_MODULE_26__["NbAccessChecker"], [_nebular_security__WEBPACK_IMPORTED_MODULE_26__["NbRoleProvider"], _nebular_security__WEBPACK_IMPORTED_MODULE_26__["NbAclService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_utils_analytics_service__WEBPACK_IMPORTED_MODULE_28__["AnalyticsService"], _core_utils_analytics_service__WEBPACK_IMPORTED_MODULE_28__["AnalyticsService"], [_angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["Router"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_utils_layout_service__WEBPACK_IMPORTED_MODULE_29__["LayoutService"], _core_utils_layout_service__WEBPACK_IMPORTED_MODULE_29__["LayoutService"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_utils_player_service__WEBPACK_IMPORTED_MODULE_30__["PlayerService"], _core_utils_player_service__WEBPACK_IMPORTED_MODULE_30__["PlayerService"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](135680, _core_utils_seo_service__WEBPACK_IMPORTED_MODULE_31__["SeoService"], _core_utils_seo_service__WEBPACK_IMPORTED_MODULE_31__["SeoService"], [_angular_router__WEBPACK_IMPORTED_MODULE_17__["Router"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](135680, _core_utils_state_service__WEBPACK_IMPORTED_MODULE_32__["StateService"], _core_utils_state_service__WEBPACK_IMPORTED_MODULE_32__["StateService"], [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbLayoutDirectionService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _auth_guard_service__WEBPACK_IMPORTED_MODULE_33__["AuthGuard"], _auth_guard_service__WEBPACK_IMPORTED_MODULE_33__["AuthGuard"], [_nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbAuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["Router"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_wqx_services_wqx_organization_service__WEBPACK_IMPORTED_MODULE_34__["WQXOrganizationService"], _core_wqx_services_wqx_organization_service__WEBPACK_IMPORTED_MODULE_34__["WQXOrganizationService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClient"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_wqx_services_wqx_project_service__WEBPACK_IMPORTED_MODULE_35__["WQXProjectService"], _core_wqx_services_wqx_project_service__WEBPACK_IMPORTED_MODULE_35__["WQXProjectService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClient"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_wqx_services_wqx_activity_service__WEBPACK_IMPORTED_MODULE_36__["WQXActivityService"], _core_wqx_services_wqx_activity_service__WEBPACK_IMPORTED_MODULE_36__["WQXActivityService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClient"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _core_wqx_services_wqx_monloc_service__WEBPACK_IMPORTED_MODULE_37__["WqxMonlocService"], _core_wqx_services_wqx_monloc_service__WEBPACK_IMPORTED_MODULE_37__["WqxMonlocService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClient"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_7__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ErrorHandler"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_platform_browser_platform_browser_a"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgProbeToken"], function () { return [_angular_router__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_router_router_b"]()]; }, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_router__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_router_router_h"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_router_router_h"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_INITIALIZER"], function (p0_0, p1_0) { return [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_platform_browser_platform_browser_j"](p0_0), _angular_router__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_router_router_i"](p1_0)]; }, [[2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgProbeToken"]], _angular_router__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_router_router_h"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationInitStatus"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationInitStatus"], [[2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_INITIALIZER"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](131584, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵConsole"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ErrorHandler"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationInitStatus"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationModule"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationModule"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["BrowserModule"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["BrowserModule"], [[3, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["BrowserModule"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_d"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_d"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ReactiveFormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ReactiveFormsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["BrowserAnimationsModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["BrowserAnimationsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClientXsrfModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClientXsrfModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClientModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClientModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_router_router_a"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_router_router_e"], [[3, _angular_router__WEBPACK_IMPORTED_MODULE_17__["Router"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_router__WEBPACK_IMPORTED_MODULE_17__["UrlSerializer"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["DefaultUrlSerializer"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_router__WEBPACK_IMPORTED_MODULE_17__["ChildrenOutletContexts"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["ChildrenOutletContexts"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_router__WEBPACK_IMPORTED_MODULE_17__["ROUTER_CONFIGURATION"], { useHash: false }, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_common__WEBPACK_IMPORTED_MODULE_7__["LocationStrategy"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_router_router_d"], [_angular_common__WEBPACK_IMPORTED_MODULE_7__["PlatformLocation"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_7__["APP_BASE_HREF"]], _angular_router__WEBPACK_IMPORTED_MODULE_17__["ROUTER_CONFIGURATION"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"], [_angular_common__WEBPACK_IMPORTED_MODULE_7__["LocationStrategy"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["PlatformLocation"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["Compiler"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Compiler"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleFactoryLoader"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["SystemJsNgModuleLoader"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["Compiler"], [2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["SystemJsNgModuleLoaderConfig"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_17__["ROUTES"], function () { return [[{ path: "pages", canActivate: [_auth_guard_service__WEBPACK_IMPORTED_MODULE_33__["AuthGuard"]], loadChildren: _app_routing_module__WEBPACK_IMPORTED_MODULE_38__["ɵ0"] }, { path: "secure", loadChildren: _app_routing_module__WEBPACK_IMPORTED_MODULE_38__["ɵ1"] }, { path: "auth", component: _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbAuthComponent"], children: [{ path: "", component: _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbLoginComponent"] }, { path: "login", component: _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbLoginComponent"] }, { path: "register", component: _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbRegisterComponent"] }, { path: "logout", component: _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbLogoutComponent"] }, { path: "request-password", component: _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbRequestPasswordComponent"] }, { path: "reset-password", component: _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbResetPasswordComponent"] }] }, { path: "", redirectTo: "pages", pathMatch: "full" }, { path: "**", redirectTo: "pages" }]]; }, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_17__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_router_router_f"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["UrlSerializer"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["ChildrenOutletContexts"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleFactoryLoader"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Compiler"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["ROUTES"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["ROUTER_CONFIGURATION"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_17__["UrlHandlingStrategy"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_17__["RouteReuseStrategy"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_router__WEBPACK_IMPORTED_MODULE_17__["RouterModule"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["RouterModule"], [[2, _angular_router__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_router_router_a"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_17__["Router"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _app_routing_module__WEBPACK_IMPORTED_MODULE_38__["AppRoutingModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_38__["AppRoutingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["ɵc"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["ɵc"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbLayoutModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbLayoutModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbIconModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbIconModule"], [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbIconLibraries"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbMenuModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbMenuModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbBadgeModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbBadgeModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbUserModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbUserModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbActionsModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbActionsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_21__["BidiModule"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_21__["BidiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_39__["PortalModule"], _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_39__["PortalModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_22__["PlatformModule"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_22__["PlatformModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_19__["ScrollingModule"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_19__["ScrollingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__["OverlayModule"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_20__["OverlayModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbCdkMappingModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbCdkMappingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbCdkAdapterModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbCdkAdapterModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlayModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbOverlayModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbButtonModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbButtonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbSearchModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbSearchModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbSidebarModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbSidebarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbContextMenuModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbContextMenuModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_security__WEBPACK_IMPORTED_MODULE_26__["NbSecurityModule"], _nebular_security__WEBPACK_IMPORTED_MODULE_26__["NbSecurityModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbInputModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbInputModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbCardModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbCardModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbCheckboxModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbCheckboxModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbSelectModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbSelectModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_eva_icons__WEBPACK_IMPORTED_MODULE_40__["NbEvaIconsModule"], _nebular_eva_icons__WEBPACK_IMPORTED_MODULE_40__["NbEvaIconsModule"], [_nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbIconLibraries"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _theme_theme_module__WEBPACK_IMPORTED_MODULE_41__["ThemeModule"], _theme_theme_module__WEBPACK_IMPORTED_MODULE_41__["ThemeModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbCalendarKitModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbCalendarKitModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbBaseCalendarModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbBaseCalendarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbCalendarModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbCalendarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbCalendarRangeModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbCalendarRangeModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbDatepickerModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbDatepickerModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbDialogModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbDialogModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbWindowModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbWindowModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbToastrModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbToastrModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbChatModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbChatModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbAlertModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbAlertModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbAuthModule"], _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbAuthModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _core_core_module__WEBPACK_IMPORTED_MODULE_27__["CoreModule"], _core_core_module__WEBPACK_IMPORTED_MODULE_27__["CoreModule"], [[3, _core_core_module__WEBPACK_IMPORTED_MODULE_27__["CoreModule"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"], _app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵAPP_ROOT"], true, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["ANIMATION_MODULE_TYPE"], "BrowserAnimations", []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["ɵangular_packages_common_http_http_e"], "XSRF-TOKEN", []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["ɵangular_packages_common_http_http_f"], "X-XSRF-TOKEN", []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NB_AUTH_TOKEN_INTERCEPTOR_FILTER"], _app_module__WEBPACK_IMPORTED_MODULE_1__["ɵ0"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_THEME_OPTIONS"], { name: "default" }, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_BUILT_IN_JS_THEMES"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["BUILT_IN_THEMES"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_JS_THEMES"], [{ name: "default", base: "default", variables: { temperature: { arcFill: ["#3366ff", "#3366ff", "#3366ff", "#3366ff", "#3366ff"], arcEmpty: "#f7f9fc", thumbBg: "#f7f9fc", thumbBorder: "#3366ff" }, solar: { gradientLeft: "#3366ff", gradientRight: "#3366ff", shadowColor: "rgba(0, 0, 0, 0)", secondSeriesFill: "#f7f9fc", radius: ["80%", "90%"] }, traffic: { tooltipBg: "#ffffff", tooltipBorderColor: "#f7f9fc", tooltipExtraCss: "border-radius: 10px; padding: 4px 16px;", tooltipTextColor: "#1a2138", tooltipFontWeight: "normal", yAxisSplitLine: "#edf1f7", lineBg: "#e4e9f2", lineShadowBlur: "1", itemColor: "#e4e9f2", itemBorderColor: "#e4e9f2", itemEmphasisBorderColor: "#3366ff", shadowLineDarkBg: "rgba(0, 0, 0, 0)", shadowLineShadow: "rgba(0, 0, 0, 0)", gradFrom: "#f7f9fc", gradTo: "#f7f9fc" }, electricity: { tooltipBg: "#ffffff", tooltipLineColor: "#1a2138", tooltipLineWidth: "0", tooltipBorderColor: "#f7f9fc", tooltipExtraCss: "border-radius: 10px; padding: 8px 24px;", tooltipTextColor: "#1a2138", tooltipFontWeight: "normal", axisLineColor: "#edf1f7", xAxisTextColor: "#8f9bb3", yAxisSplitLine: "#edf1f7", itemBorderColor: "#3366ff", lineStyle: "solid", lineWidth: "4", lineGradFrom: "#3366ff", lineGradTo: "#3366ff", lineShadow: "rgba(0, 0, 0, 0)", areaGradFrom: "#f7f9fc", areaGradTo: "#f7f9fc", shadowLineDarkBg: "rgba(0, 0, 0, 0)" }, bubbleMap: { titleColor: "#1a2138", areaColor: "#e4e9f2", areaHoverColor: "#3366ff", areaBorderColor: "#c5cee0" }, profitBarAnimationEchart: { textColor: "#1a2138", firstAnimationBarColor: "#3366ff", secondAnimationBarColor: "#00d68f", splitLineStyleOpacity: "1", splitLineStyleWidth: "1", splitLineStyleColor: "#edf1f7", tooltipTextColor: "#1a2138", tooltipFontWeight: "normal", tooltipFontSize: "16", tooltipBg: "#ffffff", tooltipBorderColor: "#f7f9fc", tooltipBorderWidth: "1", tooltipExtraCss: "border-radius: 10px; padding: 4px 16px;" }, trafficBarEchart: { gradientFrom: "#ffc94d", gradientTo: "#ffaa00", shadow: "#ffc94d", shadowBlur: "0", axisTextColor: "#1a2138", axisFontSize: "12", tooltipBg: "#ffffff", tooltipBorderColor: "#f7f9fc", tooltipExtraCss: "border-radius: 10px; padding: 4px 16px;", tooltipTextColor: "#1a2138", tooltipFontWeight: "normal" }, countryOrders: { countryBorderColor: "#e4e9f2", countryFillColor: "#edf1f7", countryBorderWidth: "1", hoveredCountryBorderColor: "#3366ff", hoveredCountryFillColor: "#598bff", hoveredCountryBorderWidth: "1", chartAxisLineColor: "#e4e9f2", chartAxisTextColor: "#8f9bb3", chartAxisFontSize: "16", chartGradientTo: "#3366ff", chartGradientFrom: "#598bff", chartAxisSplitLine: "#edf1f7", chartShadowLineColor: "#598bff", chartLineBottomShadowColor: "#3366ff", chartInnerLineColor: "#f7f9fc" }, echarts: { bg: "#ffffff", textColor: "#1a2138", axisLineColor: "#1a2138", splitLineColor: "#edf1f7", itemHoverShadowColor: "rgba(0, 0, 0, 0.5)", tooltipBackgroundColor: "#3366ff", areaOpacity: "0.7" }, chartjs: { axisLineColor: "#edf1f7", textColor: "#1a2138" }, orders: { tooltipBg: "#ffffff", tooltipLineColor: "rgba(0, 0, 0, 0)", tooltipLineWidth: "0", tooltipBorderColor: "#f7f9fc", tooltipExtraCss: "border-radius: 10px; padding: 8px 24px;", tooltipTextColor: "#1a2138", tooltipFontWeight: "normal", tooltipFontSize: "20", axisLineColor: "#e4e9f2", axisFontSize: "16", axisTextColor: "#8f9bb3", yAxisSplitLine: "#edf1f7", itemBorderColor: "#3366ff", lineStyle: "solid", lineWidth: "4", firstAreaGradFrom: "#edf1f7", firstAreaGradTo: "#edf1f7", firstShadowLineDarkBg: "rgba(0, 0, 0, 0)", secondLineGradFrom: "#3366ff", secondLineGradTo: "#3366ff", secondAreaGradFrom: "rgba(51, 102, 255, 0.2)", secondAreaGradTo: "rgba(51, 102, 255, 0)", secondShadowLineDarkBg: "rgba(0, 0, 0, 0)", thirdLineGradFrom: "#00d68f", thirdLineGradTo: "#2ce69b", thirdAreaGradFrom: "rgba(0, 214, 143, 0.2)", thirdAreaGradTo: "rgba(0, 214, 143, 0)", thirdShadowLineDarkBg: "rgba(0, 0, 0, 0)" }, profit: { bg: "#ffffff", textColor: "#1a2138", axisLineColor: "#e4e9f2", splitLineColor: "#edf1f7", areaOpacity: "1", axisFontSize: "16", axisTextColor: "#8f9bb3", firstLineGradFrom: "#edf1f7", firstLineGradTo: "#edf1f7", firstLineShadow: "rgba(0, 0, 0, 0)", secondLineGradFrom: "#3366ff", secondLineGradTo: "#3366ff", secondLineShadow: "rgba(0, 0, 0, 0)", thirdLineGradFrom: "#00d68f", thirdLineGradTo: "#2ce69b", thirdLineShadow: "rgba(0, 0, 0, 0)" }, orderProfitLegend: { firstItem: "#00d68f", secondItem: "#3366ff", thirdItem: "#edf1f7" }, visitors: { tooltipBg: "#ffffff", tooltipLineColor: "rgba(0, 0, 0, 0)", tooltipLineWidth: "1", tooltipBorderColor: "#f7f9fc", tooltipExtraCss: "border-radius: 10px; padding: 8px 24px;", tooltipTextColor: "#1a2138", tooltipFontWeight: "normal", tooltipFontSize: "20", axisLineColor: "#e4e9f2", axisFontSize: "16", axisTextColor: "#8f9bb3", yAxisSplitLine: "#edf1f7", itemBorderColor: "#3366ff", lineStyle: "dotted", lineWidth: "6", lineGradFrom: "#ffffff", lineGradTo: "#ffffff", lineShadow: "rgba(0, 0, 0, 0)", areaGradFrom: "#3366ff", areaGradTo: "#598bff", innerLineStyle: "solid", innerLineWidth: "1", innerAreaGradFrom: "#00d68f", innerAreaGradTo: "#00d68f" }, visitorsLegend: { firstIcon: "#00d68f", secondIcon: "#3366ff" }, visitorsPie: { firstPieGradientLeft: "#00d68f", firstPieGradientRight: "#00d68f", firstPieShadowColor: "rgba(0, 0, 0, 0)", firstPieRadius: ["70%", "90%"], secondPieGradientLeft: "#ffaa00", secondPieGradientRight: "#ffc94d", secondPieShadowColor: "rgba(0, 0, 0, 0)", secondPieRadius: ["60%", "97%"], shadowOffsetX: "0", shadowOffsetY: "0" }, visitorsPieLegend: { firstSection: "#ffaa00", secondSection: "#00d68f" }, earningPie: { radius: ["65%", "100%"], center: ["50%", "50%"], fontSize: "22", firstPieGradientLeft: "#00d68f", firstPieGradientRight: "#00d68f", firstPieShadowColor: "rgba(0, 0, 0, 0)", secondPieGradientLeft: "#3366ff", secondPieGradientRight: "#3366ff", secondPieShadowColor: "rgba(0, 0, 0, 0)", thirdPieGradientLeft: "#ffaa00", thirdPieGradientRight: "#ffaa00", thirdPieShadowColor: "rgba(0, 0, 0, 0)" }, earningLine: { gradFrom: "#3366ff", gradTo: "#3366ff", tooltipTextColor: "#1a2138", tooltipFontWeight: "normal", tooltipFontSize: "16", tooltipBg: "#ffffff", tooltipBorderColor: "#f7f9fc", tooltipBorderWidth: "1", tooltipExtraCss: "border-radius: 10px; padding: 4px 16px;" } } }, { name: "cosmic", base: "cosmic", variables: { temperature: { arcFill: ["#2ec7fe", "#31ffad", "#7bff24", "#fff024", "#f7bd59"], arcEmpty: "#252547", thumbBg: "#ffffff", thumbBorder: "#ffffff" }, solar: { gradientLeft: "#a16eff", gradientRight: "#a16eff", shadowColor: "rgba(0, 0, 0, 0)", secondSeriesFill: "#252547", radius: ["70%", "90%"] }, traffic: { tooltipBg: "#323259", tooltipBorderColor: "#252547", tooltipExtraCss: "box-shadow: 0px 2px 46px 0 rgba(50, 50, 89); border-radius: 10px; padding: 4px 16px;", tooltipTextColor: "#ffffff", tooltipFontWeight: "normal", yAxisSplitLine: "#151a30", lineBg: "#252547", lineShadowBlur: "14", itemColor: "#252547", itemBorderColor: "#252547", itemEmphasisBorderColor: "#a16eff", shadowLineDarkBg: "#1b1b38", shadowLineShadow: "#1b1b38", gradFrom: "#323259", gradTo: "#252547" }, electricity: { tooltipBg: "#323259", tooltipLineColor: "#ffffff", tooltipLineWidth: "0", tooltipBorderColor: "#252547", tooltipExtraCss: "box-shadow: 0px 2px 46px 0 rgba(0, 255, 170, 0.35); border-radius: 10px; padding: 8px 24px;", tooltipTextColor: "#ffffff", tooltipFontWeight: "normal", axisLineColor: "#1b1b38", xAxisTextColor: "#b4b4db", yAxisSplitLine: "#151a30", itemBorderColor: "#252547", lineStyle: "dotted", lineWidth: "6", lineGradFrom: "#00d68f", lineGradTo: "#ffaa00", lineShadow: "#13132b", areaGradFrom: "#252547", areaGradTo: "#1b1b38", shadowLineDarkBg: "#1b1b38" }, bubbleMap: { titleColor: "#ffffff", areaColor: "#13132b", areaHoverColor: "#a16eff", areaBorderColor: "#13132b" }, profitBarAnimationEchart: { textColor: "#ffffff", firstAnimationBarColor: "#a16eff", secondAnimationBarColor: "#00d68f", splitLineStyleOpacity: "1", splitLineStyleWidth: "1", splitLineStyleColor: "#252547", tooltipTextColor: "#ffffff", tooltipFontWeight: "normal", tooltipFontSize: "16", tooltipBg: "#323259", tooltipBorderColor: "#252547", tooltipBorderWidth: "1", tooltipExtraCss: "border-radius: 10px; padding: 4px 16px;" }, trafficBarEchart: { gradientFrom: "#ffc94d", gradientTo: "#ffaa00", shadow: "#ffc94d", shadowBlur: "5", axisTextColor: "#ffffff", axisFontSize: "12", tooltipBg: "#323259", tooltipBorderColor: "#252547", tooltipExtraCss: "border-radius: 10px; padding: 4px 16px;", tooltipTextColor: "#ffffff", tooltipFontWeight: "normal" }, countryOrders: { countryBorderColor: "#13132b", countryFillColor: "#1b1b38", countryBorderWidth: "1", hoveredCountryBorderColor: "#a16eff", hoveredCountryFillColor: "#b18aff", hoveredCountryBorderWidth: "1", chartAxisLineColor: "#13132b", chartAxisTextColor: "#b4b4db", chartAxisFontSize: "16", chartGradientTo: "#a16eff", chartGradientFrom: "#b18aff", chartAxisSplitLine: "#151a30", chartShadowLineColor: "#b18aff", chartLineBottomShadowColor: "#a16eff", chartInnerLineColor: "#252547" }, echarts: { bg: "#323259", textColor: "#ffffff", axisLineColor: "#ffffff", splitLineColor: "#151a30", itemHoverShadowColor: "rgba(0, 0, 0, 0.5)", tooltipBackgroundColor: "#a16eff", areaOpacity: "1" }, chartjs: { axisLineColor: "#151a30", textColor: "#ffffff" }, orders: { tooltipBg: "#323259", tooltipLineColor: "rgba(0, 0, 0, 0)", tooltipLineWidth: "0", tooltipBorderColor: "#252547", tooltipExtraCss: "border-radius: 10px; padding: 8px 24px;", tooltipTextColor: "#ffffff", tooltipFontWeight: "normal", tooltipFontSize: "20", axisLineColor: "#13132b", axisFontSize: "16", axisTextColor: "#b4b4db", yAxisSplitLine: "#151a30", itemBorderColor: "#a16eff", lineStyle: "solid", lineWidth: "4", firstAreaGradFrom: "#252547", firstAreaGradTo: "#252547", firstShadowLineDarkBg: "#252547", secondLineGradFrom: "#a16eff", secondLineGradTo: "#a16eff", secondAreaGradFrom: "rgba(161, 110, 255, 0.8)", secondAreaGradTo: "rgba(161, 110, 255, 0.5)", secondShadowLineDarkBg: "#a16eff", thirdLineGradFrom: "#00d68f", thirdLineGradTo: "#2ce69b", thirdAreaGradFrom: "rgba(0, 214, 143, 0.7)", thirdAreaGradTo: "rgba(0, 214, 143, 0.4)", thirdShadowLineDarkBg: "#00d68f" }, profit: { bg: "#323259", textColor: "#ffffff", axisLineColor: "#13132b", splitLineColor: "#151a30", areaOpacity: "1", axisFontSize: "16", axisTextColor: "#b4b4db", firstLineGradFrom: "#252547", firstLineGradTo: "#252547", firstLineShadow: "rgba(0, 0, 0, 0)", secondLineGradFrom: "#a16eff", secondLineGradTo: "#a16eff", secondLineShadow: "rgba(0, 0, 0, 0)", thirdLineGradFrom: "#00d68f", thirdLineGradTo: "#2ce69b", thirdLineShadow: "rgba(0, 0, 0, 0)" }, orderProfitLegend: { firstItem: "#00d68f", secondItem: "#a16eff", thirdItem: "#252547" }, visitors: { tooltipBg: "#323259", tooltipLineColor: "rgba(0, 0, 0, 0)", tooltipLineWidth: "1", tooltipBorderColor: "#252547", tooltipExtraCss: "border-radius: 10px; padding: 8px 24px;", tooltipTextColor: "#ffffff", tooltipFontWeight: "normal", tooltipFontSize: "20", axisLineColor: "#13132b", axisFontSize: "16", axisTextColor: "#b4b4db", yAxisSplitLine: "#151a30", itemBorderColor: "#a16eff", lineStyle: "dotted", lineWidth: "6", lineGradFrom: "#ffffff", lineGradTo: "#ffffff", lineShadow: "rgba(0, 0, 0, 0)", areaGradFrom: "#a16eff", areaGradTo: "#b18aff", innerLineStyle: "solid", innerLineWidth: "1", innerAreaGradFrom: "#00d68f", innerAreaGradTo: "#00d68f" }, visitorsLegend: { firstIcon: "#00d68f", secondIcon: "#a16eff" }, visitorsPie: { firstPieGradientLeft: "#00d68f", firstPieGradientRight: "#2ce69b", firstPieShadowColor: "rgba(0, 0, 0, 0)", firstPieRadius: ["70%", "90%"], secondPieGradientLeft: "#ffaa00", secondPieGradientRight: "#ffc94d", secondPieShadowColor: "rgba(0, 0, 0, 0)", secondPieRadius: ["60%", "95%"], shadowOffsetX: "0", shadowOffsetY: "3" }, visitorsPieLegend: { firstSection: "#ffaa00", secondSection: "#00d68f" }, earningPie: { radius: ["65%", "100%"], center: ["50%", "50%"], fontSize: "22", firstPieGradientLeft: "#00d68f", firstPieGradientRight: "#00d68f", firstPieShadowColor: "rgba(0, 0, 0, 0)", secondPieGradientLeft: "#a16eff", secondPieGradientRight: "#a16eff", secondPieShadowColor: "rgba(0, 0, 0, 0)", thirdPieGradientLeft: "#ffaa00", thirdPieGradientRight: "#ffaa00", thirdPieShadowColor: "rgba(0, 0, 0, 0)" }, earningLine: { gradFrom: "#a16eff", gradTo: "#a16eff", tooltipTextColor: "#ffffff", tooltipFontWeight: "normal", tooltipFontSize: "16", tooltipBg: "#323259", tooltipBorderColor: "#252547", tooltipBorderWidth: "1", tooltipExtraCss: "border-radius: 10px; padding: 4px 16px;" } } }, { name: "corporate", base: "corporate", variables: { temperature: { arcFill: ["#ffa36b", "#ffa36b", "#ff9e7a", "#ff9888", "#ff8ea0"], arcEmpty: "#f7f9fc", thumbBg: "#f7f9fc", thumbBorder: "#ffa36b" }, solar: { gradientLeft: "#73a1ff", gradientRight: "#73a1ff", shadowColor: "rgba(0, 0, 0, 0)", secondSeriesFill: "#f7f9fc", radius: ["80%", "90%"] }, traffic: { tooltipBg: "#ffffff", tooltipBorderColor: "#f7f9fc", tooltipExtraCss: "border-radius: 10px; padding: 4px 16px;", tooltipTextColor: "#1a2138", tooltipFontWeight: "normal", yAxisSplitLine: "rgba(0, 0, 0, 0)", lineBg: "#73a1ff", lineShadowBlur: "0", itemColor: "#e4e9f2", itemBorderColor: "#e4e9f2", itemEmphasisBorderColor: "#598bff", shadowLineDarkBg: "rgba(0, 0, 0, 0)", shadowLineShadow: "rgba(0, 0, 0, 0)", gradFrom: "#ffffff", gradTo: "#ffffff" }, electricity: { tooltipBg: "#ffffff", tooltipLineColor: "#1a2138", tooltipLineWidth: "0", tooltipBorderColor: "#f7f9fc", tooltipExtraCss: "border-radius: 10px; padding: 8px 24px;", tooltipTextColor: "#1a2138", tooltipFontWeight: "normal", axisLineColor: "#edf1f7", xAxisTextColor: "#8f9bb3", yAxisSplitLine: "#edf1f7", itemBorderColor: "#73a1ff", lineStyle: "solid", lineWidth: "4", lineGradFrom: "#73a1ff", lineGradTo: "#73a1ff", lineShadow: "rgba(0, 0, 0, 0)", areaGradFrom: "rgba(0, 0, 0, 0)", areaGradTo: "rgba(0, 0, 0, 0)", shadowLineDarkBg: "rgba(0, 0, 0, 0)" }, bubbleMap: { titleColor: "#1a2138", areaColor: "#e4e9f2", areaHoverColor: "#73a1ff", areaBorderColor: "#c5cee0" }, profitBarAnimationEchart: { textColor: "#1a2138", firstAnimationBarColor: "#73a1ff", secondAnimationBarColor: "#5dcfe3", splitLineStyleOpacity: "1", splitLineStyleWidth: "1", splitLineStyleColor: "#edf1f7", tooltipTextColor: "#1a2138", tooltipFontWeight: "normal", tooltipFontSize: "16", tooltipBg: "#ffffff", tooltipBorderColor: "#f7f9fc", tooltipBorderWidth: "1", tooltipExtraCss: "border-radius: 10px; padding: 4px 16px;" }, trafficBarEchart: { gradientFrom: "#ffc94d", gradientTo: "#ffa36b", shadow: "#ffc94d", shadowBlur: "0", axisTextColor: "#1a2138", axisFontSize: "12", tooltipBg: "#ffffff", tooltipBorderColor: "#f7f9fc", tooltipExtraCss: "border-radius: 10px; padding: 8px 24px;", tooltipTextColor: "#1a2138", tooltipFontWeight: "normal" }, countryOrders: { countryBorderColor: "#e4e9f2", countryFillColor: "#e4e9f2", countryBorderWidth: "1", hoveredCountryBorderColor: "#73a1ff", hoveredCountryFillColor: "#598bff", hoveredCountryBorderWidth: "1", chartAxisLineColor: "#e4e9f2", chartAxisTextColor: "#8f9bb3", chartAxisFontSize: "16", chartGradientTo: "#73a1ff", chartGradientFrom: "#598bff", chartAxisSplitLine: "#edf1f7", chartShadowLineColor: "#598bff", chartLineBottomShadowColor: "#73a1ff", chartInnerLineColor: "#f7f9fc" }, echarts: { bg: "#ffffff", textColor: "#1a2138", axisLineColor: "#1a2138", splitLineColor: "#edf1f7", itemHoverShadowColor: "rgba(0, 0, 0, 0.5)", tooltipBackgroundColor: "#73a1ff", areaOpacity: "0.7" }, chartjs: { axisLineColor: "#edf1f7", textColor: "#1a2138" }, orders: { tooltipBg: "#ffffff", tooltipLineColor: "rgba(0, 0, 0, 0)", tooltipLineWidth: "0", tooltipBorderColor: "#f7f9fc", tooltipExtraCss: "border-radius: 10px; padding: 8px 24px;", tooltipTextColor: "#1a2138", tooltipFontWeight: "normal", tooltipFontSize: "20", axisLineColor: "#e4e9f2", axisFontSize: "16", axisTextColor: "#8f9bb3", yAxisSplitLine: "#edf1f7", itemBorderColor: "#73a1ff", lineStyle: "solid", lineWidth: "4", firstAreaGradFrom: "#edf1f7", firstAreaGradTo: "#edf1f7", firstShadowLineDarkBg: "rgba(0, 0, 0, 0)", secondLineGradFrom: "#73a1ff", secondLineGradTo: "#73a1ff", secondAreaGradFrom: "rgba(0, 0, 0, 0)", secondAreaGradTo: "rgba(0, 0, 0, 0)", secondShadowLineDarkBg: "rgba(0, 0, 0, 0)", thirdLineGradFrom: "#5dcfe3", thirdLineGradTo: "#2ce69b", thirdAreaGradFrom: "rgba(0, 0, 0, 0)", thirdAreaGradTo: "rgba(0, 0, 0, 0)", thirdShadowLineDarkBg: "rgba(0, 0, 0, 0)" }, profit: { bg: "#ffffff", textColor: "#1a2138", axisLineColor: "#e4e9f2", splitLineColor: "#edf1f7", areaOpacity: "1", axisFontSize: "16", axisTextColor: "#8f9bb3", firstLineGradFrom: "#edf1f7", firstLineGradTo: "#edf1f7", firstLineShadow: "rgba(0, 0, 0, 0)", secondLineGradFrom: "#73a1ff", secondLineGradTo: "#73a1ff", secondLineShadow: "rgba(0, 0, 0, 0)", thirdLineGradFrom: "#5dcfe3", thirdLineGradTo: "#5dcfe3", thirdLineShadow: "rgba(0, 0, 0, 0)" }, orderProfitLegend: { firstItem: "#5dcfe3", secondItem: "#73a1ff", thirdItem: "#edf1f7" }, visitors: { tooltipBg: "#ffffff", tooltipLineColor: "rgba(0, 0, 0, 0)", tooltipLineWidth: "1", tooltipBorderColor: "#f7f9fc", tooltipExtraCss: "border-radius: 10px; padding: 8px 24px;", tooltipTextColor: "#1a2138", tooltipFontWeight: "normal", tooltipFontSize: "20", axisLineColor: "#e4e9f2", axisFontSize: "16", axisTextColor: "#8f9bb3", yAxisSplitLine: "#edf1f7", itemBorderColor: "#73a1ff", lineStyle: "dotted", lineWidth: "6", lineGradFrom: "#ffffff", lineGradTo: "#ffffff", lineShadow: "rgba(0, 0, 0, 0)", areaGradFrom: "#73a1ff", areaGradTo: "#598bff", innerLineStyle: "solid", innerLineWidth: "1", innerAreaGradFrom: "#5dcfe3", innerAreaGradTo: "#5dcfe3" }, visitorsLegend: { firstIcon: "#5dcfe3", secondIcon: "#73a1ff" }, visitorsPie: { firstPieGradientLeft: "#5dcfe3", firstPieGradientRight: "#5dcfe3", firstPieShadowColor: "rgba(0, 0, 0, 0)", firstPieRadius: ["65%", "90%"], secondPieGradientLeft: "#ffa36b", secondPieGradientRight: "#ffc94d", secondPieShadowColor: "rgba(0, 0, 0, 0)", secondPieRadius: ["63%", "92%"], shadowOffsetX: "-4", shadowOffsetY: "-4" }, visitorsPieLegend: { firstSection: "#ffa36b", secondSection: "#5dcfe3" }, earningPie: { radius: ["65%", "100%"], center: ["50%", "50%"], fontSize: "22", firstPieGradientLeft: "#5dcfe3", firstPieGradientRight: "#5dcfe3", firstPieShadowColor: "rgba(0, 0, 0, 0)", secondPieGradientLeft: "#73a1ff", secondPieGradientRight: "#73a1ff", secondPieShadowColor: "rgba(0, 0, 0, 0)", thirdPieGradientLeft: "#ffa36b", thirdPieGradientRight: "#ffa36b", thirdPieShadowColor: "rgba(0, 0, 0, 0)" }, earningLine: { gradFrom: "#73a1ff", gradTo: "#73a1ff", tooltipTextColor: "#1a2138", tooltipFontWeight: "normal", tooltipFontSize: "16", tooltipBg: "#ffffff", tooltipBorderColor: "#f7f9fc", tooltipBorderWidth: "1", tooltipExtraCss: "border-radius: 10px; padding: 4px 16px;" } } }, { name: "dark", base: "dark", variables: { temperature: { arcFill: ["#3366ff", "#3366ff", "#3366ff", "#3366ff", "#3366ff"], arcEmpty: "#1a2138", thumbBg: "#1a2138", thumbBorder: "#3366ff" }, solar: { gradientLeft: "#3366ff", gradientRight: "#3366ff", shadowColor: "rgba(0, 0, 0, 0)", secondSeriesFill: "#1a2138", radius: ["80%", "90%"] }, traffic: { tooltipBg: "#222b45", tooltipBorderColor: "#1a2138", tooltipExtraCss: "border-radius: 10px; padding: 4px 16px;", tooltipTextColor: "#ffffff", tooltipFontWeight: "normal", yAxisSplitLine: "#1b1b38", lineBg: "#101426", lineShadowBlur: "1", itemColor: "#101426", itemBorderColor: "#101426", itemEmphasisBorderColor: "#3366ff", shadowLineDarkBg: "rgba(0, 0, 0, 0)", shadowLineShadow: "rgba(0, 0, 0, 0)", gradFrom: "#1a2138", gradTo: "#1a2138" }, electricity: { tooltipBg: "#222b45", tooltipLineColor: "#ffffff", tooltipLineWidth: "0", tooltipBorderColor: "#1a2138", tooltipExtraCss: "border-radius: 10px; padding: 8px 24px;", tooltipTextColor: "#ffffff", tooltipFontWeight: "normal", axisLineColor: "#151a30", xAxisTextColor: "#8f9bb3", yAxisSplitLine: "#1b1b38", itemBorderColor: "#3366ff", lineStyle: "solid", lineWidth: "4", lineGradFrom: "#3366ff", lineGradTo: "#3366ff", lineShadow: "rgba(0, 0, 0, 0)", areaGradFrom: "#1a2138", areaGradTo: "#1a2138", shadowLineDarkBg: "rgba(0, 0, 0, 0)" }, bubbleMap: { titleColor: "#ffffff", areaColor: "#101426", areaHoverColor: "#3366ff", areaBorderColor: "#101426" }, profitBarAnimationEchart: { textColor: "#ffffff", firstAnimationBarColor: "#3366ff", secondAnimationBarColor: "#00d68f", splitLineStyleOpacity: "1", splitLineStyleWidth: "1", splitLineStyleColor: "#1b1b38", tooltipTextColor: "#ffffff", tooltipFontWeight: "normal", tooltipFontSize: "16", tooltipBg: "#222b45", tooltipBorderColor: "#1a2138", tooltipBorderWidth: "1", tooltipExtraCss: "border-radius: 10px; padding: 4px 16px;" }, trafficBarEchart: { gradientFrom: "#ffc94d", gradientTo: "#ffaa00", shadow: "#ffc94d", shadowBlur: "0", axisTextColor: "#ffffff", axisFontSize: "12", tooltipBg: "#222b45", tooltipBorderColor: "#1a2138", tooltipExtraCss: "border-radius: 10px; padding: 4px 16px;", tooltipTextColor: "#ffffff", tooltipFontWeight: "normal" }, countryOrders: { countryBorderColor: "#101426", countryFillColor: "#151a30", countryBorderWidth: "1", hoveredCountryBorderColor: "#3366ff", hoveredCountryFillColor: "#598bff", hoveredCountryBorderWidth: "1", chartAxisLineColor: "#101426", chartAxisTextColor: "#8f9bb3", chartAxisFontSize: "16", chartGradientTo: "#3366ff", chartGradientFrom: "#598bff", chartAxisSplitLine: "#1b1b38", chartShadowLineColor: "#598bff", chartLineBottomShadowColor: "#3366ff", chartInnerLineColor: "#1a2138" }, echarts: { bg: "#222b45", textColor: "#ffffff", axisLineColor: "#ffffff", splitLineColor: "#1b1b38", itemHoverShadowColor: "rgba(0, 0, 0, 0.5)", tooltipBackgroundColor: "#3366ff", areaOpacity: "0.7" }, chartjs: { axisLineColor: "#1b1b38", textColor: "#ffffff" }, orders: { tooltipBg: "#222b45", tooltipLineColor: "rgba(0, 0, 0, 0)", tooltipLineWidth: "0", tooltipBorderColor: "#1a2138", tooltipExtraCss: "border-radius: 10px; padding: 8px 24px;", tooltipTextColor: "#ffffff", tooltipFontWeight: "normal", tooltipFontSize: "20", axisLineColor: "#101426", axisFontSize: "16", axisTextColor: "#8f9bb3", yAxisSplitLine: "#1b1b38", itemBorderColor: "#3366ff", lineStyle: "solid", lineWidth: "4", firstAreaGradFrom: "#151a30", firstAreaGradTo: "#151a30", firstShadowLineDarkBg: "rgba(0, 0, 0, 0)", secondLineGradFrom: "#3366ff", secondLineGradTo: "#3366ff", secondAreaGradFrom: "rgba(51, 102, 255, 0.2)", secondAreaGradTo: "rgba(51, 102, 255, 0)", secondShadowLineDarkBg: "rgba(0, 0, 0, 0)", thirdLineGradFrom: "#00d68f", thirdLineGradTo: "#2ce69b", thirdAreaGradFrom: "rgba(0, 214, 143, 0.2)", thirdAreaGradTo: "rgba(0, 214, 143, 0)", thirdShadowLineDarkBg: "rgba(0, 0, 0, 0)" }, profit: { bg: "#222b45", textColor: "#ffffff", axisLineColor: "#101426", splitLineColor: "#1b1b38", areaOpacity: "1", axisFontSize: "16", axisTextColor: "#8f9bb3", firstLineGradFrom: "#151a30", firstLineGradTo: "#151a30", firstLineShadow: "rgba(0, 0, 0, 0)", secondLineGradFrom: "#3366ff", secondLineGradTo: "#3366ff", secondLineShadow: "rgba(0, 0, 0, 0)", thirdLineGradFrom: "#00d68f", thirdLineGradTo: "#2ce69b", thirdLineShadow: "rgba(0, 0, 0, 0)" }, orderProfitLegend: { firstItem: "#00d68f", secondItem: "#3366ff", thirdItem: "#151a30" }, visitors: { tooltipBg: "#222b45", tooltipLineColor: "rgba(0, 0, 0, 0)", tooltipLineWidth: "0", tooltipBorderColor: "#1a2138", tooltipExtraCss: "border-radius: 10px; padding: 8px 24px;", tooltipTextColor: "#ffffff", tooltipFontWeight: "normal", tooltipFontSize: "20", axisLineColor: "#101426", axisFontSize: "16", axisTextColor: "#8f9bb3", yAxisSplitLine: "#1b1b38", itemBorderColor: "#3366ff", lineStyle: "dotted", lineWidth: "6", lineGradFrom: "#ffffff", lineGradTo: "#ffffff", lineShadow: "rgba(0, 0, 0, 0)", areaGradFrom: "#3366ff", areaGradTo: "#598bff", innerLineStyle: "solid", innerLineWidth: "1", innerAreaGradFrom: "#00d68f", innerAreaGradTo: "#00d68f" }, visitorsLegend: { firstIcon: "#00d68f", secondIcon: "#3366ff" }, visitorsPie: { firstPieGradientLeft: "#00d68f", firstPieGradientRight: "#00d68f", firstPieShadowColor: "rgba(0, 0, 0, 0)", firstPieRadius: ["70%", "90%"], secondPieGradientLeft: "#ffaa00", secondPieGradientRight: "#ffc94d", secondPieShadowColor: "rgba(0, 0, 0, 0)", secondPieRadius: ["60%", "97%"], shadowOffsetX: "0", shadowOffsetY: "0" }, visitorsPieLegend: { firstSection: "#ffaa00", secondSection: "#00d68f" }, earningPie: { radius: ["65%", "100%"], center: ["50%", "50%"], fontSize: "22", firstPieGradientLeft: "#00d68f", firstPieGradientRight: "#00d68f", firstPieShadowColor: "rgba(0, 0, 0, 0)", secondPieGradientLeft: "#3366ff", secondPieGradientRight: "#3366ff", secondPieShadowColor: "rgba(0, 0, 0, 0)", thirdPieGradientLeft: "#ffaa00", thirdPieGradientRight: "#ffaa00", thirdPieShadowColor: "rgba(0, 0, 0, 0)" }, earningLine: { gradFrom: "#3366ff", gradTo: "#3366ff", tooltipTextColor: "#ffffff", tooltipFontWeight: "normal", tooltipFontSize: "16", tooltipBg: "#222b45", tooltipBorderColor: "#1a2138", tooltipBorderWidth: "1", tooltipExtraCss: "border-radius: 10px; padding: 4px 16px;" } } }], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_MEDIA_BREAKPOINTS"], _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["DEFAULT_MEDIA_BREAKPOINTS"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_LAYOUT_DIRECTION"], "ltr", []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_DIALOG_CONFIG"], {}, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_WINDOW_CONFIG"], undefined, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NB_TOASTR_CONFIG"], {}, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _nebular_theme__WEBPACK_IMPORTED_MODULE_18__["NbChatOptions"], { messageGoogleMapKey: "AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY" }, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NB_AUTH_USER_OPTIONS"], { strategies: [[_nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbPasswordAuthStrategy"], { name: "email", token: { class: _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbAuthJWTToken"] }, baseEndpoint: "https://localhost:44327", login: { endpoint: "/auth/login", method: "post", requireValidToken: false, redirect: { success: "/", failure: "null" }, defaultErrors: ["Login/Email combination is not correct, please try again."], defaultMessages: ["You have been successfully logged in."] }, register: { endpoint: "/auth/sign-up", method: "post" }, logout: { endpoint: "/auth/sign-out", method: "post", redirect: { success: "/auth/login", failure: "/" } }, requestPass: { endpoint: "/auth/request-pass", method: "post" }, resetPass: { endpoint: "/auth/reset-pass", method: "post" } }]], forms: { login: { redirectDelay: 0, showMessages: { success: true } }, register: { redirectDelay: 0, showMessages: { success: true } }, requestPassword: { redirectDelay: 0, showMessages: { success: true } }, resetPassword: { redirectDelay: 0, showMessages: { success: true } }, logout: { redirectDelay: 0 } } }, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NB_AUTH_FALLBACK_TOKEN"], _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NbAuthSimpleToken"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _nebular_auth__WEBPACK_IMPORTED_MODULE_16__["NB_AUTH_INTERCEPTOR_HEADER"], "Authorization", []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _nebular_security__WEBPACK_IMPORTED_MODULE_26__["NB_SECURITY_OPTIONS_TOKEN"], { accessControl: { guest: { view: "*" }, user: { parent: "guest", create: "*", edit: "*", remove: "*" } } }, [])]); });



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule, ɵ0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ0", function() { return ɵ0; });
const ɵ0 = (req) => false;
class AppModule {
}



/***/ }),

/***/ "./src/app/auth-guard.service.ts":
/*!***************************************!*\
  !*** ./src/app/auth-guard.service.ts ***!
  \***************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _nebular_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nebular/auth */ "./node_modules/@nebular/auth/fesm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");






class AuthGuard {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(route, state) {
        return this.authService.isAuthenticated()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(authenticated => {
            if (!authenticated) {
                this.router.navigate(['auth/login']);
            }
            else {
                return true;
            }
        }));
    }
}
AuthGuard.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ factory: function AuthGuard_Factory() { return new AuthGuard(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_nebular_auth__WEBPACK_IMPORTED_MODULE_1__["NbAuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"])); }, token: AuthGuard, providedIn: "root" });


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment, globals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "globals", function() { return globals; });
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const environment = {
    production: false,
    api: {
        owUrl: 'https://localhost:44327',
    },
};
const globals = {
    projectConfig: [
        { name: 'SAMP_DESIGN_TYPE_CD', value: false },
        { name: 'QAPP_APPROVAL', value: false },
    ],
    monlocConfig: [
        { name: 'HUC_EIGHT', value: false },
        { name: 'HUC_TWELVE', value: false },
        { name: 'TRIBAL_LAND', value: false },
        { name: 'OURCE_MAP_SCALE', value: false },
        { name: 'HORIZ_COLL_METHOD', value: false },
        { name: 'HORIZ_REF_DATUM', value: false },
        { name: 'ERT_MEASURE', value: false },
        { name: 'COUNTRY_CODE', value: false },
        { name: 'STATE_CODE', value: false },
        { name: 'COUNTY_CODE', value: false },
        { name: 'WELL_TYPE', value: false },
        { name: 'AQUIFER_NAME', value: false },
        { name: 'FORMATION_TYPE', value: false },
        { name: 'WELLHOLE_DEPTH', value: false },
    ],
    activityConfig: [
        { name: 'SAMP_ACT_END_DT', value: false },
        { name: 'SAMP_COLL_METHOD', value: false },
        { name: 'SAMP_COLL_EQUIP', value: false },
        { name: 'SAMP_PREP', value: false },
        { name: 'SAMP_DEPTH', value: false },
    ],
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module.ngfactory */ "./src/app/app.module.ngfactory.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModuleFactory(_app_app_module_ngfactory__WEBPACK_IMPORTED_MODULE_2__["AppModuleNgFactory"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Development\Appletech\Development\OpenWater\OpenWater2Client\open-waters2Client\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map