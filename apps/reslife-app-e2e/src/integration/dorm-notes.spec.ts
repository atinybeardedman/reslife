import { getDateString } from '@reslife/utils';
const today = getDateString();
describe('dorm-notes', () => {
    beforeEach(() => {
      cy.visit('/dorm-notes');
    });
  
    it('should display the dorm-notes page', () => {
      cy.get('.page-title').should('contain.text', 'Dorm Notes');
    });


    describe('the notes', () => {
      beforeEach(() => {
        cy.callFirestore('get', 'configuration/dorm-notes').then(snap => {
          const fields = snap.fields as string[];
          cy.callFirestore('set', `dorm-notes/${today}+Reagan`, {
            dorm: 'Reagan',
            date: today
          });
          for(const [i, field] of fields.entries()){
            
            cy.callFirestore('set', `dorm-notes/${today}+Reagan/notes/`+i, {
              fieldName: field,
              note: '',
              order: i + 1,
              isLocked: false,
              uid: i + ''
            });
          }
        })
        cy.get('[data-testid="picker-date"]').as('date-input');
        cy.get('[data-testid="dorm-select"]').as('dorm-select');
        cy.get('@dorm-select')
          .focus()
          .click()
          .then(() => {
            cy.get('mat-option').contains('Reagan').click();
          });
      })

        it('should allow the user to enter notes for the selected date', () => {
         
          cy.get('textarea#Room-Inspections').clear().type('All passed');
          cy.clock();
          cy.tick(1100);
          cy.clock().then(clock => clock.restore());
          cy.callFirestore('get', `dorm-notes/${today}+Reagan/notes/0`).then(d => {
            expect(d.note).to.eq('All passed');
          })


        });
    })
});