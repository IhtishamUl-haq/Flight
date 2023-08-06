import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
import { BookDto, BookingRm} from '../api/models';
import { BookingService } from './../api/services/booking.service';
import { AuthService } from './../Auth/auth.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent {
  bookings!: BookingRm[];

  constructor(private bookingService: BookingService,
    private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
   
    this.bookingService.listBooking({ email: this.authService.currentUser?.email ?? '' })
      .subscribe(r => this.bookings = r, this.handleError);
  }

  cancel(booking: BookingRm) {

    const dto: BookDto = {
      flightId: booking.flightId,
      numberOfSeats: booking.numberOfBookedSeats,
      passengerEmail: booking.passengerEmail
    };

    this.bookingService.cancelBooking({ body: dto })
      .subscribe(_ =>
        this.bookings = this.bookings.filter(b => b != booking)
        , this.handleError);


  }

  private handleError(err: any) {
    console.log("Response Error, Status:", err.status);
    console.log("Response Error, Status Text:", err.statusText);
    console.log(err);
  }
}
