import React, {useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
      console.log(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Mobile com React Native",
      url: "https://github.com/leovdn/",
      techs: "React Native, NodeJS"
    });

    const repo = response.data;

    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    
    const noDeleted = repositories.filter((repository) => repository.id !== id);

    setRepositories(noDeleted);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
