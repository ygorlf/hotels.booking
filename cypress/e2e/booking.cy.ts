describe('booking spec', () => {
  it('should book a hotel', () => {
    cy.visit('http://localhost:5173');

    cy.get("[data-testid='hotel-card-button']")
      .eq(0)
      .click();

    cy.get(".react-calendar__tile--now")
      .click();

    cy.get(".react-calendar__tile--now")
      .next()
      .next()
      .next()
      .click();

    cy.get("[data-testid='book-page-button']")
      .click();

    cy.location().should(loc => {
      expect(loc.pathname).to.equal('/books')
    });

    cy.get("[data-testid='book-card']")
      .should('have.length', 1)
  })

  it('should open a booking', () => {
    
  })

  it('should update a booking', () => {

  })

  it('should delete a booking', () => {

  })
})