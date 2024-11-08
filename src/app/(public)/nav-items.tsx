'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react';

const menuItems = [
  {
    title: 'Món ăn',
    href: '/menu',
    
  },
  {
    title: 'Đơn hàng',
    href: '/orders', // undefind không đăng nhập vẫn sẽ hiển thị
    authRequired: true 
  },
  {
    title: 'Đăng nhập',
    href: '/signin',
    authRequired: false // Khi false chưa đăng nhập thì sẽ hiển thị
  },
  {
    title: 'Quản lý',
    href: `/manage/dashboard`,
    authRequired: true // true đặp nhập rồi thì hiển thị
  }
]

export default function NavItems({ className }: { className?: string }) {
  
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsAuth(Boolean(token));
  }, []);



  return menuItems.map((item) => {
    if (item.authRequired === false && isAuth || item.authRequired === true && !isAuth) return null;
    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    )
  })
}
