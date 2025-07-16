import Container from "./components/Container";
import Header from "./components/Header";
import BoardComponent from "./components/Board";
import ModalComponent from "./components/Modal";
import { useTypedSelector } from "./helpers/typedRedux";

function App(): JSX.Element {
  const { isModalOpen } = useTypedSelector((state) => state.modal);

  return (
    <Container>
      <Header />
      <BoardComponent />
      {isModalOpen && <ModalComponent />}
    </Container>
  );
}

export default App;
