using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using LinqKit;
using System.Data.SqlClient;
using System.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Globalization;
using System.IO;
using System.Net;
using System.Web.Configuration;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using Newtonsoft.Json.Converters;
using System.Text;
using Microsoft.Ajax.Utilities;
using Microsoft.SqlServer.Server;

using Gaia.DAL;
using Gaia.Helpers;
using Gaia.DAL.Model;
using Gaia.BLL.Model;
using Gaia.BLL.Repository;
using Gaia.Seguridad.Model;
using Gaia.DAL.Model.BLL;
using Gaia.Seguridad.Filters;
using Gaia.Seguridad.Controllers;
using Gaia.Helpers.ExtensionMethods;
using System.Diagnostics;
using Nicarao.DAL;
using Nicarao.DAL.Model.CEPOV;
using System.Web.UI;


namespace Nicarao.App.Controllers
{
    public class CensoencuestaController : Controller
    {
        //bool resultado = true;
        //int Retorno;
        //string Mensaje;

        HttpSessionStateBase session = new HttpSessionStateWrapper(System.Web.HttpContext.Current.Session);
        NicaraoDbContext db = new NicaraoDbContext();

        // GET: Censoencuesta
        public ActionResult Index()
        {
            return View();
        }

        [OutputCache(Duration = 60, Location = OutputCacheLocation.Server)]
        public ActionResult ContenedorCensoPoblacionVivienda()
        {
            //ViewBag.Departamentos = _DEPT.SelectAll().ToList();
            return PartialView();
        }
                
        //[CachingFilter]
        public ActionResult IdentificacionUbicacionUsoEdificacion()
        {
            return PartialView();
        }

        public ActionResult ResidentesViviendaIdentificacionHogares()
        {           
            return PartialView();
        }

        public ActionResult DatosViviendaHogarPrincipal()
        {
            return PartialView();
        }

        public ActionResult CaracteristicasHogar()
        {
            return PartialView();
        }

        public ActionResult PersonasHogar()
        {
            return PartialView();
        }

        public ActionResult ObtenerListaMiembrosHogar()
        {
            return PartialView("ListaMiembrosHogar");
        }

        public ActionResult _ListaMiembrosHogar()
        {
            return PartialView();
        }

        //[AcceptVerbs(HttpVerbs.Get)]
        //public string Filtrarcombo()
        //{
        //    var todosent = _DEPT.SelectAll().Select(a => new { a.CodDepartamento, a.NomDepartamento }).ToList();
        //    return JsonConvert.SerializeObject(todosent);
        //}

        public ActionResult CaracteristicasPersonas()
        {
            return PartialView();
        }

        public ActionResult EmigracionInternacionalHogar()
        {
            return PartialView();
        }

        public ActionResult ObtenerListaEmigracionInternacionalHogar()
        {
            return PartialView("ListaEmigracionInternacionalHogar");
        }

        public ActionResult _ListaEmigracionInternacionalHogar()
        {
            return PartialView();
        }

        public ActionResult DefuncionesHogar()
        {
            return PartialView();
        }

        public ActionResult ObtenerListaDefuncionesHogar()
        {
            return PartialView("ListaDefuncionesHogar");
        }

        public ActionResult _ListaDefuncionesHogar()
        {
            return PartialView();
        }

        public ActionResult ActividadAgropecuariaHogar()
        {
            return PartialView();
        }

        public ActionResult ObtenerListaActividadAgropecuariaHogar()
        {
            return PartialView("ListaActividadAgropecuariaHogar");
        }

        public ActionResult _ListaActividadAgropecuariaHogar()
        {
            return PartialView();
        }

        public ActionResult ResultadoEntrevistaHogar()
        {
            return PartialView();
        }

        [OutputCache(Duration = 60, Location = OutputCacheLocation.Server)]
        public ActionResult ContenedorCensoEconomico()
        {
            return PartialView();
        }

        public ActionResult IdentificacionUbicacionEstablecimiento()
        {
            return PartialView();
        }

        public ActionResult ResultadoEntrevistaEconomica()
        {
            return PartialView();
        }

        public ActionResult CaracteristicasEstablecimientoEconomico()
        {
            return PartialView();
        }

        //public ActionResult PersonasTrabajanEstablecimientoEmpresa()
        //{
        //        //List<SelectListItem> hl = new List<SelectListItem>();
        //        //hl.Add(new SelectListItem { Text = "", Value = "" });
        //        //hl.Add(new SelectListItem { Text = "Empleadores/Empresarios/Patronos", Value = "1" });
        //        //hl.Add(new SelectListItem { Text = "Trabajador por cuenta propia", Value = "2" });
        //        //hl.Add(new SelectListItem { Text = "Trabajadores o empleados permanentes o temporales (remunerados y no remunerados)", Value = "3" });
        //        //hl.Add(new SelectListItem { Text = "Total de trabajadores", Value = "4" });
        //    return PartialView();
        //}

        public ActionResult ObtenerListaPersonasTrabajanEstablecimiento()
        {
            return PartialView("ListaPersonasTrabajanEstablecimiento");
        }

        public ActionResult _ListaPersonasTrabajanEstablecimiento()
        {
            return PartialView();
        }
    }
}