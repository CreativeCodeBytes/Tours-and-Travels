document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const forms = {
        flightForm: document.getElementById('flightForm'),
        hotelForm: document.getElementById('hotelForm')
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            Object.values(forms).forEach(form => {
                form.style.display = 'none';
            });
            
            const formId = this.getAttribute('data-form');
            forms[formId].style.display = 'block';
        });
    });

    // Exchange icon functionality
    document.querySelector('.exchange-icon').addEventListener('click', function() {
        const fromCity = document.getElementById('fromCity');
        const toCity = document.getElementById('toCity');

        [fromCity.value, toCity.value] = [toCity.value, fromCity.value];
    });

    // Set current date as default for journey date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('journeyDate').value = today;
    updateJourneyDay();

    // Update journey day when date is changed
    document.getElementById('journeyDate').addEventListener('change', updateJourneyDay);

    document.getElementById('passengerTrigger').addEventListener('click', function(e) {
        const dropdown = document.getElementById('passengerDropdown');
        dropdown.classList.toggle('show');
        e.stopPropagation();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('passengerDropdown');
        if (!dropdown.contains(e.target) && !e.target.closest('#passengerTrigger')) {
            dropdown.classList.remove('show');
        }
    });

    // Filter buttons functionality
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-button').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to clicked button
            this.classList.add('active');
        });
    });

    // Flight search form submission
    document.getElementById('flightSearchForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const fromCity = document.getElementById('fromCity').value;
        const toCity = document.getElementById('toCity').value;
        const journeyDate = document.getElementById('journeyDate').value;
        const passengers = document.getElementById('passengerSummary').textContent;
        const classType = document.getElementById('classType').textContent;

        // Display search results
        displayFlightResults(fromCity, toCity, journeyDate, passengers, classType);
    });

    // Hotel search form submission
    document.getElementById('hotelForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const destination = document.querySelector('#hotelForm input[placeholder="Where are you going?"]').value;
        const checkIn = document.querySelector('#hotelForm input[type="date"]:first-of-type').value;
        const checkOut = document.querySelector('#hotelForm input[type="date"]:last-of-type').value;
        const guests = document.querySelector('#hotelForm select').value;

        // Display hotel search results
        displayHotelResults(destination, checkIn, checkOut, guests);
    });
});

// Passenger counter functionality
const passengers = {
    adult: 2,
    children: 0,
    infant: 0
};

function updatePassenger(type, change) {
    const currentValue = passengers[type];
    const newValue = currentValue + change;

    // Validation rules
    if (type === 'adult' && newValue < 1) return; // Minimum 1 adult
    if (newValue < 0) return;
    if (newValue > 9) return; // Maximum 9 passengers per type

    passengers[type] = newValue;
    document.getElementById(`${type}Count`).textContent = newValue;
    updatePassengerSummary();
}

function updatePassengerSummary() {
    const total = passengers.adult + passengers.children + passengers.infant;
    document.getElementById('passengerSummary').textContent = `${total} Passenger${total !== 1 ? 's' : ''}`;
}

