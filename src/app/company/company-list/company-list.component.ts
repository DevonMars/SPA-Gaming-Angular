import { Component, OnInit } from '@angular/core';
import {Company} from '../../models/company.model';
import {Subscription} from 'rxjs/Subscription';
import {CompanyService} from '../../services/company.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: Company[];
  subscription: Subscription;


  constructor(private companyService: CompanyService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.companyService.getCompanies()
      .then((companies) => this.companies = companies)
      .catch((error => console.log(error)));
    this.subscription = this.companyService.companyChanged.subscribe((companies: Company[]) => {
      this.companies = companies
    });
  }

  onAddCompany() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

}
