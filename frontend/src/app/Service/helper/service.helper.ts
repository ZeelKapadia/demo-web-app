import { HttpHeaders } from "@angular/common/http";


export class CustomHeaders {

    constructor() { }
  
    loginHeaders(): HttpHeaders {
        const headers = new HttpHeaders();
        headers.set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');
        return headers
    }
  
    RegistrationHeaders(): HttpHeaders {
        const headers = new HttpHeaders();
        headers.set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');
        return headers
    }
  
    employeeHeaders(): any {
        return (new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*'))
    }
    employeeHeadersDelete(id:string): any {
       const options = {
            headers:new HttpHeaders({
                'content-type':'application/json',
            }),
            body:{
                employeeId:id
            }
       }
       return options
    }
  }