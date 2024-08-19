document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('dialog');
    const submitRequestButton = document.getElementById('submit-request');
    const adminButton = document.getElementById('admin-button');

    // Load saved requests from Firebase
    loadRequests();

    // Open the dialog when the "+" button is clicked
    document.querySelectorAll('.add-button').forEach(button => {
        button.addEventListener('click', (e) => {
            dialog.classList.remove('hidden');
            // Store the current day in the dialog's data attribute
            dialog.setAttribute('data-day', e.target.closest('.day').dataset.day);
        });
    });

    // Handle the submission of a new request
    submitRequestButton.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const shift = document.getElementById('shift').value;
        const priority = document.getElementById('priority').value;
        const day = dialog.getAttribute('data-day');
        const requestDiv = document.createElement('div');

        requestDiv.classList.add('request');
        requestDiv.classList.add(priority.toLowerCase()); // Apply the priority class
        requestDiv.textContent = `${name} - ${shift}`;

        document.querySelector(`.day[data-day="${day}"] .requests`).appendChild(requestDiv);
        dialog.classList.add('hidden');

        // Save the request to Firebase
        saveRequest(day, name, shift, priority);
    });

    // Admin mode for approving requests
    adminButton.addEventListener('click', () => {
        const password = prompt('Enter the admin password:');
        if (password === '3615') {
            document.querySelectorAll('.request').forEach(request => {
                request.addEventListener('click', () => {
                    request.style.backgroundColor = 'green';
                    updateRequestApproval(request.textContent);
                });
            });
        } else {
            alert('Incorrect password');
        }
    });

    // Function to save a request to Firebase
    function saveRequest(day, name, shift, priority) {
        const requestRef = firebase.database().ref(`requests/${day}`).push();
        requestRef.set({
            name,
            shift,
            priority,
            approved: false
        });
    }

    // Function to load requests from Firebase
    function loadRequests() {
        const requestsRef = firebase.database().ref('requests');
        requestsRef.on('value', (snapshot) => {
            const requests = snapshot.val();
            for (const day in requests) {
                for (const key in requests[day]) {
                    const request = requests[day][key];
                    const requestDiv = document.createElement('div');
                    requestDiv.classList.add('request');
                    requestDiv.classList.add(request.priority.toLowerCase());
                    requestDiv.textContent = `${request.name} - ${request.shift}`;
                    if (request.approved) {
                        requestDiv.style.backgroundColor = 'green';
                    }
                    document.querySelector(`.day[data-day="${day}"] .requests`).appendChild(requestDiv);
                }
            }
        });
    }

    // Function to update request approval in Firebase
    function updateRequestApproval(textContent) {
        const requestsRef = firebase.database().ref('requests');
        requestsRef.once('value', (snapshot) => {
            const requests = snapshot.val();
            for (const day in requests) {
                for (const key in requests[day]) {
                    const request = requests[day][key];
                    if (`${request.name} - ${request.shift}` === textContent) {
                        requestsRef.child(`${day}/${key}`).update({ approved: true });
                    }
                }
            }
        });
    }
});
