import Container from "./components/Container";
import Header from "./components/Header";
import BoardComponent from "./components/Board";
import ModalComponent from "./components/Modal";
import { useTypedSelector } from "./hooks/reduxHooks";

function App() {
  const { isModalOpen } = useTypedSelector((state) => state.modal);

  return (
    <Container>
      <Header />
      <main>
        <BoardComponent />
      </main>
      {isModalOpen && <ModalComponent />}
    </Container>
  );
}

export default App;
