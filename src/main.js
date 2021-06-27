class App{
  //Construtor
  construtor(){
    //Lista de repositórios
    this.repositorios = [];

    //form
    this.formulario = document.querySelector('form');

    //método para registrar os eventos do form
    this.registrarEventos();
  }
  
  registrarEventos(){
    this.formulario.onsubmit = evento => this.adicionarRepositorio(evento);
  }

  adicionarRepositorio(evento){
    //evita que o formulario recarregue a página
    evento.preventDefault();

    //adiciona o repositório na Lista
    this.repositorios.push({
      nome: 'inventei',
      descricao: 'sei la',
      avatar_url: 'https://seila.com',
      link: 'https://seila.com',
    });
  }
}

new App();