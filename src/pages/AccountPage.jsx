import Login from '../components/Login'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link, useLocation } from 'react-router-dom'

function AccountPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/home')
  }

  const location = useLocation();

  if (!user) {
    return <Login
      initialIsLogin={!location.state?.showSignup}
      onSuccess={() => {
        const from = location.state?.from || '/home';
        navigate(from, { replace: true });
      }}
    />
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
        <Link
          to="/myorders"
          style={{
            display: 'block',
            margin: '0 0 1rem',
            color: '#2d6a4f',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            border: '1px solid #2d6a4f',
            borderRadius: '8px',
            padding: '0.75rem 2rem',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#2d6a4f'
            e.target.style.color = '#fff'
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent'
            e.target.style.color = '#2d6a4f'
          }}
        >
          My Orders
        </Link>
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
