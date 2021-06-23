import { Link } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'

import { AuthAside } from '../components/AuthAside'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

import '../styles/auth.scss'

export function NewRoom() {
  const { user } = useAuth()

  return (
    <div id='page-auth'>
      <AuthAside />
      <main>
        <div className='main-content'>
          <img src={logoImg} alt='Letmeask logo' />
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form>
            <input type='text' placeholder='Nome da sala' />
            <Button type='submit'>Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala já existente?{' '}
            <Link to='/'>Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
