import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FeedComponent } from "./components/feed/feed.component";

const routes: Routes = [
  { path: 'home', component: FeedComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {

}
