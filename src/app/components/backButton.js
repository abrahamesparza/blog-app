import { IoIosArrowRoundBack } from "react-icons/io";

import styles from '../page.module.css';

const BackButton = ({ routeBack }) => {
    return (
        <IoIosArrowRoundBack className={styles.backButton} onClick={routeBack} size={28} />
    )
}

export default BackButton;