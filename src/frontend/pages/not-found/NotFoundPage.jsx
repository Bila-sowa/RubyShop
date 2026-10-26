import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <section>
      <h1>404</h1>
      <p>Сторінку не знайдено.</p>
      <Link to="/">На головну</Link>
    </section>
  );
}
