let serverTime = null;  // Store the server time
let localTimeOffset = 0; // Store the time offset difference between server time and local time

function local_time() {
    // Immediately update the clock with local time
    updateClock(new Date());

    if (!serverTime) {
        // Replace the previous server with a new one (with API key)
        fetch('https://api.timezonedb.com/v2.1/get-time-zone?key=175BU7C8SF2E&format=json&by=zone&zone=Asia/Dhaka')
            .then(response => response.json())
            .then(data => {
                // Server time (from the API)
                serverTime = new Date(data.formatted);  // Get formatted date from the response
                
                // Calculate the time difference between server time and local device time
                let localTime = new Date();
                localTimeOffset = serverTime - localTime;

                // Update the clock with server time immediately
                updateClock(serverTime);

                // Update the clock every second based on local time
                setInterval(() => {
                    let updatedTime = new Date(new Date().getTime() + localTimeOffset);
                    updateClock(updatedTime);
                }, 1000);
            })
            .catch(error => {
                console.error('Error fetching time:', error);
                // Optionally, display an error message to the user
            });
    }
}

function updateClock(time) {
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let am_pm = hour >= 12 ? "PM" : "AM";

    if (hour === 0) {
        hour = 12;  // Midnight hour handling
    } else if (hour > 12) {
        hour -= 12; // Convert 24-hour format to 12-hour format
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let currentTimeString = `${hour} : ${min} : ${sec} [${am_pm}]`;

    // Apply opacity transition by adding a class to fade out
    let clockElement = document.getElementById("clock");
    clockElement.classList.add('clock-updating');  // Fade out the clock

    setTimeout(() => {
        clockElement.innerHTML = currentTimeString;  // Update clock time
        clockElement.classList.remove('clock-updating');  // Fade in the clock
    }, 300);  // Wait for opacity transition to complete
}

// Initialize the time fetching and updating process
local_time();
