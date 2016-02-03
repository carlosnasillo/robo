/*
 * Copyright (c) 2015 PDX Technology, All rights reserved.
 *
 * Unpublished copyright. All rights reserved. This material contains
 * proprietary information that shall be used or copied only with
 * PDX Technology, except with written permission of PDX Technology.
 */

/**
* @author : julienderay
* Created on 30/01/2016
*/

describe('DashboardController', () => {
    let dashboardController,
        cssInjector,
        authenticationService,
        $location,
        dashboardDataService,
        userService;

    beforeEach(() => {
        module('app');

        $location = jasmine.createSpyObj('$location', ['path']);
        authenticationService = jasmine.createSpyObj('authenticationService', ['logout', 'getCurrentUsersEmail']);
        cssInjector = jasmine.createSpyObj('cssInjector', ['add']);
        dashboardDataService = jasmine.createSpyObj('dashboardDataService', ['availableCapital', 'allocatedCapital', 'averageMaturity', 'averageIntRate', 'expectedReturns', 'lastLoanMaturity', 'currentRoiRate', 'expectedRoiRate', 'currentLoansPromise']);
        userService = jasmine.createSpyObj('userService', ['userData']);
    });

    let availableCapital;
    beforeEach(() => {
        availableCapital = 1000;
        dashboardDataService.availableCapital.and.callFake(callback => callback({data: { availableCapital: availableCapital } }));
    });

    let allocatedCapital;
    beforeEach(() => {
        allocatedCapital = 2000;
        dashboardDataService.allocatedCapital.and.callFake(callback => callback({data: { allocatedCapital: allocatedCapital } }));
    });

    let averageMaturity;
    beforeEach(() => {
        jasmine.clock().mockDate(new Date("2016-08-01"));
        averageMaturity = "2016-10-11";
        dashboardDataService.averageMaturity.and.callFake(callback => callback({data: { averageMaturity: averageMaturity } }));
    });

    let averageIntRate;
    beforeEach(() => {
        averageIntRate = 0.12;
        dashboardDataService.averageIntRate.and.callFake(callback => callback({data: { averageIntRate: averageIntRate } }));
    });

    let expectedReturns;
    beforeEach(() => {
        expectedReturns = 200000;
        dashboardDataService.expectedReturns.and.callFake(callback => callback({data: { expectedReturns: expectedReturns } }));
    });

    let lastLoanMaturity;
    beforeEach(() => {
        jasmine.clock().mockDate(new Date("2016-08-01"));
        lastLoanMaturity = "2016-12-01";
        dashboardDataService.lastLoanMaturity.and.callFake(callback => callback({data: { lastLoanMaturity: lastLoanMaturity } }));
    });

    let currentRoiRate;
    beforeEach(() => {
        currentRoiRate = 0.2;
        dashboardDataService.currentRoiRate.and.callFake(callback => callback({data: { currentRoiRate: currentRoiRate } }));
    });

    let expectedRoiRate;
    beforeEach(() => {
        expectedRoiRate = 0.3;
        dashboardDataService.expectedRoiRate.and.callFake(callback => callback({data: { expectedRoiRate: expectedRoiRate } }));
    });

    let firstName, lastName;
    beforeEach(() => {
        firstName = "Arthur";
        lastName = "Guinness";
        userService.userData.and.callFake((currentUserEmail, callback) => callback({data: { firstName: firstName, lastName: lastName } }));
    });

    beforeEach(inject(($controller) => {
        dashboardController = $controller('DashboardController', {
            $location : $location,
            authenticationService: authenticationService,
            cssInjector: cssInjector,
            dashboardDataService: dashboardDataService,
            userService: userService
        });
    }));

    describe('cssInjection', () => {
        it('should inject Homer css stylesheet on initialization', () => {
            expect(cssInjector.add).toHaveBeenCalledWith('assets/stylesheets/homer_style.css');
        });
    });

    describe('logout', () => {
        beforeEach(() => {
            dashboardController.logout();
        });

        it('should call the authentication service to clear the user\'s credentials', () => {
            expect(authenticationService.logout).toHaveBeenCalled();
        });

        it('should redirect the user to the landpage', () => {
            expect($location.path).toHaveBeenCalledWith('/');
        });
    });

    describe('data initialisation', () => {
        it('should load available capital from API', () => {
            expect(dashboardDataService.availableCapital).toHaveBeenCalled();
            expect(dashboardController.availableCapital).toBe(availableCapital);
        });

        it('should load allocated capital from API', () => {
            expect(dashboardDataService.allocatedCapital).toHaveBeenCalled();
            expect(dashboardController.allocatedCapital).toBe(allocatedCapital);
        });

        it('should set the current date', () => {
            expect(dashboardController.lastUpdate).not.toBeUndefined();
        });

        it('should load average maturity from API', () => {
            expect(dashboardDataService.averageMaturity).toHaveBeenCalled();
            expect(dashboardController.averageMaturity).toBe("in 2 months");
        });

        it('should load average interest rate from API', () => {
            expect(dashboardDataService.averageIntRate).toHaveBeenCalled();
            expect(dashboardController.averageIntRate).toBe(averageIntRate);
        });

        it('should load expected returns rate from API', () => {
            expect(dashboardDataService.expectedReturns).toHaveBeenCalled();
            expect(dashboardController.expectedReturns).toBe(expectedReturns);
        });

        it('should load last loan maturity rate from API', () => {
            expect(dashboardDataService.lastLoanMaturity).toHaveBeenCalled();
            expect(dashboardController.lastLoanMaturity).toBe("in 4 months");
        });

        it('should load current roi rate from API', () => {
            expect(dashboardDataService.currentRoiRate).toHaveBeenCalled();
            expect(dashboardController.currentRoiRate).toBe(currentRoiRate);
        });

        it('should load expected roi rate from API', () => {
            expect(dashboardDataService.expectedRoiRate).toHaveBeenCalled();
            expect(dashboardController.expectedRoiRate).toBe(expectedRoiRate);
        });

        it('should load user names from API', () => {
            expect(userService.userData).toHaveBeenCalled();
            expect(authenticationService.getCurrentUsersEmail).toHaveBeenCalled();
            expect(dashboardController.username).toBe(`${firstName} ${lastName}`);
        });

        it('should get a promise containing the current loans', () => {
            expect(dashboardDataService.currentLoansPromise).toHaveBeenCalled();
        });
    });
});