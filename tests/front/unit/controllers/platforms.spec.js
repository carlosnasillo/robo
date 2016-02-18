/*
 * Copyright (c) 2015 PDX Technology, All rights reserved.
 *
 * Unpublished copyright. All rights reserved. This material contains
 * proprietary information that shall be used or copied only with
 * PDX Technology, except with written permission of PDX Technology.
 */

/**
* @author : julienderay
* Created on 11/02/2016
*/

describe('PlatformsController', () => {
    let platformsController,
        cssInjector,
        authenticationService,
        userService;

    beforeEach(module('app'));

    beforeEach(() => {
        cssInjector = jasmine.createSpyObj('cssInjector', ['add']);

        authenticationService = jasmine.createSpyObj('authenticationService', ['getCurrentUsersEmail']);
        authenticationService.getCurrentUsersEmail.and.returnValue('toto@tata.fr');

        userService = jasmine.createSpyObj('userService', ['userData']);
    });

    beforeEach(inject(($controller) => {
        platformsController = $controller('PlatformsController', {
            cssInjector: cssInjector,
            authenticationService: authenticationService,
            userService: userService
        });
    }));

    describe('cssInjection', () => {
        it('should inject Homer css stylesheet on initialization', () => {
            expect(cssInjector.add).toHaveBeenCalledWith('assets/stylesheets/homer_style.css');
        });
    });

    describe('totalExpect', () => {
        it('should return the sum of all expected returns', () => {
            const input = { primary: {rules: [{expectedReturn: { value: 1200 } }, {expectedReturn: { value: 4800 } }]}, secondary: {rules: [{expectedReturn: { value: 1200 } }, {expectedReturn: { value: 4800 } }]} };
            const result = platformsController.totalExpected(input);
            expect(result).toBe(12000);
        });

        it('should return 0 if there is no rule', () => {
            const result = platformsController.totalExpected({ primary: {rules: []}, secondary: {rules: []}});
            expect(result).toBe(0);
        });
    });

    describe('data initialisation', () => {
        it('should call userService', () => {
            expect(userService.userData).toHaveBeenCalled();
            expect(authenticationService.getCurrentUsersEmail).toHaveBeenCalled();
        });
    });
});