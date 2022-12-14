import { outputAst } from '@angular/compiler';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { PagedObject } from 'src/app/Constants/models/model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  // limitsArray = [2,5,10,20,50,100]
  limitsArray = [20,50,100]

  formPagination = this.formBuilder.group({
    limit:new FormControl(""),
    gotoPage:new FormControl("1"),
  })

  @Input() pagedData:PagedObject;
  @Output() changePage = new EventEmitter<number>()
  @Output() limitChange = new EventEmitter<number>()

  range:number[]=[]; 

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    for (let i = 1; i <= this.pagedData.totalPage; i++) {
        this.range.push(i)
    }
    this.formPagination.controls['limit'].setValue(this.pagedData.limit);
    this.formPagination.controls['gotoPage'].setValue(this.pagedData.CurrentPage);
  }


  onNextClicked():void{
    if (this.pagedData.hasNextPage) {
      this.pagedData.CurrentPage++;
      this.changePage.emit(this.pagedData.CurrentPage);
    }
  }
  
  onPrevClicked():void{
    if (this.pagedData.hasPrevPage) {
      this.pagedData.CurrentPage--;
      this.changePage.emit(this.pagedData.CurrentPage);
    }
  }

  onPageClicked(pageNum:number){
    this.changePage.emit(pageNum);
  }

  onKeyPress(event:any):void{
    if (event.key === 'Enter') {
      let val=this.formPagination.controls['gotoPage'].value
      if (val < 1) {
        // resetting the page 1 and resetting the pagination
        // this.formPagination.controls['gotoPage'].setValue(1);
        // this.onPageClicked(1);
        // or
        // removing the errored page and getting the old value back
        // this.formPagination.controls['gotoPage'].setValue(this.pagedData.CurrentPage)
        this.onPageClicked(1);
      } else if (val > this.pagedData.totalPage){
        // this.formPagination.controls['gotoPage'].setValue(this.pagedData.totalPage)
        this.onPageClicked(this.pagedData.totalPage);
      }
      else{
        this.onPageClicked(val);
        this.formPagination.controls["gotoPage"]
      }
      // validate the values
    }
    
  }

  onValueChange():void{
    var limitValue= +this.formPagination.controls['limit'].value
    this.limitChange.emit(limitValue);
  }

  resettingForm():void{
    this.formPagination.controls['gotoPage'].setValue("")
  }

  checkForChange():void{
    this.formPagination.controls['gotoPage'].setValue(this.pagedData.CurrentPage)
  }
}
