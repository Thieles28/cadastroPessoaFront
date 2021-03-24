(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layouts-admin-layout-admin-layout-module"],{

/***/ "Dvla":
/*!***************************************************************************!*\
  !*** ./node_modules/ngx-clipboard/__ivy_ngcc__/fesm2015/ngx-clipboard.js ***!
  \***************************************************************************/
/*! exports provided: ClipboardDirective, ClipboardIfSupportedDirective, ClipboardModule, ClipboardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardDirective", function() { return ClipboardDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardIfSupportedDirective", function() { return ClipboardIfSupportedDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardModule", function() { return ClipboardModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClipboardService", function() { return ClipboardService; });
/* harmony import */ var _Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "1OyB");
/* harmony import */ var _Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "vuIU");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ngx_window_token__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-window-token */ "Qoup");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "qCKp");







/**
 * The following code is heavily copied from https://github.com/zenorocha/clipboard.js
 */



var ClipboardService = /*#__PURE__*/function () {
  function ClipboardService(document, window) {
    Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ClipboardService);

    this.document = document;
    this.window = window;
    this.copySubject = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subject"]();
    this.copyResponse$ = this.copySubject.asObservable();
    this.config = {};
  }

  Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ClipboardService, [{
    key: "configure",
    value: function configure(config) {
      this.config = config;
    }
  }, {
    key: "copy",
    value: function copy(content) {
      if (!this.isSupported || !content) {
        return this.pushCopyResponse({
          isSuccess: false,
          content: content
        });
      }

      var copyResult = this.copyFromContent(content);

      if (copyResult) {
        return this.pushCopyResponse({
          content: content,
          isSuccess: copyResult
        });
      }

      return this.pushCopyResponse({
        isSuccess: false,
        content: content
      });
    }
  }, {
    key: "isSupported",
    get: function get() {
      return !!this.document.queryCommandSupported && !!this.document.queryCommandSupported('copy') && !!this.window;
    }
  }, {
    key: "isTargetValid",
    value: function isTargetValid(element) {
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        if (element.hasAttribute('disabled')) {
          throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
        }

        return true;
      }

      throw new Error('Target should be input or textarea');
    }
    /**
     * Attempts to copy from an input `targetElm`
     */

  }, {
    key: "copyFromInputElement",
    value: function copyFromInputElement(targetElm) {
      var isFocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      try {
        this.selectTarget(targetElm);
        var re = this.copyText();
        this.clearSelection(isFocus ? targetElm : undefined, this.window);
        return re && this.isCopySuccessInIE11();
      } catch (error) {
        return false;
      }
    }
    /**
     * This is a hack for IE11 to return `true` even if copy fails.
     */

  }, {
    key: "isCopySuccessInIE11",
    value: function isCopySuccessInIE11() {
      var clipboardData = this.window['clipboardData'];

      if (clipboardData && clipboardData.getData) {
        if (!clipboardData.getData('Text')) {
          return false;
        }
      }

      return true;
    }
    /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     */

  }, {
    key: "copyFromContent",
    value: function copyFromContent(content) {
      var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.document.body;

      // check if the temp textarea still belongs to the current container.
      // In case we have multiple places using ngx-clipboard, one is in a modal using container but the other one is not.
      if (this.tempTextArea && !container.contains(this.tempTextArea)) {
        this.destroy(this.tempTextArea.parentElement || undefined);
      }

      if (!this.tempTextArea) {
        this.tempTextArea = this.createTempTextArea(this.document, this.window);

        try {
          container.appendChild(this.tempTextArea);
        } catch (error) {
          throw new Error('Container should be a Dom element');
        }
      }

      this.tempTextArea.value = content;
      var toReturn = this.copyFromInputElement(this.tempTextArea, false);

      if (this.config.cleanUpAfterCopy) {
        this.destroy(this.tempTextArea.parentElement || undefined);
      }

      return toReturn;
    }
    /**
     * Remove temporary textarea if any exists.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.document.body;

      if (this.tempTextArea) {
        container.removeChild(this.tempTextArea); // removeChild doesn't remove the reference from memory

        this.tempTextArea = undefined;
      }
    }
    /**
     * Select the target html input element.
     */

  }, {
    key: "selectTarget",
    value: function selectTarget(inputElement) {
      inputElement.select();
      inputElement.setSelectionRange(0, inputElement.value.length);
      return inputElement.value.length;
    }
  }, {
    key: "copyText",
    value: function copyText() {
      return this.document.execCommand('copy');
    }
    /**
     * Moves focus away from `target` and back to the trigger, removes current selection.
     */

  }, {
    key: "clearSelection",
    value: function clearSelection(inputElement, window) {
      var _a;

      inputElement && inputElement.focus();
      (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
    }
    /**
     * Creates a fake textarea for copy command.
     */

  }, {
    key: "createTempTextArea",
    value: function createTempTextArea(doc, window) {
      var isRTL = doc.documentElement.getAttribute('dir') === 'rtl';
      var ta;
      ta = doc.createElement('textarea'); // Prevent zooming on iOS

      ta.style.fontSize = '12pt'; // Reset box model

      ta.style.border = '0';
      ta.style.padding = '0';
      ta.style.margin = '0'; // Move element out of screen horizontally

      ta.style.position = 'absolute';
      ta.style[isRTL ? 'right' : 'left'] = '-9999px'; // Move element to the same position vertically

      var yPosition = window.pageYOffset || doc.documentElement.scrollTop;
      ta.style.top = yPosition + 'px';
      ta.setAttribute('readonly', '');
      return ta;
    }
    /**
     * Pushes copy operation response to copySubject, to provide global access
     * to the response.
     */

  }, {
    key: "pushCopyResponse",
    value: function pushCopyResponse(response) {
      this.copySubject.next(response);
    }
    /**
     * @deprecated use pushCopyResponse instead.
     */

  }, {
    key: "pushCopyReponse",
    value: function pushCopyReponse(response) {
      this.pushCopyResponse(response);
    }
  }]);

  return ClipboardService;
}();

ClipboardService.ɵfac = function ClipboardService_Factory(t) {
  return new (t || ClipboardService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_3__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](ngx_window_token__WEBPACK_IMPORTED_MODULE_5__["WINDOW"], 8));
};

ClipboardService.ctorParameters = function () {
  return [{
    type: undefined,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Inject"],
      args: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["DOCUMENT"]]
    }]
  }, {
    type: undefined,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Optional"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Inject"],
      args: [ngx_window_token__WEBPACK_IMPORTED_MODULE_5__["WINDOW"]]
    }]
  }];
};

ClipboardService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"])({
  factory: function ClipboardService_Factory() {
    return new ClipboardService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_3__["DOCUMENT"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"])(ngx_window_token__WEBPACK_IMPORTED_MODULE_5__["WINDOW"], 8));
  },
  token: ClipboardService,
  providedIn: "root"
});
ClipboardService = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__decorate"])([Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_3__["DOCUMENT"])), Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__param"])(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Inject"])(ngx_window_token__WEBPACK_IMPORTED_MODULE_5__["WINDOW"]))], ClipboardService);

var ClipboardDirective = /*#__PURE__*/function () {
  function ClipboardDirective(clipboardSrv) {
    Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ClipboardDirective);

    this.clipboardSrv = clipboardSrv;
    this.cbOnSuccess = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
    this.cbOnError = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
  } // tslint:disable-next-line:no-empty


  Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ClipboardDirective, [{
    key: "ngOnInit",
    value: function ngOnInit() {}
  }, {
    key: "ngOnDestroy",
    value: function ngOnDestroy() {
      this.clipboardSrv.destroy(this.container);
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      if (!this.clipboardSrv.isSupported) {
        this.handleResult(false, undefined, event);
      } else if (this.targetElm && this.clipboardSrv.isTargetValid(this.targetElm)) {
        this.handleResult(this.clipboardSrv.copyFromInputElement(this.targetElm), this.targetElm.value, event);
      } else if (this.cbContent) {
        this.handleResult(this.clipboardSrv.copyFromContent(this.cbContent, this.container), this.cbContent, event);
      }
    }
    /**
     * Fires an event based on the copy operation result.
     * @param succeeded
     */

  }, {
    key: "handleResult",
    value: function handleResult(succeeded, copiedContent, event) {
      var response = {
        isSuccess: succeeded,
        event: event
      };

      if (succeeded) {
        response = Object.assign(response, {
          content: copiedContent,
          successMessage: this.cbSuccessMsg
        });
        this.cbOnSuccess.emit(response);
      } else {
        this.cbOnError.emit(response);
      }

      this.clipboardSrv.pushCopyResponse(response);
    }
  }]);

  return ClipboardDirective;
}();

ClipboardDirective.ɵfac = function ClipboardDirective_Factory(t) {
  return new (t || ClipboardDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ClipboardService));
};

ClipboardDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineDirective"]({
  type: ClipboardDirective,
  selectors: [["", "ngxClipboard", ""]],
  hostBindings: function ClipboardDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ClipboardDirective_click_HostBindingHandler($event) {
        return ctx.onClick($event.target);
      });
    }
  },
  inputs: {
    targetElm: ["ngxClipboard", "targetElm"],
    container: "container",
    cbContent: "cbContent",
    cbSuccessMsg: "cbSuccessMsg"
  },
  outputs: {
    cbOnSuccess: "cbOnSuccess",
    cbOnError: "cbOnError"
  }
});

ClipboardDirective.ctorParameters = function () {
  return [{
    type: ClipboardService
  }];
};

Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"])('ngxClipboard')], ClipboardDirective.prototype, "targetElm", void 0);

Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"])()], ClipboardDirective.prototype, "container", void 0);

Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"])()], ClipboardDirective.prototype, "cbContent", void 0);

Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"])()], ClipboardDirective.prototype, "cbSuccessMsg", void 0);

Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"])()], ClipboardDirective.prototype, "cbOnSuccess", void 0);

Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"])()], ClipboardDirective.prototype, "cbOnError", void 0);

Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["HostListener"])('click', ['$event.target'])], ClipboardDirective.prototype, "onClick", null);

var ClipboardIfSupportedDirective = /*#__PURE__*/function () {
  function ClipboardIfSupportedDirective(_clipboardService, _viewContainerRef, _templateRef) {
    Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ClipboardIfSupportedDirective);

    this._clipboardService = _clipboardService;
    this._viewContainerRef = _viewContainerRef;
    this._templateRef = _templateRef;
  }

  Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ClipboardIfSupportedDirective, [{
    key: "ngOnInit",
    value: function ngOnInit() {
      if (this._clipboardService.isSupported) {
        this._viewContainerRef.createEmbeddedView(this._templateRef);
      }
    }
  }]);

  return ClipboardIfSupportedDirective;
}();

ClipboardIfSupportedDirective.ɵfac = function ClipboardIfSupportedDirective_Factory(t) {
  return new (t || ClipboardIfSupportedDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ClipboardService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewContainerRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["TemplateRef"]));
};

ClipboardIfSupportedDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineDirective"]({
  type: ClipboardIfSupportedDirective,
  selectors: [["", "ngxClipboardIfSupported", ""]]
});

ClipboardIfSupportedDirective.ctorParameters = function () {
  return [{
    type: ClipboardService
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewContainerRef"]
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["TemplateRef"]
  }];
};

var ClipboardModule = function ClipboardModule() {
  Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ClipboardModule);
};

ClipboardModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: ClipboardModule
});
ClipboardModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  factory: function ClipboardModule_Factory(t) {
    return new (t || ClipboardModule)();
  },
  imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"]]]
});
/*@__PURE__*/

(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵsetClassMetadata"](ClipboardService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Injectable"],
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Inject"],
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["DOCUMENT"]]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Optional"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Inject"],
        args: [ngx_window_token__WEBPACK_IMPORTED_MODULE_5__["WINDOW"]]
      }]
    }];
  }, null);
})();
/*@__PURE__*/


(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵsetClassMetadata"](ClipboardDirective, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Directive"],
    args: [{
      selector: '[ngxClipboard]'
    }]
  }], function () {
    return [{
      type: ClipboardService
    }];
  }, {
    cbOnSuccess: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"]
    }],
    cbOnError: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"]
    }],
    onClick: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["HostListener"],
      args: ['click', ['$event.target']]
    }],
    targetElm: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"],
      args: ['ngxClipboard']
    }],
    container: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"]
    }],
    cbContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"]
    }],
    cbSuccessMsg: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"]
    }]
  });
})();
/*@__PURE__*/


(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵsetClassMetadata"](ClipboardIfSupportedDirective, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Directive"],
    args: [{
      selector: '[ngxClipboardIfSupported]'
    }]
  }], function () {
    return [{
      type: ClipboardService
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewContainerRef"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["TemplateRef"]
    }];
  }, null);
})();

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](ClipboardModule, {
    declarations: function declarations() {
      return [ClipboardDirective, ClipboardIfSupportedDirective];
    },
    imports: function imports() {
      return [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"]];
    },
    exports: function exports() {
      return [ClipboardDirective, ClipboardIfSupportedDirective];
    }
  });
})();
/*@__PURE__*/


(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵsetClassMetadata"](ClipboardModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"],
    args: [{
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"]],
      declarations: [ClipboardDirective, ClipboardIfSupportedDirective],
      exports: [ClipboardDirective, ClipboardIfSupportedDirective]
    }]
  }], null, null);
})();
/*
 * Public API Surface of ngx-clipboard
 */

