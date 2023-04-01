import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartViewComponent } from './start-view/start-view.component';
import { TripsViewComponent } from './trips-view/trips-view.component';
import { TripsHistoryComponent } from './trips-history/trips-history.component';

const routes: Routes = [
  {path:'app-start-view', component: StartViewComponent},
  {path:'app-trips-view', component: TripsViewComponent},
  {path:'app-trips-history', component: TripsHistoryComponent},
  {path:'', redirectTo:'app-start-view', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
