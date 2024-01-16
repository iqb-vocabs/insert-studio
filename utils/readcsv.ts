import * as fs from 'fs';
import  {parse} from 'csv-parse';
import * as path from 'path';

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

function readCSV(filename:string){
    const results: object[] = [];
    const file = path.join('./utils',filename)


    const headers = ['Kurzname','Entwickler','Leitidee','Leitidee_Name','Aufgabenzeit','Stimuluszeit','Itemanzahl','Itemformat','Anforderungsbereich','BiSta_Inhalt_Primar','BiSta_Inhalt_Sekundar','BiSta_Prozess_Primar','BiSta_Prozess_Sekundar','Itemzeit','Schwierigkeit','Aktueller_Arbeitsbereich','Aktuelle_Gruppe','Aktueller_Link'];
    const fileContent = fs.readFileSync(file, { encoding: 'utf-8' })

    parse(fileContent, {
        delimiter: ';',
        columns: headers,
    }, (error: any, result: Metadata[]) => {
        if (error) {
            console.error(error);
        }
        console.log("Result", result);

        let records = JSON.stringify(result);

        fs.writeFile('./utils/record.json', records,(err) => {
            if (err) {
                console.log('Error writing file:', err);
            } else {
                console.log('Successfully wrote file');
            }
        });
    });
}

readCSV(process.argv[2]);