/**
 * Generated bundle index. Do not edit.
 */


 //# sourceMappingURL=ngx-clipboard.js.map

/***/ }),

/***/ "Dz4m":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/cadastro/cadastro.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header pb-8 pt-5 pt-lg-8 d-flex align-items-center\" style=\"min-height: 600px; background-image: url(assets/img/theme/profile-cover.jpg); background-size: cover; background-position: center top;\">\n  <!-- Mask -->\n  <span class=\"mask bg-gradient-danger opacity-8\"></span>\n  <!-- Header container -->\n  <div class=\"container-fluid d-flex align-items-center\">\n    <div class=\"row\">\n      <div class=\"col-lg-7 col-md-10\">\n        <h1 class=\"display-2 text-white\">Bem vindo!</h1>\n        <p class=\"text-white mt-0 mb-5\">Esta é a sua página de cadastro, aqui você gerência cadastramento de pessoa.</p>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"container-fluid mt--7\">\n  <div class=\"row\">\n    <div class=\"col-xl-12 order-xl-1\">\n      <div class=\"card bg-secondary shadow\">\n        <div class=\"card-header bg-white border-0\">\n          <div class=\"row align-items-center\">\n            <div class=\"col-8\">\n              <h3 class=\"mb-0\">{{ modoExibicao ? 'Cadastro de Pessoa' : 'Atualizar Pessoa'}}</h3>\n            </div>\n          </div>\n        </div>\n        <div class=\"card-body\">\n          <form [formGroup]=\"formPessoa\" (ngSubmit)=\"onSubmit()\">\n            <div class=\"pl-lg-4\">\n              <div class=\"row\">\n                <div class=\"col-lg-6\">\n                  <div class=\"form-group\">\n                    <label class=\"form-control-label\" for=\"input-username\">Nome</label>\n                    <input type=\"text\" formControlName=\"nome\" class=\"form-control form-control-alternative\">\n                    <!-- <div *ngIf=\"obter.nome.invalid && (obter.nome.dirty || obter.nome.touched)\">\n                      <div class=\"form-control-label\" style=\"color: red\" *ngIf=\"obter.nome.errors.required\">Perfil\n                        Obrigatório\n                      </div>\n                      <div class=\"form-control-label\" style=\"color: red\" *ngIf=\"obter.nome.errors.minlength\">O perfil\n                        deve ter pelo menos 4 caracteres.\n                      </div>\n                      <div class=\"form-control-label\" style=\"color: red\" *ngIf=\"obter.nome.errors.maxlength\">O perfil\n                        deve ter no máxmio 20 caracteres.\n                      </div>\n                    </div> -->\n                  </div>\n                </div>\n                <div class=\"col-lg-6\">\n                  <div class=\"form-group\">\n                    <label class=\"form-control-label\" for=\"input-email\">Email</label>\n                    <input type=\"email\" formControlName=\"email\" class=\"form-control form-control-alternative\" placeholder=\"jesse@example.com\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"row\">\n                <div class=\"col-lg-6\">\n                  <div class=\"form-group\">\n                    <label class=\"form-control-label\" for=\"input-first-name\">Sexo</label>\n                    <select class=\"form-control form-control-alternative\" formControlName=\"sexo\">\n                      <option selected>Selecione o sexo</option>\n                      <option value=\"M\">Masculino</option>\n                      <option value=\"F\">Feminino</option>\n                    </select>\n                  </div>\n                </div>\n                <div class=\"col-lg-6\">\n                  <div class=\"form-group\">\n                    <label class=\"form-control-label\" for=\"input-last-name\">Data de Nascimento</label>\n                    <div class=\"input-group input-group-alternative\">\n                      <div class=\"input-group-prepend\">\n                        <span class=\"input-group-text\"><i class=\"ni ni-calendar-grid-58\"></i></span>\n                      </div>\n                      <!-- <input class=\"form-control datepicker\" placeholder=\"Selecione a data\" name=\"dp\" formControlName=\"dataNascimento\" ngbDatepicker #d=\"ngbDatepicker\" (click)=\"d.toggle()\" type=\"text\" mask=\"00/00/0000\" /> -->\n                      <input class=\"form-control datepicker\" formControlName=\"dataNascimento\" placeholder=\"Selecione a data\" type=\"text\" [dropSpecialCharacters]=\"false\" mask=\"00/00/0000\"/>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"col-lg-4\">\n                  <div class=\"form-group\" formGroupName=\"nacionalidade\">\n                    <label class=\"form-control-label\" for=\"input-first-name\">Nacionalidade</label>\n                    <select class=\"form-control form-control-alternative\" formControlName=\"codigo\" (ngModelChange)=\"habilitar($event)\">\n                      <option selected>Selecione a Nacionalidade</option>\n                      <option [value]=\"p.codigo\" *ngFor=\"let p of nacionalidade; let i = index\">{{ p.nome | titlecase }}</option>\n                    </select>\n                  </div>\n                </div>\n                <div class=\"col-lg-4\">\n                  <div class=\"form-group\" formGroupName=\"naturalidade\">\n                    <label class=\"form-control-label\" for=\"input-first-name\">Naturalidade</label>\n                    <select class=\"form-control form-control-alternative\" formControlName=\"codigo\">\n                      <option selected>Selecione a Naturalidade</option>\n                      <option [value]=\"e.codigo\" *ngFor=\"let e of naturalidade; let i = index\">{{ e.nome | titlecase }}</option>\n                    </select>\n                  </div>\n                </div>\n                <div class=\"col-lg-4\">\n                  <div class=\"form-group\">\n                    <label class=\"form-control-label\" for=\"input-email\">Cpf</label>\n                    <input type=\"text\" formControlName=\"cpf\" class=\"form-control form-control-alternative\" placeholder=\"Cpf\" [dropSpecialCharacters]=\"true\" mask=\"000.000.000-00\">\n                  </div>\n                </div>\n              </div>\n            </div>\n            <hr class=\"my-4\" />\n            <div class=\"col-lg-12\">\n              <div class=\"form-group\">\n                <button type=\"submit\" class=\"btn btn-primary btn-lg btn-block\" [disabled]=\"formPessoa.invalid\">\n                  {{ modoExibicao ? 'Cadastar' : 'Atualizar'}}\n                </button>\n              </div>\n            </div>\n            <!-- <pre>\n              Form Value: {{ formPessoa.value | json }}\n            </pre>\n            <pre>\n              Form Status: {{ formPessoa.status }}\n            </pre> -->\n           </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "IqXj":
/*!*************************************************************!*\
  !*** ./src/app/layouts/admin-layout/admin-layout.module.ts ***!
  \*************************************************************/
/*! exports provided: options, AdminLayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminLayoutModule", function() { return AdminLayoutModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-clipboard */ "Dvla");
/* harmony import */ var _admin_layout_routing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-layout.routing */ "qZ7x");
/* harmony import */ var _pages_cadastro_cadastro_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../pages/cadastro/cadastro.component */ "Svid");
/* harmony import */ var _pages_listagem_listagem_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../pages/listagem/listagem.component */ "sLpN");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");
/* harmony import */ var src_app_model_datepicker_popup__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/model/datepicker-popup */ "sjLj");
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-mask */ "tmjD");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var options = null;
var AdminLayoutModule = /** @class */ (function () {
    function AdminLayoutModule() {
    }
    AdminLayoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_admin_layout_routing__WEBPACK_IMPORTED_MODULE_6__["AdminLayoutRoutes"]),
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbModule"],
                ngx_clipboard__WEBPACK_IMPORTED_MODULE_5__["ClipboardModule"],
                ngx_mask__WEBPACK_IMPORTED_MODULE_11__["NgxMaskModule"].forRoot()
            ],
            declarations: [
                _pages_cadastro_cadastro_component__WEBPACK_IMPORTED_MODULE_7__["CadastroComponent"],
                _pages_listagem_listagem_component__WEBPACK_IMPORTED_MODULE_8__["ListagemComponent"]
            ],
            providers: [
                { provide: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbDateAdapter"], useClass: src_app_model_datepicker_popup__WEBPACK_IMPORTED_MODULE_10__["NgbDateCustomParserFormatter"] },
                { provide: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbDateParserFormatter"], useClass: src_app_model_datepicker_popup__WEBPACK_IMPORTED_MODULE_10__["CustomDateParserFormatter"] }
            ]
        })
    ], AdminLayoutModule);
    return AdminLayoutModule;
}());



/***/ }),

/***/ "Qoup":
/*!*********************************************************************************!*\
  !*** ./node_modules/ngx-window-token/__ivy_ngcc__/fesm2015/ngx-window-token.js ***!
  \*********************************************************************************/
/*! exports provided: WINDOW */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WINDOW", function() { return WINDOW; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

var WINDOW = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('WindowToken', typeof window !== 'undefined' && window.document ? {
  providedIn: 'root',
  factory: function factory() {
    return window;
  }
} : undefined);
/*
 * Public API Surface of ngx-window-token
 */

/**
 * Generated bundle index. Do not edit.
 */

 //# sourceMappingURL=ngx-window-token.js.map

/***/ }),

/***/ "Svid":
/*!******************************************************!*\
  !*** ./src/app/pages/cadastro/cadastro.component.ts ***!
  \******************************************************/
/*! exports provided: CadastroComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadastroComponent", function() { return CadastroComponent; });
/* harmony import */ var _raw_loader_cadastro_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./cadastro.component.html */ "Dz4m");
/* harmony import */ var _cadastro_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cadastro.component.scss */ "gYoV");
/* harmony import */ var _services_pessoa_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../services/pessoa.service */ "bCDz");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "EApP");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CadastroComponent = /** @class */ (function () {
    function CadastroComponent(pessoaService, fb, mensagem, route, router) {
        this.pessoaService = pessoaService;
        this.fb = fb;
        this.mensagem = mensagem;
        this.route = route;
        this.router = router;
    }
    CadastroComponent.prototype.ngOnInit = function () {
        this.codigo = this.route.snapshot.params['codigo'];
        this.modoExibicao = !this.codigo;
        this.listarPais();
        this.listarEstados();
        this.pessoaForm();
        if (!this.modoExibicao) {
            this.buscaPorPessoa();
        }
    };
    CadastroComponent.prototype.habilitar = function (event) {
        if (event == 33) {
            this.formPessoa.get('naturalidade').enable();
        }
        else {
            this.formPessoa.get('naturalidade').disable();
            this.formPessoa.get('naturalidade').reset();
        }
    };
    CadastroComponent.prototype.pessoaForm = function () {
        this.formPessoa = this.fb.group({
            nome: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(100)]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].email]],
            sexo: [''],
            dataNascimento: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]],
            nacionalidade: this.fb.group({
                codigo: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
            }),
            naturalidade: this.fb.group({
                codigo: [{ value: '', disabled: true }, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
            }),
            cpf: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
        });
    };
    Object.defineProperty(CadastroComponent.prototype, "obter", {
        get: function () {
            return this.formPessoa.controls;
        },
        enumerable: false,
        configurable: true
    });
    CadastroComponent.prototype.listarPais = function () {
        var _this = this;
        this.pessoaService.listarPais().subscribe(function (res) {
            _this.nacionalidade = res;
        }, function (erro) {
            erro.error.map(function (res) {
                _this.mensagem.error(res.mensagemUsuario);
            });
        });
    };
    CadastroComponent.prototype.listarEstados = function () {
        var _this = this;
        this.pessoaService.listarEstados().subscribe(function (res) {
            _this.naturalidade = res;
        }, function (erro) {
            erro.error.map(function (res) {
                _this.mensagem.error(res.mensagemUsuario);
            });
        });
    };
    CadastroComponent.prototype.buscaPorPessoa = function () {
        var _this = this;
        this.pessoaService.buscarPorPessoa(this.codigo).subscribe(function (res) {
            _this.formPessoa.patchValue(res);
        });
    };
    CadastroComponent.prototype.atualizarPessoa = function () {
        var _this = this;
        this.pessoaService.atualizarPessoa(this.codigo, this.formPessoa.value).subscribe(function (res) {
            _this.mensagem.success('Pessoa atualizada com sucesso!');
            _this.router.navigate(['/lista'], { relativeTo: _this.route });
        }, function (erro) {
            erro.error.map(function (res) {
                _this.mensagem.error(res.mensagemUsuario);
            });
        });
    };
    CadastroComponent.prototype.registraPessoa = function () {
        var _this = this;
        this.pessoaService.cadastrarPessoa(this.formPessoa.value)
            .subscribe(function (res) {
            if (res != null) {
                _this.mensagem.success('Pessoa cadastrada com sucesso!');
                _this.formPessoa.reset();
            }
        }, function (erro) {
            erro.error.map(function (res) {
                _this.mensagem.error(res.mensagemUsuario);
            });
        });
    };
    CadastroComponent.prototype.onSubmit = function () {
        if (this.formPessoa.value && !this.formPessoa.invalid) {
            if (this.modoExibicao) {
                this.registraPessoa();
            }
            else {
                this.atualizarPessoa();
            }
        }
    };
    CadastroComponent.ctorParameters = function () { return [
        { type: _services_pessoa_service__WEBPACK_IMPORTED_MODULE_2__["PessoaService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }
    ]; };
    CadastroComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-user-profile',
            template: _raw_loader_cadastro_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_cadastro_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_services_pessoa_service__WEBPACK_IMPORTED_MODULE_2__["PessoaService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]])
    ], CadastroComponent);
    return CadastroComponent;
}());



