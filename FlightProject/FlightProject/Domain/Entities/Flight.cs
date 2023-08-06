using FlightProject.Domain.Errors;
 

namespace FlightProject.Domain.Entities
{
    public class Flight
    {

        public Guid Id { get; set; }
        public string Airline { get; set; }
        public string Price { get; set; }
        public TimePlace Departure { get; set; }
        public TimePlace Arrival { get; set; }
        public int RemainingNumberOfSeats { get; set; }

        public IList<Booking> bookings = new List<Booking>();

        public Flight()
        {

        }

        public Flight(
            Guid id,
            string airline,
            string price,
            TimePlace departure,
            TimePlace arrival,
            int remainingNumberOfSeats
        )
        {
            Id = id;
            Airline = airline;
            Price = price;
            Departure = departure;
            Arrival = arrival;
            RemainingNumberOfSeats = remainingNumberOfSeats;
        }


        public object? MakeBooking(string? passengerEmail, int? numberOfSeats)
        {
            var flight = this;

            if (flight.RemainingNumberOfSeats < numberOfSeats)
            {
                return new OverbookError();
            }

            flight.bookings.Add(
                new Booking(
                    passengerEmail,
                    numberOfSeats)
                );

            flight.RemainingNumberOfSeats -= Convert.ToInt32(numberOfSeats);
            return null;
        }

        public object? CancelBooking(string passengerEmail, int numberOfSeats)
        {
            var booking = bookings.FirstOrDefault(b => numberOfSeats == b.NumberOfSeats
           && passengerEmail.ToLower() == b.PassengerEmail.ToLower());

            if (booking == null)
                return new NotFoundError();

            bookings.Remove(booking);
            RemainingNumberOfSeats += Convert.ToInt32(numberOfSeats);

            return null;
        }
    }

}
