using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Gaia.Seguridad.Filters;
using System.Web.Optimization;
using Forloop.HtmlHelpers;

namespace Nicarao
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            //Agregamos verificación de la sesión
            //GlobalFilters.Filters.Add(new AuthenticateUser());
            //Agregar para traza de auditoría
            //GlobalFilters.Filters.Add(new AuditFilterAttribute());
            //Eliminar Versión de MVC
            MvcHandler.DisableMvcResponseHeader = true;

            ScriptContext.ScriptPathResolver = System.Web.Optimization.Scripts.Render;

            Application["AppTitle"] = System.Configuration.ConfigurationManager.AppSettings["AppTitle"].ToString();
        }

        //Eliminar cabeceras de versiones
        protected void Application_PreSendRequestHeaders()
        {
            Response.Headers.Remove("Server");
            Response.Headers.Remove("X-AspNet-Version");
        }
    }
}
