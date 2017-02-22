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
require('./services/copy')(gameApp);
require('./services/auth')(gameApp);

// Controllers
require('./settings/controllers/instancesController.js')(gameApp);
require('./settings/controllers/authController.js')(gameApp);

// Directives
require('./settings/directives/header_directive.js')(gameApp);
require('./settings/directives/main_directive.js')(gameApp);
require('./settings/directives/footer_directive.js')(gameApp);
require('./settings/directives/new_instance_directive.js')(gameApp);
require('./settings/directives/create_user_directive.js')(gameApp);
require('./settings/directives/sign_in_directive.js')(gameApp);
require('./settings/directives/current_games_directive.js')(gameApp);
