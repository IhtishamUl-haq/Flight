import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { RegisterPassengerComponent } from './register-passenger/register-passenger.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { AuthGuardGuard } from './Auth/auth-guard.guard';
 

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SearchFlightsComponent,
    BookFlightComponent,
    RegisterPassengerComponent,
    MyBookingComponent,
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: SearchFlightsComponent, pathMatch: 'full' },
      { path: 'search-flights', component: SearchFlightsComponent },
      { path: 'book-flight/:flightId', component: BookFlightComponent, canActivate: [AuthGuardGuard] },
      { path: 'register-passenger', component: RegisterPassengerComponent },
      { path: 'my-booking', component: MyBookingComponent, canActivate: [AuthGuardGuard] }
      
       
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
