import styles from '../styles/Layout.module.css'

interface LayoutProps {
    children: React.ReactNode;
  }

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex h-screen bg-blue-100">
            <div className="m-auto bg-slate-100 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2 drop-shadow-lg ">
                <div className={styles.imgStyle}>
                    <div className={styles.catImg}></div>
                </div>
                <div className="right flex flex-col justify-evenly">
                    <div className="text-center py-10"> 
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}