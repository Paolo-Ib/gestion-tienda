
export const FormLogin = () => {
  return (
    <>
    <div className="container-form-login">
      <form className="form-login">
        <div className="mb-3">
          <label htmlform="exampleInputEmail1" className="form-label">Nombre de usuario</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">Nunca compartiremos tus datos con nadie mas.</div>
        </div>
        <div className="mb-3">
          <label htmlform="exampleInputPassword1" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-success">Enviar</button>
      </form>
      </div>
    </>
  );
}

