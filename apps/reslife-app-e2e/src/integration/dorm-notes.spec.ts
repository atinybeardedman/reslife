describe('dorm-notes', () => {
    beforeEach(() => {
      cy.visit('/dorm-notes');
    });
  
    it('should display the dorm-notes page', () => {
      cy.get('.page-title').should('contain.text', 'Dorm Notes');
    });

    describe('the picker', () => {
        it('should display the current day')

        it('should allow the user to pick a dorm')
    });

    describe('the notes', () => {
        it('should not allow editing of notes from more than 2 days ago');

        it('should allow the user to enter notes for today');
    })
});