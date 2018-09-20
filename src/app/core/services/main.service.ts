import { GlobalService } from './global.service';
import { LoginService } from './login.service';
import { CallApiService } from './call-api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class MainService {

  // constructor(public APIServ:CallApiService,public loginServ:LoginService,public globalServ:GlobalService) { }
  constructor(public APIServ: CallApiService, public loginServ: LoginService, public globalServ: GlobalService) { }
  private backUrl = "";

  getBackUrl() {
    return this.backUrl;
  }

  setBackUrl(backUrl) {
    this.backUrl = backUrl;
  }


}