/***/ }),

/***/ "Vi8C":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/listagem/listagem.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header bg-gradient-danger pb-8 pt-5 pt-md-8\">\n  <div class=\"container-fluid\">\n    <div class=\"header-body\">\n      <!-- Card stats -->\n      <div class=\"row\">\n        <div class=\"col-xl-3 col-lg-6\">\n          <div class=\"card card-stats mb-4 mb-xl-0\" *ngIf=\"totalDeElementos\">\n            <div class=\"card-body\">\n              <div class=\"row\">\n                <div class=\"col\">\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Total de Pessoas</h5>\n                  <span class=\"h2 font-weight-bold mb-0\">{{ totalDeElementos }}</span>\n                </div>\n                <div class=\"col-auto\">\n                  <div class=\"icon icon-shape bg-warning text-white rounded-circle shadow\">\n                    <i class=\"fas fa-users\"></i>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-xl-3 col-lg-6\">\n          <div class=\"card card-stats mb-4 mb-xl-0\" *ngIf=\"totalDeElementos\">\n            <div class=\"card-body\">\n              <div class=\"row\">\n                <div class=\"col\">\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Total de Páginas</h5>\n                  <span class=\"h2 font-weight-bold mb-0\">{{ totalDePagina }}</span>\n                </div>\n                <div class=\"col-auto\">\n                  <div class=\"icon icon-shape bg-warning text-white rounded-circle shadow\">\n                    <i class=\"fas fa-book\"></i>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-xl-3 col-lg-6\">\n          <div class=\"card card-stats mb-4 mb-xl-0\" *ngIf=\"totalDeElementos\">\n            <div class=\"card-body\">\n              <div class=\"row\">\n                <div class=\"col\">\n                  <h5 class=\"card-title text-uppercase text-muted mb-0\">Página Atual</h5>\n                  <span class=\"h2 font-weight-bold mb-0\">{{ paginaAtual + 1 }}</span>\n                </div>\n                <div class=\"col-auto\">\n                  <div class=\"icon icon-shape bg-info text-white rounded-circle shadow\">\n                    <i class=\"fas fa-sticky-note\"></i>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- Page content -->\n<div class=\"container-fluid mt--7\">\n  <!-- Table -->\n  <div class=\"row\">\n    <div class=\"col\">\n      <div class=\"card shadow\" *ngIf=\"pessoa?.length\">\n        <div class=\"card-header border-0\">\n          <h3 class=\"mb-0\">Listagem de pessoas cadastradas</h3>\n        </div>\n        <div class=\"table-responsive\">\n          <table class=\"table align-items-center table-flush\">\n            <thead class=\"thead-light\">\n              <tr>\n                <th scope=\"col\">Nome</th>\n                <th scope=\"col\">Sexo</th>\n                <th scope=\"col\">E-mail</th>\n                <th scope=\"col\">Data Nascimento</th>\n                <th scope=\"col\">Nacionalidade</th>\n                <th scope=\"col\">Naturalidade</th>\n                <th scope=\"col\">Cpf</th>\n                <th scope=\"col\">Acões</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let p of pessoa\">\n                <th scope=\"row\">\n                  <div class=\"media align-items-center\">\n                    <div class=\"media-body\">\n                      <span class=\"mb-0 text-sm\">{{ p.nome }}</span>\n                    </div>\n                  </div>\n                </th>\n                <td>\n                  <div class=\"media align-items-center\">\n                    <div class=\"media-body\">\n                      <span class=\"mb-0 text-sm\"> {{ p.sexo == 'M' ? 'Masculino' : 'Feminino'}}</span>\n                    </div>\n                  </div>\n                </td>\n                <td>\n                  <div class=\"media align-items-center\">\n                    <div class=\"media-body\">\n                      <span class=\"mb-0 text-sm\"> {{ p.email }}</span>\n                    </div>\n                  </div>\n                </td>\n                <td>\n                  <div class=\"media align-items-center\">\n                    <div class=\"media-body\">\n                      <span class=\"mb-0 text-sm\"> {{ p.dataNascimento }}</span>\n                    </div>\n                  </div>\n                </td>\n                <td>\n                  <div class=\"media align-items-center\">\n                    <div class=\"media-body\">\n                      <span class=\"mb-0 text-sm\"> {{ p.nacionalidade.nome }}</span>\n                    </div>\n                  </div>\n                </td>\n                <td >\n                  <div class=\"media align-items-center\">\n                    <div class=\"media-body\">\n                      <span class=\"mb-0 text-sm\"> {{ p.naturalidade.nome }}</span>\n                    </div>\n                  </div>\n                </td>\n                <td>\n                  <div class=\"media align-items-center\">\n                    <div class=\"media-body\">\n                      <span class=\"mb-0 text-sm\"> {{ p.cpf }}</span>\n                    </div>\n                  </div>\n                </td>\n                <td>\n                  <div class=\"media align-items-center\">\n                    <div class=\"media-body\">\n                      <a class=\"btn btn-sm btn-icon-only text-light\" [routerLink]=\"['/atualizar/', p.codigo]\">\n                        <i class=\"fas fa-edit\"></i>\n                      </a>\n                      <a class=\"btn btn-sm btn-icon-only text-light\" (click)=\"removerPessoa(p.codigo)\">\n                        <i class=\"fas fa-trash\"></i>\n                      </a>\n                    </div>\n                  </div>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <div class=\"card-footer py-4\">\n          <nav aria-label=\"...\">\n            <ul class=\"pagination justify-content-end mb-0\">\n              <li class=\"page-item\">\n                <a class=\"page-link\" tabindex=\"-1\" (click)=\"voltar()\">\n                  <i class=\"fas fa-angle-left\"></i>\n                  <span class=\"sr-only\">Previous</span>\n                </a>\n              </li>\n              <!-- <li class=\"page-item active\">\n                <a class=\"page-link\" href=\"javascript:void(0)\">1</a>\n              </li>\n              <li class=\"page-item\">\n                <a class=\"page-link\" href=\"javascript:void(0)\">2 <span class=\"sr-only\">(current)</span></a>\n              </li>\n              <li class=\"page-item\">\n                <a class=\"page-link\" href=\"javascript:void(0)\">3</a></li> -->\n              <li class=\"page-item\">\n                <a class=\"page-link\" (click)=\"avancar()\">\n                  <i class=\"fas fa-angle-right\"></i>\n                  <span class=\"sr-only\">Next</span>\n                </a>\n              </li>\n            </ul>\n          </nav>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "XO3K":
/*!********************************************************!*\
  !*** ./src/app/pages/listagem/listagem.component.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsaXN0YWdlbS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "bCDz":
/*!********************************************!*\
  !*** ./src/app/services/pessoa.service.ts ***!
  \********************************************/
/*! exports provided: PessoaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PessoaService", function() { return PessoaService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "AytR");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PessoaService = /** @class */ (function () {
    function PessoaService(http) {
        this.http = http;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl;
    }
    PessoaService.prototype.listarPessoa = function (pagina, tamanho) {
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]();
        params = params.set('page', pagina.toString()).delete('page', '');
        params = params.set('size', tamanho.toString()).delete('size', '');
        return this.http.get("" + this.baseUrl, { params: params });
    };
    PessoaService.prototype.listarPais = function () {
        return this.http.get(this.baseUrl + "/pais");
    };
    PessoaService.prototype.listarEstados = function () {
        return this.http.get(this.baseUrl + "/estados");
    };
    PessoaService.prototype.buscarPorPessoa = function (codigo) {
        return this.http.get(this.baseUrl + "/" + codigo);
    };
    PessoaService.prototype.cadastrarPessoa = function (pessoa) {
        return this.http.post(this.baseUrl + "/cadastrar", pessoa);
    };
    PessoaService.prototype.atualizarPessoa = function (codigo, pessoa) {
        return this.http.put(this.baseUrl + "/" + codigo, pessoa);
    };
    PessoaService.prototype.removerPessoa = function (codigo) {
        return this.http.delete(this.baseUrl + "/" + codigo);
    };
    PessoaService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    PessoaService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], PessoaService);
    return PessoaService;
}());



/***/ }),

/***/ "gYoV":
/*!********************************************************!*\
  !*** ./src/app/pages/cadastro/cadastro.component.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYWRhc3Ryby5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "ls82":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }

  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
 true ? module.exports : undefined);

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

/***/ }),

/***/ "mrSG":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "o0o1":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "ls82");


/***/ }),

/***/ "qZ7x":
/*!**************************************************************!*\
  !*** ./src/app/layouts/admin-layout/admin-layout.routing.ts ***!
  \**************************************************************/
/*! exports provided: AdminLayoutRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminLayoutRoutes", function() { return AdminLayoutRoutes; });
/* harmony import */ var _pages_cadastro_cadastro_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pages/cadastro/cadastro.component */ "Svid");
/* harmony import */ var _pages_listagem_listagem_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pages/listagem/listagem.component */ "sLpN");


var AdminLayoutRoutes = [
    { path: 'cadastro', component: _pages_cadastro_cadastro_component__WEBPACK_IMPORTED_MODULE_0__["CadastroComponent"] },
    { path: 'atualizar/:codigo', component: _pages_cadastro_cadastro_component__WEBPACK_IMPORTED_MODULE_0__["CadastroComponent"] },
    { path: 'lista', component: _pages_listagem_listagem_component__WEBPACK_IMPORTED_MODULE_1__["ListagemComponent"] }
];


/***/ }),

/***/ "sLpN":
/*!******************************************************!*\
  !*** ./src/app/pages/listagem/listagem.component.ts ***!
  \******************************************************/
/*! exports provided: ListagemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListagemComponent", function() { return ListagemComponent; });
/* harmony import */ var _raw_loader_listagem_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./listagem.component.html */ "Vi8C");
/* harmony import */ var _listagem_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./listagem.component.scss */ "XO3K");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_pessoa_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/pessoa.service */ "bCDz");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "EApP");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ListagemComponent = /** @class */ (function () {
    function ListagemComponent(pessoaService, mensagem) {
        this.pessoaService = pessoaService;
        this.mensagem = mensagem;
        this.pagina = 0;
        this.tamanho = 5;
    }
    ListagemComponent.prototype.ngOnInit = function () {
        this.listagemPessoa(this.pagina);
    };
    ListagemComponent.prototype.listagemPessoa = function (pagina) {
        var _this = this;
        this.pessoaService.listarPessoa(this.pagina, this.tamanho).subscribe(function (res) {
            _this.pessoa = res.content;
            _this.pagina = res.number;
            _this.totalDePagina = res.totalPages;
            _this.totalDeElementos = res.totalElements;
            _this.paginaAtual = res.number;
        }, function (erro) {
            erro.error.map(function (res) {
                _this.mensagem.error(res.mensagemUsuario);
            });
        });
    };
    ListagemComponent.prototype.avancar = function () {
        if (this.pagina < this.totalDePagina - 1) {
            this.listagemPessoa(++this.pagina);
        }
    };
    ListagemComponent.prototype.voltar = function () {
        if (this.pagina > 0) {
            this.listagemPessoa(--this.pagina);
        }
    };
    ListagemComponent.prototype.removerPessoa = function (codigo) {
        var _this = this;
        this.pessoaService.removerPessoa(codigo).subscribe(function (res) {
            _this.mensagem.success('Pessoa removida com sucesso!');
            _this.listagemPessoa(_this.pagina);
        }, function (erro) {
            erro.error.map(function (res) {
                _this.mensagem.error(res.mensagemUsuario);
            });
        });
    };
    ListagemComponent.ctorParameters = function () { return [
        { type: _services_pessoa_service__WEBPACK_IMPORTED_MODULE_3__["PessoaService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] }
    ]; };
    ListagemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-tables',
            template: _raw_loader_listagem_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_listagem_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_services_pessoa_service__WEBPACK_IMPORTED_MODULE_3__["PessoaService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], ListagemComponent);
    return ListagemComponent;
}());



/***/ }),

/***/ "sjLj":
/*!*******************************************!*\
  !*** ./src/app/model/datepicker-popup.ts ***!
  \*******************************************/
/*! exports provided: NgbDateCustomParserFormatter, CustomDateParserFormatter, NgbdDatepickerAdapter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgbDateCustomParserFormatter", function() { return NgbDateCustomParserFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomDateParserFormatter", function() { return CustomDateParserFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgbdDatepickerAdapter", function() { return NgbdDatepickerAdapter; });
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var NgbDateCustomParserFormatter = /** @class */ (function (_super) {
    __extends(NgbDateCustomParserFormatter, _super);
    function NgbDateCustomParserFormatter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DELIMITER = '/';
        return _this;
    }
    NgbDateCustomParserFormatter.prototype.fromModel = function (value) {
        if (value) {
            var date = value.split(this.DELIMITER);
            return {
                day: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[2], 10)
            };
        }
        return null;
    };
    NgbDateCustomParserFormatter.prototype.toModel = function (date) {
        return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
    };
    NgbDateCustomParserFormatter = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], NgbDateCustomParserFormatter);
    return NgbDateCustomParserFormatter;
}(_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_0__["NgbDateAdapter"]));

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
var CustomDateParserFormatter = /** @class */ (function (_super) {
    __extends(CustomDateParserFormatter, _super);
    function CustomDateParserFormatter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DELIMITER = '/';
        return _this;
    }
    CustomDateParserFormatter.prototype.parse = function (value) {
        if (value) {
            var date = value.split(this.DELIMITER);
            return {
                day: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[2], 10)
            };
        }
        return null;
    };
    CustomDateParserFormatter.prototype.format = function (date) {
        return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
    };
    CustomDateParserFormatter = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], CustomDateParserFormatter);
    return CustomDateParserFormatter;
}(_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_0__["NgbDateParserFormatter"]));

