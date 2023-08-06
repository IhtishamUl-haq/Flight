import { Component } from '@angular/core';
import { FlightsService} from './../api/services/flights.service';
import { FlightRm } from '../api/models';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent {

  searchFlights: FlightRm[] = []

  constructor(private flightsService: FlightsService, private fb: FormBuilder ) { }


  searchForm = this.fb.group({
    fromDate:[''],
    toDate: [''],
    from: [''],
    destination: [''],
    numberOfPassengers: [1],
  });


  ngOnInit(): void {
     
  }



  search() {
    const searchParams: SearchFlightsParams = {
      fromDate: this.searchForm.value.fromDate || '', // Provide a default value if null/undefined
      toDate: this.searchForm.value.toDate || '', // Provide a default value if null/undefined
      from: this.searchForm.value.from || '', // Provide a default value if null/undefined
      destination: this.searchForm.value.destination || '', // Provide a default value if null/undefined
      numberOfPassengers: this.searchForm.value.numberOfPassengers || 1, // Provide a default value if null/undefined
    };

    this.flightsService.searchFlights(searchParams)
      .subscribe(r => this.searchFlights = r
        
    )
  }
  //private Error(arr: any) {
  //  console.log(arr);
  //}
}

interface SearchFlightsParams {
  fromDate: string;
  toDate: string;
  from: string;
  destination: string;
  numberOfPassengers: number;
}

 
