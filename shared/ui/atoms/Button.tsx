interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary';
}

export default function Button({ variant = 'primary', className, type = 'button', ...rest }: ButtonProps) {
  const base = variant === 'primary' ? 'primary-button' : '';
  return <button type={type} className={className ? base + ' ' + className : base} {...rest} />;
}
