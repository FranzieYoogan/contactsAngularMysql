import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

  constructor(private shared: SharedService) {}

  create(event:any) {

    event.preventDefault()

    const PersonName:any = document.getElementById('PersonName')
    const Email:any = document.getElementById('Email')
    const Mobile:any = document.getElementById('Mobile')
    const url:any = document.getElementById('url')

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

  }

}
