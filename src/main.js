import api from './api';

class App{
  //Construtor
  construtor(){
    //Lista de repositórios
    this.repositorios = [];

    //form
    this.formulario = document.querySelector('form');

    //lista 
    this.lista = document.querySelector('.list-group');

    //método para registrar os eventos do form
    this.registrarEventos();
  }
  
  registrarEventos(){
    this.formulario.onsubmit = evento => this.adicionarRepositorio(evento);
  }

  async adicionarRepositorio(evento){
    //evita que o formulario recarregue a página
    evento.preventDefault();

    //recupera o valor do input
    let input = this.formulario.querySelector('input[id=repositorio]').value;

    //se o input vier vazio... sai do app
    if(input.length === 0){
      return; //return sempre sai da função
    }

    let response = await api.get(`/repos/${input}`);
    
    let {name, description, html_url, owner: {avatar_url}} = response.data;

    //adiciona o repositório na Lista
    this.repositorios.push({
      nome: name,
      descricao: description,
      avatar_url,
      link: html_url,
    });

    //renderiza a tela
    this.renderizarTela();
  }

  renderizarTela(){
    //limpa o conteúdo de lista
    this.lista.innerHTML = '';

    //percorre toda a lista de repositório e cria os elementos
    this.repositorios.forEach(repositorio =>{
      

      //<li>
      let li = document.createElement('li');
      li.setAttribute('class', 'list-group-item list-group-item-action');
    
      //<img>
      let img = document.createElement('img');
      img.setAttribute('src', repositorio.avatar_url);
      li.appendChild(img);

      //<strong>
      let strong = document.createElement('strong');
      let txtNome = document.createTextNode(repositorio.nome);
      strong.appendChild(txtNome);
      li.appendChild(strong);

      //<p>
      let p = document.createElement('p');
      let txtDescricao = document.createTextNode(repositorio.descricao);
      p.appendChild(txtDescricao);
      li.appendChild(p);

      //<a>
      let a = document.createElement('a');
      a.setAttribute('target', '_blank');
      a.setAttribute('href', repositorio.link);
      let txtA = document.createTextNode('Acessar');
      a.appendChild(txtA);
      li.appendChild(a);

      // Adicionar <li> como filho da ul
      this.lista.appendChild(li);

      // Limpar o conteúdo do input
      this.formulario.querySelector('input[id=repositorio]').value = '';

      // Adiciona o foco no input
      this.formulario.querySelector('input[id=repositorio]').focus();
    });
  }
}

new App();