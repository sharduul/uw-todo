var path = require('path');
var Nightmare = require('nightmare');
var should = require('chai').should();
var expect = require('chai').expect;

describe('Nightmare demo', function () {
    this.timeout(15000); // Set timeout to 15 seconds, instead of the original 2 seconds

    //var url = 'http://localhost:3000';
    var url = 'http://localhost:4200/';

    describe('Start page', function () {
        it('should show headline when loaded', function (done) {
            new Nightmare()
                .goto(url)
                .evaluate(function () {
                    return document.querySelectorAll('app-root h1').length;
                })
                .run(function(err, result){
                    result.should.equal(1);
                    done();
                });
        });
    });

    describe('Board page', function () {
        url = 'http://localhost:4200/b/5a0b830fe4468fef1806a6e2';

        it('should add card to the board', function (done) {
            var originalCount = 0;
            var newCount = 0;
            var nightmare = Nightmare({ show: false })

            nightmare
                .goto(url)
                .wait('.card-list li.card')
                .evaluate(function () {
                    originalCount = document.querySelectorAll('.card-list li.card').length;
                    return originalCount;
                })
                .then(function (originalCount) {
                    nightmare
                        .wait('div.add-card')
                        .click('div.add-card')
                        .wait('div.add-card .add-card-input')
                        .type('div.add-card .add-card-input', 'github nightmare')
                        .type('body', '\u000d') // enter key
                        .evaluate(function () {
                            newCount = document.querySelectorAll('.card-list li.card').length;
                            return newCount;
                        })
                        .then(function (newCount) {
                            expect(newCount).to.equal(originalCount + 1);
                            done();
                        })
                })
        });
    });

   
});