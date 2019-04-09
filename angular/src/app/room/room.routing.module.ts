import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent }    from './room.component';

const roomRoutes: Routes = [
  { path: 'room',  component: RoomComponent },
  { path: 'room/:id', component: RoomComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(roomRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoomRoutingModule { }