import React, { useState, useEffect } from 'react';
import styles from './SectionArticles.module.scss';
import Articles from './Article';
import ArticleModal from './modalArticle';

function SectionArticles() {
    const [articles, setArticles] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar se o modal está aberto
    const [selectedArticle, setSelectedArticle] = useState(null); // Estado para armazenar o artigo selecionado

    useEffect(() => {
        // Aqui você deve fazer a requisição à sua API e obter os artigos desejados
        fetch('http://10.107.144.6:3000/artigos')
            .then((response) => response.json())
            .then((data) => {
                console.log('Dados da API:', data); // Adicione esta linha

                // Defina o número máximo de artigos que deseja exibir (neste caso, 4)
                const numberOfArticles = 13;
                const articlesToDisplay = data.artigos.slice(9, numberOfArticles);
                setArticles(articlesToDisplay);
            });
    }, []);

    const openModal = (article) => {
        setSelectedArticle(article);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedArticle(null);
        setModalOpen(false);
    };

    return (
        <section className={styles.articles}>
            <div className={styles.description__ex}>Nossos artigos</div>

            <div className={styles.news}>
                {articles.map((article) => (
                    <Articles
                        key={article.id}
                        title={article.titulo}
                        imageUrl={article.imagem}
                        onReadMore={() => openModal(article)} // Quando o botão é clicado, abre o modal
                    />
                ))}
            </div>

            {modalOpen && selectedArticle && (
                <ArticleModal
                    article={selectedArticle}
                    onClose={closeModal} // Passa a função para fechar o modal
                />
            )}
        </section>
    );
}

export default SectionArticles;