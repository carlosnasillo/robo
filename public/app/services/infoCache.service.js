/*
 * Copyright (c) 2015 PDX Technology, All rights reserved.
 *
 * Unpublished copyright. All rights reserved. This material contains
 * proprietary information that shall be used or copied only with
 * PDX Technology, except with written permission of PDX Technology.
 */

/**
* @author : julienderay
* Created on 09/03/2016
*/

(() => {
    'use strict';
    class infosCacheService {
        constructor(userService, dashboardDataService) {
            this.userDataPromise = userService.userData(response => {
                this.username = `${response.data.firstName} ${response.data.lastName}`;
                this.platforms = response.data.platforms.length;
            });

            this.dashboardDataPromise = dashboardDataService.portfolioMetrics(response => {
                this.expectedReturns = response.data.expectedReturns;
                this.availableCapital = response.data.availableCapital;
                this.allocatedCapital = response.data.allocatedCapital;
                this.averageIntRate = response.data.averageIntRate;
                this.currentRoiRate = response.data.currentRoiRate;
                this.expectedRoiRate = response.data.expectedRoiRate;
                this.loansAcquiredPerDayLastWeek = response.data.loansAcquiredPerDayLastWeek;
                this.platformAllocation = response.data.platformAllocation;
                this.currentLoans = response.data.currentLoans;
                this.riskDiversification = response.data.riskDiversification;
                this.loansAcquiredPerDayLastWeek = response.data.loansAcquiredPerDayLastWeek;
            });
        }

        getUsername(callback) {
            if (this.username) {
                return callback(this.username);
            }
            else {
                this.userDataPromise.then(response => callback(`${response.data.firstName} ${response.data.lastName}`));
            }
        }

        getNumberOfPlatforms(callback) {
            if (this.nbPlatforms) {
                return callback(this.nbPlatforms);
            }
            else {
                this.userDataPromise.then(response => callback(response.data.platforms.length));
            }
        }

        getExpectedReturns(callback) {
            if (this.expectedReturns) {
                return callback(this.expectedReturns);
            }
            else {
                this.dashboardDataPromise.then(response => callback(response.data.expectedReturns));
            }
        }

        getAvailableCapital(callback) {
            if (this.availableCapital) {
                return callback(this.availableCapital);
            }
            else {
                this.dashboardDataPromise.then(response => callback(response.data.availableCapital));
            }
        }

        getAllocatedCapital(callback) {
            if (this.allocatedCapital) {
                return callback(this.allocatedCapital);
            }
            else {
                this.dashboardDataPromise.then(response => callback(response.data.allocatedCapital));
            }
        }

        getAverageIntRate(callback) {
            if (this.averageIntRate) {
                return callback(this.averageIntRate);
            }
            else {
                this.dashboardDataPromise.then(response => callback(response.data.averageIntRate));
            }
        }

        getCurrentRoiRate(callback) {
            if (this.currentRoiRate) {
                return callback(this.currentRoiRate);
            }
            else {
                this.dashboardDataPromise.then(response => callback(response.data.currentRoiRate));
            }
        }

        getExpectedRoiRate(callback) {
            if (this.expectedRoiRate) {
                return callback(this.expectedRoiRate);
            }
            else {
                this.dashboardDataPromise.then(response => callback(response.data.expectedRoiRate));
            }
        }

        getLoansAcquiredPerDayLastWeek(callback) {
            const computeTotalAcquired = (last, loans) => loans + last;
            if (this.loansAcquiredPerDayLastWeek) {
                return callback(this.loansAcquiredPerDayLastWeek.reduce(computeTotalAcquired, 0));
            }
            else {
                this.dashboardDataPromise.then(response => callback(response.data.loansAcquiredPerDayLastWeek.reduce(computeTotalAcquired, 0)));
            }
        }

        setNumberOfPlatforms(nbPlatforms) {
            this.nbPlatforms = nbPlatforms;
        }
    }
    angular
        .module('app')
        .service('infosCacheService', infosCacheService);
})();
