import { CustomSnackBarComponent } from './../components/custom-snack-bar/custom-snack-bar.component';
import { LoginService } from './login.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
// import 'rxjs/Rx';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class CallApiService {




  constructor(public http: HttpClient, private loginSer: LoginService, private snackBar: MatSnackBar) {
  }
  // readonly baseUrl = "http://104.217.253.15:2999/api/"
  readonly baseUrl = "http://178.62.233.91:3000/api/"
    // readonly baseUrl = "https://f9de-46-53-15-116.eu.ngrok.io/api/"

  // readonly baseUrl = "http://azzyimmigration.com:3000/api/"
  // readonly baseUrl = "http://localhost:3000/api/"
  // readonly baseUrl = "http://192.168.1.6:3000/api/"
  private errorCode = 0;
  private code = "";


  public setErrorCode(errorCode) {
    this.errorCode = errorCode;
  }

  public getErrorCode() {
    return this.errorCode
  }


  public setCode(code) {
    this.code = code;
  }

  public getCode() {
    return this.code
  }

  get(url, token: string = "") {
    let auth = "";
    if (token != "")
      auth = token
    else if (this.loginSer.getToken() != null) {
      auth = this.loginSer.getToken();
    }
    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": auth ,'ngrok-skip-browser-warning':'test'}) };

    return this.http.get(this.baseUrl + url, _options).map((Response: Response) => {
      return Response;
    }).catch((response: Response) => {
      this.errorCode = response['error'].statusCode;
      this.code = response['error'].code
      console.log(response);
      if (response['error']['error'].statusCode == 401) {
        var configSuccess: MatSnackBarConfig = {
          panelClass: 'style-success',
          duration: 100000,
        };
        this.errorCode=401
        this.snackBar.openFromComponent(CustomSnackBarComponent, configSuccess);
        // this.loginSer.logout()
      }
      return "E";
    });
  }

  public handleError(error: Response | any) {
    console.log('err: ', error)
    let errMsg: string;
    errMsg = error.message ? error.message : error.toString();
    let data = { errMsg: "errMsg", error: "error" };
    console.log("data");
    console.log(data);
    let data2 = JSON.stringify(data);
    console.log("data2");
    console.log(data2);
    return JSON.stringify(data);
  }

  post(url, data, token: string = "") {
    let auth = "";
    if (token != "")
      auth = token
    else if (this.loginSer.getToken() != null) {
      auth = this.loginSer.getToken();
    }
    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": auth }) };
    console.log("data")
    console.log(data)
    return this.http.post(this.baseUrl + url, data, _options).map((Response: Response) => {
      return Response;
    }).catch((Response: Response) => {
      this.errorCode = Response.status;
      this.code = Response['error'].error.code;
      return "E";
    });
  }


  resetPassWord(url, data, token) {
    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": token }) };

    return this.http.post(this.baseUrl + url, data, _options).map((Response: Response) => {
      return Response;
    }).catch((Response: Response) => {
      this.errorCode = Response.status;
      this.code = Response['error'].error.code;

      return "E";
    });
  }


  activeAccount(url, token) {
    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": token }) };

    return this.http.put(this.baseUrl + url, {}, _options).map((Response: Response) => {
      return Response;
    }).catch((Response: Response) => {
      this.errorCode = Response.status;
      this.code = Response['error'].error.code;

      return "E";
    });
  }


  put(url, data, token: string = "") {

    let auth = "";
    if (token != "" && token != null)
      auth = token
    else if (this.loginSer.getToken() != null) {
      auth = this.loginSer.getToken();
    }

    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": auth }) };

    return this.http.put(this.baseUrl + url, data, _options).map((Response: Response) => {
      return Response;
    }).catch((Response: Response) => {
      this.errorCode = Response.status;
      this.code = Response['error'].error.code;

      return "E";
    });
  }

  patch(url, data, token: string = "") {

    let auth = "";
    if (token != "")
      auth = token
    else if (this.loginSer.getToken() != null) {
      auth = this.loginSer.getToken();
    }

    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": auth }) };

    return this.http.patch(this.baseUrl + url, data, _options).map((Response: Response) => {
      return Response;
    }).catch((Response: Response) => {
      this.errorCode = Response.status;
      this.code = Response['error'].error.code;

      return "E";
    });
  }

  delete(url, token: string = "") {
    let auth = ""; if (token != "")
      auth = token
    else if (this.loginSer.getToken() != null) {
      auth = this.loginSer.getToken();
    }

    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": auth }) };

    return this.http.delete(this.baseUrl + url, _options).map((Response: Response) => {
      return Response;
    }).catch((Response: Response) => {
      this.errorCode = Response.status;
      this.code = Response['error'].error.code;

      return "E";
    });
  }

  uploadImage(url, data, length, token: string = "") {
    let fd = new FormData();
    for (var index = 0; index < length; index++) {
      fd.append("file", data[index], data[index].name)
    }
    let auth = "";
    if (token != "")
      auth = token
    else if (this.loginSer.getToken() != null) {
      auth = this.loginSer.getToken();
    }

    let _options = { headers: new HttpHeaders({ "Authorization": auth }) };

    return this.http.post(this.baseUrl + url, fd, _options).timeout(90000).map((Response: Response) => {
      return Response;
    }).catch((Response: Response) => {
      this.errorCode = Response.status;
      this.code = Response['error'].error.code;

      return "E";
    });
  }


}
