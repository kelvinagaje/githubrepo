import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SearchBar from "./components/SearchBar";
import RepoRows from "./components/RepoRows";
import { SimpleGrid } from "@chakra-ui/react";

function App() {
  return (
    <>
      <SimpleGrid columns={1} px={25}>
        <SearchBar />
        <RepoRows />
      </SimpleGrid>
    </>
  );
}

export default App;
