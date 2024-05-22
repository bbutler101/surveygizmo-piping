(function(){
    // Define question IDs (replace with actual question IDs from your survey)
    var emailQuestionID = 'QID1';
    var verificationCodeQuestionID = 'QID2';
    
    // Define the API endpoint for email validation
    var validationApiEndpoint = 'my_api_url';

    // Function to handle email validation
    function validateEmail() {
        // Get the email entered by the user
        var email = SurveyGizmo.pageQuestions[emailQuestionID].value();

        // Make an API call to validate the email
        fetch(validationApiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.isValid) {
                // If the email is valid, show the verification code question
                SurveyGizmo.pageQuestions[verificationCodeQuestionID].show();
                SurveyGizmo.pageQuestions[emailQuestionID].setMessage('Verification code sent to your email.', 'success');
            } else {
                // If the email is invalid, show an error message
                SurveyGizmo.pageQuestions[emailQuestionID].setError('Invalid email address. Please try again.');
                SurveyGizmo.pageQuestions[verificationCodeQuestionID].hide();
            }
        })
        .catch(error => {
            console.error('Error validating email:', error);
            SurveyGizmo.pageQuestions[emailQuestionID].setError('An error occurred while validating your email. Please try again.');
            SurveyGizmo.pageQuestions[verificationCodeQuestionID].hide();
        });
    }

    // Add an event listener to the email question to trigger validation on change
    SurveyGizmo.pageQuestions[emailQuestionID].input.on('blur', validateEmail);
    
    // Hide the verification code question initially
    SurveyGizmo.pageQuestions[verificationCodeQuestionID].hide();

})();
