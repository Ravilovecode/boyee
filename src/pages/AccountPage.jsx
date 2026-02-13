import Login from '../components/Login'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function AccountPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/home')
  }

  if (!user) {
    return <Login />
  }

  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '2.5rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2d6a4f, #52b788)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.2rem',
          fontSize: '2rem',
          color: '#fff',
          fontWeight: '700',
        }}>
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <h2 style={{ margin: '0 0 0.3rem', color: '#1b4332', fontSize: '1.5rem' }}>{user.name}</h2>
        <p style={{ margin: '0 0 1.5rem', color: '#666', fontSize: '0.95rem' }}>{user.email}</p>
        <button
          onClick={handleLogout}
          style={{
            background: 'linear-gradient(135deg, #2d6a4f, #52b788)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseOver={(e) => e.target.style.opacity = '0.85'}
          onMouseOut={(e) => e.target.style.opacity = '1'}
        >
          Log Out
        </button>
      </div>
    </div>
  )
}

export default AccountPage
