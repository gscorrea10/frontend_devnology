import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IArticleDTO from '../dtos/IArticleDTO';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  articles: IArticleDTO[];
  selectedArticle: IArticleDTO | null;
};

const Dashboard: React.FC<Props> = () => {
  const apiUrl = 'http://localhost:8080/article';

  const [articles, setArticles] = useState<IArticleDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<IArticleDTO | null>(null);
  const [formData, setFormData] = useState<IArticleDTO>({
    title: '',
    description: '',
    url: '',
    id: '',
  });

  useEffect(() => {
    fetchArticles();
    const intervalId = setInterval(() => {
      fetchArticles();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(apiUrl);
      console.log(response.data);
      console.log(showEditForm);
      setArticles(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  async function handleDeleteArticle(id: string) {
    try {
      await axios.delete(`http://localhost:8080/article/delete/${id}`);
      fetchArticles();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateArticle(updateArticle: IArticleDTO) {
    setSelectedArticle(updateArticle);
    setFormData(updateArticle);
    setShowEditForm(true);
    try {
      await axios.put(`http://localhost:8080/article/update/${updateArticle.id}`, formData);
      fetchArticles();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (selectedArticle) {
        const response = await axios.put(`${apiUrl}/update/${selectedArticle.id}`, formData);
        console.log(response.data);
        setFormData({
          title: '',
          description: '',
          url: '',
          id: '',
        });
        fetchArticles();
        setShowEditForm(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleEditButtonClick(article: IArticleDTO) {
    setFormData({
      ...formData,
      title: article.title,
      url: article.url,
      id: article.id,
    });
    setSelectedArticle(article);
    setShowEditForm(true);
  }

  return (
    <div className="flex flex-col items-center bg-slate-200 min-h-screen">
      <div className="w-full max-w-screen-xl">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="flex flex-wrap justify-center -mx-4">
            {articles.map((article) => (
              <div key={article.id} className="w-full md:w-1/2 lg:w-1/3 px-4 py-2">
                <div className="bg-white rounded-lg shadow p-6 h-full">
                  <h3 className="font-medium mb-2">Título: {article.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">Descrição: {article.description}</p>
                  <p className="text-gray-500 text-xs">
                    <strong>URL:</strong>{' '}
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {article.url}
                    </a>
                  </p>
                  <p className="text-gray-500 text-xs">
                    <strong>Publicado em:</strong> {article.publishedAt}
                  </p>
                  {article.createdAt && (
                    <p className="text-gray-500 text-xs">
                      <strong>Criado em:</strong> {new Date(article.createdAt).toLocaleString()}
                    </p>
                  )}
                  {article.updatedAt && (
                    <p className="text-gray-500 text-xs">
                      <strong>Atualizado em:</strong> {new Date(article.updatedAt).toLocaleString()}
                    </p>
                  )}
                  <div className="flex justify-end space-x-2">
                    <button
                      className="text-red-500 mx-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteArticle(article.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditButtonClick(article);
                        setSelectedArticle(article);
                      }}
                      className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-700"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedArticle && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                onClick={() => setSelectedArticle(null)}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                {/* &#8203; */}
              </span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        Editar artigo
                      </h3>
                      <div className="mt-2">
                        <form onSubmit={handleFormSubmit}>
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Título
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="title"
                              type="text"
                              placeholder="Título"
                              value={formData.title || ''}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Descrição
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="description"
                              type="text"
                              placeholder="Descrição"
                              value={formData.description || ''}
                              onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                              }
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              URL
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="url"
                              type="text"
                              placeholder="URL"
                              value={formData.url || ''}
                              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Publicado em
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="publishedAt"
                              type="text"
                              placeholder="Publicado em"
                              value={formData.publishedAt || ''}
                              onChange={(e) =>
                                setFormData({ ...formData, publishedAt: e.target.value })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="submit"
                              onClick={() => handleUpdateArticle(selectedArticle)}
                            >
                              Salvar
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="button"
                              onClick={() => setSelectedArticle(null)}
                            >
                              Cancelar
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
