import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageConstants } from 'src/app/core/constants/constants';
import { CommonService } from 'src/app/core/services/common-services/common-service.service';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  config: any;
  collection = [];
  id = 0;
  showDialog: boolean = false;
  editForm: FormGroup;
  showDeleteComfirm: boolean;
  constructor(private service: DashboardService, private router: Router
    , private fb: FormBuilder,
    private commonService : CommonService) { }

  ngOnInit(): void {
    this.setPage();
    this.createEditForm();
  }
  createEditForm() {
    this.editForm = this.fb.group({
      title: ['', {
        validators: [
          Validators.required,

        ],
        updateOn: 'change'
      }],
      body: ['', {
        validators: [Validators.required
        ],
        updateOn: 'change'
      }],



    });
  }
  setPage() {
    this.service.getAllPosts().subscribe((data) => {
      this.collection = data;
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.collection.length
      };
    },(error)=>{
      this.commonService.showSuccess(MessageConstants.ERROR_TITLE,"")
 
    })
  }
  pageChanged(currentPageEvent) {
    this.config.currentPage = currentPageEvent;

  }
  
  deletePost(id) {
    
    this.id = id;
    this.showDeleteComfirm =true;
   
  }
  delete(){
    this.service.deletePost(this.id).subscribe((data) => {
      this.commonService.showSuccess(MessageConstants.SUCCESS_TITLE,MessageConstants.SAVE_DELETE_MSG)

      this.setPage();
      this.showDeleteComfirm =false;
    })
  }
  editPost(id) {
    this.id = id;
    this.service.getPostById(id).subscribe((data) => {
      this.editForm.controls.title.patchValue(data.title);
      this.editForm.controls.body.patchValue(data.body);

      this.showDialog = true;

    })
   
  }
  editFormSubmit(){
    if(!this.editForm.valid){
      return;
    }
    this.service.editPost(this.id,this.editForm.value).subscribe((data)=>{
      this.commonService.showSuccess(MessageConstants.SUCCESS_TITLE,MessageConstants.SAVE_EDIT_MSG)
      this.showDialog = false;
      this.setPage();
    },(error)=>{
      this.commonService.showSuccess(MessageConstants.ERROR_TITLE,"")
 
    })
  }
  
}
