var path = require('path');
var Nightmare = require('nightmare');
var should = require('chai').should();

describe('Nightmare demo', function () {
    this.timeout(15000); // Set timeout to 15 seconds, instead of the original 2 seconds

    //var url = 'http://localhost:3000';
    var url = 'http://localhost:4200/';

    describe('Start page', function () {
        it('should show form when loaded', function (done) {
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

   
});