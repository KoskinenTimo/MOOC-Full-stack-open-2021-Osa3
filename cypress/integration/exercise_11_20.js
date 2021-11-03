/* eslint-disable no-undef */
describe('Phonebook', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3001');
    cy.contains('Phonebook');
    cy.contains('Add new');
    cy.contains('Numbers');
  });
});