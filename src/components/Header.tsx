"use client";

import Link from "next/link";

import styles from "../sass/layouts/header.module.scss";
import { AiOutlinePlus } from "react-icons/ai";
import { useTableActions } from "@/hooks/authHooks";
import { usePathname } from "next/navigation";
const Header = () => {
  const { setAction } = useTableActions();
  const pathname = usePathname();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__box}>
          <nav className={styles.nav}>
            <ul className={styles.nav__list}>
              <li className={styles.nav__list__item}>
                <Link
                  href="/"
                  className={`${styles.navigation__link} ${
                    pathname === "/" ? styles.active : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li className={styles.nav__list__item}>
                <Link
                  href="/tableById"
                  className={`${styles.navigation__link} ${
                    pathname === "/tableById" ? styles.active : ""
                  }`}
                >
                  Search
                </Link>
              </li>
              <li className={styles.nav__list__item}>
                <Link
                  href="/add"
                  className={`${styles.navigation__link} ${
                    pathname === "/add" ? styles.active : ""
                  }`}
                >
                  <AiOutlinePlus
                    className={styles.icon}
                    onClick={() => setAction("POST")}
                  />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
