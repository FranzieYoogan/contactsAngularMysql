import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  constructor(private router: Router, private shared: SharedService) {}

  data:any
  edit(event:any) {

    const PersonName = document.getElementById('PersonName') as HTMLInputElement
    const Mobile = document.getElementById('Mobile') as HTMLInputElement
    const Email = document.getElementById('Email') as HTMLInputElement
    const url = document.getElementById('url') as HTMLInputElement
    const divAlert = document.getElementById('divAlert') as HTMLElement
    const divError = document.getElementById('divError') as HTMLElement

    event.preventDefault()

    this.shared.getSearch().subscribe((specific => {

        console.log(specific)
        this.data = specific

        if(this.data.PersonName != PersonName.value) {


          const body = {
  
            PersonName: PersonName.value,
            Email: Email.value,
            Mobile: Mobile.value,
            url: url.value
      
          }
      
          this.shared.putData(this.data.PersonName,body).subscribe((update => {
      
            console.log("updated",update)
      
          }))
      
          divAlert.style.display = "block"
          divAlert.style.visibility = "visible"
          divAlert.style.opacity = "1"
          divAlert.style.transition = "1s"
      
      
           setTimeout(() => {
        
             window.location.href = "/"
      
           }, 3000);

        } else {

          divError.style.display = "block"
          divError.style.visibility = "visible"
          divError.style.opacity = "1"
          divError.style.transition = "1s"

          setTimeout(() => {

          window.location.href = "/"

          }, 3000);


        }
  
       
    
    }))

    

  }

  cancel() {

    this.router.navigate(['/'])

  }

}
