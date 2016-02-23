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

    class userService {
        constructor($http, notificationService) {
            this.$http = $http;
            this.notificationService = notificationService;
        }

        register(email, password, terms, reason, income, timeline, birthday, platform, accountId, apiKey, firstName, lastName, successCallback, errorCallback) {
            this.$http
                .post('/api/register', angular.toJson({
                    _id: email,
                    password: password,
                    terms: terms,
                    reason: reason,
                    income: income,
                    timeline: timeline,
                    birthday: birthday,
                    platforms: [{
                        originator: platform,
                        accountId: accountId,
                        apiKey: apiKey,
                        primary: {
                            buyStrategies: [],
                            isEnabled: true
                        },
                        secondary: {
                            buyStrategies: [],
                            sellStrategies: [],
                            isEnabled: false
                        },
                        automatedStrategy: {
                            aggressivity: 0.5
                        },
                        mode: 'automated'
                    }],
                    firstName: firstName,
                    lastName: lastName
                }))
                .then(successCallback, errorCallback);
        }

        login(email, password, successCallback) {
            this.$http
                .post('/api/login', { email: email, password: password })
                .then(successCallback, this.notificationService.apiError());
        }

        isEmailUsed(email, successCallback, errorCallback) {
            this.$http
                .get(`/api/user/${email}`)
                .then(successCallback, errorCallback);
        }

        userData(email, callback) {
            const promise = this.$http.get(`/api/user/infos/${email}`);
            promise.then(callback, this.notificationService.apiError());
            return promise;
        }

        updatePassword(email, oldPassword, newPassword, callback) {
            this.$http.put('/api/user/password', { email: email, oldPassword: oldPassword, newPassword: newPassword }).then(callback, this.notificationService.apiError());
        }

        updatePlatforms(email, platforms, callback, errorCallback) {
            this.$http.put('/api/user/p2pPlatforms', { email: email, platforms: platforms}).then(callback, this.notificationService.apiError(errorCallback));
        }

        updatePersonalData(email, firstName, lastName, birthday, callback) {
            this.$http.put('/api/user/personalData', { email: email, firstName: firstName, lastName: lastName, birthday: birthday }).then(callback, this.notificationService.apiError());
        }

        destroyUser(email, password, callback) {
            this.$http.post('/api/user/destroy', { email: email, password: password }).then(callback, this.notificationService.apiError());
        }

        addPlatform(email, originator, accountId, apiKey, callback) {
            this.$http.post('/api/user/platform', { email: email, originator: originator, accountId: accountId, apiKey: apiKey, callback: callback }).then(callback, this.notificationService.apiError());
        }
    }

    angular
        .module('app')
        .service('userService', userService);
})();
