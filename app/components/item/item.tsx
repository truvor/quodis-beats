import Link from "next/link";
import {umamiAttr} from "@/app/lib/umami";
import styles from "./item.module.css";

export function Item({name, url}: { name: string; url: string }) {
  return (<Link className={styles.item} href={url} {...umamiAttr(`Final Chapter ${name}`)}>{name}</Link>);
}