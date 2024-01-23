import {changePassword, clickButtonToAccept, insertCredentials, logout, visitLoginPage} from "./util";
import {userData} from "../../config/userdata";

describe('Usermanagement (user-tab)', () => {

   it('should be possible login with credentials', () => {
      visitLoginPage();
      insertCredentials(userData.user_name, userData.user_pass);
      clickButtonToAccept('Weiter');
   });

   it('should not be able to login with incorrect credentials', () => {
      visitLoginPage();
      insertCredentials(userData.user_name, 'nopass');
      clickButtonToAccept('Weiter');
   });

   it('should be able setting button', () => {
      visitLoginPage();
      insertCredentials(userData.user_name, userData.user_pass);
      clickButtonToAccept('Weiter');
      // TODO change the selector, the actual one got from cypress, getting all setting icons and select the first one
      cy.get('div > .mat-mdc-tooltip-trigger.ng-star-inserted > .mdc-button__label > studio-lite-wrapped-icon > .center-icon > .mat-icon').eq(0).click();
      //cy.get('div[_ngcontent-ng-c133187538=""] > .mat-mdc-tooltip-trigger.ng-star-inserted > .mdc-button__label > studio-lite-wrapped-icon > .center-icon > .mat-icon').click();  //gut
   });

   it('should be possible log out if the user is logged', () => {
      visitLoginPage();
      insertCredentials(userData.user_name, userData.user_pass);
      clickButtonToAccept('Weiter');
      logout();
   });

   it.only('should be possible change the password', () =>{
      visitLoginPage();
      insertCredentials(userData.user_name, userData.user_pass);
      clickButtonToAccept('Weiter');
      changePassword('newpass', userData.user_pass);
      logout();
      //TODO check with oldPass fails and restore the oldPass
   })

});