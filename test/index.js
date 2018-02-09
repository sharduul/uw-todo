var path = require('path');
var Nightmare = require('nightmare');
var should = require('chai').should();
var expect = require('chai').expect;

describe('Nightmare demo', function () {
    this.timeout(15000); // Set timeout to 15 seconds, instead of the original 2 seconds

    //var url = 'http://localhost:3000';
    var url = 'http://localhost:4444/';

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
        url = 'http://localhost:4444/b/5a77cdd40effc733902fc5c8';
        //url = 'http://localhost:4200/';

        // before(function (done) {

        //     var nightmare = Nightmare({ show: false })
        //     nightmare
        //         .goto(url)
        //         .wait('.boards-wrapper .board')
        //         .evaluate(function () {
        //             originalCount = document.querySelectorAll('.boards-wrapper .board').length;
        //             return originalCount;
        //         })
        //         .then(function (originalCount) {
        //             if(originalCount < 2){
                        
        //             }
        //             else {
        //                 nightmare
        //                     .wait('.boards-wrapper .board')
        //                     .click('.boards-wrapper .board')
        //                     .then(function () {
        //                         done();
        //                     })
        //             }
        //         })

        // });



        // it('should add card to the board', function (done) {
        //     var originalCount = 0;
        //     var newCount = 0;
        //     var nightmare = Nightmare({ show: false })

        //     nightmare
        //         .goto(url)
        //         .wait('.card-list')
        //         .evaluate(function () {
        //             originalCount = document.querySelectorAll('.card-list li.card').length;
        //             return originalCount;
        //         })
        //         .then(function (originalCount) {

        //             console.log(originalCount);

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
        //         .wait('.card-list')
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


        // it('should add description to card', function (done) {
        //     var nightmare = Nightmare({ show: false })

        //     nightmare
        //         .goto(url)
        //         .wait('.card-edit-btn')
        //         .evaluate(()=>{
        //             var elements = document.querySelectorAll('.card-edit-btn');
        //             elements[0].click();
        //         })
        //         .wait('textarea.description')
        //         .evaluate(function () {
        //             var elements = document.querySelectorAll('textarea.description');
        //             elements[0].value = ""; // clear description
        //         })
        //         .type('textarea.description', 'test')
        //         .type('body', '\u000d') // enter key
        //         .evaluate(()=>{
        //             var elements = document.querySelectorAll('.card-edit-btn');
        //             elements[0].click();
        //         })
        //         .then(function () {
        //             nightmare
        //                 .evaluate(()=>{
        //                     var elements = document.querySelectorAll('.card-edit-btn');
        //                     elements[0].click();
        //                 })
        //                 .wait('textarea.description')
        //                 .evaluate(function () {
        //                     var elements = document.querySelectorAll('textarea.description');
        //                     return elements[0].value;
        //                 })
        //                 .then(function (value) {
        //                     expect(value).to.equal("test");
        //                     done();
        //                 })
        //         })
        // });

        // it('should add start date to card', function (done) {
        //     var nightmare = Nightmare({ show: false })

        //     nightmare
        //         .goto(url)
        //         .wait('.card-edit-btn')
        //         .evaluate(()=>{
        //             var elements = document.querySelectorAll('.card-edit-btn');
        //             elements[0].click();
        //         })
        //         .wait('.date-picker')
        //         .evaluate(function () {
        //             var elements = document.querySelectorAll('.date-picker');
        //             elements[0].value = ""; // clear date
        //         })
        //         .type('.date-picker', '01/01/2001')
        //         .type('body', '\u000d') // enter key
        //         .evaluate(()=>{
        //             var elements = document.querySelectorAll('.card-edit-btn');
        //             elements[0].click();
        //         })
        //         .then(function () {
        //             nightmare
        //                 .evaluate(()=>{
        //                     var elements = document.querySelectorAll('.card-edit-btn');
        //                     elements[0].click();
        //                 })
        //                 .wait('.date-picker')
        //                 .evaluate(function () {
        //                     var elements = document.querySelectorAll('.date-picker');
        //                     return elements[0].value;
        //                 })
        //                 .then(function (value) {
        //                     expect(value).to.equal("2001-01-01");
        //                     done();
        //                 })
        //         })
        // });


        // it('should mark card as done', function (done) {
        //     var nightmare = Nightmare({ show: false })

        //     nightmare
        //         .goto(url)
        //         .wait('.card-edit-btn')
        //         .evaluate(()=>{
        //             var elements = document.querySelectorAll('.card-edit-btn');
        //             elements[0].click();
        //         })
        //         .wait('.card-done')
        //         .evaluate(()=>{
        //             var elements = document.querySelectorAll('.card-done');
        //             elements[0].click();
        //         })
        //         .then(function () {
        //             nightmare
        //                 .evaluate(()=>{
        //                     var elements = document.querySelectorAll('.card-edit-btn');
        //                     elements[0].click();
        //                 })
        //                 .wait('.card-done')
        //                 .evaluate(function () {
        //                     var elements = document.querySelectorAll('.card-done');
        //                     return elements[0].textContent.trim() || elements[0].innerText.trim();
        //                 })
        //                 .then(function (value) {
        //                     expect(value).to.equal("Mark as Done");
        //                     done();
        //                 })
        //         })
        // });



        // it('should add effort', function (done) {
        //     var nightmare = Nightmare({ show: true })

        //     nightmare
        //         .goto(url)
        //         .wait('.card-edit-btn')
        //         .evaluate(()=>{
        //             var elements = document.querySelectorAll('.card-edit-btn');
        //             elements[0].click();
        //         })
        //         .wait('.card-effort')
        //         .select('.card-effort', '3')
        //         .then(function () {
        //             nightmare
        //                 .evaluate(function () {
        //                     return document.querySelector('.card-effort').value;
        //                   })
        //                 .then(function (value) {
        //                     expect(value).to.equal("3");
        //                     done();
        //                 });
        //         })
        // });

        // it('should copy card', function (done) {
        //     var nightmare = Nightmare({ show: false });
        //     var originalCardTitle = "";

        //     nightmare
        //         .goto(url)
        //         .wait('.card-copy-btn')
        //         .evaluate(()=>{
        //             var allCards = document.querySelectorAll('.card-list li.card');
        //             var firstCard = allCards[0];
        //             originalCardTitle = firstCard.querySelector('.card-name span').innerHTML;

        //             var elements = document.querySelectorAll('.card-copy-btn');
        //             elements[0].click();

        //             return originalCardTitle;
        //         })
        //         .then(function (value) {
        //             originalCardTitle = value;
        //         })
        //         .then(function () {
        //             nightmare
        //                 .evaluate(()=>{
        //                     var allCards = document.querySelectorAll('.card-list li.card');
        //                     var lastCard = allCards[allCards.length - 1];
        //                     var cardTitle = lastCard.querySelector('.card-name span').innerHTML;

        //                     return cardTitle;
        //                 })
        //                 .then(function (value) {
        //                     expect(value).to.equal(originalCardTitle);
        //                     done();
        //                 });
        //         })
        // });


        // it('should delete column from the board', function (done) {
        //     var originalCount = 0;
        //     var newCount = 0;
        //     var nightmare = Nightmare({ show: false })

        //     nightmare
        //         .goto(url)
        //         .wait('.ui-sortable')
        //         .evaluate(function () {
        //             originalCount = document.querySelectorAll('.sortable-column').length;
        //             return originalCount;
        //         })
        //         .then(function (value) {
        //             originalCount = value;
        //         })
        //         .then(function () {
        //             nightmare
        //                 .wait('div.column-header .column-actions i')
        //                 .click('div.column-header .column-actions i')
        //                 .wait('div.column-header .column-actions ._actions-dropdown')
        //                 .evaluate(function () {
        //                     elements = document.querySelectorAll('div.column-header .column-actions ._actions-dropdown ._item');
        //                     for (var i = 0; i < elements.length; i++) { 
        //                         if (elements[i].innerHTML.startsWith('Delete')) {
        //                             elements[i].click();
        //                             break;
        //                         }
        //                     }
        //                 })
        //                 .evaluate(function () {
        //                     newCount = document.querySelectorAll('.sortable-column').length;
        //                     return newCount;
        //                 })
        //                 .then(function () {
        //                     expect(newCount).to.equal(originalCount - 1);
        //                     done();
        //                 })
        //         })
        // });


        // it('should copy column', function (done) {
        //     var nightmare = Nightmare({ show: true });
        //     var originalColumnTitle = "";

        //     nightmare
        //         .goto(url)
        //         .wait('.ui-sortable')
        //         .wait('div.column-header .column-actions i')
        //         .click('div.column-header .column-actions i')
        //         .wait('div.column-header .column-actions ._actions-dropdown')
        //         .evaluate(function () {
        //             var elements = document.querySelectorAll('div.column-header .column-actions ._actions-dropdown ._item');
        //             for (var i = 0; i < elements.length; i++) { 
        //                 if (elements[i].innerHTML.startsWith('Copy')) {
        //                     elements[i].click();
        //                     break;
        //                 }
        //             }
        //         })
        //         .evaluate(()=>{
        //             var allColumns = document.querySelectorAll('.sortable-column');
        //             var firstColumn = allColumns[0];
        //             originalColumnTitle = firstColumn.querySelector('.column .column-header h4').innerHTML;

        //             return originalColumnTitle;
        //         })
        //         .then(function (value) {
        //             originalColumnTitle = value;
        //         })
        //         .then(function () {
        //             nightmare
        //                 .evaluate(()=>{
        //                     var allColumns = document.querySelectorAll('.sortable-column');
        //                     var lastColumn = allColumns[allColumns.length - 1];
        //                     var columnTitle = lastColumn.querySelector('.column .column-header h4').innerHTML;

        //                     return columnTitle;
        //                 })
        //                 .then(function (value) {
        //                     expect(value).to.equal(originalColumnTitle);
        //                     done();
        //                 });
        //         })
        // });


        // it('should sort column by title', function (done) {
        //     var nightmare = Nightmare({ show: true });
        //     var indexCard1 = -1;
        //     var indexCard2 = -1;

        //     nightmare
        //         .goto(url)
        //         .wait('.card-list')
        //         .wait('div.add-card')
        //         .click('div.add-card')
        //         .wait('div.add-card .add-card-input')
        //         .type('div.add-card .add-card-input', 'card 2')
        //         .type('body', '\u000d') // enter key
        //         .wait('div.add-card')
        //         .click('div.add-card')
        //         .wait('div.add-card .add-card-input')
        //         .type('div.add-card .add-card-input', 'card 1')
        //         .type('body', '\u000d') // enter key

        //         // Sort by title
        //         .wait('.ui-sortable')
        //         .wait('div.column-header .column-actions i')
        //         .click('div.column-header .column-actions i')
        //         .wait('div.column-header .column-actions ._actions-dropdown')
        //         .evaluate(function () {
        //             var elements = document.querySelectorAll('div.column-header .column-actions ._actions-dropdown ._item');
        //             for (var i = 0; i < elements.length; i++) { 
        //                 if (elements[i].innerHTML.startsWith('Sort By Title')) {
        //                     elements[i].click();
        //                     break;
        //                 }
        //             }
        //         })
        //         .evaluate(function () {
        //             var allCards = document.querySelectorAll('.card-list li.card');

        //             for (var i = 0; i < allCards.length; i++) { 
        //                 var cardName = allCards[i].querySelector('.card-name span').innerHTML;
        //                 if (cardName.startsWith('card 1')) {
        //                     indexCard1 = i;
        //                 }

        //                 if (cardName.startsWith('card 2')) {
        //                     indexCard2 = i;
        //                 }
        //             }

        //             return [indexCard1, indexCard2];

        //         })
        //         .then(function (value) {
        //             indexCard1 = value[0];
        //             indexCard2 = value[1];

        //             expect(indexCard2).to.be.above(indexCard1);
        //             done();
        //         });
              
        // });




         //     nightmare
        //         .goto(url)
        //         .wait('.card-edit-btn')
        //         .evaluate(()=>{
        //             var elements = document.querySelectorAll('.card-edit-btn');
        //             elements[0].click();
        //         })
        //         .wait('.card-effort')
        //         .select('.card-effort', '3')
        //         .then(function () {
        //             nightmare
        //                 .evaluate(function () {
        //                     return document.querySelector('.card-effort').value;
        //                   })
        //                 .then(function (value) {
        //                     expect(value).to.equal("3");
        //                     done();
        //                 });
        //         })




        it('should sort column by start date', function (done) {
            var nightmare = Nightmare({ show: true });
            var indexCard1 = -1;
            var indexCard2 = -1;
            var currentCard = null;
            var editBtn = null;

            nightmare
			.goto(url)
			.wait('.card-list')

			// // Add first card
			// .wait('div.add-card')
			// .click('div.add-card')
			// .wait('div.add-card .add-card-input')
			// .type('div.add-card .add-card-input', 'card 1')
			// .type('body', '\u000d') // enter key
			
			// // Add second card
			// .wait('div.add-card')
			// .click('div.add-card')
			// .wait('div.add-card .add-card-input')
			// .type('div.add-card .add-card-input', 'card 2')
			// .type('.date-picker', '\u000d') // enter key
			// // .wait(2000)

			// Change date of first card
			.evaluate(()=>{
				var allCards = document.querySelectorAll('.card-list>li');

				for (var i = 0; i < allCards.length; i++) { 
					currentCard = allCards[i];
					if (currentCard.querySelector('.card-name span').innerHTML.startsWith('card 1')) {
						break;
					}
				}

				editBtn = currentCard.querySelector('.card-actions .card-edit-btn');
				editBtn.click();
			})
			.wait('.card-effort')
			.evaluate(()=>{
				var select = currentCard.querySelector('.card-effort select');
				select.value = '3';
				editBtn.click();
			})
			.type('body', '\u000d')
			.then(function () {
				nightmare
				.wait('.card-list')
				.evaluate(()=>{
					var allCards = document.querySelectorAll('.card-list>li');

					for (var i = 0; i < allCards.length; i++) { 
						currentCard = allCards[i];
						if (currentCard.querySelector('.card-name span').innerHTML.startsWith('card 2')) {
							break;
						}
					}

					editBtn = currentCard.querySelector('.card-actions .card-edit-btn');
					editBtn.click();
				})
				.wait('.card-effort')
				.evaluate(()=>{
					var select = currentCard.querySelector('.card-effort select');
					select.value = '2';
					editBtn.click();
				})
				.type('body', '\u000d')
				.then(function (value) {

					nightmare
					// Sort By Effort
					.wait('.ui-sortable')
					.wait('div.column-header .column-actions i')
					.click('div.column-header .column-actions i')
					.wait('div.column-header .column-actions ._actions-dropdown')
					.evaluate(function () {
						var elements = document.querySelectorAll('div.column-header .column-actions ._actions-dropdown ._item');
						for (var i = 0; i < elements.length; i++) { 
							if (elements[i].innerHTML.startsWith('Sort By Effort')) {
								elements[i].click();
								break;
							}
						}
					})

					.evaluate(function () {
						var allCards = document.querySelectorAll('.card-list li.card');

						for (var i = 0; i < allCards.length; i++) { 
							var cardName = allCards[i].querySelector('.card-name span').innerHTML;
							if (cardName.startsWith('card 1')) {
								indexCard1 = i;
							}

							if (cardName.startsWith('card 2')) {
								indexCard2 = i;
							}
						}

						return [indexCard1, indexCard2];

					})
					.then(function (value) {
						indexCard1 = value[0];
						indexCard2 = value[1];

						expect(indexCard1).to.be.above(indexCard2);
						done();
					});
				});

			})
			
        });

    });
   
});

