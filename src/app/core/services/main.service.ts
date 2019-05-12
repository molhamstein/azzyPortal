import { LoaderServicesService } from './loader-services.service';
import { GlobalService } from './global.service';
import { LoginService } from './login.service';
import { CallApiService } from './call-api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class MainService {

  // constructor(public APIServ:CallApiService,public loginServ:LoginService,public globalServ:GlobalService) { }
  constructor(public loaderSer: LoaderServicesService, public APIServ: CallApiService, public loginServ: LoginService, public globalServ: GlobalService) { }
  private backUrl = "";
  private loader = false;
  getBackUrl() {
    return this.backUrl;
  }

  setBackUrl(backUrl) {
    this.backUrl = backUrl;
  }

  getLodaer() {
    return this.loader;
  }

  setLoader(loader) {
    this.loader = loader;
  }

  getDir() {
    var lang = this.loginServ.getlang()

    if (lang == "fa")
      return "rtl"
    else
      return "ltr"
  }


}
