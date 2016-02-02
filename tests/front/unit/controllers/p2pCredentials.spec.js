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

describe('SignupP2pCredentialsController', () => {
    let p2pCredentialsController,
        $cookieStore,
        $location;

    beforeEach(() => {
        module('app');

        $cookieStore = jasmine.createSpyObj('$cookieStore', ['get', 'put']);
        $location = jasmine.createSpyObj('$location', ['path']);
    });

    beforeEach(inject(($controller) => {
        p2pCredentialsController = $controller('SignupP2pCredentialsController', {
            $cookieStore : $cookieStore,
            $location : $location
        });
    }));

    describe('initialization', () => {
        describe('data are present', () => {
            beforeEach(() => {
                $cookieStore.get.and.callFake(() => jasmine.any(String));
            });

            it('should get previous data', () => {
                expect($cookieStore.get).toHaveBeenCalledWith('signup.email');
                expect($cookieStore.get).toHaveBeenCalledWith('signup.password');
                expect($cookieStore.get).toHaveBeenCalledWith('signup.terms');
                expect($cookieStore.get).toHaveBeenCalledWith('signup.reason');
                expect($cookieStore.get).toHaveBeenCalledWith('signup.income');
                expect($cookieStore.get).toHaveBeenCalledWith('signup.timeline');
                expect($cookieStore.get).toHaveBeenCalledWith('signup.birthday');
                expect($cookieStore.get).toHaveBeenCalledWith('signup.platform');
                expect($cookieStore.get).toHaveBeenCalledWith('signup.extension');
            });
        });

        describe('data are NOT present', () => {
            beforeEach(() => {
                $cookieStore.get.and.callFake(() => undefined);
            });

            it('go back to first registration page', () => {
                expect($cookieStore.get).toHaveBeenCalledWith('signup.email');
                expect($cookieStore.get).toHaveBeenCalledWith('signup.password');
                expect($cookieStore.get).toHaveBeenCalledWith('signup.terms');
                expect($cookieStore.get).toHaveBeenCalledWith('signup.reason');
                expect($cookieStore.get).toHaveBeenCalledWith('signup.income');
                expect($cookieStore.get).toHaveBeenCalledWith('signup.timeline');
                expect($cookieStore.get).toHaveBeenCalledWith('signup.birthday');
                expect($cookieStore.get).toHaveBeenCalledWith('signup.platform');
                expect($cookieStore.get).toHaveBeenCalledWith('signup.extension');
                expect($location.path).toHaveBeenCalledWith('/signup');
            });
        });
    });

    describe('disableSubmitButton', () => {
        describe('with good values', () => {
            beforeEach(() => {
                p2pCredentialsController.accountId = "18974";
                p2pCredentialsController.apiKey = "1394";
            });

            it('should not disable the buttons', () => {
                expect(p2pCredentialsController.disableSubmitButton(() => false)).toBeFalsy();
            });
        });

        describe('with bad values', () => {
            describe('empty accountId', () => {
                beforeEach(() => {
                    p2pCredentialsController.apiKey = "2452";
                    p2pCredentialsController.accountId = undefined;
                });

                it('should disable the buttons', () => {
                    expect(p2pCredentialsController.disableSubmitButton(() => true)).toBeTruthy();
                });
            });

            describe('empty API key', () => {
                beforeEach(() => {
                    p2pCredentialsController.apiKey = undefined;
                    p2pCredentialsController.accountId = "89725";
                });

                it('should disable the buttons', () => {
                    expect(p2pCredentialsController.disableSubmitButton(() => true)).toBeTruthy();
                });
            });
        });
    });

    describe('submit', () => {
        describe('with good values', () => {
            beforeEach(() => {
                p2pCredentialsController.accountId = "18974";
                p2pCredentialsController.apiKey = "1394";
                p2pCredentialsController.submit();
            });

            it('should add values to cookies', () => {
                expect($cookieStore.put).toHaveBeenCalledWith('signup.accountId', p2pCredentialsController.accountId);
                expect($cookieStore.put).toHaveBeenCalledWith('signup.apiKey', p2pCredentialsController.apiKey);
            });

            it('should go to the personal infos page', () => {
                expect($location.path).toHaveBeenCalledWith('/signup/personalInfos');
            });
        });

        describe('with bad values', () => {
            describe('empty accountId', () => {
                beforeEach(() => {
                    p2pCredentialsController.apiKey = "2452";
                    p2pCredentialsController.accountId = undefined;
                    p2pCredentialsController.submit();
                });

                it('should not add anything to cookies', () => {
                    expect($cookieStore.put).not.toHaveBeenCalled();
                    expect($cookieStore.put).not.toHaveBeenCalled();
                });

                it('should stay on the current page', () => {
                    expect($location.path).not.toHaveBeenCalledWith('/signup/personalInfos');
                });
            });

            describe('empty API key', () => {
                beforeEach(() => {
                    p2pCredentialsController.apiKey = undefined;
                    p2pCredentialsController.accountId = "89725";
                    p2pCredentialsController.submit();
                });

                it('should not add anything to cookies', () => {
                    expect($cookieStore.put).not.toHaveBeenCalled();
                    expect($cookieStore.put).not.toHaveBeenCalled();
                });

                it('should stay on the current page', () => {
                    expect($location.path).not.toHaveBeenCalledWith('/signup/personalInfos');
                });
            });
        });
    });
});