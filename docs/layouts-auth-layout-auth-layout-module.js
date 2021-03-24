(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layouts-auth-layout-auth-layout-module"],{

/***/ "9RUf":
/*!*************************************************************************!*\
  !*** ./node_modules/angular5-social-login/angular5-social-login.umd.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? factory(__webpack_require__(/*! @angular/core */ "fXoL"), __webpack_require__(/*! @angular/common */ "ofXK"), exports, __webpack_require__(/*! @angular/core */ "fXoL"), __webpack_require__(/*! @angular/common */ "ofXK"), __webpack_require__(/*! rxjs/BehaviorSubject */ "nDsj")) : undefined;
})(this, function (ɵngcc0, ɵngcc1, exports, core, common, BehaviorSubject) {
  'use strict';

  var AuthServiceConfig = function () {
    /**
     * @param {?} providers
     */
    function AuthServiceConfig(providers) {
      this.providers = new Map();

      for (var i = 0; i < providers.length; i++) {
        var element = providers[i];
        this.providers.set(element.id, element.provider);
      }
    }

    return AuthServiceConfig;
  }();

  var AuthService = function () {
    /**
     * @param {?} config
     */
    function AuthService(config) {
      var _this = this;

      this._user = null;
      this._authState = new BehaviorSubject.BehaviorSubject(null);
      this.providers = config.providers;
      this.providers.forEach(function (provider, key) {
        provider.initialize().then(function (user) {
          user.provider = key;
          _this._user = user;

          _this._authState.next(user);
        }).catch(function (err) {// this._authState.next(null);
        });
      });
    }

    Object.defineProperty(AuthService.prototype, "authState", {
      /**
       * @return {?}
       */
      get: function get() {
        return this._authState.asObservable();
      },
      enumerable: true,
      configurable: true
    });
    /**
     * @param {?} providerId
     * @return {?}
     */

    AuthService.prototype.signIn = function (providerId) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var
        /** @type {?} */
        providerObject = _this.providers.get(providerId);

        if (providerObject) {
          providerObject.signIn().then(function (user) {
            user.provider = providerId;
            resolve(user);
            _this._user = user;

            _this._authState.next(user);
          });
        } else {
          reject(AuthService.LOGIN_PROVIDER_NOT_FOUND);
        }
      });
    };
    /**
     * @return {?}
     */


    AuthService.prototype.signOut = function () {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (_this._user && _this._user.provider) {
          var
          /** @type {?} */
          providerId = _this._user.provider;

          var
          /** @type {?} */
          providerObject = _this.providers.get(providerId);

          providerObject.signOut().then(function () {
            _this._user = null;

            _this._authState.next(null);

            resolve();
          }).catch(function (err) {
            _this._authState.next(null);
          });
        } else {
          reject(AuthService.LOGIN_PROVIDER_NOT_FOUND);
        }
      });
    };

    AuthService.ɵfac = function AuthService_Factory(t) {
      return new (t || AuthService)(ɵngcc0.ɵɵinject(AuthServiceConfig));
    };

    AuthService.ɵprov = ɵngcc0.ɵɵdefineInjectable({
      token: AuthService,
      factory: function factory(t) {
        return AuthService.ɵfac(t);
      }
    });
    /*@__PURE__*/

    (function () {
      ɵngcc0.ɵsetClassMetadata(AuthService, [{
        type: core.Injectable
      }], function () {
        return [{
          type: AuthServiceConfig
        }];
      }, null);
    })();

    return AuthService;
  }();

  AuthService.LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
  /**
   * @nocollapse
   */

  AuthService.ctorParameters = function () {
    return [{
      type: AuthServiceConfig
    }];
  };

  var SocialLoginModule = function () {
    function SocialLoginModule() {}

    SocialLoginModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({
      type: SocialLoginModule
    });
    SocialLoginModule.ɵinj = ɵngcc0.ɵɵdefineInjector({
      factory: function SocialLoginModule_Factory(t) {
        return new (t || SocialLoginModule)();
      },
      providers: [AuthService],
      imports: [[common.CommonModule]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(SocialLoginModule, {
        imports: [ɵngcc1.CommonModule]
      });
    })();
    /*@__PURE__*/


    (function () {
      ɵngcc0.ɵsetClassMetadata(SocialLoginModule, [{
        type: core.NgModule,
        args: [{
          imports: [common.CommonModule],
          providers: [AuthService]
        }]
      }], function () {
        return [];
      }, null);
    })();

    return SocialLoginModule;
  }();
  /**
   * @nocollapse
   */


  SocialLoginModule.ctorParameters = function () {
    return [];
  };

  var SocialUser = function () {
    function SocialUser() {}

    return SocialUser;
  }();

  var LoginProviderClass = function () {
    function LoginProviderClass() {}

    return LoginProviderClass;
  }();

  var LinkedInResponse = function () {
    function LinkedInResponse() {}

    return LinkedInResponse;
  }();
  /**
   * @abstract
   */


  var BaseLoginProvider = function () {
    function BaseLoginProvider() {}
    /**
     * @abstract
     * @return {?}
     */


    BaseLoginProvider.prototype.initialize = function () {};
    /**
     * @abstract
     * @return {?}
     */


    BaseLoginProvider.prototype.signIn = function () {};
    /**
     * @abstract
     * @return {?}
     */


    BaseLoginProvider.prototype.signOut = function () {};
    /**
     * @param {?} obj
     * @param {?} onload
     * @return {?}
     */


    BaseLoginProvider.prototype.loadScript = function (obj, onload) {
      if (document.getElementById(obj.name)) {
        return;
      }

      var
      /** @type {?} */
      signInJS = document.createElement('script');
      signInJS.async = true;
      signInJS.src = obj.url;
      signInJS.onload = onload;

      if (obj.name === 'LINKEDIN') {
        signInJS.async = false;
        signInJS.text = ('api_key: ' + obj.id).replace('\'', '');
      }

      document.head.appendChild(signInJS);
    };

    return BaseLoginProvider;
  }();

  var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return function (d, b) {
      extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();

  var GoogleLoginProvider = function (_super) {
    __extends(GoogleLoginProvider, _super);
    /**
     * @param {?} clientId
     */


    function GoogleLoginProvider(clientId) {
      var _this = _super.call(this) || this;

      _this.clientId = clientId;
      _this.loginProviderObj = new LoginProviderClass();
      _this.loginProviderObj.id = clientId;
      _this.loginProviderObj.name = 'google';
      _this.loginProviderObj.url = 'https://apis.google.com/js/platform.js';
      return _this;
    }
    /**
     * @return {?}
     */


    GoogleLoginProvider.prototype.initialize = function () {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.loadScript(_this.loginProviderObj, function () {
          gapi.load('auth2', function () {
            _this.auth2 = gapi.auth2.init({
              client_id: _this.clientId,
              scope: 'email'
            });

            _this.auth2.then(function () {
              if (_this.auth2.isSignedIn.get()) {
                resolve(_this.drawUser());
              }
            });
          });
        });
      });
    };
    /**
     * @return {?}
     */


    GoogleLoginProvider.prototype.drawUser = function () {
      var
      /** @type {?} */
      user = new SocialUser();
      var
      /** @type {?} */
      profile = this.auth2.currentUser.get().getBasicProfile();
      var
      /** @type {?} */
      authResponseObj = this.auth2.currentUser.get().getAuthResponse(true);
      user.id = profile.getId();
      user.name = profile.getName();
      user.email = profile.getEmail();
      user.image = profile.getImageUrl();
      user.token = authResponseObj.access_token;
      user.idToken = authResponseObj.id_token;
      return user;
    };
    /**
     * @return {?}
     */


    GoogleLoginProvider.prototype.signIn = function () {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var
        /** @type {?} */
        promise = _this.auth2.signIn();

        promise.then(function () {
          resolve(_this.drawUser());
        });
      });
    };
    /**
     * @return {?}
     */


    GoogleLoginProvider.prototype.signOut = function () {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.auth2.signOut().then(function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    };

    return GoogleLoginProvider;
  }(BaseLoginProvider);

  GoogleLoginProvider.PROVIDER_ID = 'google';

  var __extends$1 = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return function (d, b) {
      extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();

  var FacebookLoginProvider = function (_super) {
    __extends$1(FacebookLoginProvider, _super);
    /**
     * @param {?} clientId
     */


    function FacebookLoginProvider(clientId) {
      var _this = _super.call(this) || this;

      _this.clientId = clientId;
      _this.loginProviderObj = new LoginProviderClass();
      _this.loginProviderObj.id = clientId;
      _this.loginProviderObj.name = 'facebook';
      _this.loginProviderObj.url = 'https://connect.facebook.net/en_US/sdk.js';
      return _this;
    }
    /**
     * @return {?}
     */


    FacebookLoginProvider.prototype.initialize = function () {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.loadScript(_this.loginProviderObj, function () {
          FB.init({
            appId: _this.clientId,
            autoLogAppEvents: true,
            cookie: true,
            xfbml: true,
            version: 'v2.10'
          });
          FB.AppEvents.logPageView();
          FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
              var
              /** @type {?} */
              accessToken_1 = FB.getAuthResponse()['accessToken'];
              FB.api('/me?fields=name,email,picture', function (res) {
                resolve(FacebookLoginProvider.drawUser(Object.assign({}, {
                  token: accessToken_1
                }, res)));
              });
            }
          });
        });
      });
    };
    /**
     * @param {?} response
     * @return {?}
     */


    FacebookLoginProvider.drawUser = function (response) {
      var
      /** @type {?} */
      user = new SocialUser();
      user.id = response.id;
      user.name = response.name;
      user.email = response.email;
      user.token = response.token;
      user.image = 'https://graph.facebook.com/' + response.id + '/picture?type=normal';
      return user;
    };
    /**
     * @return {?}
     */


    FacebookLoginProvider.prototype.signIn = function () {
      return new Promise(function (resolve, reject) {
        FB.login(function (response) {
          if (response.authResponse) {
            var
            /** @type {?} */
            accessToken_2 = FB.getAuthResponse()['accessToken'];
            FB.api('/me?fields=name,email,picture', function (res) {
              resolve(FacebookLoginProvider.drawUser(Object.assign({}, {
                token: accessToken_2
              }, res)));
            });
          }
        }, {
          scope: 'email,public_profile'
        });
      });
    };
    /**
     * @return {?}
     */


    FacebookLoginProvider.prototype.signOut = function () {
      return new Promise(function (resolve, reject) {
        FB.logout(function (response) {
          resolve();
        });
      });
    };

    return FacebookLoginProvider;
  }(BaseLoginProvider);

  FacebookLoginProvider.PROVIDER_ID = 'facebook';

  var __extends$2 = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return function (d, b) {
      extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();

  var LinkedinLoginProvider = function (_super) {
    __extends$2(LinkedinLoginProvider, _super);
    /**
     * @param {?} clientId
     */


    function LinkedinLoginProvider(clientId) {
      var _this = _super.call(this) || this;

      _this.clientId = clientId;
      _this.loginProviderObj = new LoginProviderClass();
      _this.loginProviderObj.id = clientId;
      _this.loginProviderObj.name = 'linkedin';
      _this.loginProviderObj.url = 'https://platform.linkedin.com/in.js';
      return _this;
    }
    /**
     * @return {?}
     */


    LinkedinLoginProvider.prototype.initialize = function () {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.loadScript(_this.loginProviderObj, function () {
          IN.init({
            api_key: _this.clientId,
            authorize: true,
            onLoad: _this.onLinkedInLoad()
          });
          IN.Event.on(IN, 'auth', function () {
            if (IN.User.isAuthorized()) {
              IN.API.Raw('/people/~:(id,first-name,last-name,email-address,picture-url)').result(function (res) {
                resolve(_this.drawUser(res));
              });
            }
          });
        });
      });
    };
    /**
     * @return {?}
     */


    LinkedinLoginProvider.prototype.onLinkedInLoad = function () {
      IN.Event.on(IN, 'systemReady', function () {
        IN.User.refresh();
      });
    };
    /**
     * @param {?} response
     * @return {?}
     */


    LinkedinLoginProvider.prototype.drawUser = function (response) {
      var
      /** @type {?} */
      user = new SocialUser();
      user.id = response.emailAddress;
      user.name = response.firstName + ' ' + response.lastName;
      user.email = response.emailAddress;
      user.image = response.pictureUrl;
      user.token = IN.ENV.auth.oauth_token;
      return user;
    };
    /**
     * @return {?}
     */


    LinkedinLoginProvider.prototype.signIn = function () {
      var _this = this;

      return new Promise(function (resolve, reject) {
        IN.User.authorize(function () {
          IN.API.Raw('/people/~:(id,first-name,last-name,email-address,picture-url)').result(function (res) {
            resolve(_this.drawUser(res));
          });
        });
      });
    };
    /**
     * @return {?}
     */


    LinkedinLoginProvider.prototype.signOut = function () {
      return new Promise(function (resolve, reject) {
        IN.User.logout(function (response) {
          resolve();
        }, function (err) {
          reject(err);
        });
      });
    };

    return LinkedinLoginProvider;
  }(BaseLoginProvider);

  LinkedinLoginProvider.PROVIDER_ID = 'linkedin';
  exports.SocialLoginModule = SocialLoginModule;
  exports.AuthService = AuthService;
  exports.AuthServiceConfig = AuthServiceConfig;
  exports.SocialUser = SocialUser;
  exports.LoginProviderClass = LoginProviderClass;
  exports.LinkedInResponse = LinkedInResponse;
  exports.FacebookLoginProvider = FacebookLoginProvider;
  exports.GoogleLoginProvider = GoogleLoginProvider;
  exports.LinkedinLoginProvider = LinkedinLoginProvider;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
}); //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjUtc29jaWFsLWxvZ2luLnVtZC5qcyIsInNvdXJjZXMiOlsiYW5ndWxhcjUtc29jaWFsLWxvZ2luLnVtZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBLDRIQUF3RTtBQUN4RSx3RkFBc0Q7QUFDdEQsMENBQVU7QUFDVixpQ0FBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7MkVBQU07QUFDTjtBQUNBO0FBQ0Esa0VBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dEQUFLO0FBQ0w7QUFDQSxLQVVFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzLCByZXF1aXJlKCdAYW5ndWxhci9jb3JlJyksIHJlcXVpcmUoJ0Bhbmd1bGFyL2NvbW1vbicpLCByZXF1aXJlKCdyeGpzL0JlaGF2aW9yU3ViamVjdCcpKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnLCAnQGFuZ3VsYXIvY29yZScsICdAYW5ndWxhci9jb21tb24nLCAncnhqcy9CZWhhdmlvclN1YmplY3QnXSwgZmFjdG9yeSkgOlxuXHQoZmFjdG9yeSgoZ2xvYmFsWydhbmd1bGFyNS1zb2NpYWwtbG9naW4nXSA9IHt9KSxnbG9iYWwuY29yZSxnbG9iYWwuY29tbW9uLGdsb2JhbC5CZWhhdmlvclN1YmplY3QpKTtcbn0odGhpcywgKGZ1bmN0aW9uIChleHBvcnRzLGNvcmUsY29tbW9uLEJlaGF2aW9yU3ViamVjdCkgeyAndXNlIHN0cmljdCc7XG5cbnZhciBBdXRoU2VydmljZUNvbmZpZyA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBwcm92aWRlcnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBBdXRoU2VydmljZUNvbmZpZyhwcm92aWRlcnMpIHtcbiAgICAgICAgdGhpcy5wcm92aWRlcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IHByb3ZpZGVyc1tpXTtcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXJzLnNldChlbGVtZW50LmlkLCBlbGVtZW50LnByb3ZpZGVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gQXV0aFNlcnZpY2VDb25maWc7XG59KCkpO1xudmFyIEF1dGhTZXJ2aWNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGNvbmZpZ1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIEF1dGhTZXJ2aWNlKGNvbmZpZykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl91c2VyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYXV0aFN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdC5CZWhhdmlvclN1YmplY3QobnVsbCk7XG4gICAgICAgIHRoaXMucHJvdmlkZXJzID0gY29uZmlnLnByb3ZpZGVycztcbiAgICAgICAgdGhpcy5wcm92aWRlcnMuZm9yRWFjaChmdW5jdGlvbiAocHJvdmlkZXIsIGtleSkge1xuICAgICAgICAgICAgcHJvdmlkZXIuaW5pdGlhbGl6ZSgpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgICAgICAgICB1c2VyLnByb3ZpZGVyID0ga2V5O1xuICAgICAgICAgICAgICAgIF90aGlzLl91c2VyID0gdXNlcjtcbiAgICAgICAgICAgICAgICBfdGhpcy5fYXV0aFN0YXRlLm5leHQodXNlcik7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fYXV0aFN0YXRlLm5leHQobnVsbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBdXRoU2VydmljZS5wcm90b3R5cGUsIFwiYXV0aFN0YXRlXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm4gez99XG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hdXRoU3RhdGUuYXNPYnNlcnZhYmxlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gcHJvdmlkZXJJZFxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgQXV0aFNlcnZpY2UucHJvdG90eXBlLnNpZ25JbiA9IGZ1bmN0aW9uIChwcm92aWRlcklkKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBwcm92aWRlck9iamVjdCA9IF90aGlzLnByb3ZpZGVycy5nZXQocHJvdmlkZXJJZCk7XG4gICAgICAgICAgICBpZiAocHJvdmlkZXJPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBwcm92aWRlck9iamVjdC5zaWduSW4oKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXIucHJvdmlkZXIgPSBwcm92aWRlcklkO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHVzZXIpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdXNlciA9IHVzZXI7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9hdXRoU3RhdGUubmV4dCh1c2VyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdChBdXRoU2VydmljZS5MT0dJTl9QUk9WSURFUl9OT1RfRk9VTkQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgQXV0aFNlcnZpY2UucHJvdG90eXBlLnNpZ25PdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuX3VzZXIgJiYgX3RoaXMuX3VzZXIucHJvdmlkZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBwcm92aWRlcklkID0gX3RoaXMuX3VzZXIucHJvdmlkZXI7XG4gICAgICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gcHJvdmlkZXJPYmplY3QgPSBfdGhpcy5wcm92aWRlcnMuZ2V0KHByb3ZpZGVySWQpO1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyT2JqZWN0LnNpZ25PdXQoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3VzZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fYXV0aFN0YXRlLm5leHQobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9hdXRoU3RhdGUubmV4dChudWxsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdChBdXRoU2VydmljZS5MT0dJTl9QUk9WSURFUl9OT1RfRk9VTkQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBBdXRoU2VydmljZTtcbn0oKSk7XG5BdXRoU2VydmljZS5MT0dJTl9QUk9WSURFUl9OT1RfRk9VTkQgPSAnTG9naW4gcHJvdmlkZXIgbm90IGZvdW5kJztcbkF1dGhTZXJ2aWNlLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBjb3JlLkluamVjdGFibGUgfSxcbl07XG4vKipcbiAqIEBub2NvbGxhcHNlXG4gKi9cbkF1dGhTZXJ2aWNlLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogQXV0aFNlcnZpY2VDb25maWcsIH0sXG5dOyB9O1xuXG52YXIgU29jaWFsTG9naW5Nb2R1bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNvY2lhbExvZ2luTW9kdWxlKCkge1xuICAgIH1cbiAgICByZXR1cm4gU29jaWFsTG9naW5Nb2R1bGU7XG59KCkpO1xuU29jaWFsTG9naW5Nb2R1bGUuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IGNvcmUuTmdNb2R1bGUsIGFyZ3M6IFt7XG4gICAgICAgICAgICAgICAgaW1wb3J0czogW1xuICAgICAgICAgICAgICAgICAgICBjb21tb24uQ29tbW9uTW9kdWxlXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICAgICAgQXV0aFNlcnZpY2VcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LF0gfSxcbl07XG4vKipcbiAqIEBub2NvbGxhcHNlXG4gKi9cblNvY2lhbExvZ2luTW9kdWxlLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW107IH07XG5cbnZhciBTb2NpYWxVc2VyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTb2NpYWxVc2VyKCkge1xuICAgIH1cbiAgICByZXR1cm4gU29jaWFsVXNlcjtcbn0oKSk7XG52YXIgTG9naW5Qcm92aWRlckNsYXNzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMb2dpblByb3ZpZGVyQ2xhc3MoKSB7XG4gICAgfVxuICAgIHJldHVybiBMb2dpblByb3ZpZGVyQ2xhc3M7XG59KCkpO1xudmFyIExpbmtlZEluUmVzcG9uc2UgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpbmtlZEluUmVzcG9uc2UoKSB7XG4gICAgfVxuICAgIHJldHVybiBMaW5rZWRJblJlc3BvbnNlO1xufSgpKTtcblxuLyoqXG4gKiBAYWJzdHJhY3RcbiAqL1xudmFyIEJhc2VMb2dpblByb3ZpZGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCYXNlTG9naW5Qcm92aWRlcigpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBCYXNlTG9naW5Qcm92aWRlci5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAvKipcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEJhc2VMb2dpblByb3ZpZGVyLnByb3RvdHlwZS5zaWduSW4gPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgLyoqXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBCYXNlTG9naW5Qcm92aWRlci5wcm90b3R5cGUuc2lnbk91dCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IG9ialxuICAgICAqIEBwYXJhbSB7P30gb25sb2FkXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBCYXNlTG9naW5Qcm92aWRlci5wcm90b3R5cGUubG9hZFNjcmlwdCA9IGZ1bmN0aW9uIChvYmosIG9ubG9hZCkge1xuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQob2JqLm5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gc2lnbkluSlMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgc2lnbkluSlMuYXN5bmMgPSB0cnVlO1xuICAgICAgICBzaWduSW5KUy5zcmMgPSBvYmoudXJsO1xuICAgICAgICBzaWduSW5KUy5vbmxvYWQgPSBvbmxvYWQ7XG4gICAgICAgIGlmIChvYmoubmFtZSA9PT0gJ0xJTktFRElOJykge1xuICAgICAgICAgICAgc2lnbkluSlMuYXN5bmMgPSBmYWxzZTtcbiAgICAgICAgICAgIHNpZ25JbkpTLnRleHQgPSAoJ2FwaV9rZXk6ICcgKyBvYmouaWQpLnJlcGxhY2UoJ1xcJycsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNpZ25JbkpTKTtcbiAgICB9O1xuICAgIHJldHVybiBCYXNlTG9naW5Qcm92aWRlcjtcbn0oKSk7XG5cbnZhciBfX2V4dGVuZHMgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBHb29nbGVMb2dpblByb3ZpZGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoR29vZ2xlTG9naW5Qcm92aWRlciwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGNsaWVudElkXG4gICAgICovXG4gICAgZnVuY3Rpb24gR29vZ2xlTG9naW5Qcm92aWRlcihjbGllbnRJZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5jbGllbnRJZCA9IGNsaWVudElkO1xuICAgICAgICBfdGhpcy5sb2dpblByb3ZpZGVyT2JqID0gbmV3IExvZ2luUHJvdmlkZXJDbGFzcygpO1xuICAgICAgICBfdGhpcy5sb2dpblByb3ZpZGVyT2JqLmlkID0gY2xpZW50SWQ7XG4gICAgICAgIF90aGlzLmxvZ2luUHJvdmlkZXJPYmoubmFtZSA9ICdnb29nbGUnO1xuICAgICAgICBfdGhpcy5sb2dpblByb3ZpZGVyT2JqLnVybCA9ICdodHRwczovL2FwaXMuZ29vZ2xlLmNvbS9qcy9wbGF0Zm9ybS5qcyc7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBHb29nbGVMb2dpblByb3ZpZGVyLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgX3RoaXMubG9hZFNjcmlwdChfdGhpcy5sb2dpblByb3ZpZGVyT2JqLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZ2FwaS5sb2FkKCdhdXRoMicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXV0aDIgPSBnYXBpLmF1dGgyLmluaXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50X2lkOiBfdGhpcy5jbGllbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlOiAnZW1haWwnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5hdXRoMi50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5hdXRoMi5pc1NpZ25lZEluLmdldCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShfdGhpcy5kcmF3VXNlcigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEdvb2dsZUxvZ2luUHJvdmlkZXIucHJvdG90eXBlLmRyYXdVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyB1c2VyID0gbmV3IFNvY2lhbFVzZXIoKTtcbiAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gcHJvZmlsZSA9IHRoaXMuYXV0aDIuY3VycmVudFVzZXIuZ2V0KCkuZ2V0QmFzaWNQcm9maWxlKCk7XG4gICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIGF1dGhSZXNwb25zZU9iaiA9IHRoaXMuYXV0aDIuY3VycmVudFVzZXIuZ2V0KCkuZ2V0QXV0aFJlc3BvbnNlKHRydWUpO1xuICAgICAgICB1c2VyLmlkID0gcHJvZmlsZS5nZXRJZCgpO1xuICAgICAgICB1c2VyLm5hbWUgPSBwcm9maWxlLmdldE5hbWUoKTtcbiAgICAgICAgdXNlci5lbWFpbCA9IHByb2ZpbGUuZ2V0RW1haWwoKTtcbiAgICAgICAgdXNlci5pbWFnZSA9IHByb2ZpbGUuZ2V0SW1hZ2VVcmwoKTtcbiAgICAgICAgdXNlci50b2tlbiA9IGF1dGhSZXNwb25zZU9iai5hY2Nlc3NfdG9rZW47XG4gICAgICAgIHVzZXIuaWRUb2tlbiA9IGF1dGhSZXNwb25zZU9iai5pZF90b2tlbjtcbiAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEdvb2dsZUxvZ2luUHJvdmlkZXIucHJvdG90eXBlLnNpZ25JbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciAvKiogQHR5cGUgez99ICovIHByb21pc2UgPSBfdGhpcy5hdXRoMi5zaWduSW4oKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShfdGhpcy5kcmF3VXNlcigpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgR29vZ2xlTG9naW5Qcm92aWRlci5wcm90b3R5cGUuc2lnbk91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIF90aGlzLmF1dGgyLnNpZ25PdXQoKS50aGVuKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBHb29nbGVMb2dpblByb3ZpZGVyO1xufShCYXNlTG9naW5Qcm92aWRlcikpO1xuR29vZ2xlTG9naW5Qcm92aWRlci5QUk9WSURFUl9JRCA9ICdnb29nbGUnO1xuXG52YXIgX19leHRlbmRzJDEgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBGYWNlYm9va0xvZ2luUHJvdmlkZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyQxKEZhY2Vib29rTG9naW5Qcm92aWRlciwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGNsaWVudElkXG4gICAgICovXG4gICAgZnVuY3Rpb24gRmFjZWJvb2tMb2dpblByb3ZpZGVyKGNsaWVudElkKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmNsaWVudElkID0gY2xpZW50SWQ7XG4gICAgICAgIF90aGlzLmxvZ2luUHJvdmlkZXJPYmogPSBuZXcgTG9naW5Qcm92aWRlckNsYXNzKCk7XG4gICAgICAgIF90aGlzLmxvZ2luUHJvdmlkZXJPYmouaWQgPSBjbGllbnRJZDtcbiAgICAgICAgX3RoaXMubG9naW5Qcm92aWRlck9iai5uYW1lID0gJ2ZhY2Vib29rJztcbiAgICAgICAgX3RoaXMubG9naW5Qcm92aWRlck9iai51cmwgPSAnaHR0cHM6Ly9jb25uZWN0LmZhY2Vib29rLm5ldC9lbl9VUy9zZGsuanMnO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgRmFjZWJvb2tMb2dpblByb3ZpZGVyLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgX3RoaXMubG9hZFNjcmlwdChfdGhpcy5sb2dpblByb3ZpZGVyT2JqLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgRkIuaW5pdCh7XG4gICAgICAgICAgICAgICAgICAgIGFwcElkOiBfdGhpcy5jbGllbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgYXV0b0xvZ0FwcEV2ZW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29va2llOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB4ZmJtbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogJ3YyLjEwJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIEZCLkFwcEV2ZW50cy5sb2dQYWdlVmlldygpO1xuICAgICAgICAgICAgICAgIEZCLmdldExvZ2luU3RhdHVzKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAnY29ubmVjdGVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gYWNjZXNzVG9rZW5fMSA9IEZCLmdldEF1dGhSZXNwb25zZSgpWydhY2Nlc3NUb2tlbiddO1xuICAgICAgICAgICAgICAgICAgICAgICAgRkIuYXBpKCcvbWU/ZmllbGRzPW5hbWUsZW1haWwscGljdHVyZScsIGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKEZhY2Vib29rTG9naW5Qcm92aWRlci5kcmF3VXNlcihPYmplY3QuYXNzaWduKHt9LCB7IHRva2VuOiBhY2Nlc3NUb2tlbl8xIH0sIHJlcykpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IHJlc3BvbnNlXG4gICAgICogQHJldHVybiB7P31cbiAgICAgKi9cbiAgICBGYWNlYm9va0xvZ2luUHJvdmlkZXIuZHJhd1VzZXIgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gdXNlciA9IG5ldyBTb2NpYWxVc2VyKCk7XG4gICAgICAgIHVzZXIuaWQgPSByZXNwb25zZS5pZDtcbiAgICAgICAgdXNlci5uYW1lID0gcmVzcG9uc2UubmFtZTtcbiAgICAgICAgdXNlci5lbWFpbCA9IHJlc3BvbnNlLmVtYWlsO1xuICAgICAgICB1c2VyLnRva2VuID0gcmVzcG9uc2UudG9rZW47XG4gICAgICAgIHVzZXIuaW1hZ2UgPSAnaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vJyArIHJlc3BvbnNlLmlkICsgJy9waWN0dXJlP3R5cGU9bm9ybWFsJztcbiAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEZhY2Vib29rTG9naW5Qcm92aWRlci5wcm90b3R5cGUuc2lnbkluID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgRkIubG9naW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmF1dGhSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgLyoqIEB0eXBlIHs/fSAqLyBhY2Nlc3NUb2tlbl8yID0gRkIuZ2V0QXV0aFJlc3BvbnNlKClbJ2FjY2Vzc1Rva2VuJ107XG4gICAgICAgICAgICAgICAgICAgIEZCLmFwaSgnL21lP2ZpZWxkcz1uYW1lLGVtYWlsLHBpY3R1cmUnLCBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKEZhY2Vib29rTG9naW5Qcm92aWRlci5kcmF3VXNlcihPYmplY3QuYXNzaWduKHt9LCB7IHRva2VuOiBhY2Nlc3NUb2tlbl8yIH0sIHJlcykpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgeyBzY29wZTogJ2VtYWlsLHB1YmxpY19wcm9maWxlJyB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIEZhY2Vib29rTG9naW5Qcm92aWRlci5wcm90b3R5cGUuc2lnbk91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIEZCLmxvZ291dChmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRmFjZWJvb2tMb2dpblByb3ZpZGVyO1xufShCYXNlTG9naW5Qcm92aWRlcikpO1xuRmFjZWJvb2tMb2dpblByb3ZpZGVyLlBST1ZJREVSX0lEID0gJ2ZhY2Vib29rJztcblxudmFyIF9fZXh0ZW5kcyQyID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgTGlua2VkaW5Mb2dpblByb3ZpZGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMkMihMaW5rZWRpbkxvZ2luUHJvdmlkZXIsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBjbGllbnRJZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIExpbmtlZGluTG9naW5Qcm92aWRlcihjbGllbnRJZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5jbGllbnRJZCA9IGNsaWVudElkO1xuICAgICAgICBfdGhpcy5sb2dpblByb3ZpZGVyT2JqID0gbmV3IExvZ2luUHJvdmlkZXJDbGFzcygpO1xuICAgICAgICBfdGhpcy5sb2dpblByb3ZpZGVyT2JqLmlkID0gY2xpZW50SWQ7XG4gICAgICAgIF90aGlzLmxvZ2luUHJvdmlkZXJPYmoubmFtZSA9ICdsaW5rZWRpbic7XG4gICAgICAgIF90aGlzLmxvZ2luUHJvdmlkZXJPYmoudXJsID0gJ2h0dHBzOi8vcGxhdGZvcm0ubGlua2VkaW4uY29tL2luLmpzJztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIExpbmtlZGluTG9naW5Qcm92aWRlci5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIF90aGlzLmxvYWRTY3JpcHQoX3RoaXMubG9naW5Qcm92aWRlck9iaiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIElOLmluaXQoe1xuICAgICAgICAgICAgICAgICAgICBhcGlfa2V5OiBfdGhpcy5jbGllbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yaXplOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBvbkxvYWQ6IF90aGlzLm9uTGlua2VkSW5Mb2FkKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBJTi5FdmVudC5vbihJTiwgJ2F1dGgnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChJTi5Vc2VyLmlzQXV0aG9yaXplZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBJTi5BUEkuUmF3KCcvcGVvcGxlL346KGlkLGZpcnN0LW5hbWUsbGFzdC1uYW1lLGVtYWlsLWFkZHJlc3MscGljdHVyZS11cmwpJykucmVzdWx0KGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKF90aGlzLmRyYXdVc2VyKHJlcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTGlua2VkaW5Mb2dpblByb3ZpZGVyLnByb3RvdHlwZS5vbkxpbmtlZEluTG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgSU4uRXZlbnQub24oSU4sICdzeXN0ZW1SZWFkeScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIElOLlVzZXIucmVmcmVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gcmVzcG9uc2VcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIExpbmtlZGluTG9naW5Qcm92aWRlci5wcm90b3R5cGUuZHJhd1VzZXIgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIC8qKiBAdHlwZSB7P30gKi8gdXNlciA9IG5ldyBTb2NpYWxVc2VyKCk7XG4gICAgICAgIHVzZXIuaWQgPSByZXNwb25zZS5lbWFpbEFkZHJlc3M7XG4gICAgICAgIHVzZXIubmFtZSA9IHJlc3BvbnNlLmZpcnN0TmFtZSArICcgJyArIHJlc3BvbnNlLmxhc3ROYW1lO1xuICAgICAgICB1c2VyLmVtYWlsID0gcmVzcG9uc2UuZW1haWxBZGRyZXNzO1xuICAgICAgICB1c2VyLmltYWdlID0gcmVzcG9uc2UucGljdHVyZVVybDtcbiAgICAgICAgdXNlci50b2tlbiA9IElOLkVOVi5hdXRoLm9hdXRoX3Rva2VuO1xuICAgICAgICByZXR1cm4gdXNlcjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm4gez99XG4gICAgICovXG4gICAgTGlua2VkaW5Mb2dpblByb3ZpZGVyLnByb3RvdHlwZS5zaWduSW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBJTi5Vc2VyLmF1dGhvcml6ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgSU4uQVBJLlJhdygnL3Blb3BsZS9+OihpZCxmaXJzdC1uYW1lLGxhc3QtbmFtZSxlbWFpbC1hZGRyZXNzLHBpY3R1cmUtdXJsKScpLnJlc3VsdChmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMuZHJhd1VzZXIocmVzKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHs/fVxuICAgICAqL1xuICAgIExpbmtlZGluTG9naW5Qcm92aWRlci5wcm90b3R5cGUuc2lnbk91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIElOLlVzZXIubG9nb3V0KGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBMaW5rZWRpbkxvZ2luUHJvdmlkZXI7XG59KEJhc2VMb2dpblByb3ZpZGVyKSk7XG5MaW5rZWRpbkxvZ2luUHJvdmlkZXIuUFJPVklERVJfSUQgPSAnbGlua2VkaW4nO1xuXG5leHBvcnRzLlNvY2lhbExvZ2luTW9kdWxlID0gU29jaWFsTG9naW5Nb2R1bGU7XG5leHBvcnRzLkF1dGhTZXJ2aWNlID0gQXV0aFNlcnZpY2U7XG5leHBvcnRzLkF1dGhTZXJ2aWNlQ29uZmlnID0gQXV0aFNlcnZpY2VDb25maWc7XG5leHBvcnRzLlNvY2lhbFVzZXIgPSBTb2NpYWxVc2VyO1xuZXhwb3J0cy5Mb2dpblByb3ZpZGVyQ2xhc3MgPSBMb2dpblByb3ZpZGVyQ2xhc3M7XG5leHBvcnRzLkxpbmtlZEluUmVzcG9uc2UgPSBMaW5rZWRJblJlc3BvbnNlO1xuZXhwb3J0cy5GYWNlYm9va0xvZ2luUHJvdmlkZXIgPSBGYWNlYm9va0xvZ2luUHJvdmlkZXI7XG5leHBvcnRzLkdvb2dsZUxvZ2luUHJvdmlkZXIgPSBHb29nbGVMb2dpblByb3ZpZGVyO1xuZXhwb3J0cy5MaW5rZWRpbkxvZ2luUHJvdmlkZXIgPSBMaW5rZWRpbkxvZ2luUHJvdmlkZXI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKSk7XG4iXX0=

