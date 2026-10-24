import { redirect } from 'next/navigation';

export default function NotFound() {
  // Автоматически перенаправляем на главную страницу '/'
  redirect('/');
}
