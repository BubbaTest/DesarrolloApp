//using DICEA.DAL.Model.Vistas;
using Gaia.DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SecretariaCSJ.App.Helpers.Validaciones
{
    public static class DatosAbogadoHelper
    {
        //public static bool AutorizacionVerIndice(this vwDatosAbogado DatosAbogado, Usuario usuario, out string MensajeNoAutorizado)
        //{
        //    string Mensaje = "Usted no cuenta con la autorización para ver los índices de {0}. Comuniquese con el administrador para solicitar la autorización.";
            
        //    if(Convert.ToBoolean(DatosAbogado.EsNotaria) && !usuario.UsuarioRolEntidad.FirstOrDefault().Rol.RolOpciones.Any(x => x.Opcion.Mapeo == "AutorizadoVerIndicesNotaria"))
        //    {
        //        MensajeNoAutorizado = string.Format(Mensaje, "las notarias judiciales");
        //        return false;
        //    }
        //    else if(!Convert.ToBoolean(DatosAbogado.EsNotaria) && !usuario.UsuarioRolEntidad.FirstOrDefault().Rol.RolOpciones.Any(x => x.Opcion.Mapeo == "AutorizadoVerIndicesNotarios"))
        //    {
        //        MensajeNoAutorizado = string.Format(Mensaje, "los abogados/notarios");
        //        return false;
        //    }

        //    MensajeNoAutorizado = "Usted esta autorizado";
        //    return true;
        //}
    }
}