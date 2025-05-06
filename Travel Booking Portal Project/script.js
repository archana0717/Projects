document.addEventListener('DOMContentLoaded', () => {
    // Flight booking functionality
    const flightSearchForm = document.getElementById('flight-search-form');
    const flightResults = document.getElementById('flight-results');
    const flightResultsList = document.getElementById('results-list');
    const flightPassengerDetails = document.getElementById('passenger-details');
    const flightPassengerForm = document.getElementById('passenger-form');
    
    if (flightSearchForm) {
        flightSearchForm.addEventListener('submit', event => {
            event.preventDefault();

            const departure = flightSearchForm.querySelector('input[name="departure"]').value;
            const destination = flightSearchForm.querySelector('input[name="destination"]').value;
            const date = flightSearchForm.querySelector('input[name="date"]').value;
            const adults = flightSearchForm.querySelector('input[name="adults"]').value;
            const children = flightSearchForm.querySelector('input[name="children"]').value;

            console.log(`Searching for flights from ${departure} to ${destination} on ${date} for ${adults} adults and ${children} children`);

            const flights = [
                { flightNumber: 'AA123', departure, destination, date,price: '$2,000' },
                { flightNumber: 'BA456', departure, destination, date,price: '$1,500' },
                { flightNumber: 'CA789', departure, destination, date,price: '$800' }
            ];

            flightResultsList.innerHTML = '';

            flights.forEach(flight => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    Flight Number: ${flight.flightNumber}<br>
                    Departure: ${flight.departure}<br>
                    Destination: ${flight.destination}<br>
                    Date: ${flight.date}<br>
                    Price: ${flight.price}<br>
                    <button onclick="selectFlight('${flight.flightNumber}', ${adults}, ${children},'${flight.price}')">Book Flight</button>
                `;
                flightResultsList.appendChild(listItem);
            });

            flightResults.style.display = 'block';
        });
    }

    window.selectFlight = function(flightNumber, adults, children) {
        flightPassengerDetails.style.display = 'block';
        flightResults.style.display = 'none';
        localStorage.setItem('selectedFlight', flightNumber);

        const flightPassengerFormsContainer = document.getElementById('passenger-forms');
        flightPassengerFormsContainer.innerHTML = '';

        for (let i = 0; i < adults; i++) {
            flightPassengerFormsContainer.innerHTML += `
                <h4>Adult ${i + 1}</h4>
                <label for="adult-name-${i}" style="color: #34495e;">Name:</label>
                <input type="text" id="adult-name-${i}" name="adult-name-${i}" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
                <label for="adult-age-${i}" style="color: #34495e;">Age:</label>
                <input type="number" id="adult-age-${i}" name="adult-age-${i}" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
                <label for="adult-gender-${i}" style="color: #34495e;">Gender:</label>
                <select id="adult-gender-${i}" name="adult-gender-${i}" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <label for="passenger-email-${i}" style="color: #34495e;">Email:</label>
                <input type="email" id="passenger-email-${i}" name="passenger-email-${i}" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
                <label for="passenger-phone-${i}" style="color: #34495e;">Phone Number:</label>
                <input type="tel" id="passenger-phone-${i}" name="passenger-phone-${i}" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
            `;
        }

        for (let i = 0; i < children; i++) {
            flightPassengerFormsContainer.innerHTML += `
                <h4>Child ${i + 1}</h4>
                <label for="child-name-${i}" style="color: #34495e;">Name:</label>
                <input type="text" id="child-name-${i}" name="child-name-${i}" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
                <label for="child-age-${i}" style="color: #34495e;">Age:</label>
                <input type="number" id="child-age-${i}" name="child-age-${i}" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
                <label for="child-gender-${i}" style="color: #34495e;">Gender:</label>
                <select id="child-gender-${i}" name="child-gender-${i}" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <label for="passenger-email-${i}" style="color: #34495e;">Email:</label>
                <input type="email" id="passenger-email-${i}" name="passenger-email-${i}" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
                <label for="passenger-phone-${i}" style="color: #34495e;">Phone Number:</label>
                <input type="tel" id="passenger-phone-${i}" name="passenger-phone-${i}" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
            `;
        }
    };

    if (flightPassengerForm) {
        flightPassengerForm.addEventListener('submit', event => {
            event.preventDefault();

            const flightNumber = localStorage.getItem('selectedFlight');
            const flightPassengerFormsContainer = document.getElementById('passenger-forms');
            const flightPassengerDetails = [];

            const adultInputs = flightPassengerFormsContainer.querySelectorAll('[id^="adult-"]');
            for (let i = 0; i < adultInputs.length / 5; i++) {
                flightPassengerDetails.push({
                    type: 'Adult',
                    name: document.getElementById(`adult-name-${i}`).value,
                    age: document.getElementById(`adult-age-${i}`).value,
                    gender: document.getElementById(`adult-gender-${i}`).value,
                    email: document.getElementById(`passenger-email-${i}`).value,
                    phone: document.getElementById(`passenger-phone-${i}`).value
                });
            }

            const childInputs = flightPassengerFormsContainer.querySelectorAll('[id^="child-"]');
            for (let i = 0; i < childInputs.length / 5; i++) {
                flightPassengerDetails.push({
                    type: 'Child',
                    name: document.getElementById(`child-name-${i}`).value,
                    age: document.getElementById(`child-age-${i}`).value,
                    gender: document.getElementById(`child-gender-${i}`).value,
                    email: document.getElementById(`passenger-email-${i}`).value,
                    phone: document.getElementById(`passenger-phone-${i}`).value
                });
            }

            console.log(`Booking flight ${flightNumber} for passengers:`, flightPassengerDetails);

            alert(`Flight ${flightNumber} booked successfully!Details will be shared via email or phone number.`);

            localStorage.removeItem('selectedFlight');
            flightPassengerForm.reset();
            flightPassengerDetails.style.display = 'none';
        });
    }

    // Hotel booking functionality
    const hotelSearchForm = document.getElementById('hotel-search-form');
    const hotelResults = document.getElementById('hotel-results');
    const hotelResultsList = document.getElementById('results-list');
    const hotelGuestDetails = document.getElementById('guest-details');
    const hotelGuestForm = document.getElementById('guest-form');
    
    if (hotelSearchForm) {
        hotelSearchForm.addEventListener('submit', event => {
            event.preventDefault();

            const location = hotelSearchForm.querySelector('input[name="location"]').value;
            const checkInDate = hotelSearchForm.querySelector('input[name="check-in"]').value;
            const checkOutDate = hotelSearchForm.querySelector('input[name="check-out"]').value;
            const guests = hotelSearchForm.querySelector('input[name="guests"]').value;

            console.log(`Searching for hotels in ${location} from ${checkInDate} to ${checkOutDate} for ${guests} guests`);

            const hotels = [
                { name: 'Hotel A', location, checkInDate, checkOutDate,price: '$250/night' },
                { name: 'Hotel B', location, checkInDate, checkOutDate, price: '$180/night'},
                { name: 'Hotel C', location, checkInDate, checkOutDate,price: '$220/night' }
            ];

            hotelResultsList.innerHTML = '';

            hotels.forEach(hotel => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    Hotel: ${hotel.name}<br>
                    Location: ${hotel.location}<br>
                    Check-in: ${hotel.checkInDate}<br>
                    Check-out: ${hotel.checkOutDate}<br>
                    Price:${hotel.price}<br>
                    <button onclick="selectHotel('${hotel.name}', ${guests},'${hotel.price}')">Book Hotel</button>
                `;
                hotelResultsList.appendChild(listItem);
            });

            hotelResults.style.display = 'block';
        });
    }

    window.selectHotel = function(hotelName, guests) {
        hotelGuestDetails.style.display = 'block';
        hotelResults.style.display = 'none';
        localStorage.setItem('selectedHotel', hotelName);

        const hotelGuestFormsContainer = document.getElementById('guest-forms');
        hotelGuestFormsContainer.innerHTML = '';

        for (let i = 0; i < guests; i++) {
            hotelGuestFormsContainer.innerHTML += `
                <h4>Guest ${i + 1}</h4>
                <label for="guest-name-${i}" style="color: #34495e;">Name:</label>
                <input type="text" id="guest-name-${i}" name="guest-name-${i}" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
                <label for="guest-age-${i}" style="color: #34495e;">Age:</label>
                <input type="number" id="guest-age-${i}" name="guest-age-${i}" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
                <label for="guest-gender-${i}" style="color: #34495e;">Gender:</label>
                <select id="guest-gender-${i}" name="guest-gender-${i}" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <label for="guest-email-${i}" style="color: #34495e;">Email:</label>
                <input type="email" id="guest-email-${i}" name="guest-email-${i}" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
                <label for="guest-phone-${i}" style="color: #34495e;">Phone Number:</label>
                <input type="tel" id="guest-phone-${i}" name="guest-phone-${i}" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
            `;
        }
    };

    if (hotelGuestForm) {
        hotelGuestForm.addEventListener('submit', event => {
            event.preventDefault();

            const hotelName = localStorage.getItem('selectedHotel');
            const hotelGuestFormsContainer = document.getElementById('guest-forms');
            const hotelGuestDetails = [];

            const guestInputs = hotelGuestFormsContainer.querySelectorAll('[id^="guest-"]');
            for (let i = 0; i < guestInputs.length / 5; i++) {
                hotelGuestDetails.push({
                    name: document.getElementById(`guest-name-${i}`).value,
                    age: document.getElementById(`guest-age-${i}`).value,
                    gender: document.getElementById(`guest-gender-${i}`).value,
                    email: document.getElementById(`guest-email-${i}`).value,
                    phone: document.getElementById(`guest-phone-${i}`).value
                });
            }

            console.log(`Booking hotel ${hotelName} for guests:`, hotelGuestDetails);

            alert(`Hotel ${hotelName} booked successfully!Details will be shared via email or phone number.`);

            localStorage.removeItem('selectedHotel');
            hotelGuestForm.reset();
            hotelGuestDetails.style.display = 'none';
        });
    }

    // Car rental functionality
    const carSearchForm = document.getElementById('car-search-form');
    const carResults = document.getElementById('car-results');
    const carResultsList = document.getElementById('results-list');
    const carRenterDetails = document.getElementById('renter-details');
    const carRenterForm = document.getElementById('renter-form');

    if (carSearchForm) {
        carSearchForm.addEventListener('submit', event => {
            event.preventDefault();

            const pickupLocation = carSearchForm.querySelector('input[name="pickup-location"]').value;
            const pickupDate = carSearchForm.querySelector('input[name="pickup-date"]').value;
            const returnDate = carSearchForm.querySelector('input[name="return-date"]').value;
            const carType = carSearchForm.querySelector('input[name="car-type"]').value;

            console.log(`Searching for cars at ${pickupLocation} from ${pickupDate} to ${returnDate} of type ${carType}`);

            const cars = [
                { carName: 'Car A', pickupLocation, pickupDate, returnDate, carType,price: '$100/day' },
                { carName: 'Car B', pickupLocation, pickupDate, returnDate, carType,price: '$80/day' },
                { carName: 'Car C', pickupLocation, pickupDate, returnDate, carType,price: '$120/day' }
            ];

            carResultsList.innerHTML = '';

            cars.forEach(car => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    Car: ${car.carName}<br>
                    Pickup Location: ${car.pickupLocation}<br>
                    Pickup Date: ${car.pickupDate}<br>
                    Return Date: ${car.returnDate}<br>
                    Car Type: ${car.carType}<br>
                    Price:${car.price}<br>
                    <button onclick="selectCar('${car.carName},${car.price}')">Book Car</button>
                `;
                carResultsList.appendChild(listItem);
            });

            carResults.style.display = 'block';
        });
    }

    window.selectCar = function(carName) {
        carRenterDetails.style.display = 'block';
        carResults.style.display = 'none';
        localStorage.setItem('selectedCar', carName);

        const carRenterFormsContainer = document.getElementById('renter-forms');
        carRenterFormsContainer.innerHTML = `
            <label for="renter-name" style="color: #34495e;">Name:</label>
            <input type="text" id="renter-name" name="renter-name" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
            <label for="renter-age" style="color: #34495e;">Age:</label>
            <input type="number" id="renter-age" name="renter-age" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
            <label for="renter-gender" style="color: #34495e;">Gender:</label>
            <select id="renter-gender" name="renter-gender" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <label for="renter-email" style="color: #34495e;">Email:</label>
            <input type="email" id="renter-email" name="renter-email" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
            <label for="renter-phone" style="color: #34495e;">Phone Number:</label>
            <input type="tel" id="renter-phone" name="renter-phone" required style="border: 1px solid #bdc3c7; padding: 5px; border-radius: 3px;">
        `;
    };

    if (carRenterForm) {
        carRenterForm.addEventListener('submit', event => {
            event.preventDefault();

            const carName = localStorage.getItem('selectedCar');
            const renterName = document.getElementById('renter-name').value;
            const renterAge = document.getElementById('renter-age').value;
            const renterGender = document.getElementById('renter-gender').value;
            const renterEmail = document.getElementById('renter-email').value;
            const renterPhone = document.getElementById('renter-phone').value;

            const carRenterDetails = {
                name: renterName,
                age: renterAge,
                gender: renterGender,
                email: renterEmail,
                phone: renterPhone
            };

            console.log(`Booking car ${carName} for renter:`, carRenterDetails);

            alert(`Car ${carName} booked successfully!Details will be shared via email or phone number.`);

            localStorage.removeItem('selectedCar');
            carRenterForm.reset();
            carRenterDetails.style.display = 'none';
        });
    }
});