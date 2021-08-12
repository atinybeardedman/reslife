describe('room inspection', () => {
    beforeEach(() => {
        cy.visit('/room-inspection');
        cy.get('.page-title').contains('Student Signout');
    })

    it('should show the correct page title');

    it('should allow the dorm and date to be selected');

    it('should display the two lists');

    it('should allow passing a student');

    it('should allow failing a student');

    it('should allow a reversing a status of a student already inspected')
})