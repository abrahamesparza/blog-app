import { IoIosArrowRoundBack } from "react-icons/io";

const BackButton = ({ routeBack }) => {
    return (
        <IoIosArrowRoundBack onClick={routeBack} size={28} />
    )
}

export default BackButton;