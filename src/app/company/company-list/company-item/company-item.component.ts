import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../../../models/company.model';
import {CompanyService} from '../../../services/company.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent implements OnInit {
  @Input() index: string;
  @Input() company: Company;

  constructor(private companyService: CompanyService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit() {
  }

}
