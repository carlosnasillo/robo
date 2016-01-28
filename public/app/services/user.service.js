/*
 * Copyright (c) 2015 PDX Technology, All rights reserved.
 *
 * Unpublished copyright. All rights reserved. This material contains
 * proprietary information that shall be used or copied only with
 * PDX Technology, except with written permission of PDX Technology.
 */

/**
* @author : julienderay
* Created on 27/01/2016
*/

(function() {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];

    function UserService($http) {

        var register = function(email, password, terms, reason, income, timeline, birthday, platform, accountId, firstName, lastName, apiKey, successCallback, errorCallback) {
            $http
                .post('/api/register', {
                    _id: email,
                    password: password,
                    terms: terms,
                    reason: reason,
                    income: income,
                    timeline: timeline,
                    birthday: birthday,
                    platform: platform,
                    accountId: accountId,
                    firstName: firstName,
                    lastName: lastName,
                    apiKey: apiKey
                })
                .then(successCallback, errorCallback);
        };

        var login = function(email, password, successCallback, errorCallback) {
            $http
                .post('/api/login', { email: email, password: password })
                .then(successCallback, errorCallback);
        };

        return {
            register: register,
            login: login
        };
    }
})();