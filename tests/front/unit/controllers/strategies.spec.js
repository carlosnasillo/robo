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

describe('StrategiesController', () => {
    let strategiesController, cssInjector;

    beforeEach(module('app'));

    beforeEach(() => {
        cssInjector = jasmine.createSpyObj('cssInjector', ['add']);
    });

    beforeEach(inject(($controller) => {
        strategiesController = $controller('StrategiesController', {
            cssInjector: cssInjector
        });
    }));

    describe('cssInjection', () => {
        it('should inject Homer css stylesheet on initialization', () => {
            expect(cssInjector.add).toHaveBeenCalledWith('assets/stylesheets/homer_style.css');
        });
    });

    describe('totalExpect', () => {
        it('should return the sum of all expected returns', () => {
            const input = {rules: [{expectedReturn: { value: 1200 } }, {expectedReturn: { value: 4800 } }]};
            const result = strategiesController.totalExpected(input);
            expect(result).toBe(6000);
        });

        it('should return 0 if there is no rule', () => {
            const result = strategiesController.totalExpected({rules: []});
            expect(result).toBe(0);
        });
    });
});