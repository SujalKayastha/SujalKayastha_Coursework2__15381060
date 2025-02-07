document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "flex" : "none";
        });

        // Ensure Book Now button stays visible
        const movieInfo = slides[index].querySelector(".movie-info");
        if (movieInfo) {
            movieInfo.style.opacity = "1";
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Show the first slide correctly
    showSlide(currentSlide);

    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);
});

    // ✅ Toggle Now Showing & Coming Soon
    const tabButtons = document.querySelectorAll(".tab-btn");
    const movieLists = document.querySelectorAll(".movies-list");

    function updateTabs(category) {
        const movieLists = document.querySelectorAll(".movies-list");
        const tabButtons = document.querySelectorAll(".tab-btn");
        
        if (!document.querySelector(`.${category}`)) return; // Prevents crashing if category doesn't exist
    
        movieLists.forEach(list => list.classList.add("hidden"));
        document.querySelector(`.${category}`).classList.remove("hidden");
    
        tabButtons.forEach(btn => btn.classList.remove("active"));
        document.querySelector(`[data-category="${category}"]`).classList.add("active");
    }
    
    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            updateTabs(this.dataset.category);
        });
    });

    updateTabs("now-showing"); // ✅ Default Tab

    // ✅ Fix: Movie Booking Redirection (Now Showing Works Properly)
// ✅ Fix: Movie Booking Redirection (Now Works Properly)
function redirectToSeatSelection(movieName) {
    const cinema = document.getElementById("select-cinema").value;
    const date = document.getElementById("select-date").value;
    const time = document.getElementById("select-time").value;

    // ✅ Fix: Ensure movie selection is **always kept** when booking from Now Showing
    if (!movieName || movieName === "") {
        const movieDropdown = document.getElementById("select-movie");
        if (movieDropdown) {
            movieName = movieDropdown.value; // If it's empty, take from dropdown
        }
    }

    if (cinema && date && time && movieName) {
        window.location.href = `seat-selection.html?movie=${encodeURIComponent(movieName)}&cinema=${cinema}&date=${date}&time=${time}`;
    } else {
        alert("Please select cinema, date, and time before booking!");
    }
}


document.querySelectorAll(".btn-buy").forEach(btn => {
    btn.addEventListener("click", function () {
        const movieName = this.getAttribute("data-movie"); 
        const cinema = document.getElementById("select-cinema")?.value || "";
        const date = document.getElementById("select-date")?.value || "";
        const time = document.getElementById("select-time")?.value || "";

        window.location.href = `seat-selection.html?movie=${encodeURIComponent(movieName)}&cinema=${encodeURIComponent(cinema)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`;
    });
});

    
    
    // ✅ Fix: Ensure "More" button works properly
    document.querySelectorAll(".btn-more").forEach(btn => {
        btn.addEventListener("click", function () {
            const movieName = this.getAttribute("data-movie");
            alert(`More details about ${movieName} coming soon!`);
        });
    });
    

    // ✅ Fix: Enable Dropdown Selection in Order
    function enableNextSelect(currentSelect, nextSelect) {
        currentSelect.addEventListener("change", function () {
            if (this.value !== "") {
                nextSelect.disabled = false;
                nextSelect.classList.add("active");
            }
        });
    }

    const cinemaSelect = document.getElementById("select-cinema");
    const movieSelect = document.getElementById("select-movie");
    const dateSelect = document.getElementById("select-date");
    const timeSelect = document.getElementById("select-time");
    const buyNowButton = document.getElementById("buy-now");

    enableNextSelect(cinemaSelect, movieSelect);
    enableNextSelect(movieSelect, dateSelect);
    enableNextSelect(dateSelect, timeSelect);

    timeSelect.addEventListener("change", function () {
        if (this.value !== "") {
            buyNowButton.disabled = false;
            buyNowButton.classList.add("active");
        }
    });

    buyNowButton.addEventListener("click", function () {
        if (cinemaSelect.value && movieSelect.value && dateSelect.value && timeSelect.value) {
            // ✅ Fix: Redirect to `seat-selection.html` instead of skipping it
            window.location.href = `seat-selection.html?movie=${encodeURIComponent(movieSelect.value)}&cinema=${encodeURIComponent(cinemaSelect.value)}&date=${encodeURIComponent(dateSelect.value)}&time=${encodeURIComponent(timeSelect.value)}`;
        } else {
            alert("Please select all options before proceeding!");
        }
    });
    


    function getQueryParam(param) {
        let value = new URLSearchParams(window.location.search).get(param);
        if (!value) return "Not Selected";
    
        // Capitalize first letter of each word
        let fixedValue = decodeURIComponent(value)
            .replace(/\b[a-z]/g, char => char.toUpperCase());
    
        console.log(`Parameter: ${param}, Value: ${value}, Fixed: ${fixedValue}`); // Debugging
    
        return fixedValue;
    }
     
        // ✅ Apply Fix to All Booking Detail
