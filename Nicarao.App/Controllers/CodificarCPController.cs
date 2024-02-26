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

using Gaia.DAL;
using Gaia.Helpers;
using Gaia.DAL.Model;
using Gaia.BLL.Model;
using Gaia.BLL.Repository;
using Gaia.Seguridad.Model;
using Gaia.Seguridad.Filters;
using Gaia.Seguridad.Controllers;
using Gaia.Helpers.ExtensionMethods;

using Nicarao.DAL;
using Nicarao.DAL.Model;
using PJN.DAL;
using PJN.DAL.Model.LATRINIDAD;
using PJN.DAL.Model.GENERAL;
using TAEL.Dal;
using TAEL.Dal.Model.CEPOVLATRINIDAD;
using System.Diagnostics;
using Microsoft.Ajax.Utilities;
using Microsoft.SqlServer.Server;

namespace Nicarao.App.Controllers
{
    public class CodificarCPController : Controller
    {
        bool resultado = true;
        int Retorno;
        string Mensaje;

        HttpSessionStateBase session = new HttpSessionStateWrapper(System.Web.HttpContext.Current.Session);
        PJNDbContext db = new PJNDbContext();

        GenericRepository<PJN.DAL.Model.GENERAL.Usuario> _LUSU = new GenericRepository<PJN.DAL.Model.GENERAL.Usuario>(new PJNDbContext());
        GenericRepository<Nicarao.DAL.Model.CEPOV.Departamentos> _DEPT = new GenericRepository<Nicarao.DAL.Model.CEPOV.Departamentos>(new NicaraoDbContext());
        GenericRepository<Nicarao.DAL.Model.CEPOV.Municipios> _MUN = new GenericRepository<Nicarao.DAL.Model.CEPOV.Municipios>(new NicaraoDbContext());
        GenericRepository<PJN.DAL.Model.LATRINIDAD.AsignacionSegmento> _ASIGNACION = new GenericRepository<PJN.DAL.Model.LATRINIDAD.AsignacionSegmento>(new PJNDbContext());
        GenericRepository<PJN.DAL.Model.LATRINIDAD.SEGMENTOS> _SEG = new GenericRepository<PJN.DAL.Model.LATRINIDAD.SEGMENTOS>(new PJNDbContext());
        GenericRepository<PJN.DAL.Model.GENERAL.catCensoEncuesta> _CENENC = new GenericRepository<PJN.DAL.Model.GENERAL.catCensoEncuesta>(new PJNDbContext());
        GenericRepository<PJN.DAL.Model.GENERAL.UsuarioRol> _RUR = new GenericRepository<PJN.DAL.Model.GENERAL.UsuarioRol>(new PJNDbContext());
        GenericRepository<Nicarao.DAL.Model.CEPOV.ActividadClase> _CAS = new GenericRepository<Nicarao.DAL.Model.CEPOV.ActividadClase>(new NicaraoDbContext());
        GenericRepository<PJN.DAL.Model.LATRINIDAD.SECTION7_CARAT_PERSONS> _S7CP = new GenericRepository<PJN.DAL.Model.LATRINIDAD.SECTION7_CARAT_PERSONS>(new PJNDbContext());
        GenericRepository<PJN.DAL.Model.GENERAL.SeccionFormulario> _SF = new GenericRepository<PJN.DAL.Model.GENERAL.SeccionFormulario>(new PJNDbContext());
        GenericRepository<PJN.DAL.Model.GENERAL.relSeccionVariable> _RSV = new GenericRepository<PJN.DAL.Model.GENERAL.relSeccionVariable>(new PJNDbContext());
        GenericRepository<PJN.DAL.Model.GENERAL.VariableFormulario> _VF = new GenericRepository<PJN.DAL.Model.GENERAL.VariableFormulario>(new PJNDbContext());
        GenericRepository<PJN.DAL.Model.LATRINIDAD.CEPOV> _CEPOV = new GenericRepository<PJN.DAL.Model.LATRINIDAD.CEPOV>(new PJNDbContext());
        GenericRepository<Nicarao.DAL.Model.CEPOV.Ocupacion> _OCU = new GenericRepository<Nicarao.DAL.Model.CEPOV.Ocupacion>(new NicaraoDbContext());
        GenericRepository<PJN.DAL.Model.GENERAL.VARIABLECONTROL> _VAR = new GenericRepository<PJN.DAL.Model.GENERAL.VARIABLECONTROL>(new PJNDbContext());
        GenericRepository<TAEL.Dal.Model.CEPOVLATRINIDAD.Cats1_q6> _s1q6 = new GenericRepository<TAEL.Dal.Model.CEPOVLATRINIDAD.Cats1_q6>(new TaelDBContext());
        GenericRepository<PJN.DAL.Model.LATRINIDAD.S04_LIST_EMIGRA> _S4E = new GenericRepository<PJN.DAL.Model.LATRINIDAD.S04_LIST_EMIGRA>(new PJNDbContext());
        GenericRepository<Nicarao.DAL.Model.CEPOV.CatalogoPais> _CP = new GenericRepository<Nicarao.DAL.Model.CEPOV.CatalogoPais>(new NicaraoDbContext());
        GenericRepository<PJN.DAL.Model.LATRINIDAD.COMARCA> _COMARCA = new GenericRepository<PJN.DAL.Model.LATRINIDAD.COMARCA>(new PJNDbContext());
        GenericRepository<PJN.DAL.Model.LATRINIDAD.COMUNIDADES> _COMUNIDADES = new GenericRepository<PJN.DAL.Model.LATRINIDAD.COMUNIDADES>(new PJNDbContext());
        GenericRepository<Nicarao.DAL.Model.CEPOV.CUTP> _CUTP = new GenericRepository<Nicarao.DAL.Model.CEPOV.CUTP>(new NicaraoDbContext());
        GenericRepository<PJN.DAL.Model.LATRINIDAD.relAsignacionPersonal> _RJS = new GenericRepository<PJN.DAL.Model.LATRINIDAD.relAsignacionPersonal>(new PJNDbContext());
        GenericRepository<PJN.DAL.Model.GENERAL.ArchivoBinario> _Archivo = new GenericRepository<PJN.DAL.Model.GENERAL.ArchivoBinario>(new PJNDbContext());        
        GenericRepository<PJN.DAL.Model.GENERAL.VARIABLECONTROL> _Var = new GenericRepository<PJN.DAL.Model.GENERAL.VARIABLECONTROL>(new PJNDbContext());
        
        // GET: CodificarCP
        public ActionResult Index()
        {
            return View();
        }    
        
        public ActionResult DescargaManual()
        {
            return PartialView();
        }

        public ActionResult PowerBi()
        {
            return PartialView();
        }

        public ActionResult _ConsistenciaValidacion()
        {
            PFF();
            //bool resultado = GenerarPffArchivo(out Retorno, out Mensaje);            
            if (Retorno == 0)
            {
                ProcessStartInfo startinfo = new ProcessStartInfo();
                startinfo.FileName = @"C:\Program Files (x86)\CSPro 7.7\CSPro.exe";
                //startinfo.Arguments = "arg1 arg2";
                startinfo.CreateNoWindow = true;
                startinfo.UseShellExecute = false;
                Process myProcess = Process.Start(startinfo);
                //myProcess.CloseMainWindow();
                // Free resources associated with process.
                //myProcess.Close();
                //if (myProcess != null && !myProcess.HasExited)
                //    myProcess.Kill();
            }
            return PartialView();
        }

        private void PFF()
        {
            try
            {
                //Pass the filepath and filename to the StreamWriter Constructor
                StreamWriter sw = new StreamWriter(@"c:\temp\out.pff");
                //Write a line of text
                sw.WriteLine("Hello World!!  lenin");
                //Write a second line of text
                sw.WriteLine("From the StreamWriter class");
                //Close the file
                sw.Close();
            }
            catch (Exception e)
            {
                Retorno = -1;
                Console.WriteLine("Exception: " + e.Message);
            }
            finally
            {
                Retorno = 0;
                Console.WriteLine("Executing finally block.");
            }
        }

