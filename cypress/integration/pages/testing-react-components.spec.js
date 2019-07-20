context('Testing React Components', () => {
  beforeEach(() => {
    cy.visit('/testing-react-components')
  })

  it('has at least 4 nav links at the top of the page', () => {
    throw new Error('Implement me!');
  });

  it('has at least code block example on the page', () => {
    throw new Error('Implement me!');
  });

  it(`has a 'Show Tips' button`, () => {
    throw new Error('Implement me!');
  });

  it(`launches the tips modal when its 'Show Tips' button is clicked, and clears it when pressing escape`, () => {
    throw new Error('Implement me!');
  });
});

/*********************************************************************
 *         Don't look below here unless you want the answer!         *
 * Try your best, but if you get stuck, you have this to reflect on! *
 *********************************************************************/






























/**
 *  it('has at least 4 nav links at the top of the page', () => {
 *    cy.get('header .nav-item a')
 *      .should('have.length.of.at.least', 4);
 *  });
 *
 *  it('has at least code block example on the page', () => {
 *    cy.get('.code-block')
 *      .should('have.length.of.at.least', 1);
 *  });
 *
 *  it(`has a 'Show Tips' button`, () => {
 *    cy.get('.content .btn-primary')
 *      .should('have.length', 1);
 *  });
 *
 *  it(`launches the tips modal when its 'Show Tips' button is clicked, and clears it when pressing escape`, () => {
 *    cy.get('.modal').should('have.length', 0);
 *
 *    cy.get('.content .btn-primary')
 *      .click();
 *
 *    cy.get('.modal')
 *      .should('have.length', 1)
 *      .type('{esc}')
 *      .should('have.length', 0);
 *  });
 **/
