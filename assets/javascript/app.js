//This is the object that hold all possible answers from the player 
//it will store in each variable according with the circumstance

var answer = {
 
  correct: 0,

 
  incorrect: 0,

  
  missed: 0,

 
  questionNumber: 0,

  //Questions and answers choices and images will  be display after time is up or question is answered 
  questions:
    [
      {
        question: "How many colors are there in a rainbow?",
        answerA: "5",
        answerB: "6",
        answerC: "7",
        answerD: "8",
        correct: "7",
        img: "raibowcolor.jpg"
       

      },
      {
        question: "Which two numbers are used in binary code?",
        answerA: "0 and 1",
        answerB: "0 and 2",
        answerC: "1 and 2",
        answerD: "2 and 3",
        correct: "0 and 1",
        img: "binarynumber.jpg"
        
      },
      {
        question: "How many strings does a cello have?",
        answerA: "3",
        answerB: "4",
        answerC: "5",
        answerD: "6",
        correct: "4",
        img: "cello.jpeg"
        },
      {
        question: "How many degrees are found in a circle?",
        answerA: "360",
        answerB: "270",
        answerC: "180",
        answerD: "260",
        correct: "360",
        img:"360degrees.png"
      },
      {
        question: "How many sides does a dodecagon have?",
        answerA: "9",
        answerB: "10",
        answerC: "12",
        answerD: "13",
        correct: "12",
        img:"dodecagon-sides.png"
       
      }
      
    ],

  //Timer that will be display on the game
  beginCountdown: function(time) {
    
    counter = setInterval(function () {
      time--;
      $(".timer").html("Seconds Left: " + time);

      
      if(time === 0) {
        
        answer.missed++;
        answer.results("missed");
      }
    },1000);
  },

  // Stop countdowns between questions
  stopCountdown: function() {
    clearInterval(counter);
  },

  
  game: function() {
    
    if (answer.questionNumber < answer.questions.length) {
      
      answer.beginCountdown(10);

     
      number = answer.questionNumber;

      
      normalNumber = number + 1;

      
      $('.show-question').append('<h2 class="question question-' + normalNumber + '">' + normalNumber + ') ' + answer.questions[number].question + '</h2>');

      
      $('.show-question').append('<div class="output question-' + normalNumber + ' answerA" data-output="' + answer.questions[number].answerA + '">A) ' + answer.questions[number].answerA + '</div>');
      $('.show-question').append('<div class="output question-' + normalNumber + ' answerB" data-output="' + answer.questions[number].answerB + '">B) ' + answer.questions[number].answerB + '</div>');
      $('.show-question').append('<div class="output question-' + normalNumber + ' answerC" data-output="' + answer.questions[number].answerC + '">C) ' + answer.questions[number].answerC + '</div>');
      $('.show-question').append('<div class="output question-' + normalNumber + ' answerD" data-output="' + answer.questions[number].answerD + '">D) ' + answer.questions[number].answerD + '</div>');
      
      
      $('.output').click(function() {
        
        output = $(this).data('output');

        
        if (output == answer.questions[number].correct) {
          answer.correct++;
          answer.results('correct');
        }
        
        else {
          answer.incorrect++;
          answer.results('incorrect');
        }
      });
    }

   
    else {
      answer.endGame();
    }
  },

  
  results: function(result) {
    
    answer.stopCountdown();

    $('.show-question, .timer').empty();

    if (result === 'correct') {
      $('.show-question').append('<h2>Correct!</h2>');
    }
    else if (result === 'incorrect') {
      $('.show-question').append('<h2>Incorrect!</h2>');
    }
    else if (result === 'missed') {
      $('.show-question').append('<h2>Time is up!!!!</h2>');
    }

    $('.show-question').append('<div style="text-align: center;">Correct answer is ' + answer.questions[number].correct + '.</div><br>');
    $('.show-question').append('<div class="results-img"><img src="assets/images/' + answer.questions[number].img + '" alt="' + answer.questions[number].correct + '"></div>');

    setTimeout(answer.nextQuestion,3000);
  },

  
  nextQuestion: function() {
    answer.stopCountdown();
    $('.show-question').empty();
    answer.questionNumber++;
    answer.game();
  },

  
  endGame: function() {
    $('.timer').empty();
    $('.show-question').append('<h2>The End! Your Result</h2>');
    $('.show-question').append('<h3>Correct: ' + answer.correct + '</h3>');
    $('.show-question').append('<h3>Incorrect: ' + answer.incorrect + '</h3>');
    $('.show-question').append('<h3>Missed: ' + answer.missed + '</h3>');
    $('.button').html('<div class="reset-game"><button type="button" class="btn btn-danger" id="reset-game">Play Again</button></div>');

    
    $('#reset-game').click(function() {
      answer.resetGame();
    });
  },

  resetGame: function() {
   
    answer.correct = 0;
    answer.incorrect = 0;
    answer.missed = 0;
    answer.questionNumber = 0;

  
    $('.show-question, .button').empty();
    answer.game();
  }
};

window.onload = function(){
  
  $('#start-game').on('click', function() {
   
    answer.game();

    
    $('#start-game').remove();
  });
};