import { userData } from './../../config/userdata';

type Metadata ={
  Kurzname:string;
  Entwickler:string;
  Leitidee:string;
  Leitidee_Name:string;
  Aufgabenzeit:string;
  Stimuluszeit:string;
  Itemanzahl:string;
  Itemformat:string;
  Anforderungsbereich:string;
  BiSta_Inhalt_Primar:string;
  BiSta_Inhalt_Sekundar:string;
  BiSta_Prozess_Primar:string;
  BiSta_Prozess_Sekundar:string;
  Itemzeit:string;
  Schwierigkeit:string;
  Aktueller_Arbeitsbereich:string;
  Aktuelle_Gruppe:string;
  Aktueller_Link:string;
}

function getCheckBoxByName(name: string, level:number=1, additionalText: string =""){
  if (level===1)
    cy.get('span')
        .contains(new RegExp("^"+ additionalText + name +"$"))
        .prev()
        .click();
  else
    cy.get('span')
        .contains(new RegExp("^" + additionalText+ name +"$"))
        .prev()
        .prev()
        .click();
  cy.get('.mat-mdc-dialog-actions').contains('Bestätigen').click();
}

function getTime(time: string, propName:string):any{
  const minAuf= time.split(':')[0];
  const secAuf= time.split(':')[1];

  cy.get('div.label.ng-star-inserted')
      .contains(propName)
      .prevUntil('.duration-container > div > mat-form-field > div')
      .find('input').as('aufgabenzeit');
  if (minAuf!=='00' && typeof minAuf !== 'undefined'){
    cy.get('@aufgabenzeit')
        .eq(0)
        .type(minAuf);
  }
  if (secAuf!=='00' && typeof secAuf !== 'undefined') {
    cy.get('@aufgabenzeit')
        .eq(1)
        .type(secAuf);
  }
}

function insertOneRecord( record: Metadata ){

  cy.contains(record.Kurzname).click();


  //Aufgabe
  cy.get('mat-label:contains("Entwickler")').type(record.Entwickler);
  cy.get('mat-label:contains("Leitidee")').click();
  getCheckBoxByName(record.Leitidee_Name,2, 'Leitidee ');
  getTime(record.Aufgabenzeit, 'Aufgabenzeit');
  getTime(record.Stimuluszeit, 'Stimuluszeit' );

  // Item
  cy.get('.add-button > .mdc-button__label').click();
  cy.get('mat-expansion-panel:contains("ohne ID")').click();
  cy.get('mat-label:contains("Item ID *")').type('01');
  cy.get('mat-label:contains("Itemformat")').click();
  getCheckBoxByName(record.Itemformat,1 );
  cy.get('mat-label:contains("Anforderungsbereich")').click();
  getCheckBoxByName(record.Anforderungsbereich, 1);
  getTime(record.Itemzeit, 'Itemzeit' );
  cy.get('mat-label:contains("Schwierigkeit")').click();
  getCheckBoxByName(record.Schwierigkeit,2);

  cy.pause();
}



describe('insert metadata', () => {
  beforeEach(function(){
    cy.viewport(1600, 900);

  });

  // afterEach(function(){
  //   cy.get('.mat-icon').click();
  //   cy.get('[studiolitelogout=""] > .mat-mdc-menu-item').click();
  //   cy.get('.mat-mdc-dialog-actions').contains('Abmelden').click();
  // });

  it('visit', () => {
    cy.visit('https://www.iqb-studio.de/');
    cy.get('#mat-input-0').type(userData.user_name);
    cy.get('#mat-input-1').type(userData.user_pass);
    cy.get('button > .mdc-button__label').click();
    cy.contains('Yan').click();
    cy.fixture('record').then((record) => {
           record.forEach((r: Metadata) => {
             insertOneRecord(r);
           });
    });
  });


});
