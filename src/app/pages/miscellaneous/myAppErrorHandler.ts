import { ErrorHandler, Injectable } from '@angular/core';
import { UNAUTHORIZED, BAD_REQUEST, FORBIDDEN } from 'http-status-codes';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class MyAppErrorHandler implements ErrorHandler {

    static readonly REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE: string = 'An error occurred: Please click this message to refresh';
    static readonly DEFAULT_ERROR_TITLE: string = 'Something went wrong';

    constructor(private toasterService: NbToastrService) { }

    public handleError(error: any) {
        console.error('err => :' + error);
        const httpErrorCode = error.httpErrorCode;
        switch (httpErrorCode) {
            case UNAUTHORIZED:
                // this.router.navigateByUrl('/login');
                break;
            case FORBIDDEN:
                // this.router.navigateByUrl('/unauthorized');
                break;
            case BAD_REQUEST:
                // this.showError(error.message);
                break;
            default:
            // this.showError(MyAppErrorHandler.REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE);
        }
    }

    private showError(message: string) {
        this.toasterService.danger(message, MyAppErrorHandler.DEFAULT_ERROR_TITLE, {});
    }
}
