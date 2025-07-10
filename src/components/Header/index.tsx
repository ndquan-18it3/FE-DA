import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import LoginRegisterButton from '../LoginRegisterButton'
import ThemeSwitch from '../ThemeSwitch'
import Logo from './Logo'
import './index.css'
import { logOut } from '../../store/authSlice'
import { avatarPath } from '../../utils'
import { ROLE } from '../../constants'

const maps: {
  path: string
  name: string
}[] = [
  { path: '/', name: 'Trang chủ' },
  { path: '/post', name: 'Bài viết' },
  { path: '/doctor', name: 'Bác sĩ' }
  // { path: '/treatment', name: 'Trị liệu' }
  // { path: "/contact", name: "Liên hệ" },
]
export default function Header() {
  const login = useAppSelector((state) => state.auth.login)
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const handleNavbarMobileToggle = () => {
    const nav = document.getElementById('navbar')?.classList
    const navToggle = document.getElementById('nav-toggle')?.classList
    if (nav?.contains('navbar-mobile')) {
      nav.remove('navbar-mobile')
      navToggle?.replace('bi-x', 'bi-list')
    } else {
      nav?.add('navbar-mobile')
      navToggle?.replace('bi-list', 'bi-x')
    }
  }

  const handleClose = () => {
    const nav = document.getElementById('navbar')?.classList
    const navToggle = document.getElementById('nav-toggle')?.classList
    nav?.remove('navbar-mobile')
    navToggle?.replace('bi-x', 'bi-list')
  }

  return (
    <>
      <header id='header' className='fixed-top'>
        <div className='container d-flex align-items-center'>
          <h1 className='logo me-auto'>
            {/* <Logo /> */}
            <a href='/' className='site'>
              TMHcare
            </a>
          </h1>
          {/* <a href="/" className="logo me-auto">
            <img
              src="assets/img/apple-touch-icon.png"
              alt=""
              className="img-fluid"
            />
          </a> */}
          <nav id='navbar' className='navbar order-last order-lg-0'>
            <ul>
              {maps.map(({ path, name }) => {
                const currentPath = location.pathname.split('/')?.[1]
                const p = path.split('/')?.[1]
                // console.log(currentPath, p);

                return (
                  <li key={name}>
                    {/* <a
                      className={`nav-link scrollto ${
                        currentPath === p ? "active" : ""
                      }`}
                      href={path}
                    >
                      {name}
                    </a> */}
                    <Link
                      className={`nav-link scrollto ${currentPath === p ? 'active' : ''}`}
                      onClick={handleClose}
                      to={path}>
                      {name}
                    </Link>
                  </li>
                )
              })}
              {/* <li>
                {login && (
                  <Link className={`dashboard-button active}`} to='/dashboard'>
                    Dashboard
                  </Link>
                )}
              </li> */}
            </ul>
            <i id='nav-toggle' className='bi bi-list mobile-nav-toggle' onClick={handleNavbarMobileToggle}></i>
          </nav>

          {(user?.role == ROLE.USER || user?.role == undefined) && (
            <Link to='/appointment' className='appointment-btn scrollto'>
              Đặt lịch <span className='d-none d-md-inline'>khám</span>
            </Link>
          )}

          <LoginRegisterButton />
          <ThemeSwitch />
          {login && (
            <ul className='dropdown-profile'>
              <li className='header-nav-dashboard nav-item dropdown pe-3'>
                <a className='nav-link nav-profile d-flex align-items-center pe-0' href='#' data-bs-toggle='dropdown'>
                  <img src={avatarPath(user?.avatar)} alt='Profile' className='rounded-circle' />
                  <span className='d-none d-md-block dropdown-toggle ps-2'>{user?.name?.firstName}</span>
                </a>

                <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow profile'>
                  <li className='dropdown-header'>
                    <Link to='/dashboard/profile'>
                      <h6>{user?.fullName}</h6>
                      <span>{user?.email}</span>
                    </Link>
                  </li>
                  <li>
                    <hr className='dropdown-divider' />
                  </li>

                  <li>
                    <Link className='dropdown-item d-flex align-items-center' to='/dashboard'>
                      <i className='bi bi-house'></i>
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <hr className='dropdown-divider' />
                  </li>
                  <li>
                    <button className='dropdown-item d-flex align-items-center' onClick={() => dispatch(logOut())}>
                      <i className='bi bi-box-arrow-right'></i>
                      <span>Đăng xuất</span>
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </header>
    </>
  )
}
