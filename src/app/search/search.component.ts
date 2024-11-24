import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SharedService } from '../shared.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  constructor(private shared: SharedService) {}

  data:any
ngOnInit(): void {

  this.shared.getSearch().subscribe((data => {

    console.log(data)
    this.data = data

  }))

}

}
