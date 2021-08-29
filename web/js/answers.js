function getQuizId() {
  const query = window.location.search;
  const params = new URLSearchParams(query);

  const quizId = params.get('quizId');
  if (!quizId)
    return false;
  return quizId;
}

async function getData(url) {
  var data;

  let proxy = 'https://kahootansproxy.herokuapp.com/';

  data = await fetch(proxy + url, {
    headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
    }
  })
  .then(d => d.json())
  .catch(err => console.log(err))

  return data;
}

async function getQuizData(quizId) {
  const api_url = `https://create.kahoot.it/rest/kahoots/${quizId}/card/?includeKahoot=true`;
  const data = await getData(api_url);
  return data;
}

function createDOMQuestion(question, k) {
  const container = document.querySelector('#questionsContainer');
  const questionTemplate = document.querySelector('#questionTemplate');
  const qClone = questionTemplate.cloneNode(true);
  const answerTemplate = document.querySelector('#answerTemplate');

  const questionElem = qClone.content.querySelector('div');
  const questionDesc = qClone.content.querySelector('.QuestionCard-info-desc');
  const questionTitle = qClone.content.querySelector('.QuestionCard-info-title');
  const answerContainer = qClone.content.querySelector('.QuestionCard-info-answer-container');
  const questionImage = qClone.content.querySelector('.QuestionCard-image');

  const icons_red_fg = '<svg id="option-icon" data-functional-selector="icon" viewBox="0 0 32 32" focusable="false" stroke="none" stroke-width="0"><path d="M27,24.559972 L5,24.559972 L16,7 L27,24.559972 Z" style="fill: rgb(255, 255, 255);"></path></svg>';
  const icons_red_bg = '<svg id="option-icon" data-functional-selector="icon" viewBox="0 0 32 32" focusable="false" stroke="none" stroke-width="0"><path d="M27,24.559972 L5,24.559972 L16,7 L27,24.559972 Z" style="fill: rgb(197, 0, 40);"></path></svg>';
  const icons_blue_fg = '<svg id="option-icon" data-functional-selector="icon" viewBox="0 0 32 32" focusable="false" stroke="none" stroke-width="0"><path d="M4,16.0038341 L16,4 L28,16.0007668 L16,28 L4,16.0038341 Z" style="fill: rgb(255, 255, 255);"></path></svg>';
  const icons_blue_bg = '<svg id="option-icon" data-functional-selector="icon" viewBox="0 0 32 32" focusable="false" stroke="none" stroke-width="0"><path d="M4,16.0038341 L16,4 L28,16.0007668 L16,28 L4,16.0038341 Z" style="fill: rgb(0, 83, 181);"></path></svg>';
  const icons_yellow_fg = '<svg id="option-icon" data-functional-selector="icon" viewBox="0 0 32 32" focusable="false" stroke="none" stroke-width="0"><path d="M16,27 C9.92486775,27 5,22.0751322 5,16 C5,9.92486775 9.92486775,5 16,5 C22.0751322,5 27,9.92486775 27,16 C27,22.0751322 22.0751322,27 16,27 Z" style="fill: rgb(255, 255, 255);"></path></svg>';
  const icons_yellow_bg = '<svg id="option-icon" data-functional-selector="icon" viewBox="0 0 32 32" focusable="false" stroke="none" stroke-width="0"><path d="M16,27 C9.92486775,27 5,22.0751322 5,16 C5,9.92486775 9.92486775,5 16,5 C22.0751322,5 27,9.92486775 27,16 C27,22.0751322 22.0751322,27 16,27 Z" style="fill: rgb(189, 135, 0);"></path></svg>';
  const icons_green_fg = '<svg id="option-icon" data-functional-selector="icon" viewBox="0 0 32 32" focusable="false" stroke="none" stroke-width="0"><path d="M7,7 L25,7 L25,25 L7,25 L7,7 Z" style="fill: rgb(255, 255, 255);"></path></svg>';
  const icons_green_bg = '<svg id="option-icon" data-functional-selector="icon" viewBox="0 0 32 32" focusable="false" stroke="none" stroke-width="0"><path d="M7,7 L25,7 L25,25 L7,25 L7,7 Z" style="fill: rgb(0, 113, 0);"></path></svg>';
  const icons_red_color = 'rgb(226, 27, 60)';
  const icons_blue_color = 'rgb(19, 104, 206)';
  const icons_yellow_color = 'rgb(216, 158, 0)';
  const icons_green_color = 'rgb(38, 137, 12)';

  var type;
  if ('layout' in question && question.layout=="TRUE_FALSE")
    type = 'True or false';
  else
    type = 'Quiz';

  questionDesc.textContent =`${k} - ${type} • ${question.time / 1000} seconds`
  questionTitle.textContent = question.question;
  questionImage.style.background = "url('" + question.image + "') center / cover no-repeat";

  for (let i=0;i<question.choices.length;i++) {
    let choice = question.choices[i];
    if (!choice.correct)
      continue;

    const aClone = answerTemplate.cloneNode(true);
    
    const answerElem = aClone.content.querySelector('div');
    const answerIconBG = aClone.content.querySelector('.answer-block-optionIcon-background');
    const answerIconFG = aClone.content.querySelector('.answer-block-optionIcon-foreground');
    const answerIconContainer = aClone.content.querySelector('.answer-block-optionIcon-container');
    const answerTitle = aClone.content.querySelector('.answer-block-title');

    answerTitle.textContent = choice.answer;
    switch(i) {
      case 0:
        answerIconFG.innerHTML = icons_red_fg;
        answerIconBG.innerHTML = icons_red_bg;
        answerIconContainer.style.backgroundColor = icons_red_color;
        break;
      case 1:
        answerIconFG.innerHTML = icons_blue_fg;
        answerIconBG.innerHTML = icons_blue_bg;
        answerIconContainer.style.backgroundColor = icons_blue_color;
        break;
      case 2:
        answerIconFG.innerHTML = icons_yellow_fg;
        answerIconBG.innerHTML = icons_yellow_bg;
        answerIconContainer.style.backgroundColor = icons_yellow_color;
        break;
      case 3:
        answerIconFG.innerHTML = icons_green_fg;
        answerIconBG.innerHTML = icons_green_bg;
        answerIconContainer.style.backgroundColor = icons_green_color;
        break;
    }

    answerContainer.appendChild(answerElem);
  }
  console.log(container);
  console.log(questionElem);
  container.appendChild(questionElem);
}


const quizId = getQuizId();
if (!quizId)
  window.location.replace('../');

getQuizData(quizId)
.then(quizData => {
  const card = quizData.card;
  const kahoot = quizData.kahoot;

  const quizTitleElem = document.querySelector('#quizTitle');
  quizTitleElem.textContent = card.title;

  for (let i=0;i<kahoot.questions.length;i++)
    createDOMQuestion(kahoot.questions[i], i);
});





// if question is quiz: show; else: skip