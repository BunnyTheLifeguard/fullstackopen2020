describe('Blog list E2E tests', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset');
		const user1 = {
			name: 'Homer J. Simpson',
			username: 'homersimpson',
			password: 'donuts',
		};
		const user2 = {
			name: 'King Leonidas',
			username: 'KingOfSparta',
			password: 'Sparta300',
		};
		cy.request('POST', 'http://localhost:3001/api/users/', user1);
		cy.request('POST', 'http://localhost:3001/api/users/', user2);
		cy.visit('http://localhost:3000');
	});

	it('Login form shown first', function () {
		cy.contains('Log in');
		cy.contains('Username');
		cy.contains('Password');
	});

	describe('Login functionality', function () {
		it('Successful login with correct credentials', function () {
			cy.get('#username').type('homersimpson');
			cy.get('#password').type('donuts');
			cy.get('#loginButton').click();

			cy.get('.notification').contains('Successful login');
		});

		it('Failed login with wrong credentials', function () {
			cy.get('#username').type('homersimpson');
			cy.get('#password').type('duffbeer');
			cy.get('#loginButton').click();

			cy.get('.error').contains('Wrong');
		});

		it('Error message color is red', function () {
			cy.get('#username').type('homersimpson');
			cy.get('#password').type('duffbeer');
			cy.get('#loginButton').click();
			cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
		});
	});

	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'homersimpson', password: 'donuts' });
		});

		it('A blog can be created', function () {
			cy.contains('Add Blog').click();
			cy.get('#title').type('Mhh, Donuts');
			cy.get('#author').type('Homer J. Simpson');
			cy.get('#url').type('www.donuts.com');
			cy.get('#saveBlog').click();
			cy.contains('Mhh, Donuts');
		});

		it('Blog can be liked', function () {
			cy.contains('Add Blog').click();
			cy.get('#title').type('Mhh, Donuts');
			cy.get('#author').type('Homer J. Simpson');
			cy.get('#url').type('www.donuts.com');
			cy.get('#saveBlog').click();

			cy.get('.noDetails').contains('View').click();
			cy.get('.showDetails').contains('Like').click();
			cy.get('.showDetails').contains('1');
		});

		it('Blog can be deleted', function () {
			cy.contains('Add Blog').click();
			cy.get('#title').type('Mhh, Donuts');
			cy.get('#author').type('Homer J. Simpson');
			cy.get('#url').type('www.donuts.com');
			cy.get('#saveBlog').click();

			cy.get('.noDetails').contains('View').click();
			cy.get('.showDetails').contains('Remove').click();
			cy.get('html').should('not.contain', 'Mhh, Donuts');
		});

		it('Blog can not be deleted by other user', function () {
			cy.contains('Add Blog').click();
			cy.get('#title').type('Mhh, Donuts');
			cy.get('#author').type('Homer J. Simpson');
			cy.get('#url').type('www.donuts.com');
			cy.get('#saveBlog').click();

			cy.contains('Logout').click();

			cy.get('#username').type('KingOfSparta');
			cy.get('#password').type('Sparta300');
			cy.get('#loginButton').click();

			cy.get('.noDetails').contains('View').click();
			cy.get('#remove').should('not.be.visible', 'Remove');
			cy.get('html').should('contain', 'Mhh, Donuts');
		});

		it('Check blog order w/ likes', function () {
			cy.createBlog({
				title: 'Mhh, Donuts',
				author: 'Homer J. Simpson',
				url: 'www.donuts.doh',
			});
			cy.contains('Mhh, Donuts').contains('View').click();
			for (let n = 0; n <= 3; n++) {
				cy.wait(250).contains('www.donuts.doh').contains('Like').click();
			}

			cy.createBlog({
				title: 'Duff Beer',
				author: 'Homer J. Simpson',
				url: 'www.duff.doh',
			});
			cy.contains('Duff Beer').contains('View').click();
			cy.contains('www.duff.doh').contains('Like').click();

			cy.createBlog({
				title: 'The Springfield Atoms',
				author: 'Homer J. Simpson',
				url: 'www.atoms.doh',
			});
			cy.contains('Mhh, Donuts').contains('View').click();
			cy.contains('Duff Beer').contains('View').click();
			cy.contains('The Springfield Atoms').contains('View').click();
			for (let n = 0; n <= 5; n++) {
				cy.wait(250).contains('www.atoms.doh').contains('Like').click();
			}

			cy.get('.blogList .noDetails')
				.first()
				.should('contain', 'Springfield Atoms')
				.next()
				.should('contain', 'Donuts')
				.next()
				.should('contain', 'Duff');
		});
	});
});
