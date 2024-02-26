//using SecretariaCSJ.Dal;
//using SecretariaCSJ.Dal.Model.expediente;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SecretariaCSJ.App.Helpers.Validaciones
{
//    public static class DetalleCompensacionPermisoFechasHelper
//    {
//        public static bool ValidarRangoFecha(this DetalleCompensacionPermisoFechas detalleFechas, out string Mensaje)
//        {

//            SecretariaDbContext _dbSecretaria = new SecretariaDbContext();

//            decimal id = detalleFechas.CompensacionPermisoId;

//            List<DetalleCompensacionPermisoFechas> fechas = _dbSecretaria.DetalleCompensacionPermisoFechas.Where(x => x.CompensacionPermisoId == id && x.Activo == true).ToList();

//            if (detalleFechas.FechaInicial > detalleFechas.FechaFinal)
//            {
//                Mensaje = "La fecha inicial no puede ser mayor que la fecha final.";
//                return false;
//            }

//            if (fechas.Any(x => x.FechaInicial <= detalleFechas.FechaInicial && x.FechaFinal >= detalleFechas.FechaInicial))
//            {
//                Mensaje = "Los rangos de fechas no se puede interceptar, la fecha inicial intercepta a otro rango de fechas.";
//                return false;
//            }

//            if (fechas.Any(x => x.FechaInicial <= detalleFechas.FechaFinal && x.FechaFinal >= detalleFechas.FechaFinal))
//            {
//                Mensaje = "Los rangos de fechas no se puede interceptar, la fecha final intercepta a otro rango de fechas.";
//                return false;
//            }

//            if (detalleFechas.HoraInicial >= detalleFechas.HoraFinal)
//            {
//                Mensaje = "La hora inicial no puede ser mayor a la hora final.";
//                return false;
//            }

//            if (fechas.Any(x => x.FechaInicial > detalleFechas.FechaInicial && x.FechaFinal < detalleFechas.FechaFinal))
//            {

//                Mensaje = "El rango de fechas ingresado engloba a otros rangos de fechas.";
//                return false;
//            }

//            Mensaje = "";
//            return true;
//        }
//    }
}