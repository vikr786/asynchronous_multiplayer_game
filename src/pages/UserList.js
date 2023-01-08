import { api } from './utils/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
