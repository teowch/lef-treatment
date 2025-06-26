import FileUpload from '../../components/FileUpload/FileUpload';
import { useAuthContext } from '@/context/AuthContext';
import styles from './LenexUpload.module.scss';

function LenexUpload() {
  const { logout } = useAuthContext();

  return (
    <div className={styles.lenexUpload}>
      <h1 className={styles.title}>Importar Arquivo LENEX</h1>
      <FileUpload />
      <button
        onClick={logout}
        className={styles.logoutButton}
      >
        Sair
      </button>
    </div>
  );
}

export default LenexUpload;
