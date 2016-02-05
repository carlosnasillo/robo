/*
 * Copyright (c) 2015 PDX Technology, All rights reserved.
 *
 * Unpublished copyright. All rights reserved. This material contains
 * proprietary information that shall be used or copied only with
 * PDX Technology, except with written permission of PDX Technology.
 */

/**
* @author : julienderay
* Created on 03/02/2016
*/

(() => {
    'use strict';

    angular
        .module('app')
        .directive('platformAllocation', loansMaturity);

    loansMaturity.$inject = ['notificationService', 'c3PieChartService'];

    function loansMaturity(notificationService, c3PieChartService) {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                data: "=",
                identifier: "@"
            },
            template: '<div id="{{identifier}}"></div>',
            link: scope => {
                scope.data.then(response => {
                    const chart = c3.generate({
                        bindto: `#${scope.identifier}`,
                        data: {
                            columns: c3PieChartService.prepareData(response.data),
                            type : 'pie'
                        },
                        size: {
                            height: 200,
                            width: 300
                        },
                        tooltip: {
                            position: () => ({top: 30, left: 0}),
                            format:{
                              value: value => value
                            }
                        },
                        color: {
                            pattern: c3PieChartService.blueDegraded
                        },
                        legend:{
                          show: false
                        }
                    });
                }, notificationService.apiError());
            }
        };
    }
})();
