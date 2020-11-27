import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsDB } from '../services/news.database';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  form: FormGroup;

  constructor(private router:Router, private newsDB:NewsDB, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      apiKey: ['', Validators.required]
    })
  }

  processForm(){
    this.newsDB.setApiKey(this.form.get('apiKey').value);
    this.router.navigate(['/country-list']);
  }

}
