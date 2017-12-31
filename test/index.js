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
        url = 'http://localhost:4200/b/5a49314288c29bcc59edd40b';

        // it('should add card to the board', function (done) {
        //     var originalCount = 0;
        //     var newCount = 0;
        //     var nightmare = Nightmare({ show: false })

        //     nightmare
        //         .goto(url)
        //         .wait('.card-list li.card')
        //         .evaluate(function () {
        //             originalCount = document.querySelectorAll('.card-list li.card').length;
        //             return originalCount;
        //         })
        //         .then(function (originalCount) {
        //             nightmare
        //                 .wait('div.add-card')
        //                 .click('div.add-card')
        //                 .wait('div.add-card .add-card-input')
        //                 .type('div.add-card .add-card-input', 'github nightmare')
        //                 .type('body', '\u000d') // enter key
        //                 .evaluate(function () {
        //                     newCount = document.querySelectorAll('.card-list li.card').length;
        //                     return newCount;
        //                 })
        //                 .then(function (newCount) {
        //                     expect(newCount).to.equal(originalCount + 1);
        //                     done();
        //                 })
        //         })
        // });

        // it('should delete card from the board', function (done) {
        //     var originalCount = 0;
        //     var newCount = 0;
        //     var nightmare = Nightmare({ show: false })

        //     nightmare
        //         .goto(url)
        //         .wait('.card-list li.card')
        //         .evaluate(function () {
        //             originalCount = document.querySelectorAll('.card-list li.card').length;
        //             return originalCount;
        //         })
        //         .then(function () {
        //             nightmare
        //                 .wait('div.card-name .card-delete-btn')
        //                 .click('div.card-name .card-delete-btn')
        //                 .evaluate(function () {
        //                     newCount = document.querySelectorAll('.card-list li.card').length;
        //                     return newCount;
        //                 })
        //                 .then(function () {
        //                     expect(newCount).to.equal(0);
        //                     done();
        //                 })
        //         })
        // });


        it('should add description to card', function (done) {
            var nightmare = Nightmare({ show: false })

            nightmare
                .goto(url)
                .wait('.card-edit-btn')
                .evaluate(()=>{
                    var elements = document.querySelectorAll('.card-edit-btn');
                    elements[0].click();
                })
                .wait('textarea.description')
                .evaluate(function () {
                    var elements = document.querySelectorAll('textarea.description');
                    elements[0].value = ""; // clear description
                })
                .type('textarea.description', 'test')
                .type('body', '\u000d') // enter key
                .evaluate(()=>{
                    var elements = document.querySelectorAll('.card-edit-btn');
                    elements[0].click();
                })
                .then(function () {
                    nightmare
                        .evaluate(()=>{
                            var elements = document.querySelectorAll('.card-edit-btn');
                            elements[0].click();
                        })
                        .wait('textarea.description')
                        .evaluate(function () {
                            var elements = document.querySelectorAll('textarea.description');
                            return elements[0].value;
                        })
                        .then(function (value) {
                            expect(value).to.equal("test");
                            done();
                        })
                })
        });


    });
   
});