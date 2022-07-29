import { FilterContextProvider } from './context/filter-context';

import Header from "./layout/Header";
import Leaderboard from "./components/Leaderboard";

import "./App.css";

const App = () => {
  return (
    <FilterContextProvider >
      <Header />
      <Leaderboard />
    </FilterContextProvider>
  );
};

export default App;
