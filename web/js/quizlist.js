const titleInput = document.querySelector("#searchinput");
const limit = 25;

function getSearchQuery() {
  const query = window.location.search;
  const params = new URLSearchParams(query);

  const search_query = params.get('search');
  if (!search_query)
    return false;
  return search_query;
}

function createDOMCard(card) {
  const container = document.querySelector('#cardsContainer');
  const template = document.querySelector('#cardTemplate');
  const clone = template.cloneNode(true);

  
  const cardElem = clone.content.querySelector('div');
  const cardLinkWrapper = clone.content.querySelector('a');
  const cardCover = clone.content.querySelector('.QuizCard-image');
  const cardTitle = clone.content.querySelector('.QuizCard-info-title');
  const cardDesc = clone.content.querySelector('.QuizCard-info-desc');

  cardLinkWrapper.href = './answers/?quizId=' + encodeURI(card.uuid);
  cardCover.src = card.cover;
  cardCover.style.background = "url('" + card.cover + "') center / cover no-repeat";
  cardTitle.textContent = card.title;
  cardDesc.textContent = card.creator_username + ' • ' + card.number_of_questions + ' questions';
  container.appendChild(cardElem);
}

async function getData(url) {
  var data;

  let proxy = 'https://cors-anywhere.herokuapp.com/';

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

const input_handler = async e => {
  if (e.keyCode !== 13)
   return

  let input = titleInput.value;

  
  window.location.search = '?search=' + encodeURI(input);
}

titleInput.addEventListener('keyup', input_handler);

const search_query = getSearchQuery();

if (search_query) {
  const resturl = `https://create.kahoot.it/rest/kahoots/?query=${search_query}&limit=${limit}&cursor=0&searchCluster=1&includeExtendedCounters=false`;
  
  getData(resturl).then(data => {
    let items = data['entities'];

    const cardsContainer = document.querySelector("#cardsContainer");
    cardsContainer.innerHTML='';
  
    items.forEach(item => {
      createDOMCard(item['card']);
    });
  });
  
}
