// Função para retornar ao estado inicial da página
function voltarHome() {
    // Limpa o campo de pesquisa
    document.getElementById("termo-pesquisa").value = "";

    // Limpa a seção de resultados
    document.getElementById("resultados-pesquisa").innerHTML = `
        <div id="sobre" class="sobre-container">
            <h2>Sobre</h2>
            <p>Este site foi criado com o objetivo de fornecer informações detalhadas sobre livros, incluindo
                sinopses e avaliações. Aqui, você pode pesquisar seus livros favoritos e conhecer novas
                histórias!</p>
            <p>Alguns dos livros que você encontrará aqui são as principais fontes para filmes e séries populares.
                Portanto, além de explorar os livros, você também pode descobrir as origens de suas adaptações
                audiovisuais favoritas.</p>
            <p>Basta realizar a pesquisa pelo nome do livro que procura. A busca pode ser realizada por
                palavras-chave, mas é sempre recomendado digitar o nome corretamente para obter os melhores
                resultados. Caso não encontre o livro em nossa base de dados, nos envie um e-mail para que possamos
                ajustar a página e incluir esses dados.</p>
        </div>
    `;
}

// Função para listar todos os livros
function listarTodos() {
    // Obtém a seção HTML onde os resultados serão exibidos
    let section = document.getElementById("resultados-pesquisa");

    // Inicializa uma string vazia para armazenar os resultados
    let resultados = "";

    // Itera sobre cada livro da lista de livros
    for (let livro of livros) {
        // Calcula a quantidade de estrelas inteiras e meia estrela
        const numStars = Math.floor(livro.avaliacao); // Número de estrelas inteiras (parte inteira)
        const halfStar = (livro.avaliacao % 1) >= 0.5; // Verifica se deve exibir meia estrela

        // Cria um novo elemento HTML para cada livro
        resultados += `
        <div class="item-resultado">
            <img src="${livro.capa}" alt="Capa do livro ${livro.titulo}" style="width:150px; height:auto;">
            <div>
                <h2>${livro.titulo}</h2>
                <p><strong>Sinopse:</strong> ${livro.sinopse}</p>
                <p><strong>Autor:</strong> ${livro.autor}</p>
                <p><strong>Ano de Publicação:</strong> ${livro.ano}</p>
                <p><strong>Gênero:</strong> ${livro.genero}</p>
                <p><strong>Personagens:</strong> ${livro.personagens}</p>
                <p><strong>Avaliação:</strong> ${livro.avaliacao.toFixed(1)}
                <span class="estrelinhas">
                    ${'⭐'.repeat(numStars)} <!-- Adiciona as estrelas inteiras -->
                    ${halfStar ? '✩' : ''}  <!-- Adiciona a meia estrela se necessário -->
                </span></p>
                <p><strong>Descrição Detalhada:</strong> ${livro.descricao_detalhada}</p>
                <a href="${livro.link_compra}" target="_blank">Comprar</a>
                <p><strong>Trailer:</strong> <a href="${livro.link_trailer}" target="_blank">Assista ao Trailer</a></p>
            </div>
        </div>
        `;
    }

    // Exibe os resultados gerados na seção HTML
    section.innerHTML = resultados;
}

// Função para pesquisar livros
function pesquisar() {
    // Obtém a seção HTML onde os resultados serão exibidos
    let section = document.getElementById("resultados-pesquisa");

    // Obtém o termo de pesquisa do usuário
    let termoPesquisa = document.getElementById("termo-pesquisa").value.toLowerCase();

    // Inicializa uma string vazia para armazenar os resultados
    let resultados = "";

    // Inicializa uma flag para verificar se encontrou algum resultado
    let encontrouResultado = false;

    // Itera sobre cada livro da lista de livros
    for (let livro of livros) {
        // Verifica se o termo de pesquisa está presente no título, autor ou sinopse
        if (livro.titulo.toLowerCase().includes(termoPesquisa) ||
            livro.autor.toLowerCase().includes(termoPesquisa) ||
            livro.sinopse.toLowerCase().includes(termoPesquisa)) {

            // Calcula a quantidade de estrelas inteiras e meia estrela
            const numStars = Math.floor(livro.avaliacao); // Número de estrelas inteiras (parte inteira)
            const halfStar = (livro.avaliacao % 1) >= 0.5; // Verifica se deve exibir meia estrela

            // Cria um novo elemento HTML para cada livro
            resultados += `
            <div class="item-resultado">
                <img src="${livro.capa}" alt="Capa do livro ${livro.titulo}" style="width:150px; height:auto;">
                <div>
                    <h2>${livro.titulo}</h2>
                    <p><strong>Sinopse:</strong> ${livro.sinopse}</p>
                    <p><strong>Autor:</strong> ${livro.autor}</p>
                    <p><strong>Ano de Publicação:</strong> ${livro.ano}</p>
                    <p><strong>Gênero:</strong> ${livro.genero}</p>
                    <p><strong>Personagens:</strong> ${livro.personagens}</p>
                    <p><strong>Avaliação:</strong> ${livro.avaliacao.toFixed(1)}
                    <span class="estrelinhas">
                        ${'⭐'.repeat(numStars)} <!-- Adiciona as estrelas inteiras -->
                        ${halfStar ? '✩' : ''}  <!-- Adiciona a meia estrela se necessário -->
                    </span></p>
                    <p><strong>Descrição Detalhada:</strong> ${livro.descricao_detalhada}</p>
                    <a href="${livro.link_compra}" target="_blank">Comprar</a>
                    <p><strong>Trailer:</strong> <a href="${livro.link_trailer}" target="_blank">Assista ao Trailer</a></p>
                </div>
            </div>
            `;

            // Marca que encontrou pelo menos um resultado
            encontrouResultado = true;
        }
    }

    // Verifica se encontrou algum resultado
    if (!encontrouResultado) {
        resultados = "<p>Nenhum livro encontrado. Tente novamente com um termo diferente.</p>";
    }

    // Exibe os resultados gerados na seção HTML
    section.innerHTML = resultados;
}

// Adiciona o evento de pesquisa ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("botao-listar-todos").addEventListener("click", listarTodos);
    document.getElementById("botao-pesquisar").addEventListener("click", pesquisar);
    document.getElementById("botao-home").addEventListener("click", voltarHome); // Adiciona evento para o botão Home
});
