document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.nav-buttons button');
    const sections = document.querySelectorAll('.menu-section');
    
    // Default to showing first section
    sections[0].classList.add('active');
    buttons[0].classList.add('active');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and sections
            buttons.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked button and corresponding section
            button.classList.add('active');
            const sectionToShow = document.getElementById(button.dataset.section);
            sectionToShow.classList.add('active');
        });
    });

    // Function to load prices from Google Sheets
    async function loadPrices() {
        try {
            // Usar un proxy CORS para evitar el error de CORS
            const response = await fetch('https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vQVYsxVR0oLcQya755aAennAkp5QKjlwrZ0FAgqMeSJZfM7ptIGZOg6lEdPwvGzNeFAN3-uvttexZr5/pub?output=csv');
            const data = await response.text();
            const rows = data.split('\n').map(row => row.split(','));
            
            rows.forEach(row => {
                const [key, price] = row;
                const priceElement = document.querySelector(`[data-price="${key}"]`);
                if (priceElement) {
                    priceElement.textContent = `$${price}`;
                }
            });
        } catch (error) {
            console.error('Error loading prices:', error);
        }
    }

    // Call price loading function
    loadPrices();
});