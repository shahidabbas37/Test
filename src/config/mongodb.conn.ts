import { connect, connection } from 'mongoose';
export class DbMongo {
  constructor() {
  }
  connect(h: string, dbName: string, u?: string, pass?: string, p?: number) {
    let connectionuri = `mongodb://${h}:${p}/${dbName}`;
    let h1 = "shahid.coszq.mongodb.net";
    if (u != undefined && pass != undefined) {
      connectionuri = `mongodb+srv://${u}:${pass}@${h1}/${dbName}`;
    }
    connect(connectionuri, (err: any) => {
      if (err) {
        console.log(err);
        console.log('DataBase Connection Falied');
      } else {
        console.log('connected with database');
      }
    });
  }
}
export const MonStatConnection = connection.readyState;