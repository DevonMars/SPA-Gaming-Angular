import { Component, OnInit } from '@angular/core';
import {Company} from '../../models/company.model';
import {Subscription} from 'rxjs/Subscription';
import {CompanyService} from '../../services/company.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: Company[];
  subscription: Subscription;


  constructor(private companyService: CompanyService, private router: Router,
              private dataService : DataStorageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataService.getCompanies();
    this.subscription = this.companyService.companiesChanged.subscribe((companies: Company[]) => {
      this.companies = companies
    });
  }

  getCompanies() {
    return this.companies;
  }

  onAddCompany() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

}
