

console.log('javascript no frontend');

const cotacoesForm = document.querySelector('form');

const mainMessage = document.querySelector('h4');
const iid = document.querySelector('#id');
const completed = document.querySelector('#completed');
const title = document.querySelector('#title');

cotacoesForm.addEventListener('submit', (e) => {
  e.preventDefault();
  mainMessage.innerText = 'buscando...';

  iid.innerHTML = '';
  completed.innerHTML = '';
  title.innerHTML = '';

  const id = document.querySelector('input').value;

  if (!id) {
    mainMessage.innerText = 'O id deve ser informado!'
    console.log('O id deve ser informado');
    return;
  }

  fetch(`http://localhost:3000/cotacoes?id=${id}`)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          mainMessage.innerText = 'Alguma coisa deu errado, talvez o id informado não exista!';
          console.log(`Alguma coisa deu errado`);
          iid.innerHTML =  `${data.error.message} | codigo ${data.error.code}`;
        } else {
          console.log(data);
          iid.innerHTML = `Id informado: ${data.id}`;
          completed.innerHTML = `Completo: ${data.completed}`;
          title.innerHTML = `Título: ${data.title}`;
        }
      });
    });
});