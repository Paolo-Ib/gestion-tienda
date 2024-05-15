import Link from "next/link"
export const NavBarLat = () => {
  return (
    <>

      <nav className="navbar navbar-dark flex-column">
          <div className="container-navbar">
            <h1>Modulos</h1>
             <ul>
              <li>
                <Link id="link-nav" href="/gestion/ventas">Ventas</Link>
              </li>
              <br />
              <li>
                <Link id="link-nav" href="/gestion/movimientos">Movimientos</Link>
              </li>
              <br />
              <li>
                <Link id="link-nav" href="/gestion/reportes">Reportes</Link>
              </li>
              <br />
            </ul>
          </div>
          
      </nav>

    </>
  )
}
