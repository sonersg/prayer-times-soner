interface IModalProps {
  children: React.ReactNode;
  modalVisible: boolean;
  setmodalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({ children, modalVisible, setmodalVisible }: IModalProps) {
  return (
    <main
      className='main-modal'
      style={{ display: modalVisible ? 'grid' : 'none' }}
      onClick={() => setmodalVisible(false)}
    >
      {children}
    </main>
  );
}

export default Modal;
