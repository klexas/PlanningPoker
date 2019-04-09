import { Component } from "@angular/core";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent {
  title = 'Planning Poker Room!';
  description = "Planning poker room you are in";
}