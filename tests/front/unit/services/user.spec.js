/*
 * Copyright (c) 2015 PDX Technology, All rights reserved.
 *
 * Unpublished copyright. All rights reserved. This material contains
 * proprietary information that shall be used or copied only with
 * PDX Technology, except with written permission of PDX Technology.
 */

/**
* @author : julienderay
* Created on 29/01/2016
*/

describe('userService', () => {
    let _$httpBackend,
        _userService;

    beforeEach(() => {
        module('app');
    });

    beforeEach(inject((userService, $httpBackend) => {
        _userService = userService;
        _$httpBackend = $httpBackend;

    }));

    describe('register', () => {
        let email,
            password,
            terms,
            reason,
            income,
            timeline,
            birthday,
            platform,
            accountId,
            firstName,
            lastName,
            apiKey;

        beforeEach(() => {
            email = 'email';
            password = 'password';
            terms = 'terms';
            reason = 'reason';
            income = 'income';
            timeline = 'timeline';
            birthday = 'birthday';
            platform = 'platform';
            accountId = 'accountId';
            firstName = 'firstName';
            lastName = 'lastName';
            apiKey = 'apiKey';

            _$httpBackend.when('POST', '/api/register').respond();

            _userService.register(email, password, terms, reason, income, timeline, birthday, platform, accountId, firstName, lastName, apiKey);
        });

        it('should call the API', () => {
            _$httpBackend.expectPOST('/api/register', {
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
            });
            expect(_$httpBackend.flush).not.toThrow();
        });

        afterEach(() => {
            _$httpBackend.verifyNoOutstandingExpectation();
            _$httpBackend.verifyNoOutstandingRequest();
        });
    });

    describe('login', () => {
        let email,
            password;

        beforeEach(() => {
            email = "email";
            password = "password";

            _$httpBackend.when('POST', '/api/login').respond();

            _userService.login(email, password);
        });

        it('should call the API', () => {
            _$httpBackend.expectPOST('/api/login', { email: email, password: password });
            expect(_$httpBackend.flush).not.toThrow();
        });

        afterEach(() => {
            _$httpBackend.verifyNoOutstandingExpectation();
            _$httpBackend.verifyNoOutstandingRequest();
        });
    });

    describe('isEmailUsed', () => {
        let email;

        beforeEach(() => {
            email = "email";

            _$httpBackend.when('GET', `/api/user/${email}`).respond();

            _userService.isEmailUsed(email);
        });

        it('should call the API', () => {
            _$httpBackend.expectGET(`/api/user/${email}`);
            expect(_$httpBackend.flush).not.toThrow();
        });

        afterEach(() => {
            _$httpBackend.verifyNoOutstandingExpectation();
            _$httpBackend.verifyNoOutstandingRequest();
        });
    });

    describe('userInformations', () => {
        let email;

        beforeEach(() => {
            email = "email";

            _$httpBackend.when('GET', `/api/user/infos/${email}`).respond();
            _userService.userData(email);
        });

        it('should call the API', () => {
            _$httpBackend.expectGET(`/api/user/infos/${email}`);
            expect(_$httpBackend.flush).not.toThrow();
        });

        afterEach(() => {
            _$httpBackend.verifyNoOutstandingExpectation();
            _$httpBackend.verifyNoOutstandingRequest();
        });
    });

    describe('userData', () => {
        let email;

        beforeEach(() => {
            email = "email@domain.co.uk";

            _$httpBackend.when('GET', '/api/user/infos/email@domain.co.uk').respond();

            _userService.userData(email);
        });

        it('should call the API', () => {
            _$httpBackend.expectGET('/api/user/infos/email@domain.co.uk');
            expect(_$httpBackend.flush).not.toThrow();
        });

        afterEach(() => {
            _$httpBackend.verifyNoOutstandingExpectation();
            _$httpBackend.verifyNoOutstandingRequest();
        });
    });

    describe('updatePassword', () => {
        let email,
            oldPassword,
            newPassword;

        beforeEach(() => {
            email = 'toto@tata.co.uk';
            oldPassword = '0ldPassword';
            newPassword = "NewPassw0rd";

            _$httpBackend.when('PUT', '/api/user/password').respond();

            _userService.updatePassword(email, oldPassword, newPassword);
        });

        it('should should call the API', () => {
            _$httpBackend.expectPUT('/api/user/password', { email: email, oldPassword: oldPassword, newPassword: newPassword });
            expect(_$httpBackend.flush).not.toThrow();
        });

        afterEach(() => {
            _$httpBackend.verifyNoOutstandingExpectation();
            _$httpBackend.verifyNoOutstandingRequest();
        });
    });
});