        //public string GenerarArchivPff()
        //{
        //    int Retorno = -1;
        //    string Mensaje = "Ocurrio un error no controlado";
        //    bool resultado = GenerarPffArchivo(out Retorno, out Mensaje);
        //    var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
        //    return result;
        //}

        private bool GenerarPffArchivo(out int Retorno, out string Mensaje)
        {
            try
            {
                Retorno = -1;
                Mensaje = "Ocurrio un error no controlado";
                string sqlCommand = "EXECUTE [dbo].[GenerarArchivoPff] @Retorno OUTPUT, @Mensaje OUTPUT";
                List<SqlParameter> parametros = new List<SqlParameter>();                
                SqlParameter pRetorno = new SqlParameter("@Retorno", SqlDbType.Int);
                pRetorno.Direction = ParameterDirection.Output;
                parametros.Add(pRetorno);
                SqlParameter pMensaje = new SqlParameter("@Mensaje", SqlDbType.NVarChar, 1024);
                pMensaje.Direction = ParameterDirection.Output;
                parametros.Add(pMensaje);
                SqlParameter[] oParametros = parametros.ToArray();
                db.Database.ExecuteSqlCommand(sqlCommand, oParametros);
                Retorno = Convert.ToInt32(pRetorno.Value);
                Mensaje = Convert.ToString(pMensaje.Value);
                if (Retorno == 0) return true;
                else return false;
            }
            catch (Exception ex)
            {
                Retorno = ex.HResult;
                Mensaje = ex.Message.ToString().Replace(".\r\n", " ");
                Mensaje = Mensaje.Replace("\"", "");
                Mensaje = Mensaje.Replace("\r", "");
                Mensaje = Mensaje.Replace("\n", "");
                return false;
            }
        }

        public ActionResult ConfAsignacionP()
        {
            //JObject JObjDatosUsuario = JObject.Parse(JsonConvert.SerializeObject(session["usuario"]));
            var sRol = SessionHelper.GetItem<PJN.DAL.Model.Utilisatrice>(session).Rol;//JObjDatosUsuario["Rol"].Value<string>();
            var listarol = _Var.SearchFor(x => x.VariableId == sRol).Select(x => new { x.Cadena });
            var filrol = listarol.FirstOrDefault().Cadena.ToString().Split(",".ToCharArray());
            var filteredrol = from t in _RUR.SelectAll().Select(c => new { c.UsuarioId, c.RolId }).ToList()
                                   where filrol.Contains(t.RolId)
                                   select t;
           
            var sactivo = (from AS in _LUSU.SelectAll().Where(c => c.Activo == true).Select(c => new { c.UsuarioId, NombreCompleto = c.Nombres + " " + c.Apellidos }).ToList()
                           join MU in filteredrol on AS.UsuarioId equals MU.UsuarioId
                           select new { AS.UsuarioId, AS.NombreCompleto }).ToList();
          
            ViewBag.Subalterno = sactivo;
            ViewBag.Usuario = SessionHelper.GetItem<PJN.DAL.Model.Utilisatrice>(session).UsuarioId;//JObjDatosUsuario["UsuarioId"].Value<string>();
            ViewBag.Rol = sRol;
            return PartialView();
        }