var NgbdDatepickerAdapter = /** @class */ (function () {
    function NgbdDatepickerAdapter(ngbCalendar, dateAdapter) {
        this.ngbCalendar = ngbCalendar;
        this.dateAdapter = dateAdapter;
    }
    Object.defineProperty(NgbdDatepickerAdapter.prototype, "today", {
        get: function () {
            return this.dateAdapter.toModel(this.ngbCalendar.getToday());
        },
        enumerable: false,
        configurable: true
    });
    return NgbdDatepickerAdapter;
}());



/***/ }),

/***/ "tmjD":
/*!*****************************************************************!*\
  !*** ./node_modules/ngx-mask/__ivy_ngcc__/fesm2015/ngx-mask.js ***!
  \*****************************************************************/
/*! exports provided: INITIAL_CONFIG, MaskApplierService, MaskDirective, MaskPipe, MaskService, NEW_CONFIG, NgxMaskModule, _configFactory, config, initialConfig, timeMasks, withoutValidation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INITIAL_CONFIG", function() { return INITIAL_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaskApplierService", function() { return MaskApplierService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaskDirective", function() { return MaskDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaskPipe", function() { return MaskPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaskService", function() { return MaskService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEW_CONFIG", function() { return NEW_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxMaskModule", function() { return NgxMaskModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_configFactory", function() { return _configFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialConfig", function() { return initialConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeMasks", function() { return timeMasks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withoutValidation", function() { return withoutValidation; });
/* harmony import */ var _Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ "o0o1");
/* harmony import */ var _Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/get */ "ReuC");
/* harmony import */ var _Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ "foSv");
/* harmony import */ var _Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "Ji7U");
/* harmony import */ var _Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createSuper */ "LK+K");
/* harmony import */ var _Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray */ "ODXe");
/* harmony import */ var _Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "1OyB");
/* harmony import */ var _Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "vuIU");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ "LpKv");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "ofXK");













var config = new _angular_core__WEBPACK_IMPORTED_MODULE_8__["InjectionToken"]('config');
var NEW_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_8__["InjectionToken"]('NEW_CONFIG');
var INITIAL_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_8__["InjectionToken"]('INITIAL_CONFIG');
var initialConfig = {
  suffix: '',
  prefix: '',
  thousandSeparator: ' ',
  decimalMarker: '.',
  clearIfNotMatch: false,
  showTemplate: false,
  showMaskTyped: false,
  placeHolderCharacter: '_',
  dropSpecialCharacters: true,
  hiddenInput: undefined,
  shownMaskExpression: '',
  separatorLimit: '',
  allowNegativeNumbers: false,
  validation: true,
  // tslint:disable-next-line: quotemark
  specialCharacters: ['-', '/', '(', ')', '.', ':', ' ', '+', ',', '@', '[', ']', '"', "'"],
  leadZeroDateTime: false,
  patterns: {
    '0': {
      pattern: new RegExp('\\d')
    },
    '9': {
      pattern: new RegExp('\\d'),
      optional: true
    },
    X: {
      pattern: new RegExp('\\d'),
      symbol: '*'
    },
    A: {
      pattern: new RegExp('[a-zA-Z0-9]')
    },
    S: {
      pattern: new RegExp('[a-zA-Z]')
    },
    d: {
      pattern: new RegExp('\\d')
    },
    m: {
      pattern: new RegExp('\\d')
    },
    M: {
      pattern: new RegExp('\\d')
    },
    H: {
      pattern: new RegExp('\\d')
    },
    h: {
      pattern: new RegExp('\\d')
    },
    s: {
      pattern: new RegExp('\\d')
    }
  }
};
var timeMasks = ['Hh:m0:s0', 'Hh:m0', 'm0:s0'];
var withoutValidation = ['percent', 'Hh', 's0', 'm0', 'separator', 'd0/M0/0000', 'd0/M0', 'd0', 'M0'];

