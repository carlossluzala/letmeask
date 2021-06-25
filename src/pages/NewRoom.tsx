import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'

import { AuthAside } from '../components/AuthAside'
import { Button } from '../components/Button'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'

import '../styles/auth.scss'

export function NewRoom() {
  const { user } = useAuth()
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('')

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    if (newRoom.trim() === '') {
      return
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id='page-auth'>
      <AuthAside />
      <main>
        <div className='main-content'>
          <img src={logoImg} alt='Letmeask logo' />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type='text'
              placeholder='Nome da sala'
              value={newRoom}
              onChange={(event) => setNewRoom(event.target.value)}
            />
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
