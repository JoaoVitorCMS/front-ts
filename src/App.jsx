
import { useState, useEffect } from 'react'
import { api } from './api/api'
import { useNavigate } from 'react-router'
import Style from './App.module.css';



function App() {
  const navigete = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      navigete('/userslist')
    }
  }, [navigete])
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/login', { email, password })
      const user = response.data

      localStorage.setItem('user', JSON.stringify(user))
      navigete('/usersList')
    } catch (error) {
      setMessage('Erro ao fazer login' + (error.response?.data?.message || 'verifique seus dados'))
    }
  }

  return (
    <>
      <div className={Style.wrapLogin}>
        <div className={Style.wrapImg}>
          <div className={Style.wrapDegrade}>

          </div>
        </div>
        <div className={Style.wrapForm}>
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Entrar</button>
            <p>{message}</p>
          </form>
        </div>
      </div>

    </>
  )
}

export default App
