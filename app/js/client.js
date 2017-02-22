'use strict';

require('angular/angular');
require('angular-ui-router');
require('angular-cookies');
require('angucomplete-alt');

var gameApp = angular.module('gameApp', ['ui.router', 'ngCookies', "angucomplete-alt"]);

// Router
require('./router.js')(gameApp);

// Services
require('./services/resourceServices.js')(gameApp);
require('./services/copy.js')(gameApp);
require('./services/auth.js')(gameApp);

// Controllers
require('./controllers/instancesController.js')(gameApp);
require('./controllers/authController.js')(gameApp);

// Directives
require('./directives/header_directive.js')(gameApp);
require('./directives/main_directive.js')(gameApp);
require('./directives/footer_directive.js')(gameApp);
require('./directives/new_instance_directive.js')(gameApp);
require('./directives/create_user_directive.js')(gameApp);
require('./directives/sign_in_directive.js')(gameApp);
require('./directives/current_games_directive.js')(gameApp);