var MaskApplierService = /*#__PURE__*/function () {
  function MaskApplierService(_config) {
    var _this = this;

    Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_6__["default"])(this, MaskApplierService);

    this._config = _config;
    this.maskExpression = '';
    this.actualValue = '';
    this.shownMaskExpression = '';

    this._formatWithSeparators = function (str, thousandSeparatorChar, decimalChar, precision) {
      var x = str.split(decimalChar);
      var decimals = x.length > 1 ? "".concat(decimalChar).concat(x[1]) : '';
      var res = x[0];

      var separatorLimit = _this.separatorLimit.replace(/\s/g, '');

      if (separatorLimit && +separatorLimit) {
        if (res[0] === '-') {
          res = "-".concat(res.slice(1, res.length).slice(0, separatorLimit.length));
        } else {
          res = res.slice(0, separatorLimit.length);
        }
      }

      var rgx = /(\d+)(\d{3})/;

      while (thousandSeparatorChar && rgx.test(res)) {
        res = res.replace(rgx, '$1' + thousandSeparatorChar + '$2');
      }

      if (precision === undefined) {
        return res + decimals;
      } else if (precision === 0) {
        return res;
      }

      return res + decimals.substr(0, precision + 1);
    };

    this.percentage = function (str) {
      return Number(str) >= 0 && Number(str) <= 100;
    };

    this.getPrecision = function (maskExpression) {
      var x = maskExpression.split('.');

      if (x.length > 1) {
        return Number(x[x.length - 1]);
      }

      return Infinity;
    };

    this.checkAndRemoveSuffix = function (inputValue) {
      var _a, _b, _c;

      for (var i = ((_a = _this.suffix) === null || _a === void 0 ? void 0 : _a.length) - 1; i >= 0; i--) {
        var substr = _this.suffix.substr(i, (_b = _this.suffix) === null || _b === void 0 ? void 0 : _b.length);

        if (inputValue.includes(substr) && (i - 1 < 0 || !inputValue.includes(_this.suffix.substr(i - 1, (_c = _this.suffix) === null || _c === void 0 ? void 0 : _c.length)))) {
          return inputValue.replace(substr, '');
        }
      }

      return inputValue;
    };

    this.checkInputPrecision = function (inputValue, precision, decimalMarker) {
      if (precision < Infinity) {
        var precisionRegEx = new RegExp(_this._charToRegExpExpression(decimalMarker) + "\\d{".concat(precision, "}.*$"));
        var precisionMatch = inputValue.match(precisionRegEx);

        if (precisionMatch && precisionMatch[0].length - 1 > precision) {
          var diff = precisionMatch[0].length - 1 - precision;
          inputValue = inputValue.substring(0, inputValue.length - diff);
        }

        if (precision === 0 && inputValue.endsWith(decimalMarker)) {
          inputValue = inputValue.substring(0, inputValue.length - 1);
        }
      }

      return inputValue;
    };

    this._shift = new Set();
    this.clearIfNotMatch = this._config.clearIfNotMatch;
    this.dropSpecialCharacters = this._config.dropSpecialCharacters;
    this.maskSpecialCharacters = this._config.specialCharacters;
    this.maskAvailablePatterns = this._config.patterns;
    this.prefix = this._config.prefix;
    this.suffix = this._config.suffix;
    this.thousandSeparator = this._config.thousandSeparator;
    this.decimalMarker = this._config.decimalMarker;
    this.hiddenInput = this._config.hiddenInput;
    this.showMaskTyped = this._config.showMaskTyped;
    this.placeHolderCharacter = this._config.placeHolderCharacter;
    this.validation = this._config.validation;
    this.separatorLimit = this._config.separatorLimit;
    this.allowNegativeNumbers = this._config.allowNegativeNumbers;
    this.leadZeroDateTime = this._config.leadZeroDateTime;
  }

  Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__["default"])(MaskApplierService, [{
    key: "applyMaskWithPattern",
    value: function applyMaskWithPattern(inputValue, maskAndPattern) {
      var _maskAndPattern = Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_5__["default"])(maskAndPattern, 2),
          mask = _maskAndPattern[0],
          customPattern = _maskAndPattern[1];

      this.customPattern = customPattern;
      return this.applyMask(inputValue, mask);
    }
  }, {
    key: "applyMask",
    value: function applyMask(inputValue, maskExpression) {
      var _this2 = this;

      var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var justPasted = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var backspaced = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var cb = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {};

      if (inputValue === undefined || inputValue === null || maskExpression === undefined) {
        return '';
      }

      var cursor = 0;
      var result = '';
      var multi = false;
      var backspaceShift = false;
      var shift = 1;
      var stepBack = false;

      if (inputValue.slice(0, this.prefix.length) === this.prefix) {
        inputValue = inputValue.slice(this.prefix.length, inputValue.length);
      }

      if (!!this.suffix && (inputValue === null || inputValue === void 0 ? void 0 : inputValue.length) > 0) {
        inputValue = this.checkAndRemoveSuffix(inputValue);
      }

      var inputArray = inputValue.toString().split('');

      if (maskExpression === 'IP') {
        this.ipError = !!(inputArray.filter(function (i) {
          return i === '.';
        }).length < 3 && inputArray.length < 7);
        maskExpression = '099.099.099.099';
      }

      var arr = [];

      for (var i = 0; i < inputValue.length; i++) {
        if (inputValue[i].match('\\d')) {
          arr.push(inputValue[i]);
        }
      }

      if (maskExpression === 'CPF_CNPJ') {
        this.cpfCnpjError = !!(arr.length !== 11 && arr.length !== 14);

        if (arr.length > 11) {
          maskExpression = '00.000.000/0000-00';
        } else {
          maskExpression = '000.000.000-00';
        }
      }

      if (maskExpression.startsWith('percent')) {
        if (inputValue.match('[a-z]|[A-Z]') || inputValue.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/.]/)) {
          inputValue = this._stripToDecimal(inputValue);
          var precision = this.getPrecision(maskExpression);
          inputValue = this.checkInputPrecision(inputValue, precision, this.decimalMarker);
        }

        if (inputValue.indexOf('.') > 0 && !this.percentage(inputValue.substring(0, inputValue.indexOf('.')))) {
          var base = inputValue.substring(0, inputValue.indexOf('.') - 1);
          inputValue = "".concat(base).concat(inputValue.substring(inputValue.indexOf('.'), inputValue.length));
        }

        if (this.percentage(inputValue)) {
          result = inputValue;
        } else {
          result = inputValue.substring(0, inputValue.length - 1);
        }
      } else if (maskExpression.startsWith('separator')) {
        if (inputValue.match('[wа-яА-Я]') || inputValue.match('[ЁёА-я]') || inputValue.match('[a-z]|[A-Z]') || inputValue.match(/[-@#!$%\\^&*()_£¬'+|~=`{}\[\]:";<>.?\/]/) || inputValue.match('[^A-Za-z0-9,]')) {
          inputValue = this._stripToDecimal(inputValue);
        }

        inputValue = inputValue.length > 1 && inputValue[0] === '0' && inputValue[1] !== this.decimalMarker ? inputValue.slice(1, inputValue.length) : inputValue; // TODO: we had different rexexps here for the different cases... but tests dont seam to bother - check this
        //  separator: no COMMA, dot-sep: no SPACE, COMMA OK, comma-sep: no SPACE, COMMA OK

        var thousandSeperatorCharEscaped = this._charToRegExpExpression(this.thousandSeparator);

        var decimalMarkerEscaped = this._charToRegExpExpression(this.decimalMarker);

        var invalidChars = '@#!$%^&*()_+|~=`{}\\[\\]:\\s,\\.";<>?\\/'.replace(thousandSeperatorCharEscaped, '').replace(decimalMarkerEscaped, '');
        var invalidCharRegexp = new RegExp('[' + invalidChars + ']');

        if (inputValue.match(invalidCharRegexp)) {
          inputValue = inputValue.substring(0, inputValue.length - 1);
        }

        var _precision = this.getPrecision(maskExpression);

        inputValue = this.checkInputPrecision(inputValue, _precision, this.decimalMarker);
        var strForSep = inputValue.replace(new RegExp(thousandSeperatorCharEscaped, 'g'), '');
        result = this._formatWithSeparators(strForSep, this.thousandSeparator, this.decimalMarker, _precision);
        var commaShift = result.indexOf(',') - inputValue.indexOf(',');
        var shiftStep = result.length - inputValue.length;

        if (shiftStep > 0 && result[position] !== ',') {
          backspaceShift = true;
          var _shift = 0;

          do {
            this._shift.add(position + _shift);

            _shift++;
          } while (_shift < shiftStep);
        } else if (commaShift !== 0 && position > 0 && !(result.indexOf(',') >= position && position > 3) || !(result.indexOf('.') >= position && position > 3) && shiftStep <= 0) {
          this._shift.clear();

          backspaceShift = true;
          shift = shiftStep;
          position += shiftStep;

          this._shift.add(position);
        } else {
          this._shift.clear();
        }
      } else {
        for ( // tslint:disable-next-line
        var _i = 0, inputSymbol = inputArray[0]; _i < inputArray.length; _i++, inputSymbol = inputArray[_i]) {
          if (cursor === maskExpression.length) {
            break;
          }

          if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) && maskExpression[cursor + 1] === '?') {
            result += inputSymbol;
            cursor += 2;
          } else if (maskExpression[cursor + 1] === '*' && multi && this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
            result += inputSymbol;
            cursor += 3;
            multi = false;
          } else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) && maskExpression[cursor + 1] === '*') {
            result += inputSymbol;
            multi = true;
          } else if (maskExpression[cursor + 1] === '?' && this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
            result += inputSymbol;
            cursor += 3;
          } else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor])) {
            if (maskExpression[cursor] === 'H') {
              if (Number(inputSymbol) > 2) {
                cursor += 1;

                this._shiftStep(maskExpression, cursor, inputArray.length);

                _i--;

                if (this.leadZeroDateTime) {
                  result += '0';
                }

                continue;
              }
            }

            if (maskExpression[cursor] === 'h') {
              if (result === '2' && Number(inputSymbol) > 3) {
                cursor += 1;
                _i--;
                continue;
              }
            }

            if (maskExpression[cursor] === 'm') {
              if (Number(inputSymbol) > 5) {
                cursor += 1;

                this._shiftStep(maskExpression, cursor, inputArray.length);

                _i--;

                if (this.leadZeroDateTime) {
                  result += '0';
                }

                continue;
              }
            }

            if (maskExpression[cursor] === 's') {
              if (Number(inputSymbol) > 5) {
                cursor += 1;

                this._shiftStep(maskExpression, cursor, inputArray.length);

                _i--;

                if (this.leadZeroDateTime) {
                  result += '0';
                }

                continue;
              }
            }

            var daysCount = 31;

            if (maskExpression[cursor] === 'd') {
              if (Number(inputSymbol) > 3 && this.leadZeroDateTime || Number(inputValue.slice(cursor, cursor + 2)) > daysCount || inputValue[cursor + 1] === '/') {
                cursor += 1;

                this._shiftStep(maskExpression, cursor, inputArray.length);

                _i--;

                if (this.leadZeroDateTime) {
                  result += '0';
                }

                continue;
              }
            }

            if (maskExpression[cursor] === 'M') {
              var monthsCount = 12; // mask without day

              var withoutDays = cursor === 0 && (Number(inputSymbol) > 2 || Number(inputValue.slice(cursor, cursor + 2)) > monthsCount || inputValue[cursor + 1] === '/'); // day<10 && month<12 for input

              var day1monthInput = inputValue.slice(cursor - 3, cursor - 1).includes('/') && (inputValue[cursor - 2] === '/' && Number(inputValue.slice(cursor - 1, cursor + 1)) > monthsCount && inputValue[cursor] !== '/' || inputValue[cursor] === '/' || inputValue[cursor - 3] === '/' && Number(inputValue.slice(cursor - 2, cursor)) > monthsCount && inputValue[cursor - 1] !== '/' || inputValue[cursor - 1] === '/'); // 10<day<31 && month<12 for input

              var day2monthInput = Number(inputValue.slice(cursor - 3, cursor - 1)) <= daysCount && !inputValue.slice(cursor - 3, cursor - 1).includes('/') && inputValue[cursor - 1] === '/' && (Number(inputValue.slice(cursor, cursor + 2)) > monthsCount || inputValue[cursor + 1] === '/'); // day<10 && month<12 for paste whole data

              var day1monthPaste = Number(inputValue.slice(cursor - 3, cursor - 1)) > daysCount && !inputValue.slice(cursor - 3, cursor - 1).includes('/') && !inputValue.slice(cursor - 2, cursor).includes('/') && Number(inputValue.slice(cursor - 2, cursor)) > monthsCount; // 10<day<31 && month<12 for paste whole data

              var day2monthPaste = Number(inputValue.slice(cursor - 3, cursor - 1)) <= daysCount && !inputValue.slice(cursor - 3, cursor - 1).includes('/') && inputValue[cursor - 1] !== '/' && Number(inputValue.slice(cursor - 1, cursor + 1)) > monthsCount;

              if (Number(inputSymbol) > 1 && this.leadZeroDateTime || withoutDays || day1monthInput || day2monthInput || day1monthPaste || day2monthPaste) {
                cursor += 1;

                this._shiftStep(maskExpression, cursor, inputArray.length);

                _i--;

                if (this.leadZeroDateTime) {
                  result += '0';
                }

                continue;
              }
            }

            result += inputSymbol;
            cursor++;
          } else if (this.maskSpecialCharacters.indexOf(maskExpression[cursor]) !== -1) {
            result += maskExpression[cursor];
            cursor++;

            this._shiftStep(maskExpression, cursor, inputArray.length);

            _i--;
          } else if (this.maskSpecialCharacters.indexOf(inputSymbol) > -1 && this.maskAvailablePatterns[maskExpression[cursor]] && this.maskAvailablePatterns[maskExpression[cursor]].optional) {
            if (!!inputArray[cursor] && maskExpression !== '099.099.099.099' && maskExpression !== '000.000.000-00' && maskExpression !== '00.000.000/0000-00') {
              result += inputArray[cursor];
            }

            cursor++;
            _i--;
          } else if (this.maskExpression[cursor + 1] === '*' && this._findSpecialChar(this.maskExpression[cursor + 2]) && this._findSpecialChar(inputSymbol) === this.maskExpression[cursor + 2] && multi) {
            cursor += 3;
            result += inputSymbol;
          } else if (this.maskExpression[cursor + 1] === '?' && this._findSpecialChar(this.maskExpression[cursor + 2]) && this._findSpecialChar(inputSymbol) === this.maskExpression[cursor + 2] && multi) {
            cursor += 3;
            result += inputSymbol;
          } else if (this.showMaskTyped && this.maskSpecialCharacters.indexOf(inputSymbol) < 0 && inputSymbol !== this.placeHolderCharacter) {
            stepBack = true;
          }
        }
      }

      if (result.length + 1 === maskExpression.length && this.maskSpecialCharacters.indexOf(maskExpression[maskExpression.length - 1]) !== -1) {
        result += maskExpression[maskExpression.length - 1];
      }

      var newPosition = position + 1;

      while (this._shift.has(newPosition)) {
        shift++;
        newPosition++;
      }

      var actualShift = justPasted ? cursor : this._shift.has(position) ? shift : 0;

      if (stepBack) {
        actualShift--;
      }

      cb(actualShift, backspaceShift);

      if (shift < 0) {
        this._shift.clear();
      }

      var onlySpecial = false;

      if (backspaced) {
        onlySpecial = inputArray.every(function (char) {
          return _this2.maskSpecialCharacters.includes(char);
        });
      }

      var res = "".concat(this.prefix).concat(onlySpecial ? '' : result).concat(this.suffix);

      if (result.length === 0) {
        res = "".concat(this.prefix).concat(result);
      }

      return res;
    }
  }, {
    key: "_findSpecialChar",
    value: function _findSpecialChar(inputSymbol) {
      return this.maskSpecialCharacters.find(function (val) {
        return val === inputSymbol;
      });
    }
  }, {
    key: "_checkSymbolMask",
    value: function _checkSymbolMask(inputSymbol, maskSymbol) {
      this.maskAvailablePatterns = this.customPattern ? this.customPattern : this.maskAvailablePatterns;
      return this.maskAvailablePatterns[maskSymbol] && this.maskAvailablePatterns[maskSymbol].pattern && this.maskAvailablePatterns[maskSymbol].pattern.test(inputSymbol);
    }
  }, {
    key: "_stripToDecimal",
    value: function _stripToDecimal(str) {
      var _this3 = this;

      return str.split('').filter(function (i, idx) {
        return i.match('^-?\\d') || i.match('\\s') || i === '.' || i === ',' || i === '-' && idx === 0 && _this3.allowNegativeNumbers;
      }).join('');
    }
  }, {
    key: "_charToRegExpExpression",
    value: function _charToRegExpExpression(char) {
      if (char) {
        var charsToEscape = '[\\^$.|?*+()';
        return char === ' ' ? '\\s' : charsToEscape.indexOf(char) >= 0 ? '\\' + char : char;
      }

      return char;
    }
  }, {
    key: "_shiftStep",
    value: function _shiftStep(maskExpression, cursor, inputLength) {
      var shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputLength : cursor;

      this._shift.add(shiftStep + this.prefix.length || 0);
    }
  }]);

  return MaskApplierService;
}();

MaskApplierService.ɵfac = function MaskApplierService_Factory(t) {
  return new (t || MaskApplierService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](config));
};

MaskApplierService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
  token: MaskApplierService,
  factory: MaskApplierService.ɵfac
});

MaskApplierService.ctorParameters = function () {
  return [{
    type: undefined,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Inject"],
      args: [config]
    }]
  }];
};
/*@__PURE__*/


(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵsetClassMetadata"](MaskApplierService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Injectable"]
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Inject"],
        args: [config]
      }]
    }];
  }, null);
})();

