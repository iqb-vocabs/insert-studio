import {changePassword, clickButtonToAccept, insertCredentials, loginAdmin, logout, visitLoginPage} from "./util";
import {userData} from "../../config/userdata";

describe('Usermanagement (user-tab)', () => {
   beforeEach(visitLoginPage);
  // beforeEach(loginAdmin);
   
   it('should be possible login with credentials', () => {
      insertCredentials(userData.user_name, userData.user_pass);
      clickButtonToAccept('Weiter');
   });

   it('should not be able to login with incorrect credentials', () => {
      insertCredentials(userData.user_name, 'nopass');
      cy.intercept('POST','/api/login').as('responseLogin');
      clickButtonToAccept('Weiter');
      cy.wait('@responseLogin').its('response.statusCode').should('eq',401);

   });

   it('should be able setting button', () => {
      insertCredentials(userData.user_name, userData.user_pass);
      clickButtonToAccept('Weiter');
      // TODO change the selector, the actual one got from cypress, getting all setting icons and select the first one
      cy.get('div > .mat-mdc-tooltip-trigger.ng-star-inserted > .mdc-button__label > studio-lite-wrapped-icon > .center-icon > .mat-icon').eq(0).click();
      //cy.get('div[_ngcontent-ng-c133187538=""] > .mat-mdc-tooltip-trigger.ng-star-inserted > .mdc-button__label > studio-lite-wrapped-icon > .center-icon > .mat-icon').click();  //gut
   });

   it('should be possible log out if the user is logged', () => {
      insertCredentials(userData.user_name, userData.user_pass);
      clickButtonToAccept('Weiter');
      logout();
   });

   it('should be possible change the password', () =>{
      insertCredentials(userData.user_name, userData.user_pass);
      clickButtonToAccept('Weiter');
      changePassword('newpass', userData.user_pass);
      logout();

      visitLoginPage();
      insertCredentials(userData.user_name, userData.user_pass);
      cy.intercept('POST','/api/login').as('responseLogin');
      clickButtonToAccept('Weiter');
      cy.wait('@responseLogin').its('response.statusCode').should('eq',401);

      visitLoginPage();
      insertCredentials(userData.user_name, 'newpass');
      clickButtonToAccept('Weiter');
      changePassword(userData.user_pass,'newpass');
      logout();
   });

   it('user with admin credentials can add new user', () => {
      //TODO
   });
   it('user with admin credentials can delete user', () => {
      //TODO
   });


});