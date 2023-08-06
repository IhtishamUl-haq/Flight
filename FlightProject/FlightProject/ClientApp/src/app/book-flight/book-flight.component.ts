import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDto, FlightRm } from '../api/models';
import { FlightsService } from './../api/services/flights.service';
import { AuthService } from '../Auth/auth.service'
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {




  constructor(private rout: ActivatedRoute,
    private flightService: FlightsService,
    private router: Router,
    private authService: AuthService,
    private fb:FormBuilder
  ) { }


  form = this.fb.group({
    number: [1,Validators.compose([Validators.required, Validators.min(1), Validators.max(255)])]
  })

  flightID: string = "this is not loaded";
  ngOnInit(): void {

    //if (!this.authService.currentUser)
    //  this.router.navigate(['/register-passenger'])

    this.rout.paramMap
      .subscribe(p => this.findFlight(p.get("flightId")));
  }
  flight: FlightRm = {};

  private findFlight = (flightId: string | null) => {

    this.flightID = flightId ?? "this is not assinge";

    this.flightService.findFlights({ id: this.flightID })
      .subscribe(flight => this.flight = flight),
      this.handleError

  }


  private handleError = (err: any) => {

    if (err.status == 404) {
      alert("Flight not found!")
      this.router.navigate(['/search-flights'])
    }


    if (err.status == 409) {
      console.log("err: " + err);
      alert(JSON.parse(err.error).message)
    }

    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status Text: ", err.statusText)
    console.log(err)
  }

  Book() {

    if (this.form.invalid)
      return;

    console.log(`Booking ${this.form.get('number')?.value} passengers for the flight: ${this.flight.id}`)
    const numberseats = this.form.get("number")?.value ?? 0

    const booking: BookDto={
      flightId:this.flight.id,
      passengerEmail:this.authService.currentUser?.email,
      numberOfSeats: numberseats

    }

    this.flightService.bookFlights({ body: booking })
      .subscribe(_ => this.router.navigate(['/my-booking']),
      this.handleError)

  }

  get number() {
    return this.form.controls.number
  }

}
