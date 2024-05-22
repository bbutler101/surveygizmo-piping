(function(){
    // Define question IDs (replace with actual question IDs from your survey)
    var question1ID = 'QID1';
    var question2ID = 'QID2';
    var question3ID = 'QID3';
    var scoreQuestionID = 'QID4'; // This question will display the score

    // Function to calculate the score
    function calculateScore() {
        // Get the responses to the rating scale questions
        var response1 = parseInt(SurveyGizmo.pageQuestions[question1ID].value(), 10) || 0;
        var response2 = parseInt(SurveyGizmo.pageQuestions[question2ID].value(), 10) || 0;
        var response3 = parseInt(SurveyGizmo.pageQuestions[question3ID].value(), 10) || 0;

        // Calculate the total score
        var totalScore = response1 + response2 + response3;

        // Display the calculated score
        var scoreText = "Your total score is: " + totalScore;
        SurveyGizmo.pageQuestions[scoreQuestionID].setQuestion(scoreText);
        SurveyGizmo.pageQuestions[scoreQuestionID].show();
    }

    // Add event listeners to the rating scale questions to trigger the score calculation on change
    SurveyGizmo.pageQuestions[question1ID].input.on('change', calculateScore);
    SurveyGizmo.pageQuestions[question2ID].input.on('change', calculateScore);
    SurveyGizmo.pageQuestions[question3ID].input.on('change', calculateScore);

    // Initial call to set up the correct state when the page loads
    calculateScore();
    
    // Hide the score question initially
    SurveyGizmo.pageQuestions[scoreQuestionID].hide();

})();
