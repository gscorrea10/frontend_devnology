import React, { useState } from 'react';
import axios from 'axios';

const Navbar: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [publishedAt, setPublishedAt] = useState('');

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const artigo = { title, description, url, publishedAt };
    axios
      .post('http://localhost:8080/article', artigo)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        console.log('Artigo salvo com sucesso');
        setTitle('');
        setDescription('');
        setUrl('');
        setPublishedAt('');
      })
      .catch((error) => {
        console.error('Erro ao salvar artigo:', error);
      });
  };

  const handleCrawler = () => {
    axios
      .get('http://localhost:8080/article/import')
      .then((response) => {
        console.log(response);
        console.log(response.data);
        console.log('Crawler executado com sucesso');
      })
      .catch((error) => {
        console.error('Erro ao executar crawler:', error);
      });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handlePublishedAtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublishedAt(event.target.value);
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setUrl('');
    setPublishedAt('');
    setShowForm(false);
  };

  return (
    <nav className="bg-green-400">
      <div className="container mx-auto p-4 flex justify-end">
        <h1 className="text-center w-full font-black text-2xl flex items-center justify-center">
          Devnology
        </h1>
        <button
          className="bg-white hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-2xl shadow ml-4"
          onClick={() => setShowForm(true)}
        >
          Novo Artigo
        </button>
        <button
          className="bg-white hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-2xl shadow ml-4"
          onClick={() => handleCrawler()}
        >
          Crawler
        </button>
      </div>
      {showForm && (
        <div className="container mx-auto p-4">
          <form
            onSubmit={handleFormSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                Título
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Digite o título do artigo"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                Descrição
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                placeholder="Digite a descrição do artigo"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="url">
                URL
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="url"
                type="text"
                placeholder="Digite a URL do artigo"
                value={url}
                onChange={handleUrlChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="publicationDate">
                Data de Publicação
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="publicationDate"
                type="date"
                value={publishedAt}
                onChange={handlePublishedAtChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-white hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-2xl shadow"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button
                className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-2xl shadow"
                type="submit"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
