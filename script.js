const importantDates = [
    { name: "Fira's Birthday", date: "2025-01-13T00:00:00" },
    { name: "Valentine's Day", date: "2025-02-14T00:00:00" },
    { name: "Maga's Birthday", date: "2025-03-05T00:00:00" },
    { name: "International Women's Day", date: "2025-03-08T00:00:00" },
    { name: "1-Year Anniversary", date: "2025-09-20T00:00:00" },
    { name: "New Year", date: "2026-01-01T00:00:00" },
];

// Define the start date for monthly anniversaries
const startAnniversaryDate = new Date("2024-09-20T00:00:00");

// Function to calculate monthly anniversaries dynamically
const addMonthlyAnniversaries = () => {
    const now = new Date();
    let currentDate = new Date(startAnniversaryDate);

    while (currentDate < now || currentDate.getFullYear() <= now.getFullYear() + 1) {
        const monthDiff = Math.ceil(
            (currentDate.getFullYear() - startAnniversaryDate.getFullYear()) * 12 +
            currentDate.getMonth() -
            startAnniversaryDate.getMonth()
        );

        importantDates.push({
            name: `Our ${monthDiff}-month anniversary`,
            date: currentDate.toISOString(),
        });

        // Move to the next month
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
};

// Add monthly anniversaries to the list
addMonthlyAnniversaries();


const getNextDate = () => {
    const now = new Date();
    for (let i = 0; i < importantDates.length; i++) {
        const eventDate = new Date(importantDates[i].date);
        if (eventDate > now) {
            return { current: importantDates[i], next: importantDates[i + 1] || null };
        }
    }
    return null;
};

const updateRecurringDates = () => {
    const now = new Date();
    importantDates.forEach(event => {
        const eventDate = new Date(event.date);
        if (event.name === "New Year" && eventDate.getFullYear() < now.getFullYear()) {
            event.date = `${now.getFullYear() + 1}-01-01T00:00:00`;
        }
    });
};

const countdown = () => {
    const nextEvents = getNextDate();
    if (!nextEvents || !nextEvents.current) {
        document.getElementById("timer").innerText = "No more upcoming events!";
        return;
    }

    const eventDate = new Date(nextEvents.current.date);
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
        countdown();
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Display current event countdown
    document.getElementById("timer").innerHTML = `
        <p>${nextEvents.current.name}: ${days}d ${hours}h ${minutes}m ${seconds}s</p>
    `;

    // Display the next event
    if (nextEvents.next) {
        document.getElementById("next-event").innerHTML = `
            <p>Next: ${nextEvents.next.name}</p>
        `;
    } else {
        document.getElementById("next-event").innerHTML = `<p>No more events after this!</p>`;
    }

    setTimeout(countdown, 1000);
};


// Start the Countdown
updateRecurringDates();
countdown();



function playVideo() {
    const video = document.getElementById('fullscreen-video');
    video.style.display = 'block'; // Show the video element
    video.requestFullscreen(); // Open the video in fullscreen mode
    video.play(); // Start video playback

    // Exit fullscreen and hide the video when it ends
    video.addEventListener('ended', () => {
        video.style.display = 'none'; // Hide the video
        document.exitFullscreen(); // Exit fullscreen
    });
}