        public ActionResult ObtenerAsignaPersonal()
        {
            return PartialView("_ListaAsignaPersonal");
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public string ObtenerListadoPersonalAsignado(string rol, string relGUID = "")
        {
            if (relGUID == "")
            {
                var resultado = spObtenerListaPersonalAsignado(rol, out Retorno, out Mensaje);
                return resultado;
            }
            else
            {
                var usuario = _RJS.SearchFor(d => d.relGUID.ToString() == relGUID).ToList();
                return JsonConvert.SerializeObject(usuario);
            }
        }

        public string spObtenerListaPersonalAsignado(string rol, out int Retorno, out string Mensaje)
        {
            try
            {
                Retorno = -1;
                Mensaje = "Ocurrio un error no controlado";
                GenericRepository<string> cnn = new GenericRepository<string>(new PJNDbContext());
                string sqlCommand = "sde.listaRelacionAsignacionPersonal @rol, @Retorno OUTPUT, @Mensaje OUTPUT";
                List<SqlParameter> parametros = new List<SqlParameter>();
                SqlParameter pUsuario = new SqlParameter("@rol", System.Data.SqlDbType.NVarChar, 50);
                pUsuario.Value = rol;
                parametros.Add(pUsuario);
                SqlParameter pRetorno = new SqlParameter("@Retorno", SqlDbType.Int);
                pRetorno.Direction = ParameterDirection.Output;
                parametros.Add(pRetorno);
                SqlParameter pMensaje = new SqlParameter("@Mensaje", SqlDbType.NVarChar, 1024);
                pMensaje.Direction = ParameterDirection.Output;
                parametros.Add(pMensaje);
                SqlParameter[] oParametros = parametros.ToArray();
                var result = cnn.ExecStoreProcedure(sqlCommand, oParametros).FirstOrDefault();
                Retorno = Convert.ToInt32(pRetorno.Value);
                Mensaje = Convert.ToString(pMensaje.Value);
                if (Retorno == 0) {
                    if (result != null) return result;
                    else return "[]";
                }
                    
                else return string.Empty;
            }
            catch (Exception ex)
            {
                Retorno = ex.HResult;
                Mensaje = ex.Message.ToString().Replace(".\r\n", " ");
                Mensaje = Mensaje.Replace("\"", "");
                Mensaje = Mensaje.Replace("\r", "");
                Mensaje = Mensaje.Replace("\n", "");
                return "[]";
            }
        }

        public ActionResult ConfAsignacion()
        {
            ViewBag.CenEnc = _CENENC.SelectAll().Where(c=> c.Activo==true).ToList();
            ViewBag.departamento = _DEPT.SelectAll().OrderBy(c => c.NomDepartamento).ToList();
            //JObject JObjDatosUsuario = JObject.Parse(JsonConvert.SerializeObject(session["usuario"]));
            var sRol = SessionHelper.GetItem<PJN.DAL.Model.Utilisatrice>(session).Rol; //JObjDatosUsuario["Rol"].Value<string>();
            var activo = (from AS in _LUSU.SelectAll().Where(c => c.Activo == true).Select(c => new { c.UsuarioId, NombreCompleto = c.Nombres + " " + c.Apellidos }).ToList()
                          join MU in _RJS.SelectAll().Where(c => c.RolId == sRol).Select(c => new { c.SUsuarioId }).ToList() on AS.UsuarioId equals MU.SUsuarioId
                          select new { AS.UsuarioId, AS.NombreCompleto }).ToList();
            ViewBag.Codificador = activo;
            ViewBag.Usuario = SessionHelper.GetItem<PJN.DAL.Model.Utilisatrice>(session).UsuarioId;//JObjDatosUsuario["UsuarioId"].Value<string>();
            return PartialView();
        }
        
        public ActionResult RptAsignacionCargaLocalizacionFecha()
        {
            //JObject JObjDatosUsuario = JObject.Parse(JsonConvert.SerializeObject(session["usuario"]));
            ViewBag.Usuario = SessionHelper.GetItem<PJN.DAL.Model.Utilisatrice>(session).UsuarioId; //JObjDatosUsuario["UsuarioId"].Value<string>();
            List<SelectListItem> per = new List<SelectListItem>();
            per.Add(new SelectListItem { Text = "", Value = "" });
            per.Add(new SelectListItem { Text = "Anual", Value = "1" });
            per.Add(new SelectListItem { Text = "1er Semestre", Value = "2" });
            per.Add(new SelectListItem { Text = "2do Semestre", Value = "3" });
            per.Add(new SelectListItem { Text = "1er Trimestre", Value = "4" });
            per.Add(new SelectListItem { Text = "2do Trimestre", Value = "5" });
            per.Add(new SelectListItem { Text = "3er Trimestre", Value = "6" });
            per.Add(new SelectListItem { Text = "4to Trimestre", Value = "7" });
            per.Add(new SelectListItem { Text = "Otros", Value = "8" });
            ViewBag.Periodo = per;
            ViewBag.departamento = _DEPT.SelectAll().OrderBy(c => c.NomDepartamento).ToList();
            return PartialView();
        }

        public string GenerarDatoAsignacionLocacionFecha(string AsignoId, string Municipio, string FechaIni, string FechaFin)
        {
            int Retorno = -1;
            string Mensaje = "Ocurrio un error no controlado";
            bool resultado = GenerarAsignaLocacionFecha(AsignoId, Municipio, FechaIni, FechaFin, out Retorno, out Mensaje);
            var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
            return result;
        }

        private bool GenerarAsignaLocacionFecha(string AsignoId, string Municipio, string FechaIni, string FechaFin, out int Retorno, out string Mensaje)
        {
            try
            {
                Retorno = -1;
                Mensaje = "Ocurrio un error no controlado";
                string sqlCommand = "EXECUTE [sde].[ListaAsignacionSegmentoporResponsable] @AsignoId, @Municipio, @FechaIni, @FechaFin, @Retorno OUTPUT, @Mensaje OUTPUT";
                List<SqlParameter> parametros = new List<SqlParameter>();
                SqlParameter pUsuario = new SqlParameter("@AsignoId", System.Data.SqlDbType.VarChar, 15);
                pUsuario.Value = AsignoId;
                parametros.Add(pUsuario);
                SqlParameter pTabla = new SqlParameter("@Municipio", System.Data.SqlDbType.Char, 4);
                pTabla.Value = Municipio;
                parametros.Add(pTabla);
                SqlParameter pTablass = new SqlParameter("@FechaIni", System.Data.SqlDbType.Char, 10);
                pTablass.Value = FechaIni;
                parametros.Add(pTablass);
                SqlParameter pVariable = new SqlParameter("@FechaFin", System.Data.SqlDbType.Char, 10);
                pVariable.Value = FechaFin;
                parametros.Add(pVariable);
                SqlParameter pRetorno = new SqlParameter("@Retorno", SqlDbType.Int);
                pRetorno.Direction = ParameterDirection.Output;
                parametros.Add(pRetorno);
                SqlParameter pMensaje = new SqlParameter("@Mensaje", SqlDbType.NVarChar, 1024);
                pMensaje.Direction = ParameterDirection.Output;
                parametros.Add(pMensaje);
                SqlParameter[] oParametros = parametros.ToArray();
                db.Database.ExecuteSqlCommand(sqlCommand, oParametros);
                Retorno = Convert.ToInt32(pRetorno.Value);
                Mensaje = Convert.ToString(pMensaje.Value);
                if (Retorno == 0) return true;
                else return false;
            }
            catch (Exception ex)
            {
                Retorno = ex.HResult;
                Mensaje = ex.Message.ToString().Replace(".\r\n", " ");
                Mensaje = Mensaje.Replace("\"", "");
                Mensaje = Mensaje.Replace("\r", "");
                Mensaje = Mensaje.Replace("\n", "");
                return false;
            }
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public PartialViewResult ddlMunicipio(string Departamento)
        {
            var resultado = (from t in _MUN.SelectAll().OrderBy(c=> c.NomMunicipio).ToList()
                            where t.CodDepartamento == Departamento
                            select t).OrderBy(c=> c.NomMunicipio);
            List<SelectListItem> listadoOption = new List<SelectListItem>();
            listadoOption.Add(new SelectListItem { Text = "", Value = "" });
            listadoOption.AddRange((from cat in resultado
                                    select new SelectListItem { Text = cat.NomMunicipio, Value = cat.CodMunicipio.ToString() }).Distinct().AsEnumerable());
            return PartialView("_SelectOptions", listadoOption); 
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public PartialViewResult ddlMunicipioAsignado(string Departamento)
        {
            //JObject JObjDatosUsuario = JObject.Parse(JsonConvert.SerializeObject(session["usuario"]));
            var sUsuario = SessionHelper.GetItem<PJN.DAL.Model.Utilisatrice>(session).UsuarioId; //JObjDatosUsuario["UsuarioId"].Value<string>();
            var resultado = (from AS in _ASIGNACION.SelectAll().Where(c => c.UsuarioId == sUsuario).Select(c => new { c.IDMUNIC }).ToList()
                             join t in _MUN.SelectAll().Where(c => c.CodDepartamento == Departamento).OrderBy(c => c.NomMunicipio).ToList() on AS.IDMUNIC equals t.CodMunicipio
                             select t).Distinct();
            List<SelectListItem> listadoOption = new List<SelectListItem>();
            listadoOption.Add(new SelectListItem { Text = "", Value = "" });
            listadoOption.AddRange((from cat in resultado
                                    select new SelectListItem { Text = cat.NomMunicipio, Value = cat.CodMunicipio.ToString() }).Distinct().AsEnumerable());
            return PartialView("_SelectOptions", listadoOption); 
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public PartialViewResult ddlSegmento(string Municipio)
        {           
            var vsegmento = _ASIGNACION.SelectAll().Where(c => c.IDMUNIC == Municipio).Select(d => new { d.IdSegmento }).ToList();
            var resultado = (from t in _SEG.SelectAll().ToList()
                            where t.Id_Municip == Municipio && !(from cv in vsegmento
                                                                 select cv.IdSegmento)
                                                                 .Contains(t.Id_Segment)
                            select t).OrderBy(c=> c.Cod_Segmen).ToList();
            List<SelectListItem> listadoOption = new List<SelectListItem>();
            listadoOption.Add(new SelectListItem { Text = "", Value = "" });
            if (resultado.Count !=0 )
            {
                listadoOption.Add(new SelectListItem { Text = "Todos", Value = "Todos" });
            }            
            listadoOption.AddRange((from cat in resultado
                                    select new SelectListItem { Text = cat.Cod_Segmen, Value = cat.Id_Segment.ToString() }).Distinct().AsEnumerable());
            return PartialView("_SelectOptions", listadoOption); 
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public PartialViewResult ddlSegmentoAsignado(string Municipio)
        {
            //JObject JObjDatosUsuario = JObject.Parse(JsonConvert.SerializeObject(session["usuario"]));
            var sUsuario = SessionHelper.GetItem<PJN.DAL.Model.Utilisatrice>(session).UsuarioId; //JObjDatosUsuario["UsuarioId"].Value<string>();
            var resultado = (from t in _ASIGNACION.SelectAll().Where(c => c.IDMUNIC == Municipio && c.UsuarioId == sUsuario).Select(d => new { d.IdSegmento }).ToList()
                             join s in _SEG.SelectAll().ToList() on t.IdSegmento equals s.Id_Segment
                             select s).Distinct().OrderBy(c => c.Cod_Segmen);
            List<SelectListItem> listadoOption = new List<SelectListItem>();
            listadoOption.Add(new SelectListItem { Text = "", Value = "" });
            listadoOption.AddRange((from cat in resultado
                                    select new SelectListItem { Text = cat.Cod_Segmen, Value = cat.Id_Segment.ToString() }).Distinct().AsEnumerable());
            return PartialView("_SelectOptions", listadoOption); 
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public PartialViewResult ddlSegmentoTodos(string Municipio)
        {
            var resultado = _SEG.SelectAll().Where(c => c.Id_Municip == Municipio).OrderBy(c => c.Cod_Segmen).ToList();
            List<SelectListItem> listadoOption = new List<SelectListItem>();
            listadoOption.Add(new SelectListItem { Text = "", Value = "" });
            listadoOption.AddRange((from cat in resultado
                                    select new SelectListItem { Text = cat.Cod_Segmen, Value = cat.Id_Segment.ToString() }).Distinct().AsEnumerable());
            return PartialView("_SelectOptions", listadoOption); 
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public PartialViewResult ddlSeccion(int CenEnc)
        {
            var resultado = _SF.SelectAll().Where(c => c.CenEnc == CenEnc).OrderBy(c => c.Descripcion).ToList();
            List<SelectListItem> listadoOption = new List<SelectListItem>();
            listadoOption.Add(new SelectListItem { Text = "", Value = "" });
            listadoOption.AddRange((from cat in resultado
                                    select new SelectListItem { Text = cat.Descripcion, Value = cat.SeccionId.ToString() + "/" + cat.relGUID.ToString() }).Distinct().AsEnumerable());
            return PartialView("_SelectOptions", listadoOption);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public PartialViewResult ddlComarca(string Municipio)
        {
            var resultado = from t in _COMARCA.SelectAll().OrderBy(c => c.Nom_Comarc).ToList()
                            where t.Id_Municip == Municipio
                            select t;
            List<SelectListItem> listadoOption = new List<SelectListItem>();
            listadoOption.Add(new SelectListItem { Text = "", Value = "" });
            listadoOption.AddRange((from cat in resultado
                                    select new SelectListItem { Text = cat.Nom_Comarc, Value = cat.Id_Comarca.ToString() }).Distinct().AsEnumerable());
            return PartialView("_SelectOptions", listadoOption); 
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public PartialViewResult ddlComunidades(string Comarca)
        {
            var resultado = _COMARCA.SelectAll().Where(c => c.Id_Comarca == Comarca).FirstOrDefault().Comunidades.OrderBy(c => c.Nom_Comuni).ToList();
                           
            List<SelectListItem> listadoOption = new List<SelectListItem>();
            listadoOption.Add(new SelectListItem { Text = "", Value = "" });
            listadoOption.AddRange((from cat in resultado
                                    select new SelectListItem { Text = cat.Nom_Comuni, Value = cat.Id_Comunid.ToString() }).Distinct().AsEnumerable());
            return PartialView("_SelectOptions", listadoOption); 
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public PartialViewResult ddlVariable(Guid Seccion)
        {
            var vsegmento = _RSV.SelectAll().Where(c => c.SeccionId == Seccion).Select(d => new { d.VariableId }).ToList();
            var resultado = (from t in _VF.SelectAll().ToList()
                            where (from cv in vsegmento
                                                                 select cv.VariableId)
                                                                 .Contains(t.VariableId)
                            select t).OrderBy(c=> c.Descripcion);
            List<SelectListItem> listadoOption = new List<SelectListItem>();
            listadoOption.Add(new SelectListItem { Text = "", Value = "" });
            listadoOption.AddRange((from cat in resultado
                                    select new SelectListItem { Text = cat.Descripcion, Value = cat.VariableId.ToString() + '/' + cat.Clasificacion }).Distinct().AsEnumerable());
            return PartialView("_SelectOptions", listadoOption); ;
        }

        public ActionResult _ListaAsignacion()
        {
            return PartialView();
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public string ObtenerAsignacion(string Usuario, string CodDepartamento, string CodMunicipio="")
        {
            if (CodMunicipio=="")
            {
                var activo = (from AS in _ASIGNACION.SelectAll().Where(c=> c.AsignoId== Usuario).OrderBy(c => c.IDMUNIC).ToList()
                             join MU in _MUN.SelectAll().ToList() on AS.IDMUNIC equals MU.CodMunicipio
                             join DE in _DEPT.SelectAll().Where(c => c.CodDepartamento == CodDepartamento).ToList() on MU.CodDepartamento equals DE.CodDepartamento
                             join LU in _LUSU.SelectAll().OrderBy(c => c.Nombres).ThenBy(c => c.Apellidos).ToList() on AS.UsuarioId equals LU.UsuarioId
                             join SE in _SEG.SelectAll().ToList() on AS.IdSegmento equals SE.Id_Segment
                             select new { SE.Id_Segment, SE.Cod_Segmen, DE.NomDepartamento, MU.NomMunicipio, NombreCompleto = LU.Nombres + " " + LU.Apellidos }).OrderBy(c => c.NomDepartamento).ThenBy(c => c.NomMunicipio).ThenBy(c => c.NombreCompleto);
                return JsonConvert.SerializeObject(activo);
            }
            else
            {                
                var activo = (from AS in _ASIGNACION.SelectAll().Where(c => c.AsignoId == Usuario && c.IDMUNIC == CodMunicipio).OrderBy(c => c.IDMUNIC).ToList()
                                join MU in _MUN.SelectAll().Where(c => c.CodMunicipio == CodMunicipio).ToList() on AS.IDMUNIC equals MU.CodMunicipio
                                join DE in _DEPT.SelectAll().ToList() on MU.CodDepartamento equals DE.CodDepartamento
                                join LU in _LUSU.SelectAll().ToList() on AS.UsuarioId equals LU.UsuarioId
                                join SE in _SEG.SelectAll().ToList() on AS.IdSegmento equals SE.Id_Segment
                                select new { SE.Id_Segment, SE.Cod_Segmen, DE.NomDepartamento, MU.NomMunicipio, NombreCompleto = LU.Nombres + " " + LU.Apellidos}).OrderBy(c => c.NomDepartamento).ThenBy(c => c.NomMunicipio).ThenBy(c => c.NombreCompleto);
                return JsonConvert.SerializeObject(activo);                             
            }            
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public string ObtenerAsignacionN()
        {           
            var activo = from AS in _ASIGNACION.SelectAll().ToList()
                            join MU in _MUN.SelectAll().ToList() on AS.IDMUNIC equals MU.CodMunicipio
                            join DE in _DEPT.SelectAll().ToList() on MU.CodDepartamento equals DE.CodDepartamento
                            join LU in _LUSU.SelectAll().ToList() on AS.UsuarioId equals LU.UsuarioId
                            join SE in _SEG.SelectAll().ToList() on AS.IdSegmento equals SE.Id_Segment
                            select new { SE.Id_Segment, SE.Cod_Segmen, DE.NomDepartamento, MU.NomMunicipio, NombreCompleto = LU.Nombres + " " + LU.Apellidos };
            return JsonConvert.SerializeObject(activo);
        }

        public string AgregarAsignacion(string pljson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Guardado Realizado con Exito";

                PJN.DAL.Model.LATRINIDAD.AsignacionSegmento pl = JsonConvert.DeserializeObject<PJN.DAL.Model.LATRINIDAD.AsignacionSegmento>(pljson);
                _ASIGNACION.Insert(pl);
            }

            catch (Exception ex)
            {
                Retorno = ex.HResult;
                Mensaje = ex.InnerException.InnerException.Message.ToString().Replace(".\r\n", " ");
                Mensaje = Mensaje.Replace("\"", "");
                Mensaje = Mensaje.Replace("\r", "");
                Mensaje = Mensaje.Replace("\n", "");
                resultado = false;
            }

            var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
            return result;
        }

        public string EliminaAsignacion(string asignacionjson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Eliminación Realizada con Exito";
                PJN.DAL.Model.LATRINIDAD.AsignacionSegmento asignacion = _ASIGNACION.SelectByID(asignacionjson);
                _ASIGNACION.Delete(asignacion);
            }

            catch (Exception ex)
            {
                Retorno = ex.HResult;
                if (Retorno == -2146233087)
                {
                    Mensaje = "No se puede eliminar esta Categoría, porque tiene registros en sus tablas Transaccionales o de Relación";
                }
                else
                {
                    Mensaje = ex.InnerException.InnerException.Message.ToString().Replace(".\r\n", " ");
                    Mensaje = Mensaje.Replace("\"", "");
                    Mensaje = Mensaje.Replace("\r", "");
                    Mensaje = Mensaje.Replace("\n", "");
                }
                resultado = false;
            }

            var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
            return result;
        }
        
        public ActionResult _JefSubMant()
        {
            return PartialView();
        }        

        public string ActualizarJS(string jsjson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Actualizacion Realizada con Exito";
                PJN.DAL.Model.LATRINIDAD.relAsignacionPersonal vsd = JsonConvert.DeserializeObject<PJN.DAL.Model.LATRINIDAD.relAsignacionPersonal>(jsjson);
                _RJS.Update(vsd);
            }

            catch (Exception ex)
            {
                Retorno = ex.HResult;
                Mensaje = ex.Message.ToString().Replace(".\r\n", " ");
                Mensaje = Mensaje.Replace("\"", "");
                Mensaje = Mensaje.Replace("\r", "");
                Mensaje = Mensaje.Replace("\n", "");
                resultado = false;
            }
            var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
            return result;
        }

        public string AgregarJS(string jsjson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Guardado Realizado con Exito";
                PJN.DAL.Model.LATRINIDAD.relAsignacionPersonal vsc = JsonConvert.DeserializeObject<PJN.DAL.Model.LATRINIDAD.relAsignacionPersonal>(jsjson);
                _RJS.Insert(vsc);
            }

            catch (Exception ex)
            {
                Retorno = ex.HResult;
                if (ex.HResult == -2146233087)
                {
                    Mensaje = "No puede insertar un registro ya existente";
                }
                else
                {
                    Mensaje = ex.Message.ToString().Replace(".\r\n", " ");
                    Mensaje = Mensaje.Replace("\"", "");
                    Mensaje = Mensaje.Replace("\r", "");
                    Mensaje = Mensaje.Replace("\n", "");
                }

                resultado = false;
            }
            var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
            return result;
        }        

        public string eliminaJS(string sjson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Eliminación Realizada con Exito";
                PJN.DAL.Model.LATRINIDAD.relAsignacionPersonal vsc = _RJS.SelectByID(sjson);
                _RJS.Delete(vsc);
            }

            catch (Exception ex)
            {
                Retorno = ex.HResult;
                if (Retorno == -2146233087)
                { Mensaje = "No se puede eliminar este Rel, porque tiene registros en sus tablas Transaccionales o de Relación"; }
                else
                {
                    Mensaje = ex.Message.ToString().Replace(".\r\n", " ");
                    Mensaje = Mensaje.Replace("\"", "");
                    Mensaje = Mensaje.Replace("\r", "");
                    Mensaje = Mensaje.Replace("\n", "");
                }
                resultado = false;
            }
            var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
            return result;
        }

        public string eliminatablarel(string tabla, string Id, string Id2, string Id3 = "NULL")
        {
            int Retorno = -1;
            string Mensaje = "Ocurrio un error no controlado";
            bool resultado = RelEliminar(tabla, Id, Id2, Id3, out Retorno, out Mensaje);
            var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
            return result;
        }
 
        public ActionResult _CodificarTrazas()
        {
            //JObject JObjDatosUsuario = JObject.Parse(JsonConvert.SerializeObject(session["usuario"]));
            var sRol = SessionHelper.GetItem<PJN.DAL.Model.Utilisatrice>(session).Rol; //JObjDatosUsuario["Rol"].Value<string>();
            var sUsuario = SessionHelper.GetItem<PJN.DAL.Model.Utilisatrice>(session).UsuarioId; //JObjDatosUsuario["UsuarioId"].Value<string>();
            if (sRol != "Coordinador" ) {
                var activo = (from AS in _ASIGNACION.SelectAll().Where(c => c.UsuarioId == sUsuario).Select(c => new { c.IDMUNIC }).ToList()
                              join MU in _MUN.SelectAll().Select(c => new { c.CodMunicipio, c.CodDepartamento}).ToList() on AS.IDMUNIC equals MU.CodMunicipio
                              join DE in _DEPT.SelectAll().ToList() on MU.CodDepartamento equals DE.CodDepartamento
                              select DE).Distinct().ToList();
                ViewBag.departamento = activo;
                ViewBag.Atiende = "Filtrado";
            }
            else { ViewBag.departamento = _DEPT.SelectAll().OrderBy(c => c.NomDepartamento).ToList(); }
            ViewBag.CenEnc = _CENENC.SelectAll().Where(c=> c.Activo== true).ToList();
            List<SelectListItem> Nacidoen = new List<SelectListItem>();
            Nacidoen.Add(new SelectListItem { Text = "", Value = "" });
            Nacidoen.Add(new SelectListItem { Text = "Nicaragua", Value = "-01" });
            Nacidoen.Add(new SelectListItem { Text = "Extranjero", Value = "-03" });
            ViewBag.Nacidoen = Nacidoen;


            //ProcessStartInfo startinfo = new ProcessStartInfo();
            //startinfo.FileName = @"C:\Program Files (x86)\CSPro 7.7\CSPro.exe";
            ////startinfo.Arguments = "arg1 arg2";
            //startinfo.CreateNoWindow = true;
            //startinfo.UseShellExecute = false;
            //Process myProcess = Process.Start(startinfo);

            ////Process programa = null;
            ////ProcessStartInfo info = null;
            ////info = new ProcessStartInfo(«ruta.exe»);
            ////programa = Process.Start(info);
            ////System.Diagnostics.Process.Start(@"C:\ejemplo\ejemplo\ejemplo\ejemplo.exe");
            ////System.Diagnostics.Process.Start(@"C:\Program Files (x86)\CSPro 7.7\CSPro.exe");
            ////System.Diagnostics.Process.Start("notepad.exe");
            ////p.StartInfo.FileName = @"notepad.exe";
            ////System.Diagnostics.Process.Start("iexplore.exe", "http://www.google.es");
            //System.Diagnostics.Process p = new System.Diagnostics.Process();
            //p.StartInfo.FileName = @"C:\Program Files (x86)\CSPro 7.7\CSPro.exe";
            //p.Start();
            ////p.WaitForExit();
            ////Process.Start("notepad.exe");
            return PartialView();
        }

        public string ObtenerNaceNacionalExtranjero(string Variable)
        {
            var listanace = _Var.SearchFor(x => x.VariableId == Variable).Select(x => new { x.Cadena });
            var cadena = listanace.FirstOrDefault().Cadena.ToString();
            return cadena;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public string ObtenerVariableControl(string variableId)
        {   
            var Resultado = _VAR.SearchFor(c => c.VariableId == variableId).ToList();
            return JsonConvert.SerializeObject(Resultado);
        }

        public string GuardarCodificacionTrazas(string Tabla, string Variable, string Clasificacion, string Ids, string Variable2="NULL", string Clasificacion2="NULL", string Variable3 = "NULL", string Clasificacion3 = "NULL")
        {
            //JObject JObjDatosUsuario = JObject.Parse(JsonConvert.SerializeObject(session["usuario"]));
            var sUsuario = SessionHelper.GetItem<PJN.DAL.Model.Utilisatrice>(session).UsuarioId; //JObjDatosUsuario["UsuarioId"].Value<string>();
            int Retorno = -1;
            string Mensaje = "Ocurrio un error no controlado";
            bool resultado = GuardaTrazasCodificadas(sUsuario, Tabla, Variable, Variable2, Variable3, Clasificacion, Clasificacion2, Clasificacion3, Ids, out Retorno, out Mensaje);
            var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
            return result;
        }

        private bool GuardaTrazasCodificadas(string Usuario, string Tabla, string Variable, string Variable2, string Variable3, string Clasificacion, string Clasificacion2, string Clasificacion3, string Ids, out int Retorno, out string Mensaje)
        {
            try
            {
                Retorno = -1;
                Mensaje = "Ocurrio un error no controlado";
                string sqlCommand = "EXECUTE [sde].[CodificaTrazasVariable] @usuario, @tabla, @variable, @variable2, @variable3, @clasificacion, @clasificacion2, @clasificacion3, @Ids, @Retorno OUTPUT, @Mensaje OUTPUT";
                List<SqlParameter> parametros = new List<SqlParameter>();
                SqlParameter pUsuario = new SqlParameter("@usuario", System.Data.SqlDbType.NVarChar, 25);
                pUsuario.Value = Usuario;
                parametros.Add(pUsuario);
                SqlParameter pTabla = new SqlParameter("@tabla", System.Data.SqlDbType.NVarChar, 50);
                pTabla.Value = Tabla;
                parametros.Add(pTabla);
                SqlParameter pVariable = new SqlParameter("@variable", System.Data.SqlDbType.NVarChar, 50);
                pVariable.Value = Variable;
                parametros.Add(pVariable);
                SqlParameter pVariable2 = new SqlParameter("@variable2", System.Data.SqlDbType.NVarChar, 50);
                pVariable2.Value = Variable2;
                parametros.Add(pVariable2);
                SqlParameter pVariable3 = new SqlParameter("@variable3", System.Data.SqlDbType.NVarChar, 50);
                pVariable3.Value = Variable3;
                parametros.Add(pVariable3);
                SqlParameter pClasificacion = new SqlParameter("@clasificacion", System.Data.SqlDbType.NVarChar, 50);
                pClasificacion.Value = Clasificacion;
                parametros.Add(pClasificacion);
                SqlParameter pClasificacion2 = new SqlParameter("@clasificacion2", System.Data.SqlDbType.NVarChar, 50);
                if (Clasificacion2 == "NULL") { pClasificacion2.Value = DBNull.Value; }
                else { pClasificacion2.Value = Clasificacion2; }
                parametros.Add(pClasificacion2);
                SqlParameter pClasificacion3 = new SqlParameter("@clasificacion3", System.Data.SqlDbType.NVarChar, 50);
                if (Clasificacion3 == "NULL") { pClasificacion3.Value = DBNull.Value; }
                else { pClasificacion3.Value = Clasificacion3; }
                parametros.Add(pClasificacion3);
                SqlParameter pIds = new SqlParameter("@Ids", System.Data.SqlDbType.NVarChar, -1);
                pIds.Value = Ids;
                parametros.Add(pIds);
                SqlParameter pRetorno = new SqlParameter("@Retorno", SqlDbType.Int);
                pRetorno.Direction = ParameterDirection.Output;
                parametros.Add(pRetorno);
                SqlParameter pMensaje = new SqlParameter("@Mensaje", SqlDbType.NVarChar, 1024);
                pMensaje.Direction = ParameterDirection.Output;
                parametros.Add(pMensaje);
                SqlParameter[] oParametros = parametros.ToArray();
                db.Database.ExecuteSqlCommand(sqlCommand, oParametros);
                Retorno = Convert.ToInt32(pRetorno.Value);
                Mensaje = Convert.ToString(pMensaje.Value);
                if (Retorno == 0) return true;
                else return false;
            }
            catch (Exception ex)
            {
                Retorno = ex.HResult;
                Mensaje = ex.Message.ToString().Replace(".\r\n", " ");
                Mensaje = Mensaje.Replace("\"", "");
                Mensaje = Mensaje.Replace("\r", "");
                Mensaje = Mensaje.Replace("\n", "");
                return false;
            }
        }

        public string GuardarTodosAsignaSegmentoMunicipio(string UsuarioId, string AsignoId, string IDMUNIC, int CenEnc)
        {
            int Retorno = -1;
            string Mensaje = "Ocurrio un error no controlado";
            bool resultado = GuardaAsignaTodosSegmentosMunicipio(UsuarioId, AsignoId, IDMUNIC, CenEnc, out Retorno, out Mensaje);
            var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
            return result;
        }

        private bool GuardaAsignaTodosSegmentosMunicipio(string UsuarioId, string AsignoId, string IDMUNIC, int CenEnc, out int Retorno, out string Mensaje)
        {
            try
            {
                Retorno = -1;
                Mensaje = "Ocurrio un error no controlado";
                string sqlCommand = "EXECUTE [sde].[InsertaAsignaTodosSegmentosMunicipio] @UsuarioId, @AsignoId, @IDMUNIC, @CenEnc, @Retorno OUTPUT, @Mensaje OUTPUT";
                List<SqlParameter> parametros = new List<SqlParameter>();
                SqlParameter pUsuario = new SqlParameter("@UsuarioId", System.Data.SqlDbType.VarChar, 15);
                pUsuario.Value = UsuarioId;
                parametros.Add(pUsuario);
                SqlParameter pTabla = new SqlParameter("@AsignoId", System.Data.SqlDbType.VarChar, 15);
                pTabla.Value = AsignoId;
                parametros.Add(pTabla);
                SqlParameter pTablass = new SqlParameter("@IDMUNIC", System.Data.SqlDbType.VarChar, 4);
                pTablass.Value = IDMUNIC;
                parametros.Add(pTablass); 
                SqlParameter pVariable = new SqlParameter("@CenEnc", System.Data.SqlDbType.Int);
                pVariable.Value = CenEnc;
                parametros.Add(pVariable);               
                SqlParameter pRetorno = new SqlParameter("@Retorno", SqlDbType.Int);
                pRetorno.Direction = ParameterDirection.Output;
                parametros.Add(pRetorno);
                SqlParameter pMensaje = new SqlParameter("@Mensaje", SqlDbType.NVarChar, 1024);
                pMensaje.Direction = ParameterDirection.Output;
                parametros.Add(pMensaje);
                SqlParameter[] oParametros = parametros.ToArray();
                db.Database.ExecuteSqlCommand(sqlCommand, oParametros);
                Retorno = Convert.ToInt32(pRetorno.Value);
                Mensaje = Convert.ToString(pMensaje.Value);
                if (Retorno == 0) return true;
                else return false;
            }
            catch (Exception ex)
            {
                Retorno = ex.HResult;
                Mensaje = ex.Message.ToString().Replace(".\r\n", " ");
                Mensaje = Mensaje.Replace("\"", "");
                Mensaje = Mensaje.Replace("\r", "");
                Mensaje = Mensaje.Replace("\n", "");
                return false;
            }
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public string ObtenerCatalogoFiltro(string catalogo)
        {
            int Retorno = -1;
            string Mensaje = "Ocurrio un error no controlado";
            var resultado = spObtenerListaCatalogo(catalogo, out Retorno, out Mensaje);
            return resultado;
        }

        public string spObtenerListaCatalogo(string catalogo, out int Retorno, out string Mensaje)
        {
            try
            {
                Retorno = -1;
                Mensaje = "Ocurrio un error no controlado";
                GenericRepository<string> cnn = new GenericRepository<string>(new PJNDbContext());
                string sqlCommand = "sde.listaCatalogos @catalogo, @Retorno OUTPUT, @Mensaje OUTPUT";
                List<SqlParameter> parametros = new List<SqlParameter>();
                SqlParameter pUsuario = new SqlParameter("@catalogo", System.Data.SqlDbType.NVarChar, 50);
                pUsuario.Value = catalogo;
                parametros.Add(pUsuario);                
                SqlParameter pRetorno = new SqlParameter("@Retorno", SqlDbType.Int);
                pRetorno.Direction = ParameterDirection.Output;
                parametros.Add(pRetorno);
                SqlParameter pMensaje = new SqlParameter("@Mensaje", SqlDbType.NVarChar, 1024);
                pMensaje.Direction = ParameterDirection.Output;
                parametros.Add(pMensaje);
                SqlParameter[] oParametros = parametros.ToArray();
                var result = cnn.ExecStoreProcedure(sqlCommand, oParametros).FirstOrDefault();
                Retorno = Convert.ToInt32(pRetorno.Value);
                Mensaje = Convert.ToString(pMensaje.Value);
                if (Retorno == 0) return result;
                else return string.Empty;
            }
            catch (Exception ex)
            {
                Retorno = ex.HResult;
                Mensaje = ex.Message.ToString().Replace(".\r\n", " ");
                Mensaje = Mensaje.Replace("\"", "");
                Mensaje = Mensaje.Replace("\r", "");
                Mensaje = Mensaje.Replace("\n", "");
                return "[]";
            }
        }

        public ActionResult _ListaCatalogoFiltro()
        {
            return PartialView();
        }

        public ActionResult _ListaPreguntaMigracionProfesion()
        {
            return PartialView();
        }

        public ActionResult _ListaPreguntaMigracionPais()
        {
            return PartialView();
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public string ObtenerPreguntaListaGenerico(string Pregunta, string Dep, string Mun, string Seg)
        {
            int Retorno = -1;
            string Mensaje = "Ocurrio un error no controlado";
            var resultado = spObtenerListaGenerico(Pregunta, Dep, Mun, Seg, out Retorno, out Mensaje);
            return resultado;
        }

        public string spObtenerListaGenerico(string Pregunta, string Dep, string Mun, string Seg, out int Retorno, out string Mensaje)
        {
            try
            {
                Retorno = -1;
                Mensaje = "Ocurrio un error no controlado";
                GenericRepository<string> cnn = new GenericRepository<string>(new PJNDbContext());
                string sqlCommand = "sde.listaPreguntaFiltroGenerico @pregunta, @departamento, @municipio, @segmento, @Retorno OUTPUT, @Mensaje OUTPUT";
                List<SqlParameter> parametros = new List<SqlParameter>();
                SqlParameter pPregunta = new SqlParameter("@pregunta", System.Data.SqlDbType.NVarChar, 50);
                pPregunta.Value = Pregunta;
                parametros.Add(pPregunta);
                SqlParameter pUsuario = new SqlParameter("@departamento", System.Data.SqlDbType.NVarChar, 2);
                pUsuario.Value = Dep;
                parametros.Add(pUsuario);
                SqlParameter pTabla = new SqlParameter("@municipio", System.Data.SqlDbType.NVarChar, 4);
                pTabla.Value = Mun;
                parametros.Add(pTabla);
                SqlParameter pVariable = new SqlParameter("@segmento", System.Data.SqlDbType.NVarChar, 9);
                pVariable.Value = Seg;
                parametros.Add(pVariable);
                SqlParameter pRetorno = new SqlParameter("@Retorno", SqlDbType.Int);
                pRetorno.Direction = ParameterDirection.Output;
                parametros.Add(pRetorno);
                SqlParameter pMensaje = new SqlParameter("@Mensaje", SqlDbType.NVarChar, 1024);
                pMensaje.Direction = ParameterDirection.Output;
                parametros.Add(pMensaje);
                SqlParameter[] oParametros = parametros.ToArray();
                var result = cnn.ExecStoreProcedure(sqlCommand, oParametros).FirstOrDefault();
                Retorno = Convert.ToInt32(pRetorno.Value);
                Mensaje = Convert.ToString(pMensaje.Value);
                if (Retorno == 0)
                {
                    if (result != null) return result;
                    else return "[]";
                }

                else return string.Empty;
            }
            catch (Exception ex)
            {
                Retorno = ex.HResult;
                Mensaje = ex.Message.ToString().Replace(".\r\n", " ");
                Mensaje = Mensaje.Replace("\"", "");
                Mensaje = Mensaje.Replace("\r", "");
                Mensaje = Mensaje.Replace("\n", "");
                return "[]";
            }
        }

        public ActionResult _ListaPreguntaCaracteristicaPersonaTrabajo()
        {
            return PartialView();
        }

        public ActionResult _ListaPreguntaCaracteristicaPersonaDedicaEstablecimiento()
        {
            return PartialView();
        }

        public ActionResult _ListaPreguntaCaracteristicaPersonaNaceExtranjero()
        {
            return PartialView();
        }

        public ActionResult _ListaPreguntaCaracteristicaPersonaNaceExtranjeroFive()
        {
            return PartialView();
        }

        public ActionResult _NaceExtranjero()
        {
            ViewBag.pais = _CP.SelectAll().ToList();
            return PartialView();
        }

        public ActionResult _ListaPreguntaCaracteristicaPersonaNaceNacional()
        {
            return PartialView();
        }

        public ActionResult _ListaPreguntaCaracteristicaPersonaNaceNacionalFive()
        {
            return PartialView();
        }

        public ActionResult _NaceNacional()
        {
            ViewBag.departamento = _DEPT.SelectAll().ToList();
            return PartialView();
        }

        public ActionResult _ListaPreguntaEconomicoActividadMunicipio()
        {
            return PartialView();
        }

        public ActionResult _ListaPreguntaEconomicoActividadEstEmpHog()
        {
            return PartialView();
        }

        public ActionResult _EconomicaActividadMunicipio()
        {
            ViewBag.mun = _MUN.SelectAll().ToList();
            return PartialView();
        }
        
        public ActionResult _ListaActividadAgropecuariaHogar()
        {
            return PartialView();
        }

        public ActionResult _ActividadAgropecuariaMunComCom()
        {
            ViewBag.mun = _MUN.SelectAll().ToList();
            return PartialView();
        }

        public ActionResult _ListaCaracteristicaPersonaCarrera()
        {
            return PartialView();
        }        

        private bool RelEliminar(string StringTabla, string StringId, string StringId2, string StringId3, out int Retorno, out string Mensaje)
        {
            try
            {
                Retorno = -1;
                Mensaje = "Ocurrio un error no controlado";
                string sqlCommand = "EXECUTE [dbo].[spEliminarRelacion] @Tabla, @Id, @Id2, @Id3, @Retorno OUTPUT, @Mensaje OUTPUT";
                List<SqlParameter> parametros = new List<SqlParameter>();
                SqlParameter pTabla = new SqlParameter("@Tabla", System.Data.SqlDbType.NVarChar, 100);
                pTabla.Value = StringTabla;
                parametros.Add(pTabla);
                SqlParameter pId = new SqlParameter("@Id", System.Data.SqlDbType.NVarChar, 100);
                pId.Value = StringId;
                parametros.Add(pId);
                SqlParameter pId2 = new SqlParameter("@Id2", System.Data.SqlDbType.NVarChar, 100);
                pId2.Value = StringId2;
                parametros.Add(pId2);
                SqlParameter pId3 = new SqlParameter("@Id3", System.Data.SqlDbType.NVarChar, 100);
                pId3.Value = StringId3;
                parametros.Add(pId3);
                SqlParameter pRetorno = new SqlParameter("@Retorno", SqlDbType.Int);
                pRetorno.Direction = ParameterDirection.Output;
                parametros.Add(pRetorno);
                SqlParameter pMensaje = new SqlParameter("@Mensaje", SqlDbType.NVarChar, 1024);
                pMensaje.Direction = ParameterDirection.Output;
                parametros.Add(pMensaje);
                SqlParameter[] oParametros = parametros.ToArray();
                db.Database.ExecuteSqlCommand(sqlCommand, oParametros);
                Retorno = Convert.ToInt32(pRetorno.Value);
                Mensaje = Convert.ToString(pMensaje.Value);
                if (Retorno == 0) return true;
                else return false;
            }
            catch (Exception ex)
            {
                Retorno = ex.HResult;
                Mensaje = ex.Message.ToString().Replace(".\r\n", " ");
                Mensaje = Mensaje.Replace("\"", "");
                Mensaje = Mensaje.Replace("\r", "");
                Mensaje = Mensaje.Replace("\n", "");
                return false;
            }
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public string BuscarPor(string DetalleSeleccion, string Dep, string Mun, string Seg)
        {
            if (String.IsNullOrWhiteSpace(DetalleSeleccion))
            {
                var activo = (from AS in _CEPOV.SelectAll().Where(c => c.s1_q2 == Dep && c.s1_q3 == Mun && c.s1_q5 == Seg).OrderByDescending(c => c.last_edited_date).Distinct().ToList()
                              join MU in _S7CP.SelectAll().Where(c => c.s07p23 != null && c.s07p23cod == null).OrderByDescending(c => c.last_edited_date).ToList() on AS.OBJECTID equals MU.OBJECTID
                              select MU).Distinct();
                return JsonConvert.SerializeObject(activo);
            }
            else
            {
                if (DetalleSeleccion.Length > 0)
                {
                    var SearchValues = DetalleSeleccion.ToUpper().Split(" ".ToCharArray());
                    var q = PredicateBuilder.True<SECTION7_CARAT_PERSONS>();
                    foreach (var value in SearchValues)
                        q = q.And(x => x.s07p23.ToUpper().Contains(value.ToUpper()));

                    var All = _S7CP.SelectAll().Where(c => c.s07p23 != null && c.s07p23cod == null).OrderByDescending(c => c.last_edited_date);
                    var Paginado = All.AsExpandable().Where(q).ToList();
                    var resultado = (from AS in _CEPOV.SelectAll().Where(c => c.s1_q2 == Dep && c.s1_q3 == Mun && c.s1_q5 == Seg).OrderByDescending(c => c.last_edited_date).Distinct().ToList()
                                     join MU in Paginado on AS.OBJECTID equals MU.OBJECTID
                                     select MU).Distinct();
                    resultado = resultado.OrderByDescending(x => x.s07_nombre).ToList();
                    //resultado = resultado.OrderByDescending(x => x.Equipo).ThenBy(n => n.Categoria).ToList();

                    return JsonConvert.SerializeObject(resultado);
                }
                else { return string.Empty; }
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public string obtenerTest(int[] JsonCierre)
        {
            var ls = JsonCierre;
            var name = "Foo";
            var some = db.SECTION7_CARAT_PERSONS.Where(x => ls.Contains(x.OBJECTID)).ToList();
            some.ForEach(a =>
            {
                a.s07p23 = name;
                a.s07p23cod = a.OBJECTID;
            }
            );
            db.SaveChanges();

            var activo = (from AS in _CEPOV.SelectAll().Where(c => c.s1_q2 == "25" && c.s1_q3 == "2525" && c.s1_q5 == "252510014").OrderByDescending(c => c.last_edited_date).Distinct().ToList()
                          join MU in _S7CP.SelectAll().Where(c => c.s07p23 != null && c.s07p23cod == null).OrderByDescending(c => c.last_edited_date).ToList() on AS.OBJECTID equals MU.OBJECTID
                          select MU).Distinct();
            return JsonConvert.SerializeObject(activo);
        }

        [HttpPost]
        public string AgregarArchivo(string archivojson)
        {
            try
            {
                byte[] pdf = null;
                ArchivoBinario archivo = JsonConvert.DeserializeObject<ArchivoBinario>(archivojson);

                var file = Request.Files;
                if (file.Count != 0)
                {
                    HttpPostedFileBase fileFinal = Request.Files[0];
                    pdf = ConvertToBytes(fileFinal);
                    //archivo.Archivo = pdf;                   
                    archivo.Archivo64 = Convert.ToBase64String(pdf);
                }
                _Archivo.Insert(archivo);

                //foreach (string f in file)
                //{
                //    HttpPostedFileBase fileFinal = Request.Files[f];

                //    var length = fileFinal.ContentLength;

                //    //convierte a byte
                //    byte[] binary = new byte[length];
                //    fileFinal.InputStream.Read(binary, 0, length);
                //    ArchivoBinario a = new ArchivoBinario();

                //    a.Nombre = Path.GetFileName(fileFinal.FileName);
                //    a.Extencion = Path.GetExtension(fileFinal.FileName);
                //    a.Archivo64 = Convert.ToBase64String(binary);
                //    a.Archivo64 = Convert.ToBase64String(pdf);

                //}
                ////de regreso
                //Byte[] bytes = Convert.FromBase64String(b64Str);
                //File.WriteAllBytes(path, bytes);
            }
            catch (Exception ex)
            {
                Retorno = ex.HResult;
                if (Retorno == -2146233087)
                { Mensaje = "El usuario ya existe, dirijase a la opción de Roles y asigne uno"; }
                else
                {
                    Mensaje = ex.Message.ToString().Replace(".\r\n", " ");
                    Mensaje = Mensaje.Replace("\"", "");
                    Mensaje = Mensaje.Replace("\r", "");
                    Mensaje = Mensaje.Replace("\n", "");
                }
                resultado = false;
            }
            var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
            return result;
        }

        [HttpPost]
        public FileContentResult DescargaArchivo(int Archivo, string nombre)
        {
            var listaformatos = _Archivo.SearchFor(x => x.ArchivoBinarioId == Archivo).Select(x => new { x.Archivo64 });
            var filFormatos = listaformatos.FirstOrDefault().Archivo64;
            Byte[] bytes = Convert.FromBase64String(filFormatos);
            //File.WriteAllBytes(path, bytes);            
            return File(bytes, System.Net.Mime.MediaTypeNames.Application.Pdf, nombre + ".pdf");
        }

        public byte[] ConvertToBytes(HttpPostedFileBase image)
        {
            byte[] imageBytes = null;
            BinaryReader reader = new BinaryReader(image.InputStream);
            imageBytes = reader.ReadBytes((int)image.ContentLength);
            return imageBytes;
        }

        private string jsonRetorno(int Retorno, string Mensaje, bool Resultado, string Valor = "NINGUNO")
        {
            var jsonMensaje = "{" + "\"" + "Mensaje" + "\"" + ": " + "\"" + Mensaje + "\"" + ", " + "\"" + "Retorno" + "\"" + ": " + "\"" + Retorno.ToString() + "\"" + ", " + "\"" + "Resultado" + "\"" + ": " + "\"" + Resultado.ToString().ToLower() + "\"" + ", " + "\"" + "Valor" + "\"" + ": " + Valor + "}";
            return jsonMensaje;
        }

        //public string eliminatransaccion(string scjson)
        //{
        //    using (var transaction = db.Database.BeginTransaction())
        //    {
        //        try
        //        {

        //            JObject JObjDatosUsuario = JObject.Parse(JsonConvert.SerializeObject(session["usuario"]));
        //            var sUsuario = JObjDatosUsuario["UsuarioId"].Value<string>();

        //            var ls = new int[] { 509, 851 };
        //            var name = sUsuario;

        //            var some = db.SECTION7_CARAT_PERSONS.Where(x => ls.Contains(x.OBJECTID)).ToList();
        //            some.ForEach(a =>
        //                {
        //                    a.s07p23 = name;
        //                    a.s07p23cod = a.OBJECTID;
        //                }
        //            );
        //            db.SaveChanges();

        //            //var friends = db.Friends.Where(f => idList.Contains(f.ID)).ToList();
        //            //friends.ForEach(a => a.msgSentBy = '1234');
        //            //db.SaveChanges();

        //            log_codificartrazas orderToAdd = new log_codificartrazas();
        //            {
        //                // fill required properties; don't fill primary key
        //                orderToAdd.SUsuarioId = sUsuario;
        //            }
        //            var addedOrder = db.lenincatalogo.Add(orderToAdd);
        //            db.SaveChanges();

        //            Retorno = 0;
        //            Mensaje = "Eliminación Realizada con Exito";
        //            PJN.DAL.Model.LATRINIDAD.relSupervisorCodificador vsc = _RSC.SelectByID(scjson);
        //            _RSC.Delete(vsc);
        //            transaction.Commit();

        //        }

        //        catch (Exception ex)
        //        {
        //            Retorno = ex.HResult;
        //            if (Retorno == -2146233087)
        //            { Mensaje = "No se puede eliminar este Rel, porque tiene registros en sus tablas Transaccionales o de Relación"; }
        //            else
        //            {
        //                Mensaje = ex.Message.ToString().Replace(".\r\n", " ");
        //                Mensaje = Mensaje.Replace("\"", "");
        //                Mensaje = Mensaje.Replace("\r", "");
        //                Mensaje = Mensaje.Replace("\n", "");
        //            }
        //            transaction.Rollback();
        //            resultado = false;
        //        }
        //        var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
        //        return result;
        //    }
        //}

    }
}