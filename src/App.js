import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { AuthProvider } from './components/contexts/AuthContext';
import { GameProvider } from './components/contexts/GameContext';
import useAuth from './components/hooks/useAuth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './History';
import GameBoard from './components/GameBoard';
import Invite from './components/Invite';
import Notification from './components/Notification';
import UserProfile from './components/UserProfile';
import GameList from './components/GameList';
import NewGame from './components/NewGame';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <GameProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              { user ? <Home /> : <Login /> }
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/game/:gameId">
              <GameBoard />
            </Route>
            <Route path="/invite/:inviteId">
              <Invite />
            </Route>
            <Route path="/notification">
              <Notification />
            </Route>
            <Route path="/profile">
              <UserProfile />
            </Route>
            <Route path="/games">
              <GameList />
            </Route>
            <Route path="/new-game">
              <NewGame />
            </Route>
          </Switch>
        </Router>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;

