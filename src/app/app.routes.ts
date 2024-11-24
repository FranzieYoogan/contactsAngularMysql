import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'add', component: AddComponent },
    { path: 'search', component: SearchComponent }

];
