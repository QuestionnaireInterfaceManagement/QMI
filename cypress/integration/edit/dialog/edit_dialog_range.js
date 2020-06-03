describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('This test shows how a user would toggle the visibility of a range question to be hidden', () => {
        cy.hideQuestion('range');
    });
    it('This test shows how a user would change the text of a range question certain option', () => {
        cy.changeOptionOfItem('range');
    });
    it('How a user would delete an option of a range question', () => {
        cy.dragFromSidebar('range');
        const option3 = "option 3";
        cy.get('div[id="1"]')
            .click()
            .get('[data-cy=question1]').contains(option3);
        cy.get('[data-cy=edit1]')
            .click();
        cy.get('[data-cy=delete3]')
            .click({force: true});
        cy.get('[data-cy=submit1]')
            .click();
        cy.get('div[id="1"]')
            .click();
        cy.get('[data-cy=question1]').contains(option3).should('not.exist');
    });
    it('How a user would double tap on a title of a range question to make a change from the current title', () => {
        cy.doubleQuestionClickToEditTitle('range');
    });
    it('How a user would double tap on a title of a range question without making a change to the title', () => {
        cy.doubleQuestionClickToEditTitleWithoutChange('range');
    });
    it('How a user would select this type of question to set section end as true ', () => {
        cy.enableSectionEnd('range');
    });
    it('How a user would set the text of a certain tooltip for a specific question', () => {
        cy.enableToolTipText('range');
    });
    it('How a user would set the text of a certain tooltip for a specific question', () => {
        cy.enableToolTipText('range');
    });
    it('How a user would set a specific min, max and step for a range question', () => {
        const maximum = 'max';
        const minimum = 'min';
        const step = 'step';
        const maximumProperty = `"${maximum}":`;
        const minimumProperty = `"${minimum}":`;
        const stepProperty = `"${step}":`;
        cy.changePropertyOptions('range', maximum, minimum, step, maximumProperty, minimumProperty, stepProperty);
    });
});