if (document.getElementById("selected-movie")) {
    document.getElementById("selected-movie").textContent = getQueryParam("movie");
    document.getElementById("selected-cinema").textContent = getQueryParam("cinema");
    document.getElementById("selected-date").textContent = getQueryParam("date");
    document.getElementById("selected-time").textContent = getQueryParam("time");
}


    // ✅ Fix: Read More Toggle - Fixed Smooth Transition
    const readMoreBtn = document.getElementById("read-more");
    const aboutShort = document.getElementById("about-short");
    const aboutFull = document.getElementById("about-full");

    if (readMoreBtn) {
        readMoreBtn.addEventListener("click", function () {
            if (aboutFull.classList.contains("hidden")) {
                aboutFull.classList.remove("hidden");
                readMoreBtn.textContent = "Read Less";
            } else {
                aboutFull.classList.add("hidden");
                readMoreBtn.textContent = "Read More";
            }
        });
    }

    // ✅ Fix: Show More Button on Hover for All Movies
    document.querySelectorAll(".movie-card").forEach(card => {
        const moreBtn = card.querySelector(".btn-more");
        const buyBtn = card.querySelector(".btn-buy");

        if (moreBtn) {
            card.addEventListener("mouseenter", function () {
                moreBtn.style.opacity = "1";
            });
            card.addEventListener("mouseleave", function () {
                moreBtn.style.opacity = "0";
            });
        }

        if (buyBtn) {
            buyBtn.style.opacity = "0"; // Initially hidden
            card.addEventListener("mouseenter", function () {
                buyBtn.style.opacity = "1"; // Show on hover
            });
            card.addEventListener("mouseleave", function () {
                buyBtn.style.opacity = "0"; // Hide when not hovered
            });
        }
    });

    // ✅ Fix: Seat Selection System (Now Works Properly)
    const seatLayout = document.querySelector(".seat-layout");
    const confirmButton = document.getElementById("confirm-seats");

    if (seatLayout) {
        const rows = ["A", "B", "C", "D", "E", "F", "G"];
        const cols = 10;
        const selectedSeats = new Set();

        rows.forEach(row => {
            const rowElement = document.createElement("div");
            rowElement.classList.add("seat-row");

            for (let i = 1; i <= cols; i++) {
                const seat = document.createElement("div");
                seat.classList.add("seat");
                seat.textContent = row + i;

                if (Math.random() < 0.2) {
                    seat.classList.add("sold-out");
                } else {
                    seat.addEventListener("click", function () {
                        if (!seat.classList.contains("sold-out")) {
                            if (selectedSeats.has(seat.textContent)) {
                                selectedSeats.delete(seat.textContent);
                                seat.classList.remove("selected");
                            } else {
                                selectedSeats.add(seat.textContent);
                                seat.classList.add("selected");
                            }
                        }
                        confirmButton.disabled = selectedSeats.size === 0;
                    });
                }

                rowElement.appendChild(seat);
            }

            seatLayout.appendChild(rowElement);
        });
    }

    // ✅ Fix: Proceed to Payment with Selected Seats
    if (confirmButton) {
        confirmButton.addEventListener("click", function () {
            if (selectedSeats.size > 0) {
                alert(`Proceeding to Payment with selected seats: ${Array.from(selectedSeats).join(", ")}`);
                window.location.href = `booking.html?movie=${getQueryParam("movie")}&cinema=${getQueryParam("cinema")}&date=${getQueryParam("date")}&time=${getQueryParam("time")}&seats=${Array.from(selectedSeats).join(",")}`;
            } else {
                alert("Please select at least one seat before proceeding.");
            }
        });
    }



    function loadMovies(category) {
        console.log(`🎬 Switching to: ${category}`);
        moviesList.innerHTML = ""; // Clear previous movies

        const movies = {
            "now-showing": [
                { title: "Interstellar", genre: "Sci-Fi | Thriller", img: "assets/images/movie1.jpg", url: "seat-selection.html?movie=Interstellar" },
                { title: "Rockstar", genre: "Melodrama | Romance", img: "assets/images/movie2.jpg", url: "seat-selection.html?movie=Rockstar" }
            ],
            "coming-soon": [
                { title: "Django Unchained", genre: "Action | Western", img: "assets/images/movie3.jpg", url: "seat-selection.html?movie=Django Unchained" },
                { title: "Shambhala", genre: "Drama | Adventure", img: "assets/images/movie4.jpg", url: "seat-selection.html?movie=Shambhala" }
            ]
        };

        if (movies[category]) {
            movies[category].forEach(movie => {
                const movieElement = document.createElement("div");
                movieElement.classList.add("movie-card");
                movieElement.innerHTML = `
                    <img src="${movie.img}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <p>${movie.genre}</p>
                    <button class="btn-buy" data-url="${movie.url}">Buy Now</button>
                `;
                moviesList.appendChild(movieElement);
            });

            // ✅ Attach Click Event to "Buy Now" Buttons
            document.querySelectorAll(".btn-buy").forEach(btn => {
                btn.addEventListener("click", function () {
                    const url = this.getAttribute("data-url");
                    console.log(`➡ Redirecting to: ${url}`);
                    window.location.href = url;
                });
            });
        }
    }

    // ✅ Attach Click Event to Dropdown Options
    dropdownLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const category = this.dataset.category;
            loadMovies(category);
        });
    });

    // ✅ Default: Load "Now Showing" Movies
    loadMovies("now-showing");

    document.addEventListener("DOMContentLoaded", function () {
        console.log("📅 Schedule Page Loaded!");
    
        // ✅ DOM Elements
        const thisWeekBtn = document.getElementById("this-week-btn");
        const nextWeekBtn = document.getElementById("next-week-btn");
        const languageSelect = document.getElementById("language-select");
        const cinemaSelect = document.getElementById("cinema-select");
        const movieSchedules = document.querySelectorAll(".movie-schedule");
    
        // ✅ Default: Show "This Week"
        let activeWeek = "this-week";
    
        function applyFilters() {
            const selectedLanguage = languageSelect.value;
            const selectedCinema = cinemaSelect.value;
    
            movieSchedules.forEach(movie => {
                const movieLanguage = movie.getAttribute("data-language");
                const movieCinema = movie.getAttribute("data-cinema");
                const movieWeek = movie.classList.contains("this-week") ? "this-week" : "next-week";
    
                // Check Language & Cinema Filters + Ensure Correct Week is Displayed
                const languageMatch = (selectedLanguage === "all" || selectedLanguage === movieLanguage);
                const cinemaMatch = (selectedCinema === "all" || selectedCinema === movieCinema);
                const weekMatch = (movieWeek === activeWeek);
    
                if (languageMatch && cinemaMatch && weekMatch) {
                    movie.style.display = "block";
                } else {
                    movie.style.display = "none";
                }
            });
        }
    
        // ✅ Fix: Ensure only one button is active at a time
        function toggleWeekSelection(selectedButton, otherButton, week) {
            activeWeek = week;
            selectedButton.classList.add("active");
            otherButton.classList.remove("active");
            applyFilters();
        }
    
        // ✅ Week Filter Buttons
        thisWeekBtn.addEventListener("click", function () {
            toggleWeekSelection(thisWeekBtn, nextWeekBtn, "this-week");
        });
    
        nextWeekBtn.addEventListener("click", function () {
            toggleWeekSelection(nextWeekBtn, thisWeekBtn, "next-week");
        });
    
        // ✅ NEW: Listen for dropdown changes
        languageSelect.addEventListener("change", applyFilters);
        cinemaSelect.addEventListener("change", applyFilters);
    
        // ✅ Apply Filters on Load
        applyFilters();
        console.log("✅ Filters & Time Slot Selection Ready!");
    });
    document.addEventListener("DOMContentLoaded", function () {
        const userNav = document.getElementById("user-nav"); // Sign In Button
    
        // ✅ Check if user is logged in
        const username = localStorage.getItem("loggedInUser");
    
        if (username) {
            // ✅ Remove Sign In & Show Logout Button
            userNav.innerHTML = `<a href="#" id="logout-btn">Logout</a>`;
    
            // ✅ Logout Functionality
            document.getElementById("logout-btn").addEventListener("click", function () {
                localStorage.removeItem("loggedInUser"); // Remove user session
                window.location.href = "logout.php"; // Redirect to logout
            });
        }
    });
    
    
    
    
    

    
    

