/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';

import { BookDto } from '../models/book-dto';
import { FlightRm } from '../models/flight-rm';

@Injectable({ providedIn: 'root' })
export class FlightsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `searchFlights()` */
  static readonly SearchFlightsPath = '/Flights';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchFlights$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlights$Plain$Response(
    params?: {
      fromDate?: string;
      toDate?: string;
      from?: string;
      destination?: string;
      numberOfPassengers?: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<FlightRm>>> {
    const rb = new RequestBuilder(this.rootUrl, FlightsService.SearchFlightsPath, 'get');
    if (params) {
      rb.query('fromDate', params.fromDate, {});
      rb.query('toDate', params.toDate, {});
      rb.query('from', params.from, {});
      rb.query('destination', params.destination, {});
      rb.query('numberOfPassengers', params.numberOfPassengers, {});
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FlightRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchFlights$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlights$Plain(
    params?: {
      fromDate?: string;
      toDate?: string;
      from?: string;
      destination?: string;
      numberOfPassengers?: number;
    },
    context?: HttpContext
  ): Observable<Array<FlightRm>> {
    return this.searchFlights$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FlightRm>>): Array<FlightRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchFlights()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlights$Response(
    params?: {
      fromDate?: string;
      toDate?: string;
      from?: string;
      destination?: string;
      numberOfPassengers?: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<FlightRm>>> {
    const rb = new RequestBuilder(this.rootUrl, FlightsService.SearchFlightsPath, 'get');
    if (params) {
      rb.query('fromDate', params.fromDate, {});
      rb.query('toDate', params.toDate, {});
      rb.query('from', params.from, {});
      rb.query('destination', params.destination, {});
      rb.query('numberOfPassengers', params.numberOfPassengers, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FlightRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchFlights$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlights(
    params: {
      fromDate:  string;
      toDate:   string;
      from:    string;
      destination:    string;
      numberOfPassengers: number;
    },
    context?: HttpContext
  ): Observable<Array<FlightRm>> {
    return this.searchFlights$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FlightRm>>): Array<FlightRm> => r.body)
    );
  }

  /** Path part for operation `bookFlights()` */
  static readonly BookFlightsPath = '/Flights';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `bookFlights()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  bookFlights$Response(
    params?: {
      body?: BookDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, FlightsService.BookFlightsPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: '*/*', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `bookFlights$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  bookFlights(
    params?: {
      body?: BookDto
    },
    context?: HttpContext
  ): Observable<void> {
    return this.bookFlights$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findFlights()` */
  static readonly FindFlightsPath = '/Flights/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findFlights$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFlights$Plain$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<FlightRm>> {
    const rb = new RequestBuilder(this.rootUrl, FlightsService.FindFlightsPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FlightRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findFlights$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFlights$Plain(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<FlightRm> {
    return this.findFlights$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<FlightRm>): FlightRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findFlights()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFlights$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<FlightRm>> {
    const rb = new RequestBuilder(this.rootUrl, FlightsService.FindFlightsPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FlightRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findFlights$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFlights(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<FlightRm> {
    return this.findFlights$Response(params, context).pipe(
      map((r: StrictHttpResponse<FlightRm>): FlightRm => r.body)
    );
  }

}
