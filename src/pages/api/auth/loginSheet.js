import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import creds from "../../../../app-gestion-tienda.json";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Extraer los datos del formulario del cuerpo de la solicitud
    const { data } = req.body;

    // Crea una nueva instancia de JWT para la autenticación
    const jwt = new JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // El ID de tu hoja de cálculo
    const spreadsheetId = creds.id_spreadsheet;

    try {
      // Crea una instancia de GoogleSpreadsheet
      const doc = new GoogleSpreadsheet(spreadsheetId, jwt);

      // Autentica con las credenciales de servicio
      //  await doc.useServiceAccountAuth(jwt);

      // Carga la información de la hoja de cálculo
      await doc.loadInfo();

      // Selecciona la primera hoja (puedes cambiar el índice o nombre según necesites)
      const sheet = doc.sheetsByTitle["Operaciones"];

      // Agrega una nueva fila con los datos del formulario
      /*
      await sheet.addRow({
        Fecha: data.Fecha,
        Empresa: data.Empresa,
        Nombre: data.Nombre,
        Concepto: data.Concepto,
        Tipo: data.Tipo,
        Monto: data.Monto,
        Referencia: data.Referencia,
        Fecha_Vencimiento: data.Fecha_Vencimiento,
        Observaciones: data.Observaciones,
      });   */

      // Devuelve información básica sobre la hoja
      res.status(200).json({
        success: true,
        message: "Datos agregados exitosamente a la hoja de cálculo.",
      });

      console.log(doc.title);
      console.log(doc.sheetCount);
    } catch (error) {
      console.error("Error al conectar con la hoja de cálculo:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}