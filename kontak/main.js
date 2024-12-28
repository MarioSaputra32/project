// Data Contact
let dataContact = [];

const getData = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/contact", {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();

        dataContact = [...data];
        console.log("Fetched Data:", dataContact);
        renderData();
    } catch (err) {
        console.error("Unexpected error while fetching data:", err);
    }
};

const renderData = () => {
    const bodyData = document.getElementById("bodyData");

    if (bodyData) {
        const body = dataContact
            .map(
                (contact) =>
                    `
                <h2 class="bg-primary">${contact.nama}</h2>
            `
            )
            .join("");

        bodyData.innerHTML = body;
    } else {
        console.error("Body data container (bodyData) not found");
    }
};

getData();

// Form Submission
const submitBtn = document.getElementById('submitBtn');

if (submitBtn) {
    submitBtn.addEventListener('click', async function () {
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const message = document.getElementById('message')?.value.trim();

        if (!name || !email || !message) {
            alert('Please fill out all fields');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        const formData = {
            name: name,
            email: email,
            message: message,
        };

        try {
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Failed to send message: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Success:', data);
            alert('Message sent successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending message. Please try again later.');
        }
    });
} else {
    console.error("Submit button (submitBtn) not found");
}
