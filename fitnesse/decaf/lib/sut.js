// Generated by CoffeeScript 1.8.0
(function() {
  var FixtureLoader, SlimHelperLibrary, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = require('underscore');

  SlimHelperLibrary = require('./slim_helper_library').SlimHelperLibrary;

  FixtureLoader = require('./fixture_loader').FixtureLoader;

  exports.Sut = (function() {
    function Sut() {
      this.property_of = __bind(this.property_of, this);
      this.modules = [];
      this.vars = {};
      this.libraries = [new SlimHelperLibrary(this)];
      this.loader = new FixtureLoader();
    }

    Sut.prototype.require = function(command) {
      this.command = command;
      return this.modules = [this.loader.require(this.command.module())].concat(this.modules);
    };

    Sut.prototype.make = function(command) {
      this.command = command;
      this.command.expand_symbols(this.vars);
      this.sut = _.isString(this.command.clazz()) ? this["new"](this.Clazz(), this.command.args()) : this.command.clazz();
      if (this.command.is_library()) {
        return this.libraries.push(this.sut);
      }
    };

    Sut.prototype.call = function(command) {
      var sut, value;
      this.command = command;
      this.command.expand_symbols(this.vars);
      sut = this.find_sut();
      value = sut[this.command.property()];
      if (_.isFunction(value)) {
        return value.apply(sut, this.command.args());
      } else if (this.is_setter_value()) {
        return this.set_property(sut);
      } else {
        return value;
      }
    };

    Sut.prototype.callAndAssign = function(command) {
      this.command = command;
      return this.vars[this.command.symbol()] = this.call(this.command);
    };

    Sut.prototype.Clazz = function() {
      this.module = _.find(this.modules, (function(_this) {
        return function(x) {
          return _.has(x, _this.command.clazz());
        };
      })(this));
      return this.module[this.command.clazz()];
    };

    Sut.prototype.find_sut = function() {
      var library;
      if (this.property_of(this.sut) != null) {
        return this.sut;
      } else if ((this.sut.sut != null) && (this.property_of(this.sut.sut) != null)) {
        return this.sut.sut;
      } else if (this.is_setter = this.command.is_set_property()) {
        return this.find_sut();
      } else if ((library = this.find_library()) != null) {
        return library;
      } else if (this.command.is_decision_table()) {
        return this.sut;
      } else {
        throw 'property not found ' + this.command.property();
      }
    };

    Sut.prototype.find_library = function() {
      return _.find(this.libraries.slice(0).reverse(), (function(_this) {
        return function(library) {
          return _this.property_of(library);
        };
      })(this));
    };

    Sut.prototype.property_of = function(sut) {
      var property;
      for (property in sut) {
        if (property === this.command.property()) {
          return property;
        }
      }
	property = sut[this.command.property()];
	return property;
	
    };

    Sut.prototype.is_setter_value = function() {
      return this.is_setter || this.command.args().length === 1;
    };

    Sut.prototype.set_property = function(sut) {
      sut[this.command.property()] = this.command.args()[0];
      this.is_setter = false;
      return void 0;
    };

    Sut.prototype["new"] = function(constructor, args) {
      var F;
      F = function() {
        return constructor.apply(this, args);
      };
      F.prototype = constructor.prototype;
	if (!constructor.name) return new F();
	var types=[constructor];

      var instance= new types[0](...args);
	return instance;
    };

    return Sut;

  })();

}).call(this);
