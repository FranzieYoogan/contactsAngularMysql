import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

  constructor(private shared: SharedService, private router: Router) {}

  create(event:any) {

    event.preventDefault()

    const PersonName = document.getElementById('PersonName') as HTMLInputElement
    const Email = document.getElementById('Email') as HTMLInputElement
    const Mobile = document.getElementById('Mobile') as HTMLInputElement
    const url = document.getElementById('url') as HTMLInputElement
    const divAlert = document.getElementById('divAlert') as HTMLElement
    const divError = document.getElementById('divError') as HTMLElement
    
    this.shared.getSpecific(PersonName.value).subscribe((specific) => {

      console.log("there is data", specific)

      if(specific) {

        divError.style.display = "block"
        divError.style.visibility = "visible"
        divError.style.opacity = "1"
        divError.style.transition = "1s"

        setTimeout(() => {

          window.location.reload()

        }, 3000);
  
      } else {
  
  
      const body = {
  
        PersonName: PersonName.value,
        Email: Email.value,
        Mobile: Mobile.value,
        url: url.value
  
      }
  
      this.shared.postData(body).subscribe((data => {
  
        console.log("data posted")
  
      }), error => {
  
        console.log(error)
  
      })
  
      divAlert.style.display = "block"
      divAlert.style.visibility = "visible"
      divAlert.style.opacity = "1"
      divAlert.style.transition = "1s"
      
      setTimeout(() => {
  
        window.location.reload()
  
      }, 3000);
  
    }
  

    })

    
  }

  cancel() {

    this.router.navigate(['/'])

  }

}