/***/ }),

/***/ "D8EZ":
/*!************************************************!*\
  !*** ./src/app/pages/login/login.component.ts ***!
  \************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _raw_loader_login_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./login.component.html */ "ywSW");
/* harmony import */ var _login_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.component.scss */ "KEbp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var angular5_social_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular5-social-login */ "9RUf");
/* harmony import */ var angular5_social_login__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular5_social_login__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = /** @class */ (function () {
    function LoginComponent(socialAuthService) {
        this.socialAuthService = socialAuthService;
        this.authorized = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.socialSignIn = function (socialPlatform) {
        var _this = this;
        var socialPlatformProvider;
        if (socialPlatform == "google") {
            socialPlatformProvider = angular5_social_login__WEBPACK_IMPORTED_MODULE_3__["GoogleLoginProvider"].PROVIDER_ID;
        }
        this.socialAuthService.signIn(socialPlatformProvider).then(function (userData) {
            console.log(socialPlatform + " sign in data : ", userData);
            if (userData != null) {
                _this.authorized = true;
                _this.user = userData;
            }
        });
    };
    LoginComponent.prototype.signOut = function () {
        this.socialAuthService.signOut();
        this.authorized = false;
    };
    LoginComponent.prototype.ngOnDestroy = function () {
    };
    LoginComponent.ctorParameters = function () { return [
        { type: angular5_social_login__WEBPACK_IMPORTED_MODULE_3__["AuthService"] }
    ]; };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-login',
            template: _raw_loader_login_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_login_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [angular5_social_login__WEBPACK_IMPORTED_MODULE_3__["AuthService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "Eq68":
/*!************************************************************!*\
  !*** ./src/app/layouts/auth-layout/auth-layout.routing.ts ***!
  \************************************************************/
/*! exports provided: AuthLayoutRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthLayoutRoutes", function() { return AuthLayoutRoutes; });
/* harmony import */ var _pages_login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pages/login/login.component */ "D8EZ");

var AuthLayoutRoutes = [
    { path: 'login', component: _pages_login_login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"] }
];


/***/ }),

/***/ "Hm89":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs-compat/BehaviorSubject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var rxjs_1 = __webpack_require__(/*! rxjs */ "qCKp");

exports.BehaviorSubject = rxjs_1.BehaviorSubject; //# sourceMappingURL=BehaviorSubject.js.map

/***/ }),

/***/ "KEbp":
/*!**************************************************!*\
  !*** ./src/app/pages/login/login.component.scss ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2dpbi5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "PTPi":
/*!***********************************************************!*\
  !*** ./src/app/layouts/auth-layout/auth-layout.module.ts ***!
  \***********************************************************/
/*! exports provided: getAuthServiceConfigs, AuthLayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAuthServiceConfigs", function() { return getAuthServiceConfigs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthLayoutModule", function() { return AuthLayoutModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _auth_layout_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth-layout.routing */ "Eq68");
/* harmony import */ var _pages_login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../pages/login/login.component */ "D8EZ");
/* harmony import */ var angular5_social_login__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular5-social-login */ "9RUf");
/* harmony import */ var angular5_social_login__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(angular5_social_login__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








// Configs
function getAuthServiceConfigs() {
    var config = new angular5_social_login__WEBPACK_IMPORTED_MODULE_6__["AuthServiceConfig"]([
        {
            id: angular5_social_login__WEBPACK_IMPORTED_MODULE_6__["GoogleLoginProvider"].PROVIDER_ID,
            provider: new angular5_social_login__WEBPACK_IMPORTED_MODULE_6__["GoogleLoginProvider"]("795641066279-rcq9hihqdo00ubh5guhqeds092m1kuuf.apps.googleusercontent.com")
        },
    ]);
    return config;
}
var AuthLayoutModule = /** @class */ (function () {
    function AuthLayoutModule() {
    }
    AuthLayoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_auth_layout_routing__WEBPACK_IMPORTED_MODULE_4__["AuthLayoutRoutes"]),
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["BrowserModule"],
                angular5_social_login__WEBPACK_IMPORTED_MODULE_6__["SocialLoginModule"]
            ],
            declarations: [
                _pages_login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"]
            ],
            providers: [
                {
                    provide: angular5_social_login__WEBPACK_IMPORTED_MODULE_6__["AuthServiceConfig"],
                    useFactory: getAuthServiceConfigs
                }
            ],
        })
    ], AuthLayoutModule);
    return AuthLayoutModule;
}());



