import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { TutorialsComponent } from '@appContainers/tutorials/tutorials.component';
import { TutorialsGuard } from '@appGuards/tutorials.guard';
import { TutorialDetailComponent } from '@appContainers/tutorial-detail/tutorial-detail.component';
import { SelectedTutorialGuard } from '@appGuards/selected-tutorial.guard';
import { DashboardComponent } from '@appContainers/dashboard/dashboard.component';

const routes: Routes = [
 

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [TutorialsGuard]
  },
  {
    path: 'detail/:id',
    component: TutorialDetailComponent,
    canActivate: [SelectedTutorialGuard]
  },
  {
    path: 'tutorials',
    component: TutorialsComponent,
    canActivate: [TutorialsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [TutorialsGuard]
})
export class AppRoutingModule {

    constructor(){
        console.log('inside routing module')
    }
}
