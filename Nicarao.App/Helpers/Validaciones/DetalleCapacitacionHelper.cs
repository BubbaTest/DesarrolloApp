//using SecretariaCSJ.Dal;
//using SecretariaCSJ.Dal.Model.expediente;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SecretariaCSJ.App.Helpers.Validaciones
{
    //public static class DetalleCapacitacionHelper
    //{
    //    public static bool ValidFechas(this DetalleCapacitacion capacitacion,out string Mensaje) {

    //        SecretariaDbContext _dbSecretaria = new SecretariaDbContext();

    //        Acuerdo acuerdo = _dbSecretaria.DetalleAcuerdo.Where(x => x.DetalleAcuerdoGuid == capacitacion.DetalleAcuerdoGuid).FirstOrDefault().Acuerdo;

    //        if (capacitacion.FechaHoraIniAct.Value.Year != Convert.ToInt32(acuerdo.Anio))
    //        {
    //            Mensaje = "La fecha inicial de la actividad tiene un año diferente al año del acuerdo.";
    //            return false; 
    //        }

    //        if (capacitacion.FechaHoraFinAct.Value.Year != Convert.ToInt32(acuerdo.Anio))
    //        {
    //            Mensaje = "La fecha final de la actividad tiene un año diferente al año del acuerdo.";
    //            return false;
    //        }

    //        if (capacitacion.FechaHoraIniAct > capacitacion.FechaHoraFinAct)
    //        {
    //            Mensaje = "La fecha incial de la actividad no pude ser mayor a la fecha final.";
    //            return false;
    //        }

    //        Mensaje = "";
    //        return true;
    //    }
    //}
}