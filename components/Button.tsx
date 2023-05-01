import { Poppins } from 'next/font/google'
import "material-icons/iconfont/material-icons.css"

import styles from '@/styles/Button.module.css'

const poppinsBlack = Poppins({ weight: "700", subsets: ["latin"] })

export default function Button({
    children="",
    iconName="",
    type="button",
    onClick=() => {},
    disabled=false,
    icon=null,
}: {
    children?: React.ReactNode | React.ReactNode[],
    iconName?: string,
    type?: "button" | "submit" | "reset" | undefined,
    onClick?: () => void,
    disabled?: boolean,
    icon?: React.ReactNode | React.ReactNode[],
}) {

    return (
        <>
        <div className={`${styles.wrapper} ${poppinsBlack.className}`}>
            <button 
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={styles.button}
                >
                <span className={`
                        material-icons 
                        ${styles.icon}`
                    }>
                    {iconName}
                </span>
                <span
                    className={styles.icon}
                >{icon}</span>
                <span 
                    className={`
                        ${styles.buttonChildren} 
                        ${poppinsBlack.className}`
                    }>
                    {children}
                </span>
            </button>
        </div>
        
        </>
    )
}