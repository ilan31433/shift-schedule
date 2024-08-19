body {
    font-family: Arial, sans-serif;
    direction: rtl; /* Support for right-to-left text */
    margin: 0;
    padding: 0;
}

#calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr); /* 7 columns for 7 days */
    gap: 10px;
    padding: 20px;
}

.day {
    border: 1px solid #ccc;
    padding: 10px;
    position: relative;
}

.date {
    font-weight: bold;
    color: black; /* Black color for the date */
    margin-bottom: 10px;
}

.add-button {
    position: absolute;
    top: 5px;
    left: 5px;
}

.requests {
    margin-top: 30px;
}

.request {
    padding: 5px;
    margin-bottom: 5px;
}

.request.low {
    color: grey; /* Grey color for low priority */
    background-color: #f0f0f0; /* Light background for contrast */
}

.request.medium {
    color: orange; /* Orange color for medium priority */
    background-color: #fff5e6; /* Light orange background */
}

.request.high {
    color: red; /* Red color for high priority */
    background-color: #ffe6e6; /* Light red background */
}

.hidden {
    display: none;
}

#dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: white;
    border: 1px solid #ccc;
    z-index: 1000;
    width: 80%; /* Adjusted for mobile */
}

#admin-button {
    margin-top: 20px;
}

/* Media Queries for Responsive Design */

/* For screens smaller than 600px (typically mobile devices) */
@media (max-width: 600px) {
    #calendar {
        grid-template-columns: repeat(2, 1fr); /* 2 columns instead of 7 */
        gap: 5px;
        padding: 10px;
    }

    .day {
        padding: 5px;
    }

    .date {
        font-size: 14px; /* Smaller font size for mobile */
    }

    .requests {
        margin-top: 20px;
    }

    #dialog {
        width: 100%; /* Full width on mobile */
        padding: 15px;
    }

    #admin-button {
        width: 100%; /* Full width button on mobile */
        padding: 10px;
        font-size: 16px;
    }
}

/* For screens between 600px and 900px (typically tablets) */
@media (min-width: 600px) and (max-width: 900px) {
    #calendar {
        grid-template-columns: repeat(3, 1fr); /* 3 columns instead of 7 */
        gap: 8px;
        padding: 15px;
    }

    .day {
        padding: 8px;
    }

    .date {
        font-size: 16px; /* Adjusted font size for tablets */
    }

    .requests {
        margin-top: 25px;
    }

    #dialog {
        width: 80%; /* Slightly larger dialog for tablets */
        padding: 18px;
    }

    #admin-button {
        width: 80%; /* Adjusted width for tablets */
        padding: 12px;
        font-size: 18px;
    }
}
