describe('Blog list E2E tests', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset');
		cy.visit('http://localhost:3000');
	});

	it('Login form shown first', function () {
		cy.contains('Log in');
	});
});
