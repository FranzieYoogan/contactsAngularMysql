import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private shared: SharedService, private router: Router) {}

  data:any

  ngOnInit(): void {

    this.shared.getData().subscribe((data => {

      console.log(data)
      this.data = data

    }), error => {

      console.log(error)

    })


  }

  redirect() {

      this.router.navigate(['/add'])

  }

  contact:any
  search() {

    const searchValue = document.getElementById('searchValue') as HTMLInputElement

    if(searchValue.value != "") {


 

    this.shared.getSpecific(searchValue.value).subscribe((dataSpecific => {

      console.log("data Found",dataSpecific)

      this.shared.getSpecific(searchValue.value).subscribe((dataSearch => {

        console.log(dataSearch)
        this.contact = dataSearch
  
      }), error => {
  
        console.log(error)
        
      })
      
      this.router.navigate(['/search'])

    }), error => {

      console.log("data not found", error)
      searchValue.style.border = "2px solid red"

    })

    

  } else {

    searchValue.style.border = "2px solid red"

  }


}

}