function selectCabinClass(element, className) {
    // Remove selected class from all options
    document.querySelectorAll('.cabin-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    element.classList.add('selected');
    
    // Update the display
    document.getElementById('classType').textContent = className;
}

function updateJourneyDay() {
    const dateInput = document.getElementById('journeyDate');
    const dayDisplay = document.getElementById('journeyDay');
    const date = new Date(dateInput.value);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    dayDisplay.textContent = days[date.getDay()];
}

function displayFlightResults(fromCity, toCity, journeyDate, passengers, classType) {
    const resultsContainer = document.getElementById('flightResultsContainer');
    const searchResultsSection = document.getElementById('flightSearchResults');
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    // Show results section
    searchResultsSection.style.display = 'block';

    // Update the from and to city display
    document.getElementById('fromCityDisplay').textContent = fromCity;
    document.getElementById('toCityDisplay').textContent = toCity;

    // Mock flight data with updated structure
    const flights = [
        {
            airline: 'Vistara',
            logo: '/Images/Vistara.svg?height=40&width=40',
            flightNumber: 'AI 803',
            departureTime: '06:10',
            arrivalTime: '09:10',
            duration: '03h',
            price: 11131,
            from: fromCity,
            to: toCity,
            type: 'Non stop',
            freeMeal: true,
            onTime: '100%',
            lockPrice: 640,
            promoCode: 'CYBROMATECH',
            promoAmount: 249
        },
        {
            airline: 'IndiGo',
            logo: '/Images/Indigo.png?height=40&width=40',
            flightNumber: '6E 2412',
            departureTime: '20:00',
            arrivalTime: '22:50',
            duration: '02h 50m',
            price: 11308,
            from: fromCity,
            to: toCity,
            type: 'Non stop',
            freeMeal: false,
            onTime: '95%',
            lockPrice: 650,
            promoCode: 'CYBROMATECH',
            promoAmount: 231
        },
        {
            airline: 'Air India',
            logo: '/Images/AirIndia.png',
            flightNumber: 'AI 815',
            departureTime: '15:45',
            arrivalTime: '18:40',
            duration: '02h 55m',
            price: 11343,
            from: fromCity,
            to: toCity,
            type: 'Non stop',
            freeMeal: true,
            onTime: '98%',
            lockPrice: 652,
            promoCode: 'CYBROMATECH',
            promoAmount: 250
        },
        {
            airline: 'Spicejet',
            logo: '/Images/spicejet.png',
            flightNumber: 'AI 815',
            departureTime: '15:45',
            arrivalTime: '18:40',
            duration: '02h 55m',
            price: 11343,
            from: fromCity,
            to: toCity,
            type: 'Non stop',
            freeMeal: true,
            onTime: '98%',
            lockPrice: 652,
            promoCode: 'CYBROMATECH',
            promoAmount: 250
        }
    ];

    flights.forEach(flight => {
        const flightCard = document.createElement('div');
        flightCard.className = 'col-12 mb-3';
        flightCard.innerHTML = `
            <div class="flight-card">
                <div class="flight-card-header">
                    <div class="airline-info">
                        <img src="${flight.logo}" alt="${flight.airline}" class="airline-logo">
                        <div class="airline-details">
                            <div class="airline-name">${flight.airline}</div>
                            <div class="flight-number">${flight.flightNumber}</div>
                        </div>
                        ${flight.freeMeal ? '<div class="free-meal-badge"><i class="fas fa-utensils"></i> Free Meal</div>' : ''}
                    </div>
                    <div class="flight-time-info">
                        <div class="departure">
                            <div class="time">${flight.departureTime}</div>
                            <div class="city">${flight.from}</div>
                        </div>
                        <div class="flight-duration">
                            <div class="duration-line"></div>
                            <div class="duration-text">${flight.duration}</div>
                            <div class="flight-type">${flight.type}</div>
                        </div>
                        <div class="arrival">
                            <div class="time">${flight.arrivalTime}</div>
                            <div class="city">${flight.to}</div>
                        </div>
                    </div>
                    <div class="price-section">
                        <div class="price">₹ ${flight.price}</div>
                        <div class="price-subtitle">per adult</div>
                        <button class="view-prices-btn">VIEW PRICES</button>
                    </div>
                </div>
                <div class="flight-card-footer">
                    <div class="on-time-info">
                        <i class="far fa-clock"></i> ${flight.onTime} on time
                    </div>

                    <div class="promo-info">
                        Get FLAT ₹ ${flight.promoAmount} OFF using code ${flight.promoCode}
                    </div>
                    <div class="view-details">
                        <a href="#" class="view-details-link">View Flight Details</a>
                    </div>
                </div>
            </div>
        `;
        resultsContainer.appendChild(flightCard);
    });

    // Scroll to results
    searchResultsSection.scrollIntoView({ behavior: 'smooth' });
}

function displayHotelResults(destination, checkIn, checkOut, guests) {
    const resultsContainer = document.getElementById('hotelsResultsContainer');
    const searchResultsSection = document.getElementById('hotelSearchResults');
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    // Show results section
    searchResultsSection.style.display = 'block';

    // Update the destination display
    // document.getElementById('fromCityDisplay').textContent = destination;
    // document.getElementById('toCityDisplay').textContent = '';

    // Mock hotel data
    const hotels = [
        {
            name: 'Luxury Palace Hotel',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
            location: destination,
            rating: 4.8,
            reviews: 1214,
            price: 15000,
            amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Fitness Center']
        },
        {
            name: 'Cozy Inn',
            image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80',
            location: destination,
            rating: 4.5,
            reviews: 986,
            price: 8000,
            amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Parking']
        },
        {
            name: 'City View Resort',
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
            location: destination,
            rating: 4.7,
            reviews: 1532,
            price: 12000,
            amenities: ['Free WiFi', 'Rooftop Restaurant', 'Gym', 'Business Center']
        },
        {
            name: 'Seaside Retreat',
            image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80',
            location: destination,
            rating: 4.9,
            reviews: 2103,
            price: 20000,
            amenities: ['Free WiFi', 'Private Beach', 'Spa', 'Multiple Restaurants']
        }
    ];

    hotels.forEach(hotel => {
        const hotelCard = document.createElement('div');
        hotelCard.className = 'col-lg-3 col-md-6 mb-4';
        hotelCard.innerHTML = `
            <div class="hotel-card">
                <img src="${hotel.image}" alt="${hotel.name}" class="hotel-image">
                <div class="location-badge">
                    <i class="fas fa-map-marker-alt"></i> ${hotel.location}
                </div>
                <div class="hotel-info">
                    <h3 class="hotel-name">${hotel.name}</h3>
                    <div class="rating">
                        <span>${hotel.rating}/5 Excellent</span>
                        <span class="rating-text">(${hotel.reviews} reviews)</span>
                    </div>
                    <div class="amenities">
                        ${hotel.amenities.map(amenity => `<span class="amenity-badge">${amenity}</span>`).join('')}
                    </div>
                    <div class="price">
                        ₹${hotel.price.toLocaleString()} <span class="price-subtext">per night</span>
                    </div>
                    <button class="view-details-btn">View Details</button>
                </div>
            </div>
        `;
        resultsContainer.appendChild(hotelCard);
    });

    // Scroll to results
    searchResultsSection.scrollIntoView({ behavior: 'smooth' });
}

