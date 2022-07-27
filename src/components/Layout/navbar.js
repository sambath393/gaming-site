import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Container from './container';

export default function Navbar() {
  return (
    <nav>
      <Container>
        <div className='flex justify-center py-5'>
          <Link href='/'>
            <a>
              <Image
                src='/assets/logo.jpg'
                alt='logo'
                width={100}
                height={100}
                objectFit='contain'
              />
            </a>
          </Link>
        </div>
      </Container>
    </nav>
  );
}
