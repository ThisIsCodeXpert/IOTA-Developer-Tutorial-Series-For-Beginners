'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var app = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    var vehicle, charger, chargerAddress;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;

            // init vehicle object
            vehicle = new HMVehicle(vehicleSeed);
            _context10.next = 4;
            return vehicle.initHMCertificate(accessTokenVehicle);

          case 4:
            console.log('Vehicle initialized.');

            // init charger object
            charger = new HMCharger(chargerSeed);
            _context10.next = 8;
            return charger.initHMCertificateCharger(accessTokenCharger);

          case 8:

            console.log('Charger initialized.');

            _context10.next = 11;
            return charger.getReceiveAddress();

          case 11:
            chargerAddress = _context10.sent;


            console.log('Charger Address : ' + chargerAddress);
            console.log('Preparing Payment...');

            _context10.next = 16;
            return charger.prepareForPayment();

          case 16:

            console.log('Sending Transaction...');
            vehicle.sendTransaction(1, chargerAddress);

            console.log('Checking for payment confirmation...');
            charger.checkForPaymentConfirmation(function (error) {
              if (!error) {

                console.log('Payment confirmed..!');
                console.log('Starting Charging Process...');

                vehicle.startCharging();
              } else {
                console.log(error);
              }
            });

            _context10.next = 25;
            break;

          case 22:
            _context10.prev = 22;
            _context10.t0 = _context10['catch'](0);

            console.log(_context10.t0);

          case 25:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this, [[0, 22]]);
  }));

  return function app() {
    return _ref10.apply(this, arguments);
  };
}();

var _hmkit = require('hmkit');

var _hmkit2 = _interopRequireDefault(_hmkit);

var _core = require('@iota/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

process.on('unhandledRejection', function (reason, promise) {
  console.log('Unhandled Rejection at:', reason.stack || reason);
});

var iota = (0, _core.composeAPI)({
  provider: 'https://nodes.devnet.iota.org:443'
});

var hmkit = new _hmkit2.default("dGVzdK75ilWWgfnLQkeGHLARrfSu2cPYm93lWjbzEHhfg42EDprW1EDpJwG6as9665pVWe+n27z2xWMCw5cEVejHFahdNjYGXGu0ZwCgI5T1kGt8BbkhPsWziWF1usBKn3vLZ2pauV5ZStU1unwZl5FG8hL7OZBCJ2JH6FH2+K3DlK8hN925RoMaRn8Dzoe8JhJVLehvTgd8", "Vsjmz2B0Hpfe4+ZEwpUP1L9IQkHNjH3tItGV2diEG0E=");

var vehicleSeed = 'MYTRWBRSFSTWJ9UIYWNQUYBTCJLCDOUHGBKLXVRA9ABGQLJSNWENBCBDWTFDATSNHOBQCWHVPHSCLFMTK';

var accessTokenVehicle = '2774a998-c274-448d-9f32-6339a8ee1f72';

var chargerSeed = 'DSIOSVMDGLRZUIGOTZHACZGQEJYMMLXSWKTBMIGKXRNW9YIERRRIFKRGQRHCSQP9WTGJGVIRIHQNDEFSE';

var accessTokenCharger = '7db84cd0-9a81-48e0-a89a-7886ef10121d';

var HMVehicle = function () {
  function HMVehicle(seed) {
    _classCallCheck(this, HMVehicle);

    this.seed = seed;
  }

  _createClass(HMVehicle, [{
    key: 'initHMCertificate',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(accessTokenVehicle) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return hmkit.downloadAccessCertificate(accessTokenVehicle);

              case 2:
                this.accessCertificate = _context.sent;

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initHMCertificate(_x) {
        return _ref.apply(this, arguments);
      }

      return initHMCertificate;
    }()
  }, {
    key: 'sendTransaction',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value, address) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:

                sendIOTA(this.seed, value, address);

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function sendTransaction(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return sendTransaction;
    }()
  }, {
    key: 'startCharging',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return hmkit.telematics.sendCommand(this.accessCertificate.getSerial(), hmkit.commands.ChargingCommand.startCharging());

              case 3:
                _context3.next = 8;
                break;

              case 5:
                _context3.prev = 5;
                _context3.t0 = _context3['catch'](0);

                console.log(_context3.t0);

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 5]]);
      }));

      function startCharging() {
        return _ref3.apply(this, arguments);
      }

      return startCharging;
    }()
  }]);

  return HMVehicle;
}();

