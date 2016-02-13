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

(() => {
    'use strict';

    class constantsService {
        constructor() {
        }

        get platformsImgExtensions() {
            return {
                'lendingClub': 'png',
                'prosper': 'png',
                'bondora': 'png',
                'ratesetter': 'jpg',
                'fundingCircle': 'jpeg'
            };
        }

        platforms() {
            return ['lendingClub', 'prosper', 'bondora', 'ratesetter', 'fundingCircle'];
        }
    }

    angular
        .module('app')
        .service('constantsService', constantsService);
})();