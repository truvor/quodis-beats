"use client"
import Link from "next/link";
import Image from "next/image";
import styles from "./media.module.css";

export default function Media() {
  return (
    <section className={styles.mediaSection}>
      <div className={styles.mediaContainer}>
        <div className={styles.latestRelease}>
          <Link href="https://ffm.to/quodismysecretplace" className={styles.releaseLink}>
            <Image width={20}
                   height={20}
                   src='/secret_place_20x20_circle.png'
                   alt='My Secret Place (2025)'
            className='mr-2'/>
            Beattape - My Secret Place (2025)
          </Link>
        </div>
        <div className={styles.socialIcons}>
          <Link
            href="https://instagram.com/quodisbeats/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
          >
            <Image
              src="/instagram.svg"
              width={20}
              height={20}
              alt="Instagram"
            />
          </Link>
          <Link
            href="https://tiktok.com/@quodisbeats"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
          >
            <Image
              src="/tiktok.svg"
              width={20}
              height={20}
              alt="TikTok"
            />
          </Link>
          <Link
            href="https://www.snapchat.com/add/quodis_beats"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
          >
            <Image
              src="/snapchat.svg"
              width={20}
              height={20}
              alt="Snapchat"
            />
          </Link>
          <Link
            href="https://youtube.com/@lofibeatsbyquodis"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
          >
            <Image
              src="/youtube.svg"
              width={20}
              height={20}
              alt="YouTube"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