var MaskService = /*#__PURE__*/function (_MaskApplierService) {
  Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(MaskService, _MaskApplierService);

  var _super = Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_4__["default"])(MaskService);

  function MaskService(document, _config, _elementRef, _renderer) {
    var _this4;

    Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_6__["default"])(this, MaskService);

    _this4 = _super.call(this, _config);
    _this4.document = document;
    _this4._config = _config;
    _this4._elementRef = _elementRef;
    _this4._renderer = _renderer;
    _this4.maskExpression = '';
    _this4.isNumberValue = false;
    _this4.placeHolderCharacter = '_';
    _this4.maskIsShown = '';
    _this4.selStart = null;
    _this4.selEnd = null;
    /**
     * Whether we are currently in writeValue function, in this case when applying the mask we don't want to trigger onChange function,
     * since writeValue should be a one way only process of writing the DOM value based on the Angular model value.
     */

    _this4.writingValue = false;

    _this4.onChange = function (_) {};

    return _this4;
  } // tslint:disable-next-line:cyclomatic-complexity


  Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__["default"])(MaskService, [{
    key: "applyMask",
    value: function applyMask(inputValue, maskExpression) {
      var _this5 = this;

      var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var justPasted = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var backspaced = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var cb = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {};

      if (!maskExpression) {
        return inputValue;
      }

      this.maskIsShown = this.showMaskTyped ? this.showMaskInInput() : '';

      if (this.maskExpression === 'IP' && this.showMaskTyped) {
        this.maskIsShown = this.showMaskInInput(inputValue || '#');
      }

      if (this.maskExpression === 'CPF_CNPJ' && this.showMaskTyped) {
        this.maskIsShown = this.showMaskInInput(inputValue || '#');
      }

      if (!inputValue && this.showMaskTyped) {
        this.formControlResult(this.prefix);
        return this.prefix + this.maskIsShown;
      }

      var getSymbol = !!inputValue && typeof this.selStart === 'number' ? inputValue[this.selStart] : '';
      var newInputValue = '';

      if (this.hiddenInput && !this.writingValue) {
        var actualResult = this.actualValue.split(''); // tslint:disable no-unused-expression

        inputValue !== '' && actualResult.length ? typeof this.selStart === 'number' && typeof this.selEnd === 'number' ? inputValue.length > actualResult.length ? actualResult.splice(this.selStart, 0, getSymbol) : inputValue.length < actualResult.length ? actualResult.length - inputValue.length === 1 ? actualResult.splice(this.selStart - 1, 1) : actualResult.splice(this.selStart, this.selEnd - this.selStart) : null : null : actualResult = []; // tslint:enable no-unused-expression

        newInputValue = this.actualValue.length && actualResult.length <= inputValue.length ? this.shiftTypedSymbols(actualResult.join('')) : inputValue;
      }

      newInputValue = Boolean(newInputValue) && newInputValue.length ? newInputValue : inputValue;

      var result = Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_get__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__["default"])(MaskService.prototype), "applyMask", this).call(this, newInputValue, maskExpression, position, justPasted, backspaced, cb);

      this.actualValue = this.getActualValue(result); // handle some separator implications:
      // a.) adjust decimalMarker default (. -> ,) if thousandSeparator is a dot

      if (this.thousandSeparator === '.' && this.decimalMarker === '.') {
        this.decimalMarker = ',';
      } // b) remove decimal marker from list of special characters to mask


      if (this.maskExpression.startsWith('separator') && this.dropSpecialCharacters === true) {
        this.maskSpecialCharacters = this.maskSpecialCharacters.filter(function (item) {
          return item !== _this5.decimalMarker;
        });
      }

      this.formControlResult(result);

      if (!this.showMaskTyped) {
        if (this.hiddenInput) {
          return result && result.length ? this.hideInput(result, this.maskExpression) : result;
        }

        return result;
      }

      var resLen = result.length;
      var prefNmask = this.prefix + this.maskIsShown;

      if (this.maskExpression.includes('H')) {
        var countSkipedSymbol = this._numberSkipedSymbols(result);

        return result + prefNmask.slice(resLen + countSkipedSymbol);
      } else if (this.maskExpression === 'IP' || this.maskExpression === 'CPF_CNPJ') {
        return result + prefNmask;
      }

      return result + prefNmask.slice(resLen);
    } // get the number of characters that were shifted

  }, {
    key: "_numberSkipedSymbols",
    value: function _numberSkipedSymbols(value) {
      var regex = /(^|\D)(\d\D)/g;
      var match = regex.exec(value);
      var countSkipedSymbol = 0;

      while (match != null) {
        countSkipedSymbol += 1;
        match = regex.exec(value);
      }

      return countSkipedSymbol;
    }
  }, {
    key: "applyValueChanges",
    value: function applyValueChanges() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var justPasted = arguments.length > 1 ? arguments[1] : undefined;
      var backspaced = arguments.length > 2 ? arguments[2] : undefined;
      var cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
      var formElement = this._elementRef.nativeElement;
      formElement.value = this.applyMask(formElement.value, this.maskExpression, position, justPasted, backspaced, cb);

      if (formElement === this.document.activeElement) {
        return;
      }

      this.clearIfNotMatchFn();
    }
  }, {
    key: "hideInput",
    value: function hideInput(inputValue, maskExpression) {
      var _this6 = this;

      return inputValue.split('').map(function (curr, index) {
        if (_this6.maskAvailablePatterns && _this6.maskAvailablePatterns[maskExpression[index]] && _this6.maskAvailablePatterns[maskExpression[index]].symbol) {
          return _this6.maskAvailablePatterns[maskExpression[index]].symbol;
        }

        return curr;
      }).join('');
    } // this function is not necessary, it checks result against maskExpression

  }, {
    key: "getActualValue",
    value: function getActualValue(res) {
      var _this7 = this;

      var compare = res.split('').filter(function (symbol, i) {
        return _this7._checkSymbolMask(symbol, _this7.maskExpression[i]) || _this7.maskSpecialCharacters.includes(_this7.maskExpression[i]) && symbol === _this7.maskExpression[i];
      });

      if (compare.join('') === res) {
        return compare.join('');
      }

      return res;
    }
  }, {
    key: "shiftTypedSymbols",
    value: function shiftTypedSymbols(inputValue) {
      var _this8 = this;

      var symbolToReplace = '';
      var newInputValue = inputValue && inputValue.split('').map(function (currSymbol, index) {
        if (_this8.maskSpecialCharacters.includes(inputValue[index + 1]) && inputValue[index + 1] !== _this8.maskExpression[index + 1]) {
          symbolToReplace = currSymbol;
          return inputValue[index + 1];
        }

        if (symbolToReplace.length) {
          var replaceSymbol = symbolToReplace;
          symbolToReplace = '';
          return replaceSymbol;
        }

        return currSymbol;
      }) || [];
      return newInputValue.join('');
    }
  }, {
    key: "showMaskInInput",
    value: function showMaskInInput(inputVal) {
      if (this.showMaskTyped && !!this.shownMaskExpression) {
        if (this.maskExpression.length !== this.shownMaskExpression.length) {
          throw new Error('Mask expression must match mask placeholder length');
        } else {
          return this.shownMaskExpression;
        }
      } else if (this.showMaskTyped) {
        if (inputVal) {
          if (this.maskExpression === 'IP') {
            return this._checkForIp(inputVal);
          }

          if (this.maskExpression === 'CPF_CNPJ') {
            return this._checkForCpfCnpj(inputVal);
          }
        }

        return this.maskExpression.replace(/\w/g, this.placeHolderCharacter);
      }

      return '';
    }
  }, {
    key: "clearIfNotMatchFn",
    value: function clearIfNotMatchFn() {
      var formElement = this._elementRef.nativeElement;

      if (this.clearIfNotMatch && this.prefix.length + this.maskExpression.length + this.suffix.length !== formElement.value.replace(/_/g, '').length) {
        this.formElementProperty = ['value', ''];
        this.applyMask(formElement.value, this.maskExpression);
      }
    }
  }, {
    key: "formElementProperty",
    set: function set(_ref) {
      var _this9 = this;

      var _ref2 = Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_5__["default"])(_ref, 2),
          name = _ref2[0],
          value = _ref2[1];

      Promise.resolve().then(function () {
        return _this9._renderer.setProperty(_this9._elementRef.nativeElement, name, value);
      });
    }
  }, {
    key: "checkSpecialCharAmount",
    value: function checkSpecialCharAmount(mask) {
      var _this10 = this;

      var chars = mask.split('').filter(function (item) {
        return _this10._findSpecialChar(item);
      });
      return chars.length;
    }
  }, {
    key: "removeMask",
    value: function removeMask(inputValue) {
      return this._removeMask(this._removeSuffix(this._removePrefix(inputValue)), this.maskSpecialCharacters.concat('_').concat(this.placeHolderCharacter));
    }
  }, {
    key: "_checkForIp",
    value: function _checkForIp(inputVal) {
      if (inputVal === '#') {
        return "".concat(this.placeHolderCharacter, ".").concat(this.placeHolderCharacter, ".").concat(this.placeHolderCharacter, ".").concat(this.placeHolderCharacter);
      }

      var arr = [];

      for (var i = 0; i < inputVal.length; i++) {
        if (inputVal[i].match('\\d')) {
          arr.push(inputVal[i]);
        }
      }

      if (arr.length <= 3) {
        return "".concat(this.placeHolderCharacter, ".").concat(this.placeHolderCharacter, ".").concat(this.placeHolderCharacter);
      }

      if (arr.length > 3 && arr.length <= 6) {
        return "".concat(this.placeHolderCharacter, ".").concat(this.placeHolderCharacter);
      }

      if (arr.length > 6 && arr.length <= 9) {
        return this.placeHolderCharacter;
      }

      if (arr.length > 9 && arr.length <= 12) {
        return '';
      }

      return '';
    }
  }, {
    key: "_checkForCpfCnpj",
    value: function _checkForCpfCnpj(inputVal) {
      var cpf = "".concat(this.placeHolderCharacter).concat(this.placeHolderCharacter).concat(this.placeHolderCharacter) + ".".concat(this.placeHolderCharacter).concat(this.placeHolderCharacter).concat(this.placeHolderCharacter) + ".".concat(this.placeHolderCharacter).concat(this.placeHolderCharacter).concat(this.placeHolderCharacter) + "-".concat(this.placeHolderCharacter).concat(this.placeHolderCharacter);
      var cnpj = "".concat(this.placeHolderCharacter).concat(this.placeHolderCharacter) + ".".concat(this.placeHolderCharacter).concat(this.placeHolderCharacter).concat(this.placeHolderCharacter) + ".".concat(this.placeHolderCharacter).concat(this.placeHolderCharacter).concat(this.placeHolderCharacter) + "/".concat(this.placeHolderCharacter).concat(this.placeHolderCharacter).concat(this.placeHolderCharacter).concat(this.placeHolderCharacter) + "-".concat(this.placeHolderCharacter).concat(this.placeHolderCharacter);

      if (inputVal === '#') {
        return cpf;
      }

      var arr = [];

      for (var i = 0; i < inputVal.length; i++) {
        if (inputVal[i].match('\\d')) {
          arr.push(inputVal[i]);
        }
      }

      if (arr.length <= 3) {
        return cpf.slice(arr.length, cpf.length);
      }

      if (arr.length > 3 && arr.length <= 6) {
        return cpf.slice(arr.length + 1, cpf.length);
      }

      if (arr.length > 6 && arr.length <= 9) {
        return cpf.slice(arr.length + 2, cpf.length);
      }

      if (arr.length > 9 && arr.length < 11) {
        return cpf.slice(arr.length + 3, cpf.length);
      }

      if (arr.length === 11) {
        return '';
      }

      if (arr.length === 12) {
        if (inputVal.length === 17) {
          return cnpj.slice(16, cnpj.length);
        }

        return cnpj.slice(15, cnpj.length);
      }

      if (arr.length > 12 && arr.length <= 14) {
        return cnpj.slice(arr.length + 4, cnpj.length);
      }

      return '';
    }
    /**
     * Propogates the input value back to the Angular model by triggering the onChange function. It won't do this if writingValue
     * is true. If that is true it means we are currently in the writeValue function, which is supposed to only update the actual
     * DOM element based on the Angular model value. It should be a one way process, i.e. writeValue should not be modifying the Angular
     * model value too. Therefore, we don't trigger onChange in this scenario.
     * @param inputValue the current form input value
     */

  }, {
    key: "formControlResult",
    value: function formControlResult(inputValue) {
      if (this.writingValue) {
        return;
      }

      if (Array.isArray(this.dropSpecialCharacters)) {
        this.onChange(this._toNumber(this._removeMask(this._removeSuffix(this._removePrefix(inputValue)), this.dropSpecialCharacters)));
      } else if (this.dropSpecialCharacters) {
        this.onChange(this._toNumber(this._checkSymbols(inputValue)));
      } else {
        this.onChange(this._removeSuffix(inputValue));
      }
    }
  }, {
    key: "_toNumber",
    value: function _toNumber(value) {
      if (!this.isNumberValue || value === '') {
        return value;
      }

      var num = Number(value);
      return Number.isNaN(num) ? value : num;
    }
  }, {
    key: "_removeMask",
    value: function _removeMask(value, specialCharactersForRemove) {
      return value ? value.replace(this._regExpForRemove(specialCharactersForRemove), '') : value;
    }
  }, {
    key: "_removePrefix",
    value: function _removePrefix(value) {
      if (!this.prefix) {
        return value;
      }

      return value ? value.replace(this.prefix, '') : value;
    }
  }, {
    key: "_removeSuffix",
    value: function _removeSuffix(value) {
      if (!this.suffix) {
        return value;
      }

      return value ? value.replace(this.suffix, '') : value;
    }
  }, {
    key: "_retrieveSeparatorValue",
    value: function _retrieveSeparatorValue(result) {
      return this._removeMask(this._removeSuffix(this._removePrefix(result)), this.maskSpecialCharacters);
    }
  }, {
    key: "_regExpForRemove",
    value: function _regExpForRemove(specialCharactersForRemove) {
      return new RegExp(specialCharactersForRemove.map(function (item) {
        return "\\".concat(item);
      }).join('|'), 'gi');
    }
  }, {
    key: "_checkSymbols",
    value: function _checkSymbols(result) {
      if (result === '') {
        return result;
      }

      var separatorPrecision = this._retrieveSeparatorPrecision(this.maskExpression);

      var separatorValue = this._retrieveSeparatorValue(result);

      if (this.decimalMarker !== '.') {
        separatorValue = separatorValue.replace(this.decimalMarker, '.');
      }

      if (!this.isNumberValue) {
        return separatorValue;
      }

      if (separatorPrecision) {
        if (result === this.decimalMarker) {
          return null;
        }

        return this._checkPrecision(this.maskExpression, separatorValue);
      } else {
        return Number(separatorValue);
      }
    } // TODO should think about helpers or separting decimal precision to own property

  }, {
    key: "_retrieveSeparatorPrecision",
    value: function _retrieveSeparatorPrecision(maskExpretion) {
      var matcher = maskExpretion.match(new RegExp("^separator\\.([^d]*)"));
      return matcher ? Number(matcher[1]) : null;
    }
  }, {
    key: "_checkPrecision",
    value: function _checkPrecision(separatorExpression, separatorValue) {
      if (separatorExpression.indexOf('2') > 0) {
        return Number(separatorValue).toFixed(2);
      }

      return Number(separatorValue);
    }
  }]);

  return MaskService;
}(MaskApplierService);

MaskService.ɵfac = function MaskService_Factory(t) {
  return new (t || MaskService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_11__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](config), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["Renderer2"]));
};

MaskService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
  token: MaskService,
  factory: MaskService.ɵfac
});

MaskService.ctorParameters = function () {
  return [{
    type: undefined,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Inject"],
      args: [_angular_common__WEBPACK_IMPORTED_MODULE_11__["DOCUMENT"]]
    }]
  }, {
    type: undefined,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Inject"],
      args: [config]
    }]
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["ElementRef"]
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Renderer2"]
  }];
};
/*@__PURE__*/


(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵsetClassMetadata"](MaskService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Injectable"]
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Inject"],
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_11__["DOCUMENT"]]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Inject"],
        args: [config]
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["ElementRef"]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Renderer2"]
    }];
  }, null);
})(); // tslint:disable deprecation
// tslint:disable no-input-rename


