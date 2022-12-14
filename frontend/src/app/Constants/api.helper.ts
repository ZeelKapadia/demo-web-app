import { environment } from "src/environments/environment";

export class APIAdmin {
    static ADMIN_LOGIN = environment.API_BACK_END + 'login'
    static ADMIN_REGISTER = environment.API_BACK_END + 'register'
    static ADMIN_REFRESH_TOKEN = environment.API_BACK_END + 'refreshToken'
    static ADMIN_USERS = environment.API_BACK_END + 'getAdminUsers'
    static AUTO_PASS_GEN = environment.API_BACK_END + 'randomPass'
}

export class APIEmployee {
    static EMPLOYEE = environment.API_BACK_END + 'employee/'
    static GET_ALL_EMPLOYEE = this.EMPLOYEE
    static GET_EMPLOYEE = this.EMPLOYEE + 'show'
    static ADD_EMPLOYEE = this.EMPLOYEE + 'store'
    static EDIT_EMPLOYEE = this.EMPLOYEE + 'update'
    static DELETE_EMPLOYEE = this.EMPLOYEE + 'delete'
    static PAGINATION_EMPLOYEE = this.EMPLOYEE + 'sortWithPagination'
    static SEARCH_EMPLOYEE = this.EMPLOYEE + 'searchRec'
    static IMAGE = environment.API_BACK_END_IMAGES
}
