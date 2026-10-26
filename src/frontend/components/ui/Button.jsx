import styles from './Button.module.scss';

export function Button({ variant = 'primary', className = '', ...props }) {
  return (
    <button className={`${styles.button} ${styles[variant]} ${className}`.trim()} {...props} />
  );
}