var MaskDirective = /*#__PURE__*/function () {
  function MaskDirective(document, _maskService, _config) {
    Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_6__["default"])(this, MaskDirective);

    this.document = document;
    this._maskService = _maskService;
    this._config = _config;
    this.maskExpression = '';
    this.specialCharacters = [];
    this.patterns = {};
    this.prefix = '';
    this.suffix = '';
    this.thousandSeparator = ' ';
    this.decimalMarker = '.';
    this.dropSpecialCharacters = null;
    this.hiddenInput = null;
    this.showMaskTyped = null;
    this.placeHolderCharacter = null;
    this.shownMaskExpression = null;
    this.showTemplate = null;
    this.clearIfNotMatch = null;
    this.validation = null;
    this.separatorLimit = null;
    this.allowNegativeNumbers = null;
    this.leadZeroDateTime = null;
    this._maskValue = '';
    this._position = null;
    this._maskExpressionArray = [];
    this._justPasted = false;

    this.onChange = function (_) {};

    this.onTouch = function () {};
  }

  Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__["default"])(MaskDirective, [{
    key: "ngOnChanges",
    value: function ngOnChanges(changes) {
      var maskExpression = changes.maskExpression,
          specialCharacters = changes.specialCharacters,
          patterns = changes.patterns,
          prefix = changes.prefix,
          suffix = changes.suffix,
          thousandSeparator = changes.thousandSeparator,
          decimalMarker = changes.decimalMarker,
          dropSpecialCharacters = changes.dropSpecialCharacters,
          hiddenInput = changes.hiddenInput,
          showMaskTyped = changes.showMaskTyped,
          placeHolderCharacter = changes.placeHolderCharacter,
          shownMaskExpression = changes.shownMaskExpression,
          showTemplate = changes.showTemplate,
          clearIfNotMatch = changes.clearIfNotMatch,
          validation = changes.validation,
          separatorLimit = changes.separatorLimit,
          allowNegativeNumbers = changes.allowNegativeNumbers,
          leadZeroDateTime = changes.leadZeroDateTime;

      if (maskExpression) {
        this._maskValue = maskExpression.currentValue || '';

        if (maskExpression.currentValue && maskExpression.currentValue.split('||').length > 1) {
          this._maskExpressionArray = maskExpression.currentValue.split('||').sort(function (a, b) {
            return a.length - b.length;
          });
          this._maskValue = this._maskExpressionArray[0];
          this.maskExpression = this._maskExpressionArray[0];
          this._maskService.maskExpression = this._maskExpressionArray[0];
        }
      }

      if (specialCharacters) {
        if (!specialCharacters.currentValue || !Array.isArray(specialCharacters.currentValue)) {
          return;
        } else {
          this._maskService.maskSpecialCharacters = specialCharacters.currentValue || [];
        }
      } // Only overwrite the mask available patterns if a pattern has actually been passed in


      if (patterns && patterns.currentValue) {
        this._maskService.maskAvailablePatterns = patterns.currentValue;
      }

      if (prefix) {
        this._maskService.prefix = prefix.currentValue;
      }

      if (suffix) {
        this._maskService.suffix = suffix.currentValue;
      }

      if (thousandSeparator) {
        this._maskService.thousandSeparator = thousandSeparator.currentValue;
      }

      if (decimalMarker) {
        this._maskService.decimalMarker = decimalMarker.currentValue;
      }

      if (dropSpecialCharacters) {
        this._maskService.dropSpecialCharacters = dropSpecialCharacters.currentValue;
      }

      if (hiddenInput) {
        this._maskService.hiddenInput = hiddenInput.currentValue;
      }

      if (showMaskTyped) {
        this._maskService.showMaskTyped = showMaskTyped.currentValue;
      }

      if (placeHolderCharacter) {
        this._maskService.placeHolderCharacter = placeHolderCharacter.currentValue;
      }

      if (shownMaskExpression) {
        this._maskService.shownMaskExpression = shownMaskExpression.currentValue;
      }

      if (showTemplate) {
        this._maskService.showTemplate = showTemplate.currentValue;
      }

      if (clearIfNotMatch) {
        this._maskService.clearIfNotMatch = clearIfNotMatch.currentValue;
      }

      if (validation) {
        this._maskService.validation = validation.currentValue;
      }

      if (separatorLimit) {
        this._maskService.separatorLimit = separatorLimit.currentValue;
      }

      if (allowNegativeNumbers) {
        this._maskService.allowNegativeNumbers = allowNegativeNumbers.currentValue;

        if (this._maskService.allowNegativeNumbers) {
          this._maskService.maskSpecialCharacters = this._maskService.maskSpecialCharacters.filter(function (c) {
            return c !== '-';
          });
        }
      }

      if (leadZeroDateTime) {
        this._maskService.leadZeroDateTime = leadZeroDateTime.currentValue;
      }

      this._applyMask();
    } // tslint:disable-next-line: cyclomatic-complexity

  }, {
    key: "validate",
    value: function validate(_ref3) {
      var _this11 = this;

      var value = _ref3.value;

      if (!this._maskService.validation || !this._maskValue) {
        return null;
      }

      if (this._maskService.ipError) {
        return this._createValidationError(value);
      }

      if (this._maskService.cpfCnpjError) {
        return this._createValidationError(value);
      }

      if (this._maskValue.startsWith('separator')) {
        return null;
      }

      if (withoutValidation.includes(this._maskValue)) {
        return null;
      }

      if (this._maskService.clearIfNotMatch) {
        return null;
      }

      if (timeMasks.includes(this._maskValue)) {
        return this._validateTime(value);
      }

      if (value && value.toString().length >= 1) {
        var counterOfOpt = 0;

        var _loop = function _loop(key) {
          if (_this11._maskService.maskAvailablePatterns[key].optional && _this11._maskService.maskAvailablePatterns[key].optional === true) {
            if (_this11._maskValue.indexOf(key) !== _this11._maskValue.lastIndexOf(key)) {
              var opt = _this11._maskValue.split('').filter(function (i) {
                return i === key;
              }).join('');

              counterOfOpt += opt.length;
            } else if (_this11._maskValue.indexOf(key) !== -1) {
              counterOfOpt++;
            }

            if (_this11._maskValue.indexOf(key) !== -1 && value.toString().length >= _this11._maskValue.indexOf(key)) {
              return {
                v: null
              };
            }

            if (counterOfOpt === _this11._maskValue.length) {
              return {
                v: null
              };
            }
          }
        };

        for (var key in this._maskService.maskAvailablePatterns) {
          var _ret = _loop(key);

          if (typeof _ret === "object") return _ret.v;
        }

        if (this._maskValue.indexOf('{') === 1 && value.toString().length === this._maskValue.length + Number(this._maskValue.split('{')[1].split('}')[0]) - 4) {
          return null;
        }

        if (this._maskValue.indexOf('*') === 1 || this._maskValue.indexOf('?') === 1) {
          return null;
        } else if (this._maskValue.indexOf('*') > 1 && value.toString().length < this._maskValue.indexOf('*') || this._maskValue.indexOf('?') > 1 && value.toString().length < this._maskValue.indexOf('?') || this._maskValue.indexOf('{') === 1) {
          return this._createValidationError(value);
        }

        if (this._maskValue.indexOf('*') === -1 || this._maskValue.indexOf('?') === -1) {
          var length = this._maskService.dropSpecialCharacters ? this._maskValue.length - this._maskService.checkSpecialCharAmount(this._maskValue) - counterOfOpt : this._maskValue.length - counterOfOpt;

          if (value.toString().length < length) {
            return this._createValidationError(value);
          }
        }
      }

      return null;
    }
  }, {
    key: "onPaste",
    value: function onPaste() {
      this._justPasted = true;
    }
  }, {
    key: "onInput",
    value: function onInput(e) {
      var _this12 = this;

      var el = e.target;
      this._inputValue = el.value;

      this._setMask();

      if (!this._maskValue) {
        this.onChange(el.value);
        return;
      }

      var position = el.selectionStart === 1 ? el.selectionStart + this._maskService.prefix.length : el.selectionStart;
      var caretShift = 0;
      var backspaceShift = false;

      this._maskService.applyValueChanges(position, this._justPasted, this._code === 'Backspace', function (shift, _backspaceShift) {
        _this12._justPasted = false;
        caretShift = shift;
        backspaceShift = _backspaceShift;
      }); // only set the selection if the element is active


      if (this.document.activeElement !== el) {
        return;
      }

      this._position = this._position === 1 && this._inputValue.length === 1 ? null : this._position;
      var positionToApply = this._position ? this._inputValue.length + position + caretShift : position + (this._code === 'Backspace' && !backspaceShift ? 0 : caretShift);

      if (positionToApply > this._getActualInputLength()) {
        positionToApply = this._getActualInputLength();
      }

      el.setSelectionRange(positionToApply, positionToApply);
      this._position = null;
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      if (this._maskValue) {
        this._maskService.clearIfNotMatchFn();
      }

      this.onTouch();
    }
  }, {
    key: "onFocus",
    value: function onFocus(e) {
      if (!this._maskValue) {
        return;
      }

      var el = e.target;
      var posStart = 0;
      var posEnd = 0;

      if (el !== null && el.selectionStart !== null && el.selectionStart === el.selectionEnd && el.selectionStart > this._maskService.prefix.length && // tslint:disable-next-line
      e.keyCode !== 38) {
        if (this._maskService.showMaskTyped) {
          // We are showing the mask in the input
          this._maskService.maskIsShown = this._maskService.showMaskInInput();

          if (el.setSelectionRange && this._maskService.prefix + this._maskService.maskIsShown === el.value) {
            // the input ONLY contains the mask, so position the cursor at the start
            el.focus();
            el.setSelectionRange(posStart, posEnd);
          } else {
            // the input contains some characters already
            if (el.selectionStart > this._maskService.actualValue.length) {
              // if the user clicked beyond our value's length, position the cursor at the end of our value
              el.setSelectionRange(this._maskService.actualValue.length, this._maskService.actualValue.length);
            }
          }
        }
      }

      var nextValue = !el.value || el.value === this._maskService.prefix ? this._maskService.prefix + this._maskService.maskIsShown : el.value;
      /** Fix of cursor position jumping to end in most browsers no matter where cursor is inserted onFocus */

      if (el.value !== nextValue) {
        el.value = nextValue;
      }
      /** fix of cursor position with prefix when mouse click occur */


      if ((el.selectionStart || el.selectionEnd) <= this._maskService.prefix.length) {
        el.selectionStart = this._maskService.prefix.length;
        return;
      }
      /** select only inserted text */


      if (el.selectionEnd > this._getActualInputLength()) {
        el.selectionEnd = this._getActualInputLength();
      }
    } // tslint:disable-next-line: cyclomatic-complexity

  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      var _a;

      if (!this._maskValue) {
        return;
      }

      this._code = e.code ? e.code : e.key;
      var el = e.target;
      this._inputValue = el.value;

      this._setMask();

      if (e.keyCode === 38) {
        e.preventDefault();
      }

      if (e.keyCode === 37 || e.keyCode === 8 || e.keyCode === 46) {
        if (e.keyCode === 8 && el.value.length === 0) {
          el.selectionStart = el.selectionEnd;
        }

        if (e.keyCode === 8 && el.selectionStart !== 0) {
          // If specialChars is false, (shouldn't ever happen) then set to the defaults
          this.specialCharacters = ((_a = this.specialCharacters) === null || _a === void 0 ? void 0 : _a.length) ? this.specialCharacters : this._config.specialCharacters;

          if (this.prefix.length > 1 && el.selectionStart <= this.prefix.length) {
            el.setSelectionRange(this.prefix.length, this.prefix.length);
          } else {
            if (this._inputValue.length !== el.selectionStart && el.selectionStart !== 1) {
              while (this.specialCharacters.includes(this._inputValue[el.selectionStart - 1].toString()) && (this.prefix.length >= 1 && el.selectionStart > this.prefix.length || this.prefix.length === 0)) {
                el.setSelectionRange(el.selectionStart - 1, el.selectionStart - 1);
              }
            }

            this.suffixCheckOnPressDelete(e.keyCode, el);
          }
        }

        this.suffixCheckOnPressDelete(e.keyCode, el);

        if (this._maskService.prefix.length && el.selectionStart <= this._maskService.prefix.length && el.selectionEnd <= this._maskService.prefix.length) {
          e.preventDefault();
        }

        var cursorStart = el.selectionStart; // this.onFocus(e);

        if (e.keyCode === 8 && !el.readOnly && cursorStart === 0 && el.selectionEnd === el.value.length && el.value.length !== 0) {
          this._position = this._maskService.prefix ? this._maskService.prefix.length : 0;

          this._maskService.applyMask(this._maskService.prefix, this._maskService.maskExpression, this._position);
        }
      }

      if (!!this.suffix && this.suffix.length > 1 && this._inputValue.length - this.suffix.length < el.selectionStart) {
        el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
      } else if (e.keyCode === 65 && e.ctrlKey === true || // Ctrl+ A
      e.keyCode === 65 && e.metaKey === true // Cmd + A (Mac)
      ) {
          el.setSelectionRange(0, this._getActualInputLength());
          e.preventDefault();
        }

      this._maskService.selStart = el.selectionStart;
      this._maskService.selEnd = el.selectionEnd;
    }
    /** It writes the value in the input */

  }, {
    key: "writeValue",
    value: function writeValue(inputValue) {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_9__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (typeof inputValue === 'object' && inputValue !== null && 'value' in inputValue) {
                  if ('disable' in inputValue) {
                    this.setDisabledState(Boolean(inputValue.disable));
                  }

                  inputValue = inputValue.value;
                }

                if (inputValue === undefined) {
                  inputValue = '';
                }

                if (typeof inputValue === 'number') {
                  inputValue = String(inputValue);
                  inputValue = this.decimalMarker !== '.' ? inputValue.replace('.', this.decimalMarker) : inputValue;
                  this._maskService.isNumberValue = true;
                }

                this._inputValue = inputValue;

                this._setMask();

                if (inputValue && this._maskService.maskExpression || this._maskService.maskExpression && (this._maskService.prefix || this._maskService.showMaskTyped)) {
                  // Let the service we know we are writing value so that triggering onChange function wont happen during applyMask
                  this._maskService.writingValue = true;
                  this._maskService.formElementProperty = ['value', this._maskService.applyMask(inputValue, this._maskService.maskExpression)]; // Let the service know we've finished writing value

                  this._maskService.writingValue = false;
                } else {
                  this._maskService.formElementProperty = ['value', inputValue];
                }

                this._inputValue = inputValue;

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "registerOnChange",
    value: function registerOnChange(fn) {
      this.onChange = fn;
      this._maskService.onChange = this.onChange;
    }
  }, {
    key: "registerOnTouched",
    value: function registerOnTouched(fn) {
      this.onTouch = fn;
    }
  }, {
    key: "suffixCheckOnPressDelete",
    value: function suffixCheckOnPressDelete(keyCode, el) {
      if (keyCode === 46 && this.suffix.length > 0) {
        if (this._inputValue.length - this.suffix.length <= el.selectionStart) {
          el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
        }
      }

      if (keyCode === 8) {
        if (this.suffix.length > 1 && this._inputValue.length - this.suffix.length < el.selectionStart) {
          el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
        }

        if (this.suffix.length === 1 && this._inputValue.length === el.selectionStart) {
          el.setSelectionRange(el.selectionStart - 1, el.selectionStart - 1);
        }
      }
    }
    /** It disables the input element */

  }, {
    key: "setDisabledState",
    value: function setDisabledState(isDisabled) {
      this._maskService.formElementProperty = ['disabled', isDisabled];
    }
  }, {
    key: "_repeatPatternSymbols",
    value: function _repeatPatternSymbols(maskExp) {
      var _this13 = this;

      return maskExp.match(/{[0-9]+}/) && maskExp.split('').reduce(function (accum, currval, index) {
        _this13._start = currval === '{' ? index : _this13._start;

        if (currval !== '}') {
          return _this13._maskService._findSpecialChar(currval) ? accum + currval : accum;
        }

        _this13._end = index;
        var repeatNumber = Number(maskExp.slice(_this13._start + 1, _this13._end));
        var replaceWith = new Array(repeatNumber + 1).join(maskExp[_this13._start - 1]);
        return accum + replaceWith;
      }, '') || maskExp;
    } // tslint:disable-next-line:no-any

  }, {
    key: "_applyMask",
    value: function _applyMask() {
      this._maskService.maskExpression = this._repeatPatternSymbols(this._maskValue || '');
      this._maskService.formElementProperty = ['value', this._maskService.applyMask(this._inputValue, this._maskService.maskExpression)];
    }
  }, {
    key: "_validateTime",
    value: function _validateTime(value) {
      var rowMaskLen = this._maskValue.split('').filter(function (s) {
        return s !== ':';
      }).length;

      if (value === null || value.length === 0) {
        return null; // Don't validate empty values to allow for optional form control
      }

      if (+value[value.length - 1] === 0 && value.length < rowMaskLen || value.length <= rowMaskLen - 2) {
        return this._createValidationError(value);
      }

      return null;
    }
  }, {
    key: "_getActualInputLength",
    value: function _getActualInputLength() {
      return this._maskService.actualValue.length || this._maskService.actualValue.length + this._maskService.prefix.length;
    }
  }, {
    key: "_createValidationError",
    value: function _createValidationError(actualValue) {
      return {
        mask: {
          requiredMask: this._maskValue,
          actualValue: actualValue
        }
      };
    }
  }, {
    key: "_setMask",
    value: function _setMask() {
      var _this14 = this;

      if (this._maskExpressionArray.length > 0) {
        this._maskExpressionArray.some(function (mask) {
          var test = _this14._maskService.removeMask(_this14._inputValue).length <= _this14._maskService.removeMask(mask).length;

          if (_this14._inputValue && test) {
            _this14._maskValue = mask;
            _this14.maskExpression = mask;
            _this14._maskService.maskExpression = mask;
            return test;
          } else {
            _this14._maskValue = _this14._maskExpressionArray[_this14._maskExpressionArray.length - 1];
            _this14.maskExpression = _this14._maskExpressionArray[_this14._maskExpressionArray.length - 1];
            _this14._maskService.maskExpression = _this14._maskExpressionArray[_this14._maskExpressionArray.length - 1];
          }
        });
      }
    }
  }]);

  return MaskDirective;
}();

