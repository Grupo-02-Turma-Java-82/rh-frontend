# Projeto RH-Frontend

Este projeto é o frontend de uma aplicação de Gestão de Recursos Humanos (RH), desenvolvida em HTML, CSS e JavaScript puro. Ele permite a interação com uma API de RH para realizar o cadastro, edição, pesquisa e remoção de dados de colaboradores.

## Sumário

  * [Visão Geral](https://www.google.com/search?q=%23vis%C3%A3o-geral)
  * [Tecnologias Utilizadas](https://www.google.com/search?q=%23tecnologias-utilizadas)
  * [Como Executar o Projeto](https://www.google.com/search?q=%23como-executar-o-projeto)
  * [Funcionalidades](https://www.google.com/search?q=%23funcionalidades)
  * [Endpoints da API (Backend)](https://www.google.com/search?q=%23endpoints-da-api-backend)
  * [Melhorias Futuras](https://www.google.com/search?q=%23melhorias-futuras)

## Visão Geral

O `rh-frontend` é uma interface web simples e intuitiva para gerenciar informações de colaboradores em um sistema de RH. Ele se comunica com uma API RESTful (desenvolvida em Java/Spring Boot) para persistir e recuperar os dados. O foco principal é a interação básica de CRUD (Create, Read, Update, Delete) para o recurso de "Colaboradores".

## Tecnologias Utilizadas

  * **HTML5:** Estrutura da página web.
  * **CSS3:** Estilização e layout da interface.
  * **JavaScript (Vanilla JS):** Lógica de interação com a API, manipulação do DOM e validação de dados.

## Como Executar o Projeto

Para executar este frontend, siga os passos abaixo:

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/Grupo-02-Turma-Java-82/rh-frontend.git
    ```
2.  **Navegue até o Diretório do Projeto:**
    ```bash
    cd rh-frontend
    ```
3.  **Abra o Arquivo HTML:**
    Basta abrir o arquivo `index.html` em seu navegador de preferência (Google Chrome, Mozilla Firefox, Microsoft Edge, etc.). Você pode fazer isso arrastando o arquivo para a janela do navegador ou clicando duas vezes nele.

**Observação Importante:** Este frontend depende de uma API de backend rodando. Certifique-se de que sua API Java/Spring Boot esteja ativa e acessível em `http://localhost:8080` para que o frontend possa se comunicar com ela.

## Funcionalidades

O frontend oferece as seguintes funcionalidades para gerenciar colaboradores:

  * **Cadastro:** Permite adicionar novos colaboradores ao sistema, inserindo nome, email, telefone, link de foto e link de currículo.
  * **Edição:** É possível selecionar um colaborador existente na lista para preencher o formulário com seus dados atuais, permitindo a modificação e atualização das informações.
  * **Pesquisa:** Permite buscar colaboradores por ID ou Email (dependendo da implementação da sua API de backend).
  * **Listagem:** Exibe todos os colaboradores cadastrados em uma lista interativa.
  * **Remoção:** Permite excluir um colaborador existente do sistema.

## Endpoints da API (Backend)

O frontend se comunica com os seguintes endpoints da sua API de RH:

  * **`http://localhost:8080/colaboradores`**
      * `POST`: Para cadastrar um novo colaborador.
      * `PUT`: Para editar um colaborador existente.
      * `GET`: Para listar todos os colaboradores.
  * **`http://localhost:8080/colaboradores/{id}`**
      * `GET`: Para pesquisar um colaborador específico por ID.
      * `DELETE`: Para remover um colaborador por ID.
  * **`http://localhost:8080/colaboradores/email/{email}`** (Assumindo que sua API suporta esta rota)
      * `GET`: Para pesquisar um colaborador por email.

## Melhorias Futuras

Algumas melhorias que podem ser implementadas neste projeto incluem:

  * **Validação de Formulário:** Adicionar validações mais robustas no lado do cliente.
  * **Mensagens de Feedback:** Implementar mensagens de sucesso/erro mais visuais e amigáveis para o usuário.
  * **Estilização Avançada:** Melhorar o design e a experiência do usuário com frameworks CSS ou pré-processadores.
  * **Componentização:** Refatorar o código JavaScript para uma estrutura mais modular ou usar um framework como React, Vue ou Angular para projetos maiores.
  * **Paginação/Filtros:** Adicionar funcionalidades de paginação e filtros na listagem de colaboradores.