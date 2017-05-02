import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormEmployeeComponent } from './page-content/form-employee/form-employee.component';



const routes: Routes =[
    { path: 'employee/:param', component: FormEmployeeComponent },
    { path: '', pathMatch: 'full', redirectTo: 'all' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}