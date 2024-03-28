import styles from './welcome.module.css';

const Welcome = () => {
  return (
    <div className={styles.wrapper}>
      Добро пожаловать в Сферу - программу для работы с ЭДО. Для начала работы, выберите на панели
      нужную вкладку
    </div>
  );
};

export default Welcome;
