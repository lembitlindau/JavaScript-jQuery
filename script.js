$(document).ready(function() {
    // Check for previous submission in localStorage
    const previousSubmission = localStorage.getItem('previousSubmission');
    if (previousSubmission) {
        const data = JSON.parse(previousSubmission);
        $('#previousMessage').text(data.message);
        $('#previousSubmission').removeClass('hidden');
    }

    // Form validation and submission
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        $('.error').text('');
        
        // Get form values
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const message = $('#message').val().trim();
        
        // Validation flags
        let isValid = true;
        
        // Name validation
        if (name === '') {
            $('#nameError').text('Palun sisestage oma nimi');
            isValid = false;
        }
        
        // Email validation
        if (email === '') {
            $('#emailError').text('Palun sisestage oma e-posti aadress');
            isValid = false;
        } else if (!isValidEmail(email)) {
            $('#emailError').text('Palun sisestage korrektne e-posti aadress');
            isValid = false;
        }
        
        // Message validation
        if (message === '') {
            $('#messageError').text('Palun sisestage oma sõnum');
            isValid = false;
        }
        
        // If form is valid
        if (isValid) {
            // Log form data to console
            console.log('Form Data:', {
                name: name,
                email: email,
                message: message
            });
            
            // Store in localStorage
            localStorage.setItem('previousSubmission', JSON.stringify({
                name: name,
                email: email,
                message: message
            }));
            
            // Change success image
            $('#successImage').attr('src', 'https://picsum.photos/400/200?' + new Date().getTime());
            
            // Hide form and show success message
            $('#contactForm').hide();
            $('#successMessage').removeClass('hidden');
            
            // Update previous submission display
            $('#previousMessage').text(message);
            $('#previousSubmission').removeClass('hidden');
        }
    });
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Toggle previous submission visibility
    $('#togglePrevious').on('click', function() {
        $('#previousSubmission').slideToggle();
        console.log('Previous submission visibility toggled');
    });
});
