import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Promise_Instance } from 'firebase/app';
//import { utilServices } from 'util';
import { Header } from 'ionic-angular';

let _API_URL_FOR = {
    Login: "http://www.avantesoft.com/thrift/api/",
    Reg: "http://www.avantesoft.com/thrift/api/",
    AcctType: "http://www.avantesoft.com/thrift/api/getAllAccounts",
    Savings: "http://www.avantesoft.com/thrift/api/customer/savings",
    Withdrawals:"http://www.avantesoft.com/thrift/api/customer/withdrawal",
    PicsPath: "http://www.avantesoft.com/thrift/contents_imgs/customer_imgs",
    Search: "http://www.avantesoft.com/thrift/api/customer/search/",
    AllSavingsRec: "http://www.avantesoft.com/thrift/api/savingtransaction/"
}
@Injectable()
export class apiServices {
    agentRecord = {}
    public acctType;
    constructor(public http: Http) {
        console.log('Hello api services');
    }
    getAllSavings(agentId) {
        return new Promise((resolve,reject ) => {
            let headers = new Headers();
            let resData: any;
                this.http.get(_API_URL_FOR.AllSavingsRec +agentId, { headers: headers })
                    .subscribe(res => {
                        resolve(res.json());
                    }, (err) => {
                        reject(err);
                        console.log(err);
                    });
        });
    }
    registerUser(userRecord, type) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();

            this.http.post(_API_URL_FOR.Reg + type, JSON.stringify(userRecord), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }
    loginUser(userRecord, type) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            this.http.post(_API_URL_FOR.Login + type, JSON.stringify(userRecord), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                    console.log(res.json());
                    //this.agentRecord = res.json();
                }, (err) => {
                    reject(err);
                    console.log(err);
                });
        });
    }
    withdrawals(withdrawalsRec) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            this.http.post(_API_URL_FOR.Withdrawals, JSON.stringify(withdrawalsRec), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }
    savings(savingsRec) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            this.http.post(_API_URL_FOR.Savings, JSON.stringify(savingsRec), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }
    getAcctTypes() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            this.http.get(_API_URL_FOR.AcctType, { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                    this.acctType = res.json();
                }, (err) => {
                    reject(err);
                    console.log(err);
                });
        });
    }
    searchRec(searchParam) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            this.http.get(_API_URL_FOR.Search + searchParam, { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                })
        });
    }


}
