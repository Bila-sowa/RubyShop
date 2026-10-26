import { Link, Outlet } from 'react-router';
import styles from './Layout.module.scss';

export function Layout() {
  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <Link to="/" className={styles.logo}>
            RubyShop
          </Link>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
