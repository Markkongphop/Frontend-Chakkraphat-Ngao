'use client'
import Image from "next/image";
import styles from "./banner.module.css"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Banner() {
    const covers = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg', '/img/cover4.jpg', '/img/cover5.jpg']
    const [index, setIndex] = useState(0);
    const router = useRouter();

    const { data: session } = useSession()

    const changeImage = (direction: number) => {
        setIndex((prevIndex) => (prevIndex + direction + covers.length) % covers.length);
    };

    return (
        <div className={styles.banner} onClick={() => { setIndex(index + 1) }}>
            <Image
                src={covers[index % 5]}
                alt='cover'
                fill={true}
                priority
                objectFit='cover'
            />
            <div className={styles.bannerText}>
                <h1 className='text-4xl font-medium'>The Right Workspace, in your style</h1>

                <h3 className='text-xl'>
                Flexible for every work style, meeting every idea
                </h3>
            </div>
            {
                session ? (
                    <div className="z-30 absolute top-5 right-10 font-semibold text-white text-xl">
                        Welcome {session.user?.name}
                    </div>
                ) : null
            }
            <button className={styles.selectButton}
                onClick={(e) => { e.stopPropagation(); router.push('/venue'); }}
            >
                Select Place Here
            </button>
            {/* Arrow buttons */}
            <button 
                className={`${styles.arrowButton} ${styles.leftArrow}`} 
                onClick={() => changeImage(-1)}
            >
                &lt;
            </button>
            <button 
                className={`${styles.arrowButton} ${styles.rightArrow}`} 
                onClick={() => changeImage(1)}
            >
                &gt;
            </button>
        </div>
    )
}
