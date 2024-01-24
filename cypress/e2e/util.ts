import Chainable = Cypress.Chainable;
import {userData} from "../../config/userdata";

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

export const loginAdmin=():void=>{
    insertCredentials(userData.user_name, userData.user_pass);
    cy.intercept('/api/login').as('asLogin');
    clickButtonToAccept('Weiter');
    cy.wait('@asLogin');
    cy.get(`li.ng-star-inserted:contains:"${userData.user_name}"`).should('exist');
}
export const clickButtonToAccept = (text: string):Chainable => cy.url()
    .then( url =>{
    cy.get('button')
        .contains(text)
        .should('exist')
        .click();
});
// export const clickButtonToAccept = (text: string):void =>{
//     cy.get('button')
//         .contains(text)
//         .should('exist')
//         .click();
// }

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

