export class Login {
    username: string = "";
    password: string = "";
}

export class LoginResponse {
    token = "";
    refreshToken = "";
    message = ""
}
export class Registration {
    name: string = "";
    email: string = "";
    mobile: string = "";
    password: string = "";
  }
export class RegistrationResponse {
   message=""
  }
export class Employee {
    employeeId?:string="";
    _id?: string="";
    name?: string="";
    email?: string="";
    phone?: string="";
    age?: any=0;
    designation?: string="";
    createdAt?: string="";
    updatedAt?: string="";
    __v?: number=0;
    avtar?:any;
}
export class updateEmployee {
    employeeId?: string="";
    name?: string="";
    email?: string="";
    phone?: string="";
    age?: number=0;
    designation?: string="";
    createdAt?: string="";
    updatedAt?: string="";
    __v?: number=0;
    avtar?:any;
}
export class EmployeePagedData {
    data:Employee[]=[];
    totalRec: number=0;
    currentPage: number=0;
    limit: number=0;
    totalPage: number=0;
    hasNextPage: boolean=false;
    hasPrevPage: boolean=false;
}

export class Sorting {
    static ASCENDING = "ascending";
    static DESCENDING = "descending";
}

export class PagedObject{
    totalRec: number=0;
    CurrentPage: number=0;
    limit: number=0;
    totalPage: number=0;
    hasNextPage: boolean=false;
    hasPrevPage: boolean=false;
}