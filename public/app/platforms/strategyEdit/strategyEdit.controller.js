/*
 * Copyright (c) 2015 PDX Technology, All rights reserved.
 *
 * Unpublished copyright. All rights reserved. This material contains
 * proprietary information that shall be used or copied only with
 * PDX Technology, except with written permission of PDX Technology.
 */

/**
* @author : julienderay
* Created on 13/02/2016
*/

(() => {
    'use strict';

    class StrategyEditController {
        constructor(authenticationService, $routeParams, constantsService, $location, cssInjector, criteriaService, $cookieStore, spinnerService, $timeout) {
            var vm = this;

            const email = authenticationService.getCurrentUsersEmail();

            const platform = $routeParams.platform;
            const ruleId = $routeParams.ruleId;
            const market = $routeParams.market;

            getCriteria();
            checkUrlParameters();
            injectCss();

            vm.addCriterion = criterion => {
                vm.rule.criteria.push(criteriaService.expendCriterion(criterion));
                vm.baseCriteria = vm.baseCriteria.filter(baseCriterion => criterion.attribute !== baseCriterion.attribute);
            };

            vm.remove = attribute => {
                vm.rule.criteria = vm.rule.criteria.filter(criterion => criterion.attribute !== attribute);
                criteriaService.baseCriteria(market).some(criterion => {
                    if (criterion.attribute == attribute) {
                        vm.baseCriteria.push(criterion);
                    }
                });
            };

            vm.saveCriteria = () => {
                updatePlatforms();
                spinnerService.on();
                platformService.updatePlatforms(email, vm.platforms, () => {
                    spinnerService.off();
                    $cookieStore.put('newCriteriaSuccess', true);
                    $location.path(`/platforms/strategies/${platform}/${market}`);
                });
            };

            vm.cancel = () => {
              swal({
                    title: "Are you sure?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: true,
                    closeOnCancel: true
              },
                  function(isConfirm) {
                    if (isConfirm) {
                      $timeout(() => $location.path(`/platforms/strategies/${platform}/${market}`), 500);
                    }
                  });
            };

            vm.showGhostBox = () => {
                if (vm.rule) {
                    if (vm.rule.criteria) {
                        return vm.rule.criteria.length === 0;
                    }
                }
            };

            vm.onMinChange = min => {
                if (parseInt(min) > parseInt(vm.rule.maxNoteAmount)) {
                    vm.rule.maxNoteAmount = parseInt(min);
                }
            };

            vm.onMaxChange = max => {
                if (parseInt(max) < parseInt(vm.rule.minNoteAmount)) {
                    vm.rule.minNoteAmount = parseInt(max);
                }
            };

            /**
             * Functions
             */

            function injectCss() {
                cssInjector.add("assets/stylesheets/homer_style.css");
            }

            function updatePlatforms() {
                vm.platforms.forEach(p => {
                    if (p.originator === platform) {
                        if (p[market].rules.length === 0) {
                            p[market].rules = [criteriaService.unexpendCriteriaObject(vm.rule)];
                        }
                        else if (!ruleId) {
                            p[market].rules.push(criteriaService.unexpendCriteriaObject(vm.rule));
                        }
                        else {
                            p[market].rules = p[market].rules.map(r => {
                                if (r.id === ruleId) {
                                    return criteriaService.unexpendCriteriaObject(vm.rule);
                                }
                                return r;
                            });
                        }
                    }
                });
            }

            function getCriteria() {
                vm.baseCriteria = criteriaService.baseCriteria(market);
                if (!vm.baseCriteria) {
                    notificationService.error('An error occured, you will be redirected');
                    $timeout(() => $location.path('/platforms'), 1000);
                }
            }

            function checkUrlParameters() {
                checkPlatform();
                checkMarket();
                checkRuleId();
                checkRuleId();

                function checkPlatform() {
                    if (!constantsService.platforms().some(realPlatform => realPlatform == platform)) {
                        $location.path('/platforms');
                    }
                }
                function checkMarket() {
                    if (!constantsService.markets().some(realMarkets => realMarkets == market)) {
                        $location.path('/platforms');
                    }
                }

                function checkRuleId() {
                    spinnerService.on();
                    platformService.getPlatforms(email, response => {
                        response.data.some(p => {
                            if (p.originator == platform) {
                                vm.platforms = response.data;
                                if (ruleId) {
                                    if (!p[market].rules.some(rule => {
                                            if (rule.id == ruleId) {
                                                vm.rule = criteriaService.expendCriteriaObject(JSON.parse(JSON.stringify(rule)));
                                                vm.baseCriteria = vm.baseCriteria.filter(baseCriterion => vm.rule.criteria.every(criterion => criterion.attribute !== baseCriterion.attribute));
                                                return true;
                                            }
                                        })) {
                                        $location.path(`/platforms/strategies/${platform}/${market}`);
                                    }
                                }
                                else {
                                    vm.rule = criteriaService.initializeRule(platform);
                                }
                                return true;
                            }
                        });
                        spinnerService.off();
                    });
                }
            }
        }
    }

    angular
        .module('app')
        .controller('StrategyEditController', StrategyEditController);
})();
