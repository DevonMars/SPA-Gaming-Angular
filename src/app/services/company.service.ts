import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import 'rxjs/Rx';
import {Company} from '../models/company.model';
import {Http, Headers} from '@angular/http';

import {Subject} from 'rxjs/Subject';
import {HttpClient} from '@angular/common/http';
import {Game} from "../models/game.model";
import {Observable} from 'rxjs/Rx';

@Injectable()
export class CompanyService {

  companiesChanged = new Subject<Company[]>();
  companyChanged = new Subject<Company>();
  private companies: Company[] = [];

  constructor() {
  }

  getCompanies() {
    return this.companies.slice();
  }

  getCompany(id: string) {
    const index = this.companies.findIndex(x => x._id == id);
    return this.companies[index];
  }

  setCompanies(companies: Company[]) {
    this.companies = companies;
    this.companiesChanged.next(this.companies.slice());
  }

  addCompany(company: Company) {
    this.companies.push(company);
    this.companiesChanged.next(this.companies.slice());
  }


  updateCompany(newCompany: Company) {
    const index = this.companies.findIndex(x => x._id == newCompany._id);
    this.companies[index] = newCompany;
    this.companiesChanged.next(this.companies.slice());
  }

  deleteCompany(id: string) {
    const index = this.companies.findIndex(x => x._id == id);
    this.companies.splice(index, 1);
    this.companiesChanged.next(this.companies.slice());
  }


  // private headers = new Headers({'Content-Type': 'application/json'});
  // private serverUrl = environment.serverUrl + 'companies';
  // private companies: Company[] = [];
  // private company: Company;
  // companyChanged = new Subject<Company[]>();
  //
  // private handleError(error: any): Promise<any> {
  //   console.log('handleError');
  //   return Promise.reject(error.message || error);
  // }
  //
  // constructor(private http: Http) {}

  // getCompanies(): Promise<Company[]> {
  //   return this.http.get(this.serverUrl, {headers: this.headers})
  //     .toPromise()
  //     .then(response => {
  //       this.companies = response.json() as Company[];
  //       return response.json() as Company[];
  //     })
  //     .catch(error => {
  //       return this.handleError(error);
  //     });
  // }
  //
  //
  // getCompany(id: string): Promise<Company> {
  //   return this.http.get(this.serverUrl + '/' + id, { headers: this.headers}).toPromise()
  //     .then((response) => response.json())
  //     .catch(err => console.log(err));
  // }
  //
  //
  //
  //
  //
  //
  // addCompany(company: Company): Promise<Company> {
  //   this.companies.push(company);
  //   return this.http.post(this.serverUrl, {
  //     name: company.name,
  //     description: company.description,
  //     total_employees: company.total_employees,
  //     founder: company.founder,
  //     country: company.country,
  //     games: company.games,
  //     headers: this.headers})
  //     .toPromise()
  //     .then(response => {
  //       this.getCompanies().then(companies => {
  //         this.companies = companies;
  //         this.companyChanged.next(this.companies.slice());
  //       });
  //       return response.json() as Company;
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       return this.handleError(error);
  //     });
  // }
  //
  // updateCompany(newCompany: Company): Promise<Company> {
  //   return this.http.put(this.serverUrl + '/' + newCompany._id + '/edit', {
  //     name: newCompany.name,
  //     description: newCompany.description,
  //     total_employees: newCompany.total_employees,
  //     founder: newCompany.founder,
  //     country: newCompany.country,
  //     headers: this.headers})
  //     .toPromise()
  //     .then(response => {
  //       this.getCompanies().then(companies => {
  //         this.companies = companies;
  //         this.companyChanged.next(this.companies.slice());
  //       });
  //       return response.json() as Company;
  //     })
  //     .catch(error => {
  //       return this.handleError(error);
  //     });
  // }
  //
  // deleteCompany(company: Company): Promise<Company> {
  //   this.companies.slice(this.companies.indexOf(company), 1);
  //   return this.http.delete(this.serverUrl + '/' + company._id)
  //     .toPromise()
  //     .then(response => {
  //       return response.json() as Company;
  //     })
  //     .catch(error => {
  //       return this.handleError(error);
  //     });
  // }




}
