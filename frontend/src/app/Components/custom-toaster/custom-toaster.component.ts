import { Component, Input, OnInit } from '@angular/core';
import {Toast} from 'bootstrap'

@Component({
  selector: 'app-custom-toaster',
  templateUrl: './custom-toaster.component.html',
  styleUrls: ['./custom-toaster.component.css']
})
export class CustomToasterComponent implements OnInit {

  @Input() message:string;

  constructor() { }

  ngOnInit(): void {
  }

 showAlert(): void {  
    const toastLiveExample = document.getElementById('toast')!
    const toast = new Toast(toastLiveExample)
    toast.show();

    setTimeout(() => {
      toast.hide
    }, 4000);
  }
}
