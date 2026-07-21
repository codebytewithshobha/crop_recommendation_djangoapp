document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#predict-form');
    const resetButton = document.querySelector('#reset-form');
    const message = document.querySelector('#predict-message');
    const sampleCards = document.querySelectorAll('.sample-card');

    if (!form) return;

    function updateMessage(text) {
        if (message) {
            message.textContent = text;
        }
    }

    function setFormValues(values) {
        Object.entries(values).forEach(([name, value]) => {
            const input = form.querySelector(`[name="${name}"]`);
            if (input) input.value = value;
        });
    }

    function clearSelection() {
        sampleCards.forEach(card => card.classList.remove('active'));
    }

    sampleCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const values = {
                nitrogen: card.dataset.n,
                phosphorus: card.dataset.p,
                potassium: card.dataset.k,
                temperature: card.dataset.temp,
                humidity: card.dataset.humidity,
                ph: card.dataset.ph,
                rainfall: card.dataset.rainfall,
            };
            setFormValues(values);
            clearSelection();
            card.classList.add('active');
            updateMessage('Sample values loaded. अब आप परिणाम के लिए Predict Crop पर क्लिक करें।');
        });
    });

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            form.reset();
            clearSelection();
            updateMessage('Form reset. कृपया नए मान दर्ज करें।');
        });
    }

    form.addEventListener('submit', () => {
        if (message) {
            message.textContent = 'Calculating recommendation... कृपया प्रतीक्षा करें।';
        }
    });
});