MaskDirective.ɵfac = function MaskDirective_Factory(t) {
  return new (t || MaskDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_11__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](MaskService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](config));
};

MaskDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineDirective"]({
  type: MaskDirective,
  selectors: [["input", "mask", ""], ["textarea", "mask", ""]],
  hostBindings: function MaskDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("paste", function MaskDirective_paste_HostBindingHandler() {
        return ctx.onPaste();
      })("input", function MaskDirective_input_HostBindingHandler($event) {
        return ctx.onInput($event);
      })("blur", function MaskDirective_blur_HostBindingHandler() {
        return ctx.onBlur();
      })("click", function MaskDirective_click_HostBindingHandler($event) {
        return ctx.onFocus($event);
      })("keydown", function MaskDirective_keydown_HostBindingHandler($event) {
        return ctx.onKeyDown($event);
      });
    }
  },
  inputs: {
    maskExpression: ["mask", "maskExpression"],
    specialCharacters: "specialCharacters",
    patterns: "patterns",
    prefix: "prefix",
    suffix: "suffix",
    thousandSeparator: "thousandSeparator",
    decimalMarker: "decimalMarker",
    dropSpecialCharacters: "dropSpecialCharacters",
    hiddenInput: "hiddenInput",
    showMaskTyped: "showMaskTyped",
    placeHolderCharacter: "placeHolderCharacter",
    shownMaskExpression: "shownMaskExpression",
    showTemplate: "showTemplate",
    clearIfNotMatch: "clearIfNotMatch",
    validation: "validation",
    separatorLimit: "separatorLimit",
    allowNegativeNumbers: "allowNegativeNumbers",
    leadZeroDateTime: "leadZeroDateTime"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵProvidersFeature"]([{
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NG_VALUE_ACCESSOR"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_8__["forwardRef"])(function () {
      return MaskDirective;
    }),
    multi: true
  }, {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NG_VALIDATORS"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_8__["forwardRef"])(function () {
      return MaskDirective;
    }),
    multi: true
  }, MaskService]), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵNgOnChangesFeature"]]
});

MaskDirective.ctorParameters = function () {
  return [{
    type: undefined,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Inject"],
      args: [_angular_common__WEBPACK_IMPORTED_MODULE_11__["DOCUMENT"]]
    }]
  }, {
    type: MaskService
  }, {
    type: undefined,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Inject"],
      args: [config]
    }]
  }];
};

MaskDirective.propDecorators = {
  maskExpression: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"],
    args: ['mask']
  }],
  specialCharacters: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
  }],
  patterns: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
  }],
  prefix: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
  }],
  suffix: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
  }],
  thousandSeparator: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
  }],
  decimalMarker: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
  }],
  dropSpecialCharacters: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
  }],
  hiddenInput: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
  }],
  showMaskTyped: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
  }],
  placeHolderCharacter: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
  }],
  shownMaskExpression: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
  }],
  showTemplate: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
  }],
  clearIfNotMatch: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
  }],
  validation: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
  }],
  separatorLimit: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
  }],
  allowNegativeNumbers: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
  }],
  leadZeroDateTime: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
  }],
  onPaste: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["HostListener"],
    args: ['paste']
  }],
  onInput: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["HostListener"],
    args: ['input', ['$event']]
  }],
  onBlur: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["HostListener"],
    args: ['blur']
  }],
  onFocus: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["HostListener"],
    args: ['click', ['$event']]
  }],
  onKeyDown: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["HostListener"],
    args: ['keydown', ['$event']]
  }]
};
/*@__PURE__*/

(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵsetClassMetadata"](MaskDirective, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Directive"],
    args: [{
      selector: 'input[mask], textarea[mask]',
      providers: [{
        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NG_VALUE_ACCESSOR"],
        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_8__["forwardRef"])(function () {
          return MaskDirective;
        }),
        multi: true
      }, {
        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NG_VALIDATORS"],
        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_8__["forwardRef"])(function () {
          return MaskDirective;
        }),
        multi: true
      }, MaskService]
    }]
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Inject"],
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_11__["DOCUMENT"]]
      }]
    }, {
      type: MaskService
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Inject"],
        args: [config]
      }]
    }];
  }, {
    maskExpression: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"],
      args: ['mask']
    }],
    specialCharacters: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
    }],
    patterns: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
    }],
    prefix: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
    }],
    suffix: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
    }],
    thousandSeparator: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
    }],
    decimalMarker: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
    }],
    dropSpecialCharacters: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
    }],
    hiddenInput: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
    }],
    showMaskTyped: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
    }],
    placeHolderCharacter: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
    }],
    shownMaskExpression: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
    }],
    showTemplate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
    }],
    clearIfNotMatch: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
    }],
    validation: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
    }],
    separatorLimit: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
    }],
    allowNegativeNumbers: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
    }],
    leadZeroDateTime: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Input"]
    }],
    onPaste: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["HostListener"],
      args: ['paste']
    }],
    onInput: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["HostListener"],
      args: ['input', ['$event']]
    }],
    onBlur: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["HostListener"],
      args: ['blur']
    }],
    onFocus: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["HostListener"],
      args: ['click', ['$event']]
    }],
    // tslint:disable-next-line: cyclomatic-complexity
    onKeyDown: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["HostListener"],
      args: ['keydown', ['$event']]
    }]
  });
})();

var MaskPipe = /*#__PURE__*/function () {
  function MaskPipe(_maskService) {
    Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_6__["default"])(this, MaskPipe);

    this._maskService = _maskService;
  }

  Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__["default"])(MaskPipe, [{
    key: "transform",
    value: function transform(value, mask) {
      var thousandSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (!value && typeof value !== 'number') {
        return '';
      }

      if (thousandSeparator) {
        this._maskService.thousandSeparator = thousandSeparator;
      }

      if (typeof mask === 'string') {
        return this._maskService.applyMask("".concat(value), mask);
      }

      return this._maskService.applyMaskWithPattern("".concat(value), mask);
    }
  }]);

  return MaskPipe;
}();

MaskPipe.ɵfac = function MaskPipe_Factory(t) {
  return new (t || MaskPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](MaskApplierService));
};

MaskPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefinePipe"]({
  name: "mask",
  type: MaskPipe,
  pure: true
});

MaskPipe.ctorParameters = function () {
  return [{
    type: MaskApplierService
  }];
};
/*@__PURE__*/


(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵsetClassMetadata"](MaskPipe, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["Pipe"],
    args: [{
      name: 'mask',
      pure: true
    }]
  }], function () {
    return [{
      type: MaskApplierService
    }];
  }, null);
})();

var NgxMaskModule = /*#__PURE__*/function () {
  function NgxMaskModule() {
    Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_6__["default"])(this, NgxMaskModule);
  }

  Object(_Users_thielesmartins_Documents_projeto_cadastro_front_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__["default"])(NgxMaskModule, null, [{
    key: "forRoot",
    value: function forRoot(configValue) {
      return {
        ngModule: NgxMaskModule,
        providers: [{
          provide: NEW_CONFIG,
          useValue: configValue
        }, {
          provide: INITIAL_CONFIG,
          useValue: initialConfig
        }, {
          provide: config,
          useFactory: _configFactory,
          deps: [INITIAL_CONFIG, NEW_CONFIG]
        }, MaskApplierService]
      };
    }
  }, {
    key: "forChild",
    value: function forChild() {
      return {
        ngModule: NgxMaskModule
      };
    }
  }]);

  return NgxMaskModule;
}();

NgxMaskModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
  type: NgxMaskModule
});
NgxMaskModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
  factory: function NgxMaskModule_Factory(t) {
    return new (t || NgxMaskModule)();
  }
});

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](NgxMaskModule, {
    declarations: [MaskDirective, MaskPipe],
    exports: [MaskDirective, MaskPipe]
  });
})();
/*@__PURE__*/


(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵsetClassMetadata"](NgxMaskModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__["NgModule"],
    args: [{
      exports: [MaskDirective, MaskPipe],
      declarations: [MaskDirective, MaskPipe]
    }]
  }], null, null);
})();
/**
 * @internal
 */


function _configFactory(initConfig, configValue) {
  return configValue instanceof Function ? Object.assign(Object.assign({}, initConfig), configValue()) : Object.assign(Object.assign({}, initConfig), configValue);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

(function () {
  if (!commonjsGlobal.KeyboardEvent) {
    commonjsGlobal.KeyboardEvent = function (_eventType, _init) {};
  }
})();
/**
 * Generated bundle index. Do not edit.
 */


 //# sourceMappingURL=ngx-mask.js.map

/***/ })

}]);
//# sourceMappingURL=layouts-admin-layout-admin-layout-module.js.map