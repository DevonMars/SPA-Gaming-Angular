import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../../../models/company.model';
import {CompanyService} from '../../../services/company.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DataStorageService} from "../../../shared/data-storage.service";

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent implements OnInit {
  @Input() index: string;
  @Input() company: Company;

  constructor(private router: Router, private route: ActivatedRoute, private  dataService: DataStorageService){}

  ngOnInit() {
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete() {
    this.dataService.deleteCompany(this.company._id);
    this.router.navigate(['companies']);
  }

}
