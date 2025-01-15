document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Handle all clicks within the navigation
    navLinks.addEventListener('click', function(e) {
        const target = e.target;

        if (target.classList.contains('dropdown-toggle')) {
            e.preventDefault();
            const parent = target.closest('.dropdown, .nested-dropdown');
            const dropdownMenu = parent.querySelector('.dropdown-menu, .nested-menu');
            
            // Close all other open dropdowns
            document.querySelectorAll('.dropdown-menu.show, .nested-menu.show').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.remove('show');
                }
            });

            // Toggle current dropdown
            dropdownMenu.classList.toggle('show');
        } 
        // Handle regular links
        else if (target.tagName === 'A' && !target.classList.contains('dropdown-toggle')) {
            // This is a direct link, allow default behavior
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-links')) {
            document.querySelectorAll('.dropdown-menu, .nested-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });

    // Update current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Existing JavaScript for other functionalities
    function scrollTours(direction) {
        const list = document.querySelector('.tours-list');
        const scrollAmount = list.offsetWidth / 2;

        if (direction === 'prev') {
            list.scrollLeft -= scrollAmount;
        } else {
            list.scrollLeft += scrollAmount;
        }
    }

    const options = [
        { text1: "Small Town Champ", text2: "Big City Glamour", img1: "small city.jpg", img2: "london.jpg" },
        { text1: "Beach Explorer", text2: "Mountain Adventurer", img1: "maldives.jpg", img2: "mountain.jpg" },
        { text1: "Luxury Traveler", text2: "Backpacker", img1: "luxury.jpg", img2: "Ooty.jpg" },
        { text1: "Nature Lover", text2: "Cultural Enthusiast", img1: "nature.jpg", img2:"Goldentemple.jpg" },
        { text1: "Food Explorer", text2: "Wellness Seeker", img1: "foodie.jpg", img2: "wellness seeker.jpg" }
    ];

    const resultsMapping = {
        relaxing: {
            text: "You love relaxing vacations!",
            exploreLink: "relaxing.html"
        },
        adventurous: {
            text: "You enjoy adventurous trips!",
            exploreLink: "adventurous.html"
        },
        cultural: {
            text: "You are a cultural enthusiast!",
            exploreLink: "cultural.html"
        },
        nature: {
            text: "You are a nature lover!",
            exploreLink: "nature.html"
        },
        foodie: {
            text: "You are a foodie traveler!",
            exploreLink: "foodie.html"
        },
        wellness: {
            text: "You enjoy wellness and self-care trips!",
            exploreLink: "wellness.html"
        }
    };

    let currentStep = 0;
    const selectedOptions = [];

    function selectOption(option) {
        selectedOptions.push(option);
        currentStep++;

        if (currentStep < 5) {
            updateQuestion();
        } else {
            showResult();
        }
    }

    function updateQuestion() {
        const question = options[currentStep];
        document.getElementById("option1").querySelector("img").src = question.img1;
        document.getElementById("option1").querySelector("h3").textContent = question.text1;

        document.getElementById("option2").querySelector("img").src = question.img2;
        document.getElementById("option2").querySelector("h3").textContent = question.text2;
    }

    function showResult() {
        document.querySelector(".question-section").classList.add("hidden");
        document.querySelector(".result-section").classList.remove("hidden");

        const relaxingCount = selectedOptions.filter(option => option === 1).length;

        let resultKey;
        if (relaxingCount >= 3) {
            resultKey = "relaxing";
        } else if (selectedOptions.includes(2) && relaxingCount >= 2) {
            resultKey = "adventurous";
        } else if (selectedOptions.includes(1) && selectedOptions.includes(2)) {
            resultKey = "cultural";
        } else if (selectedOptions.includes(1) && relaxingCount === 1) {
            resultKey = "nature";
        } else if (selectedOptions.includes(2) && relaxingCount === 0) {
            resultKey = "foodie";
        } else {
            resultKey = "wellness";
        }

        const resultData = resultsMapping[resultKey];
        document.getElementById("result").textContent = resultData.text;

        const exploreButton = document.getElementById("explore-button");
        exploreButton.href = resultData.exploreLink;
    }

    function restartGame() {
        currentStep = 0;
        selectedOptions.length = 0;
        document.querySelector(".question-section").classList.remove("hidden");
        document.querySelector(".result-section").classList.add("hidden");
        updateQuestion();
    }

    // Review section navigation logic
    let currentReview = 0;
    const reviews = document.querySelectorAll('.review-item');
    const totalReviews = reviews.length;
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    function showReviews() {
        reviews.forEach((review, index) => {
            if (index >= currentReview && index < currentReview + 3) {
                review.style.display = 'block';
            } else {
                review.style.display = 'none';
            }
        });
    }

    showReviews();

    prevBtn.addEventListener('click', () => {
        if (currentReview > 0) {
            currentReview -= 3;
            showReviews();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentReview + 3 < totalReviews) {
            currentReview += 3;
            showReviews();
        }
    });

    // Make these functions globally accessible
    window.scrollTours = scrollTours;
    window.selectOption = selectOption;
    window.restartGame = restartGame;
});