/***/ }),

/***/ "nDsj":
/*!**********************************************!*\
  !*** ./node_modules/rxjs/BehaviorSubject.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(__webpack_require__(/*! rxjs-compat/BehaviorSubject */ "Hm89")); //# sourceMappingURL=BehaviorSubject.js.map

/***/ }),

/***/ "ywSW":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login/login.component.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header bg-gradient-danger py-7 py-lg-8\">\n  <div class=\"container\">\n    <div class=\"header-body text-center mb-7\">\n      <div class=\"row justify-content-center\">\n        <div class=\"col-lg-5 col-md-6\">\n          <h1 class=\"text-white\">Bem vindo!</h1>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"separator separator-bottom separator-skew zindex-100\">\n    <svg x=\"0\" y=\"0\" viewBox=\"0 0 2560 100\" preserveAspectRatio=\"none\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n      <polygon class=\"fill-default\" points=\"2560 0 2560 100 0 100\"></polygon>\n    </svg>\n  </div>\n</div>\n<!-- Page content -->\n<div class=\"container mt--8 pb-5\">\n  <div class=\"row justify-content-center\">\n    <div class=\"col-lg-5 col-md-7\">\n      <div class=\"card bg-secondary shadow border-0\">\n        <div class=\"card-header bg-transparent pb-5\">\n          <div class=\"text-muted text-center mt-2 mb-3\"><small>Entre com um perfil de e-mail do google</small></div>\n          <div class=\"btn-wrapper text-center\">\n            <!-- <a href=\"javascript:void(0)\" class=\"btn btn-neutral btn-icon\">\n              <span class=\"btn-inner--icon\"><img src=\"../assets/img/icons/common/github.svg\"></span>\n              <span class=\"btn-inner--text\">Github</span>\n            </a> -->\n            <a class=\"btn btn-neutral btn-icon\" (click)=\"socialSignIn('google')\">\n              <span class=\"btn-inner--icon\"><img src=\"../assets/img/icons/common/google.svg\"></span>\n              <span class=\"btn-inner--text\">Google</span>\n            </a>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n");

/***/ })

}]);
//# sourceMappingURL=layouts-auth-layout-auth-layout-module.js.map