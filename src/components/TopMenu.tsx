import styles from './topmenu.module.css';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from 'next/link';

export default async function TopMenu() {
    const session = await getServerSession(authOptions);

    return (
        <div className={styles.menucontainer}>
            {/* Left Section: Sign-In, Booking, My Booking */}
            <div className={styles.leftContainer}>
                {
                    session ? (
                        <Link href="/api/auth/signout">
                            <div className={`${styles.signInButton} flex items-center`}>Sign-Out</div>
                        </Link>
                    ) : (
                        <div className='  flex items-center'>
                            <Link href="/register" className='my-2 mx-2'>
                                <div className={`${styles.blueButton} flex items-center`}>Register</div>
                            </Link>
                            <Link href="/api/auth/signin" className='my-2 mx-2'>
                                <div className={`${styles.signInButton} flex items-center`}>Sign-In</div>
                            </Link>
                        </div>
                    )
                }

                <Link href="/booking">
                    <div className={`${styles.blueButton} flex items-center`}>Reservation</div>
                </Link>
                <Link href="/mybooking">
                    <div className={`${styles.blueButton} flex items-center`}>My Reservation</div>
                </Link>
            </div>

            {/* Right Section: Logo */}
            <div className={styles.logoWrapper}>
                <Link href="/">
                    <Image
                        src={'/img/logo.png'}
                        className={styles.logoimg}
                        alt='logo'
                        width={150}
                        height={50}
                    />
                </Link>
            </div>
        </div>
    );
}