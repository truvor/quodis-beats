import Link from "next/link";
import Image from "next/image";
import styles from "./media.module.css";
import { umamiAttr } from "@/lib/umami";

export default function Media() {
  return (
    <section className={styles.mediaSection}>
      <div className={styles.mediaContainer}>
        <h2 className={styles.release}>
          <Link href="/" className={styles.release}>
            The Final Chapter • EP • On all Platforms!
          </Link>
        </h2>
        <div className={styles.socialIcons}>
          <Link
            href="https://instagram.com/quodisbeats/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            {...umamiAttr("Instagram Link")}
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
            {...umamiAttr("Tiktok Link")}
          >
            <Image src="/tiktok.svg" width={20} height={20} alt="TikTok" />
          </Link>
          <Link
            href="https://www.snapchat.com/add/quodis_beats"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            {...umamiAttr("Snapchat Link")}
          >
            <Image src="/snapchat.svg" width={20} height={20} alt="Snapchat" />
          </Link>
          <Link
            href="https://youtube.com/@quodisbeats"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            {...umamiAttr("Youtube Link")}
          >
            <Image src="/youtube.svg" width={20} height={20} alt="YouTube" />
          </Link>
        </div>
      </div>
    </section>
  );
}
