
type Metadata = {
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

export const userData={
  user_name: 'yan',
  user_pass: 'newstudioforyan1'
};


function insertOneRecord( record: Metadata ){

  cy.visit(record.Aktueller_Link);
  console.log(record.Entwickler);

  //Aufgabe ************

  cy.get('#formly_7_input_de_0').type(record.Entwickler);
  // // Dialog Leitidee
  // cy.get('#mat-mdc-form-field-label-34 > .ng-tns-c1205077789-41').click();
  cy.get('#mat-mdc-chip-list-input-1').click();
  switch(record.Leitidee) {
    case '1':
      cy.get('#mat-mdc-checkbox-1-input').click();
      break;
    case '2':
      cy.get('#mat-mdc-checkbox-2-input').click();
      break;
    case '3':
      cy.get('#mat-mdc-checkbox-3-input').click();
      break;
    case '4':
      cy.get('#mat-mdc-checkbox-4-input').click();
      break;
    case '5':
      cy.get('#mat-mdc-checkbox-5-input').click();
      break;
    default:
      break;
  }
  cy.get('.mat-mdc-dialog-actions').contains('Bestätigen').click();

  // Aufgabenzeit
  const minAuf= record.Aufgabenzeit.split(':')[0];
  const secAuf= record.Aufgabenzeit.split(':')[1];
  if (minAuf!=='00' && typeof minAuf !== 'undefined'){
    cy.get('#mat-input-12').type(minAuf);
  }
  if (secAuf!=='00' && typeof secAuf !== 'undefined') {
    cy.get('#mat-input-13').type(secAuf);
  }

  // Stimuluszeit
  const minSt= record.Stimuluszeit.split(':')[0];
  const secSt= record.Stimuluszeit.split(':')[1];
  if (minSt!=='00' && typeof minSt !== 'undefined'){
    cy.get('#mat-input-14').type(minSt);
  }
  if (secSt!=='00' && typeof secSt !== 'undefined') {
    cy.get('#mat-input-15').type(secSt);
  }

  // Item ***************
  cy.get('.add-button > .mdc-button__label').click();
  cy.get('#mat-expansion-panel-header-5 > .mat-content > .mat-expansion-panel-header-title').click()

  //Item
  // cy.get('#mat-mdc-form-field-label-46 > .ng-tns-c1205077789-50').type('01');
  cy.get('#formly_13_input_id_0').type('01');

  //Itemformat
  cy.get('#mat-mdc-chip-list-input-2').click();
  switch(record.Itemformat) {
    case 'Multiple Choice (MC)':
      cy.get('#mat-mdc-checkbox-6-input').click() //Multiple Choice (MC)
      break;
    case 'Complex Multiple Choice (CMC)':
      cy.get('#mat-mdc-checkbox-7-input').click() //Complex Multiple Choice (CMC)
      break;
    case 'Zuordnen':
      cy.get('#mat-mdc-checkbox-8-input').click()   //Zuordnen
      break;
    case 'Umordnen':
      cy.get('#mat-mdc-checkbox-9-input').click()   //Umordnen
      break;
    case 'Markieren':
      cy.get('#mat-mdc-checkbox-10-input').click()   //Markieren
      break;
    case 'Einfärben':
      cy.get('#mat-mdc-checkbox-11-input').click()   //Einfärben
      break;
    case 'Zeichnen / Konstruieren':
      cy.get('#mat-mdc-checkbox-12-input').click()   //Zeichnen / Konstruieren
      break;
    case 'numerische Kurzantwort':
      cy.get('#mat-mdc-checkbox-13-input').click()   //numerische Kurzantwort
      break;
    case 'verbale Kurzantwort':
      cy.get('#mat-mdc-checkbox-14-input').click()  //verbale Kurzantwort
      break;
    case 'Langantwort':
      cy.get('#mat-mdc-checkbox-15-input').click()  //Langantwort
      break;
    default:
      break;
  }
  cy.get('.mat-mdc-dialog-actions').contains('Bestätigen').click();

  //Anforderungsbereich
  cy.get('#mat-mdc-chip-list-input-3').click();
  switch(record.Anforderungsbereich) {
    case '1':
      cy.get('#mat-mdc-checkbox-16-input').click(); //1
      break;
    case '2':
      cy.get('#mat-mdc-checkbox-17-input').click();  //2
      break;
    case '3':
      cy.get('#mat-mdc-checkbox-18-input').click();   //3
      break;
    default:
      break;
  }
  cy.get('.mat-mdc-dialog-actions').contains('Bestätigen').click();


  // Itemzeit
  const minItem= record.Itemzeit.split(':')[0];
  const secItem= record.Itemzeit.split(':')[1];
  if (minItem!=='00' && typeof minItem !== 'undefined'){
    cy.get('#mat-input-20').type(minItem);
  }
  if (secItem!=='00' && typeof secItem !== 'undefined') {
    cy.get('#mat-input-21').type(secItem);
  }

  // Schwerigkeit
  cy.get('#mat-mdc-chip-list-input-8').click();
  switch(record.Schwierigkeit){
    case 'sehr gering':
      cy.get('#mat-mdc-checkbox-19-input').click(); //sehr gering
      break;
    case 'gering':
      cy.get('#mat-mdc-checkbox-20-input').click(); //gering
      break;
    case 'mittel':
      cy.get('#mat-mdc-checkbox-21-input').click(); //mittel
      break;
    case 'hoch':
      cy.get('#mat-mdc-checkbox-22-input').click(); //hoch
      break;
    case 'sehr hoch':
      cy.get('#mat-mdc-checkbox-23-input').click(); //sehr hoch
      break;
    default:
      break;
  }
  cy.get('.mat-mdc-dialog-actions').contains('Bestätigen').click();
  cy.pause();
}



describe('insert metadata', () => {
  beforeEach(function(){
    cy.viewport(1600, 900);
  });

  afterEach(function(){
    cy.get('.mat-icon').click();
    cy.get('[studiolitelogout=""] > .mat-mdc-menu-item').click();
    cy.get('.mat-mdc-dialog-actions').contains('Abmelden').click();
  });



  it('insert data', () => {
    cy.visit('https://www.iqb-studio.de/');
    //insertCredentials
    cy.get('#mat-input-0').type(userData.user_name);
    cy.get('#mat-input-1').type(userData.user_pass);
    cy.get('.fx-column-start-stretch.ng-dirty > .mdc-button > .mdc-button__label').click();


    //cy.fixture('records.json').as('records');
    cy.fixture('records').then((records) => {
      records.forEach((record: Metadata) => {
        insertOneRecord(record);
      });
    });
  });
});
