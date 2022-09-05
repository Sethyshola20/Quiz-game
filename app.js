// I make a get request to this api and await the response
async function fetchQuestions() {
  const container = document.getElementsByClassName("questions");
  var note = 0;
  var count = 10;
  const url = `https://the-trivia-api.com/api/questions?limit=${count}`;
  const res = await fetch(url);
  const questions = await res.json();
  console.log(questions);

  function createQuestion() {
    questions.forEach((question) => {
      // we create a div for each question fetch from the api
      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add("question");
      // we add these divs to the established container
      container[0].append(categoryDiv);

      // we add the question to the div
      categoryDiv.textContent = question.question;
      // if the difficulty is x set the background color to this
      if (question.difficulty === "low") {
        categoryDiv.style.backgroundColor = "#1A5276";
      } else if (question.difficulty === "medium") {
        categoryDiv.style.backgroundColor = "#CA6F1E";
      } else if (question.difficulty === "hard") {
        categoryDiv.style.backgroundColor = "#616A6B";
      }
      // we create our array of options for the answers
      const answers = [
        question.correctAnswer,
        question.incorrectAnswers[0],
        question.incorrectAnswers[1],
        question.incorrectAnswers[2],
      ];

      // we randomly organize the array so you can not predict where is the correct answers
      function shuffle(array) {
        let currentIndex = array.length,
          randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
          ];
        }

        return array;
      }
      shuffle(answers);
      // we create the select button and initialize it
      const select = document.createElement("select");
      for (var i = 0; i < answers.length; i++) {
        var option = document.createElement("option");
        option.value = answers[i];
        option.text = answers[i];
        select.appendChild(option);
      }
      // we append the select tag to the question div
      categoryDiv.append(select);
      //

      select.addEventListener("change", function handleChange() {
        const userInput = select.options[select.selectedIndex].value;
        if (userInput === question.correctAnswer) {
          note++;
          console.log(note);
        }
      });
    });
  }
  function displayFinalScore() {
    const submit = document.getElementsByClassName("submit");
    const displayScore = document.createElement("div");
    displayScore.classList.add("score");
    container[0].append(displayScore);
    submit[0].addEventListener("click", () => {
      var notes = [note];
      var finalNote = notes.reduce((sum, value) => sum + value);
      displayScore.textContent = `Your score is ${finalNote}/10`;
    });
  }
  displayFinalScore();
  createQuestion();
}

fetchQuestions();
// we shuffle so the index of the correct answer is never the same
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function reload() {
  const reloadbtn = document.getElementsById("reload");
  reloadbtn[0].addEventListener("click", function () {
    reloadbtn.classList.add("spin");
  });
}

// display the score
