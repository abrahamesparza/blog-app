import React, { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import styles from'../page.module.css';
import Modal from "./modal";

const menuItems = [{
    'key': 0,
    'name': 'Home'
},
{
    'key': 1,
    'name': 'About'
},,
{
    'key': 3,
    'name': 'Contact'
},
{
    'key': 4,
    'name': 'Login'
}]

const Menu = () => {
    const [isModalOpen, setModalOpen] = useState(false)

    function onClick(e) {

    }

    return (
        <div className={styles.relativeList}>
            <MdOutlineMenu
            size='3em'
            />
        </div>
    )
}

export default Menu;