//using SecretariaCSJ.Dal;
//using SecretariaCSJ.Dal.Model.expediente;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SecretariaCSJ.App.Helpers.Validaciones
{
    public static class DetalleSubsidioFechasHelper
    {

        //public static bool ValidarRangoFecha(this DetalleSubsidioFechas SubsidioFechas, out string Mensaje) {

        //    SecretariaDbContext _dbSecretaria = new SecretariaDbContext();

        //    decimal id = SubsidioFechas.DetallesubsidioId;

        //    List<DetalleSubsidioFechas> fechas = _dbSecretaria.DetalleSubsidioFechas.Where(x => x.DetallesubsidioId == id && x.Activo == true).ToList();

        //    if (SubsidioFechas.FechaInicial > SubsidioFechas.FechaFinal)
        //    {
        //        Mensaje = "La fecha inicial no puede ser mayor que la fecha final.";
        //        return false;
        //    }

        //    if (fechas.Any(x => x.FechaInicial <= SubsidioFechas.FechaInicial && x.FechaFinal >= SubsidioFechas.FechaInicial))
        //    {
        //        Mensaje = "Los rangos de fechas no se puede interceptar, la fecha inicial intercepta a otro rango de fechas.";
        //        return false;
        //    }

        //    if (fechas.Any(x => x.FechaInicial <= SubsidioFechas.FechaFinal && x.FechaFinal >= SubsidioFechas.FechaFinal))
        //    {
        //        Mensaje = "Los rangos de fechas no se puede interceptar, la fecha final intercepta a otro rango de fechas.";
        //        return false;
        //    }

        //    if (SubsidioFechas.HoraInicial >= SubsidioFechas.HoraFinal)
        //    {
        //        Mensaje = "La hora inicial no puede ser mayor a la hora final.";
        //        return false;
        //    }

        //    if (fechas.Any(x => x.FechaInicial > SubsidioFechas.FechaInicial && x.FechaFinal < SubsidioFechas.FechaFinal)) {

        //        Mensaje = "El rango de fechas ingresado engloba a otros rangos de fechas.";
        //        return false;
        //    }

        //    Mensaje = "";
        //    return true;
        //}
    }
}