describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('This test shows how a user would edit the title of a drawing question', () => {
        cy.dragFromSidebar('drawing');
        const newTitle = "new test title";
        cy.openEditDialog();
        cy.get('#title')
            .click({force: true})
            .type('{selectall}')
            .type(newTitle);
        cy.setRequiredDrawingProperties()
        cy.get('[data-cy=submit1]')
            .click();
        cy.get('div[id="1"]')
            .should('have.text', newTitle);
    });
    it('This test shows how a user would toggle the visibility of a drawing question to be hidden', () => {
        cy.hideQuestion('drawing');
    });
    it('How a user would double tap on a title of a drawing question to make a change from the current title', () => {
        cy.doubleQuestionClickToEditTitle('drawing');
    });
    it('How a user would double tap on a title of a drawing question without making a change to the title', () => {
        cy.doubleQuestionClickToEditTitleWithoutChange('drawing');
    });
    it('How a user would select this type of question to set section end as true ', () => {
        cy.enableSectionEnd('drawing');
    });
    it('How a user would set the text of a certain tooltip for a specific question', () => {
        cy.enableToolTipText('drawing');
    });
    it('How a user would set the radius and density for a draw question', () => {
        const drawingRadius = 'radius';
        const drawingDensity = 'density';
        const fullDrawingRadiusProperty = `"${drawingRadius}":`;
        const fullDrawingDensityProperty = `"${drawingDensity}":`;

        cy.dragFromSidebar('drawing');
        const valueToType = 100;
        cy.openEditDialog();
        cy.setRequiredDrawingProperties();
        cy.replaceText(drawingRadius, valueToType);
        cy.replaceText(drawingDensity, valueToType)

        cy.get('[data-cy=submit1]')
            .click({force: true});

        cy.checkJsoncontains("shouldExist", fullDrawingRadiusProperty, fullDrawingDensityProperty, '"height":', valueToType, valueToType, 400)

    });
});

