import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FeedComponent } from './components/feed/feed.component';
import { PostComponent } from './components/post/post.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { AudioComponent } from './components/audio/audio.component';

const routes: Routes = [
  { path: 'home', component: FeedComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    PostComponent,
    NewPostComponent,
    AudioComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
