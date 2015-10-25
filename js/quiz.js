(function(){

	var app = angular.module('myQuiz', []);

  app.controller('QuizController', ['$scope', '$http', '$sce', function($scope, $http, $sce){

      $scope.score = 0;
      $scope.activeQuestion = -1;
      $scope.activeQuestionAnswered = 0;
      $scope.percentage = 0;

      $http.get('quiz_data.json').then(function(quizData){
          $scope.myQuestions = quizData.data;
          $scope.totalQuestions = $scope.myQuestions.length;
      });

      $scope.selectAnswer = function(qIndex, aIndex) {

          var questionState = $scope.myQuestions[qIndex].questionState;

          if(questionState != 'answered'){
              $scope.myQuestions[qIndex].selectAnswer = aIndex;
              var correctAnswer = $scope.myQuestions[qIndex].correct;
              $scope.myQuestions[qIndex].correctAnswer = correctAnswer;

              if( aIndex === correctAnswer) {
                  $scope.myQuestions[qIndex].correctness = 'correct';
                  $scope.score += 1;
              }else{
                  $scope.myQuestions[qIndex].correctness = 'incorrect';
              }
              $scope.myQuestions[qIndex].questionState = 'answered';
          }
          $scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(1);
      }

      $scope.isSelected = function(qIndex, aIndex) {
          return $scope.myQuestions[qIndex].selectAnswer === aIndex;
      }
      $scope.isCorrect = function(qIndex, aIndex) {
          return $scope.myQuestions[qIndex].correctAnswer === aIndex;
      }

      $scope.selectContinue = function() {
        return $scope.activeQuestion += 1;
      }

      $scope.createShareLinks = function(percentage) {
        var url = 'http://codifying.com';

        var emailLink = '<a class="btn email" href="mailto:jimdingman@sharpsroasters.com?subject=*ONLY SCORES OF 90% OR HIGHER ACCEPTED*&amp;body=I scored a '+percentage+'% on this quiz. *ONLY SCORES OF 90% OR HIGHER ACCEPTED*">Email Your Manager</a>';

        var newMarkup = emailLink;

        return $sce.trustAsHtml(newMarkup);
      }


  }]);


      $('#reload').click(function() {
          location.reload();
      });

})();
