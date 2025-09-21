import { useToastContext } from '../components/toast/ToastManagerContext';

function Apple() {
  const { addToast } = useToastContext();

  return (
    <div>
      <h2>how to be expelled from heaven in 2 steps:</h2>
      <h2>find it, bite it</h2>
      <button onClick={() => addToast('Apple Toast!', 'success', 2000)}>
        Show Toast
      </button>
    </div>
  );
}

export default Apple;
