import Container from "./components/Container";

import BoardComponent from "./components/Board";

function App() {
  return (
    <Container>
      <header className="w-full rounded-2xl text-center mt-4 pt-6 pb-6 text-white">
        <h1>CTC App</h1>
      </header>
      <main>
        <BoardComponent />
      </main>
    </Container>
  );
}

export default App;
