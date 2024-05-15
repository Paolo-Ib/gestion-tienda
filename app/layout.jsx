
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/estilos/gral.css';

export const metadata = {
  title: 'Gestion_Tiendas',
  description: 'Pagina de Loqueo de Usuario',
  keywords: "fiambres, embutidos, quesos, buen comer",
}

export default function RootLayout({
  children
}) {
  return (
    <html lang="en">
      
      <body>
        <div className='container-fluid'>
        {children}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
        </div>
      </body>
    </html>
  )
}
