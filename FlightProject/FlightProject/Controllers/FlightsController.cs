using FlightProject.Domain.Entities;
using FlightProject.Domain.Errors;
using FlightProject.DTO;
using FlightProject.ReadModels;
using FlightsProject.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace FlightProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
 
   
   
    public class FlightsController : ControllerBase
    {


        private readonly ILogger<FlightsController> _logger;

        private readonly Entities _entities;


        public FlightsController(ILogger<FlightsController> logger,
            Entities entities)
        {
            _logger = logger;
            _entities = entities;
        }

        [HttpGet]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [ProducesResponseType(typeof(IEnumerable<FlightRm>), 200)]
        public IEnumerable<FlightRm> Search([FromQuery] FlightSearchParameters @params)
        {

            _logger.LogInformation("Searching for a flight for: {Destination}", @params.Destination);

            IQueryable<Flight> flights = _entities.Flights;

            //if (!string.IsNullOrWhiteSpace(@params.Destination))
            //    flights = flights.Where(f => f.Arrival.Place.Contains(@params.Destination));

            //if (!string.IsNullOrWhiteSpace(@params.From))
            //    flights = flights.Where(f => f.Departure.Place.Contains(@params.From));

            //if (@params.FromDate != null)
            //    flights = flights.Where(f => f.Departure.Time >= @params.FromDate.Value.Date);

            //if (@params.ToDate != null)
            //    flights = flights.Where(f => f.Departure.Time >= @params.ToDate.Value.Date.AddDays(1).AddTicks(-1));

            //if (@params.NumberOfPassengers != 0 && @params.NumberOfPassengers != null)
            //    flights = flights.Where(f => f.RemainingNumberOfSeats >= @params.NumberOfPassengers);
            //else
            //    flights = flights.Where(f => f.RemainingNumberOfSeats >= 1);


            var flightRmList = flights
                .Select(flight => new FlightRm(
                flight.Id,
                flight.Airline,
                flight.Price,
                new TimePlaceRm(flight.Departure.Place.ToString(), flight.Departure.Time),
                new TimePlaceRm(flight.Arrival.Place.ToString(), flight.Arrival.Time),
                flight.RemainingNumberOfSeats
                ));

            return flightRmList;
        }


        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [ProducesResponseType(typeof(FlightRm), 200)]
        public ActionResult<FlightRm> Find(Guid id)
        {
            var flight = _entities.Flights.SingleOrDefault(f => f.Id == id);

            if (flight == null)
                return NotFound();

            var readModel = new FlightRm(
                flight.Id,
                flight.Airline,
                flight.Price,
                new TimePlaceRm(flight.Departure.Place.ToString(), flight.Departure.Time),
                new TimePlaceRm(flight.Arrival.Place.ToString(), flight.Arrival.Time),
                flight.RemainingNumberOfSeats
                );

            return Ok(readModel);
        }

        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(200)]
        public IActionResult Book(BookDto dto)
        {
            System.Diagnostics.Debug.WriteLine($"Booking a new flight {dto.FlightId}");

            var flight = _entities.Flights.SingleOrDefault(f => f.Id == dto.FlightId);

            if (flight == null)
                return NotFound();

            var error = flight.MakeBooking(dto.PassengerEmail, dto.NumberOfSeats);

            if (error is OverbookError)
                return Conflict(new { message = "Not enough seats." });


            try
            {
                _entities.SaveChanges();
            }
            catch (DbUpdateConcurrencyException e)
            {
                return Conflict(new { message = "An error occurred while booking. Please try again." });
            }

            return CreatedAtAction(nameof(Find), new { id = dto.FlightId });
        }


















        //private readonly ILogger<FlightsController> _logger;
        //public FlightsController(ILogger<FlightsController> logger)
        //{
        //    _logger = logger;
        //}


        //[HttpGet]
        //public IEnumerable<FlightRm?> Search()
        //{

        //    var flightRmList = flights            
        //        .Select(flight => new FlightRm(
        //        flight.Id,
        //        flight.Airline,
        //        flight.Price,
        //        new TimePlaceRm(flight.Departure.Place.ToString(), flight.Departure.Time),
        //        new TimePlaceRm(flight.Arrival.Place.ToString(), flight.Arrival.Time),
        //       (int)flight.RemainingNumberOfSeats
        //        ));

        //    return flightRmList;
        //}



        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //[HttpGet("{id}")]
        //[ProducesResponseType(400)]
        //[ProducesResponseType(500)]
        //[ProducesResponseType(typeof(FlightRm), 200)]
        //public ActionResult<FlightRm> Find(Guid id)
        //{
        //    var  flight=flights.Where(f => f.Id == id).FirstOrDefault();

        //    if (flight == null)
        //        return NotFound();
        //    var readModel = new FlightRm(
        //       flight.Id,
        //       flight.Airline,
        //       flight.Price,
        //       new TimePlaceRm(flight.Departure.Place.ToString(), flight.Departure.Time),
        //       new TimePlaceRm(flight.Arrival.Place.ToString(), flight.Arrival.Time),
        //      (int)flight.RemainingNumberOfSeats
        //       );
        //    return Ok(readModel);
        //}

        //[HttpPost]
        //public IActionResult Booking(BookDto dto)
        //{
        //    System.Diagnostics.Debug.WriteLine($"Flight is book {dto.FlightId}");

        //    var foundFlight = flights.Where(f => f.Id == dto.FlightId).FirstOrDefault ();

        //    if (foundFlight == null)
        //        return NotFound();

        //    var error = foundFlight.MakeBooking(dto.PassengerEmail, dto.NumberOfSeats);

        //    if (error is OverbookError)
        //        return Conflict(new { message = "Not enough seats." });

        //    var remaingSeats = foundFlight.RemainingNumberOfSeats -= dto.NumberOfSeats;
        //    return CreatedAtAction(nameof(Find), new { id = dto.FlightId });

        //}
    }
}
        
    
