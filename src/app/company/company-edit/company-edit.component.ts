import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CompanyService} from '../../services/company.service';
import {Company} from '../../models/company.model';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  private editingMode = false;
  id: string;
  companyForm: FormGroup;


  constructor(private route: ActivatedRoute, private router: Router,
              private companyService: CompanyService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editingMode = params['id'] != null;
      this.startForm();
    });
  }

    onSubmit() {
      const company = this.companyForm.value;
      company._id = this.id;
      if (this.editingMode) {
        this.companyService.updateCompany(this.companyForm.value);
      }else {
        this.companyService.addCompany(this.companyForm.value);
      }
      this.onCancel();
    }

    onCancel() {
      this.router.navigate(['../../'], {relativeTo: this.route});
    }

    private startForm() {
        let companyName = '';
        let companyDescrip ='';
        let companyFounder = '';
        let companyCountry = '';
        let companyTotal = 0;

      this.companyForm = new FormGroup({
        'name': new FormControl(companyName, Validators.required),
        'description': new FormControl(companyDescrip, Validators.required),
        'founder': new FormControl(companyFounder, Validators.required),
        'country': new FormControl(companyCountry, Validators.required),
        'total_employees': new FormControl(companyTotal, Validators.required),
      });

      if (this.editingMode) {
        this.companyService.getCompany(this.id).then((newCompany:Company) => {
          companyName = newCompany.name;
          companyDescrip = newCompany.description;
          companyFounder = newCompany.founder;
          companyCountry = newCompany.country;
          companyTotal = newCompany.total_employees;

          this.companyForm.patchValue({
            name: companyName,
            description: companyDescrip,
            founder: companyFounder,
            country: companyCountry,
            total_employees: companyTotal
          });
        });
      }
    }
}
