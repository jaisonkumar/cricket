document.getElementById('score-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value.trim();
    const score = document.getElementById('score').value.trim();

    if (!name || !score) {
        document.getElementById('form-feedback').textContent = 'Please fill out both fields.';
        return;
    }

    try {
        const response = await fetch('/api/submit-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, score }),
        });

        if (response.ok) {
            document.getElementById('form-feedback').textContent = 'Score submitted successfully!';
            document.getElementById('score-form').reset();
        } else {
            document.getElementById('form-feedback').textContent = 'Failed to submit score.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('form-feedback').textContent = 'Error submitting score.';
    }
});
