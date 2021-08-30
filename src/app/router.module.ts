import { NgModule } from "@angular/core";
import { Routes, RouterModule as AngularRouterModule } from "@angular/router";
import { FeedComponent } from "./components/feed/feed.component";

const routes: Routes = [
  { path: 'home', component: FeedComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [AngularRouterModule.forRoot(routes)],
  exports: [AngularRouterModule]
})
export class RouterModule {

}