var HMCharger = function () {
  function HMCharger(seed) {
    _classCallCheck(this, HMCharger);

    this.seed = seed;
  }

  _createClass(HMCharger, [{
    key: 'initHMCertificateCharger',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(accessTokenCharger) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return hmkit.downloadAccessCertificate(accessTokenCharger);

              case 2:
                this.accessCertificate = _context4.sent;

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function initHMCertificateCharger(_x4) {
        return _ref4.apply(this, arguments);
      }

      return initHMCertificateCharger;
    }()
  }, {
    key: 'getReceiveAddress',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:

                this.currentAddress = (0, _core.generateAddress)(this.seed, 0);
                return _context5.abrupt('return', this.currentAddress);

              case 2:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getReceiveAddress() {
        return _ref5.apply(this, arguments);
      }

      return getReceiveAddress;
    }()
  }, {
    key: 'prepareForPayment',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.checkBalance();

              case 2:
                this.balance = _context6.sent;

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function prepareForPayment() {
        return _ref6.apply(this, arguments);
      }

      return prepareForPayment;
    }()
  }, {
    key: 'checkBalance',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var response;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return iota.getBalances([this.currentAddress], 100);

              case 2:
                response = _context7.sent;
                return _context7.abrupt('return', response.balances[0]);

              case 4:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function checkBalance() {
        return _ref7.apply(this, arguments);
      }

      return checkBalance;
    }()
  }, {
    key: 'authenticate',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return hmkit.telematics.sendCommand(this.accessCertificate.getSerial(), hmkit.commands.HomeChargerCommand.authenticate());

              case 3:
                _context8.next = 8;
                break;

              case 5:
                _context8.prev = 5;
                _context8.t0 = _context8['catch'](0);

                console.log(_context8.t0);

              case 8:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 5]]);
      }));

      function authenticate() {
        return _ref8.apply(this, arguments);
      }

      return authenticate;
    }()
  }, {
    key: 'checkForPaymentConfirmation',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(callback) {
        var initialBalance, currentBalance, i;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                initialBalance = this.balance;
                currentBalance = 0;
                i = 0;

              case 4:
                if (!(i < 240)) {
                  _context9.next = 17;
                  break;
                }

                _context9.next = 7;
                return this.checkBalance();

              case 7:
                currentBalance = _context9.sent;

                if (!(currentBalance > initialBalance)) {
                  _context9.next = 12;
                  break;
                }

                _context9.next = 11;
                return this.authenticate();

              case 11:
                return _context9.abrupt('return', callback(null));

              case 12:
                _context9.next = 14;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 5000);
                });

              case 14:
                i++;
                _context9.next = 4;
                break;

              case 17:
                return _context9.abrupt('return', callback('Error : Timeout'));

              case 20:
                _context9.prev = 20;
                _context9.t0 = _context9['catch'](0);
                return _context9.abrupt('return', callback(_context9.t0));

              case 23:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 20]]);
      }));

      function checkForPaymentConfirmation(_x5) {
        return _ref9.apply(this, arguments);
      }

      return checkForPaymentConfirmation;
    }()
  }]);

  return HMCharger;
}();

function sendIOTA(seed, value, address) {
  var transfers = [{
    address: address,
    value: value,
    tag: '',
    message: ''
  }];
  var depth = 3;
  var minWeightMagnitude = 9;
  iota.prepareTransfers(seed, transfers).then(function (trytes) {
    return iota.sendTrytes(trytes, depth, minWeightMagnitude);
  }).then(function (bundle) {
    console.log('Published transaction with tail hash : ' + bundle[0].hash);
  }).catch(function (err) {
    console.log(err);
  });
}

app();