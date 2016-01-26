/*
 * Copyright (c) 2015 PDX Technology, All rights reserved.
 *
 * Unpublished copyright. All rights reserved. This material contains
 * proprietary information that shall be used or copied only with
 * PDX Technology, except with written permission of PDX Technology.
 */

/**
* @author : julienderay
* Created on 26/01/2016
*/

(function() {
    'use strict';

    angular
        .module('app')
        .controller('SignupLoginController', SignupLoginController);

    SignupLoginController.$inject = ['$location'];

    function SignupLoginController($location) {
        var vm = this;

        vm.pageClass = 'signup-login blue';

        vm.submit = function() {
            $location.path('signup/termsAndConditions');
        };
    }
})();