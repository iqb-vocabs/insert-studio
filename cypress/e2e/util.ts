import Chainable = Cypress.Chainable;

export const visitLoginPage = (): Chainable => cy.url()
    .then(url => {
        cy.visit(<string>Cypress.config().baseUrl);
    });

export const insertCredentials = (username: string, password = ''): void => {
    //cy.get("#mat-input-0") gut
    cy.get('input[placeholder="Anmeldename"]')
        .should('exist')
        .clear()
        .type(username);
    if (password) {
        //cy.get("#mat-input-1") gut
        cy.get('input[placeholder="Kennwort"]')
            .should('exist')
            .clear()
            .type(password);
    }
};

export const clickButtonToAccept = (text: string):void =>{
    cy.get('button')
        .contains(text)
        .should('exist')
        .click();
}

export const logout = () => {
    //TODO selector
    cy.get('.mat-mdc-menu-trigger > .mdc-button__label > studio-lite-wrapped-icon > .center-icon > .mat-icon').click()
    cy.get('span:contains("Abmelden")')
        .should('exist')
        .click();
    //TODO  dont use systematically wait
    cy.wait(400);
    clickButtonToAccept("Abmelden");
}

export const changePassword = (newPass:string, oldPass:string):void => {
    cy.get('.mat-mdc-menu-trigger > .mdc-button__label > studio-lite-wrapped-icon > .center-icon > .mat-icon').click()
    cy.get('span:contains("Kennwort ändern")')
        .should('exist')
        .click();
    //TODO  dont use systematically wait
    cy.wait(400);
    cy.get('mat-label:contains("Altes Kennwort")')
        .should('exist')
        .type(oldPass);
    cy.get('mat-label:contains("Neues Kennwort")')
        .eq(0)
        .should('exist')
        .type(newPass);
    cy.get('mat-label:contains("Neues Kennwort (Wiederholung)")')
        .should('exist')
        .type(newPass);
    clickButtonToAccept("Speichern");
}

