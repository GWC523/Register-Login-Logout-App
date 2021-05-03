import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  
  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

    
  public checkError= (controlName: string, errorName: string) => {
    return this.service.formModel.controls[controlName].hasError(errorName);
  }
  

  onSubmit() {
    this.service.register().subscribe(
      (res:any) => {
        if(res.succeeded){
          this.service.formModel.reset();
          
          Object.keys(this.service.formModel.controls).forEach(key => {
            this.service.formModel.get(key)?.setErrors(null);
          });

          this.toastr.success('New user created', 'Registration Successful');
      
        }else{
          res.errors.forEach((element: { code: any; description: any; }) => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taked', 'Registration Failed');
                break;
            
              default:
                this.toastr.error(element.description,'Registration Failed');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    autoplay: true,
    pullDrag: false,
    dots: false,
    margin: 10,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0:{
        items:1
      },
      600:{
          items:3
      },
      1000:{
          items:5
      }
    },
    nav: false
  }

}


