import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';

// Routing Modules
import { RouterModule, Routes } from '@angular/router';
import { UserRoutingModule }    from './user/user.routing.module';
import { RoomRoutingModule }    from './room/room.routing.module';

// Components
import { AppComponent }         from './app.component';
import { RoomComponent }        from './room/room.component';
import { UserComponent }        from './user/user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FaqComponent } from './faq/faq.component';

// Default | 404
const routes: Routes = [
  { path: '**', component: PageNotFoundComponent }// Anything else
];

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    UserComponent,
    PageNotFoundComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UserRoutingModule,
    RoomRoutingModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
