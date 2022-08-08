import React from "react";
import styles from './jumbo.module.scss';

interface Props {
    img: string,
    title: string
}


export const Jumbo: React.FC<Props> = (props) => {
    const { img, title } = props
    return (
        <div className={styles.jumboContainer}>
            <img src={img} />
            <h1>{title}</h1>
        </div>
    );
};