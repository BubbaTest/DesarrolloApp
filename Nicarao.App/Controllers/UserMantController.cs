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

using PJN.DAL;
using PJN.DAL.Model;
using static System.Collections.Specialized.BitVector32;
using System.Reflection.Emit;
using PJN.DAL.Model.GENERAL;
using PJN.DAL.Model.LATRINIDAD;
using System.Data.Entity.Hierarchy;

namespace Nicarao.App.Controllers
{
    public class UserMantController : Controller
    {
        bool resultado = true;
        int Retorno;
        string Mensaje;

        PJNDbContext db = new PJNDbContext();

        GenericRepository<PJN.DAL.Model.GENERAL.Usuario> _USU = new GenericRepository<PJN.DAL.Model.GENERAL.Usuario>(new PJNDbContext());
        GenericRepository<PJN.DAL.Model.GENERAL.Rol> _ROL = new GenericRepository<PJN.DAL.Model.GENERAL.Rol>(new PJNDbContext());
        GenericRepository<PJN.DAL.Model.GENERAL.UsuarioRol> _UR = new GenericRepository<PJN.DAL.Model.GENERAL.UsuarioRol>(new PJNDbContext());
        GenericRepository<PJN.DAL.Model.GENERAL.SeccionFormulario> _SF = new GenericRepository<PJN.DAL.Model.GENERAL.SeccionFormulario>(new PJNDbContext());
        GenericRepository<PJN.DAL.Model.GENERAL.VariableFormulario> _VF = new GenericRepository<PJN.DAL.Model.GENERAL.VariableFormulario>(new PJNDbContext());
        GenericRepository<PJN.DAL.Model.GENERAL.relSeccionVariable> _RSV = new GenericRepository<PJN.DAL.Model.GENERAL.relSeccionVariable>(new PJNDbContext());
        GenericRepository<PJN.DAL.Model.GENERAL.VARIABLECONTROL> _VAR = new GenericRepository<PJN.DAL.Model.GENERAL.VARIABLECONTROL>(new PJNDbContext());
        GenericRepository<PJN.DAL.Model.GENERAL.catOpcion> _OPC = new GenericRepository<PJN.DAL.Model.GENERAL.catOpcion>(new PJNDbContext());
        GenericRepository<PJN.DAL.Model.GENERAL.RolOpcion> _OPCROL = new GenericRepository<PJN.DAL.Model.GENERAL.RolOpcion>(new PJNDbContext());
        GenericRepository<PJN.DAL.Model.GENERAL.catCensoEncuesta> _CENENC = new GenericRepository<PJN.DAL.Model.GENERAL.catCensoEncuesta>(new PJNDbContext());

        // GET: UserMant
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult _mttoGaia()
        {
            ViewBag.Proyecto = (System.Configuration.ConfigurationManager.AppSettings["Proyecto"] == null ? "" : System.Configuration.ConfigurationManager.AppSettings["Proyecto"].ToString());
            return PartialView();
        }

        public ActionResult ListaUsuario()
        {                      
            return PartialView();
        }

        public ActionResult ObtenerListaUsuario()
        {
            return PartialView("_ListaUsuario");
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public string ObtenerUsuario(string UsuarioId = "")
        {
            if (UsuarioId == "")
            {
                var usuario = _USU.SelectAll().ToList();
                return JsonConvert.SerializeObject(usuario);
            }
            else
            {
                var usuario = _USU.SearchFor(d => d.UsuarioId == UsuarioId).Select(c => new { c.UsuarioId, c.Nombres, c.Apellidos, c.Password, c.Correo, c.Activo}).ToList();                           
                return JsonConvert.SerializeObject(usuario);
            }
        }

        public ActionResult _UsuarioMant()
        {
            return PartialView();
        }
        
        public string AgregarUsuario(string usuariojson, HttpPostedFileBase file)
        {
            var s = "";
            try
            {
                Retorno = 0;
                Mensaje = "Guardado Realizado con Exito";
                PJN.DAL.Model.GENERAL.Usuario usuario = JsonConvert.DeserializeObject<PJN.DAL.Model.GENERAL.Usuario>(usuariojson);
                var Password = Gaia.Helpers.Encriptar.GetHashData(usuario.Password, "", "SHA1");
                usuario.Password = Password;                
                _USU.Insert(usuario);
            }

            catch (Exception ex)
            {
                Retorno = ex.HResult;
                if (Retorno == -2146233087)
                { Mensaje = "El usuario " + s + " ya existe, dirijase a la opción de Roles y asigne uno"; }
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

        public string ActualizarUsuario(string usuariojson, HttpPostedFileBase file)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Actualizacion Realizada con Exito";
                PJN.DAL.Model.GENERAL.Usuario usuario = JsonConvert.DeserializeObject<PJN.DAL.Model.GENERAL.Usuario>(usuariojson);

                PJN.DAL.Model.GENERAL.Usuario usuario_modificado = new PJN.DAL.Model.GENERAL.Usuario();
                usuario_modificado.UsuarioId = usuario.UsuarioId;
                usuario_modificado.Nombres = usuario.Nombres;
                usuario_modificado.Apellidos = usuario.Apellidos;
                usuario_modificado.Password = usuario.Password;
                usuario_modificado.Correo = usuario.Correo;
                usuario_modificado.Activo = usuario.Activo;
                
                _USU.Update(usuario_modificado, um => um.Nombres, um => um.Apellidos, um => um.Password, um => um.Correo, um => um.Activo);
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

        public ActionResult ListaRol()
        {
            return PartialView();
        }

        public ActionResult ObtenerListaRol()
        {
            return PartialView("_ListaRol");
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public string ObtenerRol(string RolId = "")
        {
            if (RolId == "")
            {
                var activo = _ROL.SelectAll().OrderBy(x => x.RolId).Select(c => new { c.RolId, c.Descripcion, c.Activo }).ToList();
                return JsonConvert.SerializeObject(activo);
            }
            else
            {
                var rol = _ROL.SearchFor(d => d.RolId == RolId).Select(c => new {c.RolId, c.Descripcion, c.Activo }).ToList();
                return JsonConvert.SerializeObject(rol);
            }
        }

        public ActionResult _RolMant()
        {
            return PartialView();
        }

        public ActionResult _ListaUsuarioR()
        {
            return PartialView();
        }

        public string eliminarelUsuarioRol(string Id, string Id2, string Id3 = "NULL")
        {
            int Retorno = -1;
            string Mensaje = "Ocurrio un error no controlado";
            bool resultado = RelEliminar("sde.relUsuarioRol", Id, Id2, Id3, out Retorno, out Mensaje);
            var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
            return result;
        }       
                
        public string ActualizarRol(string roljson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Actualizacion Realizada con Exito";
                PJN.DAL.Model.GENERAL.Rol rol = JsonConvert.DeserializeObject<PJN.DAL.Model.GENERAL.Rol>(roljson);
                _ROL.Update(rol);
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

        public string AgregarRol(string roljson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Guardado Realizado con Exito";
                PJN.DAL.Model.GENERAL.Rol rol = JsonConvert.DeserializeObject<PJN.DAL.Model.GENERAL.Rol>(roljson);
                _ROL.Insert(rol);
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

        public string eliminaRol(string roljson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Eliminación Realizada con Exito";
                PJN.DAL.Model.GENERAL.Rol rol = _ROL.SelectByID(roljson);
                _ROL.Delete(rol);
            }

            catch (Exception ex)
            {
                Retorno = ex.HResult;
                if (Retorno == -2146233087)
                { Mensaje = "No se puede eliminar este Rol, porque tiene registros en sus tablas Transaccionales o de Relación"; }
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

        [AcceptVerbs(HttpVerbs.Get)]
        public string ObtenerRelacionUsuario(string RolId)
        {            
            var activo = from AS in _UR.SelectAll().Where(c=> c.RolId==RolId).ToList()
                         join MU in _USU.SelectAll().ToList() on AS.UsuarioId equals MU.UsuarioId
                         select new { MU.UsuarioId, NombreCompleto = MU.Nombres + " " + MU.Apellidos };
            return JsonConvert.SerializeObject(activo);
        }

        public ActionResult _UsuarioRol(string rolId)
        {
            var rolusuario = _ROL.SelectByID(rolId).UsuarioRol.Select(ure => new { ure.RolId, ure.UsuarioId }).ToList();
            var vusu = _USU.SelectAll().Select(f => new { f.UsuarioId, NombreCompleto = f.Nombres + " " + f.Apellidos }).ToList();
            var usuario = (from t in vusu
                           where !(from cv in rolusuario select cv.UsuarioId).Contains(t.UsuarioId)
                           select t);

            ViewBag.RUsuario = usuario;
            return PartialView("_UsuarioR");
        }

        public string GuardarRelUsuarioRol(string reljson)
        {
            int Retorno = -1;
            string Mensaje = "Ocurrio un error no controlado";
            bool resultado = RelActualizaInserta("Inserta", "sde.relUsuarioRol", "", "", reljson, out Retorno, out Mensaje);
            var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
            return result;
        }

        public ActionResult ListaOpcAso()
        {
            return PartialView();
        }

        public ActionResult ObtenerListaOpcAso()
        {
            return PartialView("_ListaOpcAso");
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public string ObtenerOpcAso(string OpcionId = "")
        {
            if (OpcionId == "")
            {
                var opciones = _OPC.SearchFor(o => o.Nivel == 1).FirstOrDefault();

                if (opciones != null)
                {
                    var opcionesHijo = _OPC.SearchFor(oh => oh.OpcionId.IsDescendantOf(opciones.OpcionId) && oh.Nivel > 1).AsEnumerable().Select(c => new
                    {
                        OpcionId = c.OpcionId.ToString(),
                        Nivel = c.Nivel,
                        Padre = c.Padre.ToString(),
                        Opcion = c.Opcion,
                        OpcionTipo = c.OpcionTipo,
                        Mapeo = c.Mapeo,
                        DescripcionGeneral = c.DescripcionGeneral,
                        Activo = c.Activo
                    }).ToList();

                    return JsonConvert.SerializeObject(opcionesHijo);
                }
                return JsonConvert.SerializeObject("");

            }
            else
            {
                var opcion = _OPC.SelectAll().AsEnumerable().Where(x => x.OpcionId.ToString() == OpcionId).Select(c => new {
                    OpcionId = c.OpcionId.ToString(),
                    Nivel = c.Nivel,
                    Padre = c.Padre.ToString(),
                    Opcion = c.Opcion,
                    OpcionTipo = c.OpcionTipo,
                    Mapeo = c.Mapeo,
                    DescripcionGeneral = c.DescripcionGeneral,
                    Activo = c.Activo
                }).ToList();
                return JsonConvert.SerializeObject(opcion);
            }
        }

        public ActionResult _OpcAsoMant()
        {
            return PartialView();
        }   
                
        public string ActualizarOpcAso(string Id, string opcionjson)
        {
            int Retorno = -1;
            string Mensaje = "Ocurrio un error no controlado";           
            bool resultado = RelActualizaInserta("Actualiza", "sde.catOpcion", "OpcionId", Id, opcionjson, out Retorno, out Mensaje);
            var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
            return result;
        }
               
        public string AgregarOpcAso(string opcionjson)
        {
            int Retorno = -1;
            string Mensaje = "Ocurrio un error no controlado";            
            bool resultado = RelActualizaInserta("Inserta", "sde.catOpcion", "", "", opcionjson, out Retorno, out Mensaje);
            var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
            return result;
        }

        public string eliminaOpcAso(string opcionjson)
        {
            try
            {
                var sHierarchi = HierarchyId.Parse(opcionjson);
                Retorno = 0;
                Mensaje = "Eliminación Realizada con Exito";
                PJN.DAL.Model.GENERAL.catOpcion sf = _OPC.SelectByID(sHierarchi);
                _OPC.Delete(sf);
            }

            catch (Exception ex)
            {
                Retorno = ex.HResult;
                if (Retorno == -2146233087)
                { Mensaje = "No se puede eliminar esta Opción, porque tiene registros en sus tablas Transaccionales o de Relación"; }
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

        public ActionResult _OpcAsoRol(string rolId = "")
        {
            var resultado = spObtenerListaNoRelOpcionesAsociadas(rolId, out Retorno, out Mensaje);
            ViewBag.Opciones = resultado;
            return PartialView("_OpcionR");
        }

        public ICollection<NoRelRolOpcion>  spObtenerListaNoRelOpcionesAsociadas(string catalogo, out int Retorno, out string Mensaje)
        {
            List<NoRelRolOpcion> resultado = new List<NoRelRolOpcion>();
            try
            {
                Retorno = -1;
                Mensaje = "Ocurrio un error no controlado";
                GenericRepository<NoRelRolOpcion> cnn = new GenericRepository<NoRelRolOpcion>(new PJNDbContext());
                string sqlCommand = "sde.listaNoRelacionRolOpcionesAsociadas @rolid, @Retorno OUTPUT, @Mensaje OUTPUT";
                List<SqlParameter> parametros = new List<SqlParameter>();
                SqlParameter pUsuario = new SqlParameter("@rolid", System.Data.SqlDbType.VarChar, 25);
                pUsuario.Value = catalogo;
                parametros.Add(pUsuario);
                SqlParameter pRetorno = new SqlParameter("@Retorno", SqlDbType.Int);
                pRetorno.Direction = ParameterDirection.Output;
                parametros.Add(pRetorno);
                SqlParameter pMensaje = new SqlParameter("@Mensaje", SqlDbType.NVarChar, 1024);
                pMensaje.Direction = ParameterDirection.Output;
                parametros.Add(pMensaje);
                SqlParameter[] oParametros = parametros.ToArray();               
                resultado = cnn.ExecStoreProcedure(sqlCommand, oParametros).ToList();
                Retorno = Convert.ToInt32(pRetorno.Value);
                Mensaje = Convert.ToString(pMensaje.Value);
                return resultado;
            }
            catch (Exception ex)
            {
                Retorno = ex.HResult;
                Mensaje = ex.Message.ToString().Replace(".\r\n", " ");
                Mensaje = Mensaje.Replace("\"", "");
                Mensaje = Mensaje.Replace("\r", "");
                Mensaje = Mensaje.Replace("\n", "");
                return resultado;
            }
        }

        public string GuardarRelRolOpcion(string reljson)
        {
            int Retorno = -1;
            string Mensaje = "Ocurrio un error no controlado";
            bool resultado = RelActualizaInserta("Inserta", "sde.relRolOpcion", "", "", reljson, out Retorno, out Mensaje);
            var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
            return result;
        }

        public ActionResult _ListaOpcAsoR()
        {
            return PartialView();
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public string ObtenerRelacionOpcAso(string RolId)
        {
            var resultado = spObtenerListaRelOpcionesAsociadas(RolId, out Retorno, out Mensaje);
            return resultado;
        }

        public string spObtenerListaRelOpcionesAsociadas(string catalogo, out int Retorno, out string Mensaje)
        {
            try
            {
                Retorno = -1;
                Mensaje = "Ocurrio un error no controlado";
                GenericRepository<string> cnn = new GenericRepository<string>(new PJNDbContext());
                string sqlCommand = "sde.listaRelacionRolOpcionAsociada @rolid, @Retorno OUTPUT, @Mensaje OUTPUT";
                List<SqlParameter> parametros = new List<SqlParameter>();
                SqlParameter pUsuario = new SqlParameter("@rolid", System.Data.SqlDbType.VarChar, 25);
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
                //return resultado;
                return "[]";
            }
        }

        public string eliminarelOpcAsoR(string Id, string Id2, string Id3 = "NULL")
        {
            int Retorno = -1;
            string Mensaje = "Ocurrio un error no controlado";
            bool resultado = RelEliminar("sde.relRolOpcion", Id, Id2, Id3, out Retorno, out Mensaje);
            var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
            return result;
        }

        public ActionResult ListaCenEnc()
        {
            return PartialView();
        }

        public ActionResult ObtenerListaCenEnc()
        {
            return PartialView("_ListaCenEnc");
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public string ObtenerCenEnc(int Id = 0)
        {
            if (Id == 0)
            {
                var cenenc = _CENENC.SelectAll().ToList();
                return JsonConvert.SerializeObject(cenenc);
            }
            else
            {
                var cenenc = _CENENC.SearchFor(d => d.Id == Id).Select(c => new { c.Id, c.Descripcion, c.Activo}).ToList();
                return JsonConvert.SerializeObject(cenenc);
            }
        }

        public ActionResult _CenEncMant()
        {
            return PartialView();
        }

        public string ActualizarCenEnc(string cenencjson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Actualizacion Realizada con Exito";
                PJN.DAL.Model.GENERAL.catCensoEncuesta sf = JsonConvert.DeserializeObject<PJN.DAL.Model.GENERAL.catCensoEncuesta>(cenencjson);
                _CENENC.Update(sf);
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

        public string AgregarCenEnc(string cenencjson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Guardado Realizado con Exito";
                PJN.DAL.Model.GENERAL.catCensoEncuesta sf = JsonConvert.DeserializeObject<PJN.DAL.Model.GENERAL.catCensoEncuesta>(cenencjson);
                _CENENC.Insert(sf);
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

        public string eliminaCenEnc(int cenencjson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Eliminación Realizada con Exito";
                PJN.DAL.Model.GENERAL.catCensoEncuesta sf = _CENENC.SelectByID(cenencjson);
                _CENENC.Delete(sf);
            }

            catch (Exception ex)
            {
                Retorno = ex.HResult;
                if (Retorno == -2146233087)
                { Mensaje = "No se puede eliminar este Censo/Encuesta, porque tiene registros en sus tablas Transaccionales o de Relación"; }
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

        public ActionResult _mttoEncuesta()
        {
            List<SelectListItem> clasificacion = new List<SelectListItem>();
            clasificacion.Add(new SelectListItem { Text = "", Value = "" });
            clasificacion.Add(new SelectListItem { Text = "Persona", Value = "P" });
            clasificacion.Add(new SelectListItem { Text = "Edificación", Value = "E" });
            ViewBag.clasificacion = clasificacion;
            ViewBag.CenEnc = _CENENC.SelectAll().ToList();
            return PartialView();
        }

        public ActionResult ListaSeccion()
        {
            ViewBag.CenEnc = _CENENC.SelectAll().ToList();
            return PartialView();
        }

        public ActionResult ObtenerListaSeccion()
        {
            return PartialView("_ListaSeccion");
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public string ObtenerSeccion(string SeccionId = "")
        {
            if (SeccionId == "")
            {
                var activo = from AS in _SF.SelectAll().ToList().OrderBy(c => c.CenEnc).ThenBy(c => c.SeccionId)
                             join MU in _CENENC.SelectAll().ToList() on AS.CenEnc equals MU.Id
                    select new { AS.SeccionId, AS.Descripcion, AS.Activo, CenEnc = MU.Descripcion, AS.relGUID };               
                return JsonConvert.SerializeObject(activo);
            }
            else
            {
                var seccion = _SF.SearchFor(d => d.relGUID.ToString() == SeccionId).Select(c => new { c.SeccionId, c.Descripcion, c.Activo, c.CenEnc, c.relGUID }).ToList();
                return JsonConvert.SerializeObject(seccion);
            }
        }

        public ActionResult _SeccionMant()
        {
            return PartialView();
        }

        public string ActualizarSeccion(string seccionjson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Actualizacion Realizada con Exito";
                PJN.DAL.Model.GENERAL.SeccionFormulario sf = JsonConvert.DeserializeObject<PJN.DAL.Model.GENERAL.SeccionFormulario>(seccionjson);
                _SF.Update(sf);
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

        public string AgregarSeccion(string seccionjson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Guardado Realizado con Exito";
                PJN.DAL.Model.GENERAL.SeccionFormulario sf = JsonConvert.DeserializeObject<PJN.DAL.Model.GENERAL.SeccionFormulario>(seccionjson);
                _SF.Insert(sf);
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

        public string eliminaSeccion(Guid seccionjson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Eliminación Realizada con Exito";
                PJN.DAL.Model.GENERAL.SeccionFormulario sf = _SF.SelectByID(seccionjson);
                _SF.Delete(sf);
            }

            catch (Exception ex)
            {
                Retorno = ex.HResult;
                if (Retorno == -2146233087)
                { Mensaje = "No se puede eliminar esta Sección, porque tiene registros en sus tablas Transaccionales o de Relación"; }
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

        public ActionResult ListaVariable()
        {
            List<SelectListItem> clasificacion = new List<SelectListItem>();
            clasificacion.Add(new SelectListItem { Text = "", Value = "" });
            clasificacion.Add(new SelectListItem { Text = "Persona", Value = "P" });
            clasificacion.Add(new SelectListItem { Text = "Edificación", Value = "E" });
            ViewBag.clasificacion = clasificacion;
            ViewBag.CenEnc = _CENENC.SelectAll().ToList();
            return PartialView();
        }

        public ActionResult ObtenerListaVariable()
        {
            return PartialView("_ListaVariable");
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public string ObtenerVariable(string VariableId = "")
        {
            if (VariableId == "")
            {
                var activo = from AS in _VF.SelectAll().ToList()
                             join MU in _CENENC.SelectAll().ToList() on AS.CenEnc equals MU.Id
                             select new { AS.VariableId, AS.Descripcion, AS.Activo, AS.Clasificacion, CenEnc = MU.Descripcion };
                return JsonConvert.SerializeObject(activo);
            }
            else
            {
                var vf = _VF.SearchFor(d => d.VariableId == VariableId).Select(c => new { c.VariableId, c.Descripcion, c.Activo, c.Clasificacion, c.CenEnc }).ToList();
                return JsonConvert.SerializeObject(vf);
            }
        }

        public ActionResult _VariableMant()
        {
            List<SelectListItem> clasificacion = new List<SelectListItem>();
            clasificacion.Add(new SelectListItem { Text = "", Value = "" });
            clasificacion.Add(new SelectListItem { Text = "Persona", Value = "P" });
            clasificacion.Add(new SelectListItem { Text = "Edificación", Value = "E" });
            ViewBag.clasificacion = clasificacion;
            return PartialView();
        }

        public ActionResult _ListaSeccionR()
        {
            return PartialView();
        }

        public string eliminarelSeccionVariable(string Id, string Id2, string Id3 = "NULL")
        {
            int Retorno = -1;
            string Mensaje = "Ocurrio un error no controlado";
            bool resultado = RelEliminar("sde.relSeccionVariable", Id, Id2, Id3, out Retorno, out Mensaje);
            var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
            return result;
        }

        public string ActualizarVariable(string variablejson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Actualizacion Realizada con Exito";
                PJN.DAL.Model.GENERAL.VariableFormulario vf = JsonConvert.DeserializeObject<PJN.DAL.Model.GENERAL.VariableFormulario>(variablejson);
                _VF.Update(vf);
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

        public string AgregarVariable(string variablejson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Guardado Realizado con Exito";
                PJN.DAL.Model.GENERAL.VariableFormulario vf = JsonConvert.DeserializeObject<PJN.DAL.Model.GENERAL.VariableFormulario>(variablejson);
                _VF.Insert(vf);
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

        public string eliminaVariable(string variablejson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Eliminación Realizada con Exito";
                PJN.DAL.Model.GENERAL.VariableFormulario vf = _VF.SelectByID(variablejson);
                _VF.Delete(vf);
            }

            catch (Exception ex)
            {
                Retorno = ex.HResult;
                if (Retorno == -2146233087)
                { Mensaje = "No se puede eliminar esta Variable, porque tiene registros en sus tablas Transaccionales o de Relación"; }
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

        [AcceptVerbs(HttpVerbs.Get)]
        public string ObtenerRelacionSegmento(string VariableId)
        {
            var activo = from AS in _RSV.SelectAll().Where(c => c.VariableId == VariableId).ToList()
                         join MU in _SF.SelectAll().ToList() on AS.SeccionId equals MU.relGUID
                         join CE in _CENENC.SelectAll().ToList() on MU.CenEnc equals CE.Id
                         select new { MU.SeccionId, Descripcion = CE.Descripcion + " / " + MU.Descripcion };
            return JsonConvert.SerializeObject(activo);
        }

        public ActionResult _SeccionVariable(string variableId, int CenEnc)
        {
            var variableseccion = _VF.SelectByID(variableId).relSeccionVariable.Select(ure => new { ure.VariableId, ure.SeccionId }).ToList();
            var vsec = from MU in _SF.SelectAll().Where(c=> c.CenEnc == CenEnc).Select(f => new { f.SeccionId, f.Descripcion, f.CenEnc, f.relGUID}).ToList()
                       join CE in _CENENC.SelectAll().ToList() on MU.CenEnc equals CE.Id
                       select new { SeccionId = MU.relGUID, Descripcion = CE.Descripcion + " / " + MU.Descripcion };
            var seccion = (from t in vsec
                           where !(from cv in variableseccion select cv.SeccionId).Contains(t.SeccionId)
                           select t);

            ViewBag.RSeccion = seccion;
            return PartialView("_SeccionR");
        }

        public string GuardarRelSeccionVariable(string reljson)
        {
            int Retorno = -1;
            string Mensaje = "Ocurrio un error no controlado";
            bool resultado = RelActualizaInserta("Inserta", "sde.relSeccionVariable", "", "", reljson, out Retorno, out Mensaje);
            var result = jsonRetorno(Retorno, Mensaje, resultado, (Retorno == 0 ? ("\"" + "EXITO" + "\"") : ("\"" + "NINGUNO" + "\"")));
            return result;
        }

        public ActionResult _mttoVariableControl()
        {
            ViewBag.CenEnc = _CENENC.SelectAll().ToList();
            return PartialView();
        }

        public ActionResult ListaVariableControl()
        {
            ViewBag.CenEnc = _CENENC.SelectAll().ToList();
            return PartialView();
        }

        public ActionResult ObtenerListaVariableControl()
        {
            return PartialView("_ListaVariableControl");
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public string ObtenerVariableControl(string VariableId = "")
        {
            if (VariableId == "")
            {
                var activo = from AS in _VAR.SelectAll().ToList()
                             join MU in _CENENC.SelectAll().ToList() on AS.CenEnc equals MU.Id
                             select new { AS.VariableId, AS.Cadena, AS.EsCatalogo, AS.Catalogo, CenEnc = MU.Descripcion, AS.Vista };                
                return JsonConvert.SerializeObject(activo);
            }
            else
            {
                var variable = _VAR.SearchFor(d => d.VariableId == VariableId).Select(c => new { c.VariableId, c.Cadena, c.EsCatalogo, c.Catalogo, c.CenEnc, c.Vista}).ToList();
                return JsonConvert.SerializeObject(variable);
            }
        }

        public string ActualizarVariableControl(string vcjson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Actualizacion Realizada con Exito";
                PJN.DAL.Model.GENERAL.VARIABLECONTROL vc = JsonConvert.DeserializeObject<PJN.DAL.Model.GENERAL.VARIABLECONTROL>(vcjson);
                _VAR.Update(vc);
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

        public string AgregarVariableControl(string vcjson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Guardado Realizado con Exito";
                PJN.DAL.Model.GENERAL.VARIABLECONTROL vc = JsonConvert.DeserializeObject<PJN.DAL.Model.GENERAL.VARIABLECONTROL>(vcjson);
                _VAR.Insert(vc);
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

        public string eliminaVariableControl(string vcjson)
        {
            try
            {
                Retorno = 0;
                Mensaje = "Eliminación Realizada con Exito";
                PJN.DAL.Model.GENERAL.VARIABLECONTROL vr = _VAR.SelectByID(vcjson);
                _VAR.Delete(vr);
            }

            catch (Exception ex)
            {
                Retorno = ex.HResult;
                if (Retorno == -2146233087)
                { Mensaje = "No se puede eliminar esta variable de control, porque tiene registros en sus tablas Transaccionales o de Relación"; }
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

        private bool RelActualizaInserta(string Origen, string StringTabla, string StringCampo, string StringId, string reljson, out int Retorno, out string Mensaje)
        {
            try
            {
                Retorno = -1;
                Mensaje = "Ocurrio un error no controlado";
                string sqlCommand;
                if (Origen == "Inserta")
                { sqlCommand = "EXECUTE [dbo].[spInsertar] @Tabla, @CampoId, @Id, @Json, @Retorno OUTPUT, @Mensaje OUTPUT"; }
                else { sqlCommand = "EXECUTE [dbo].[spActualizar] @Tabla, @CampoId, @Id, @Json, @Retorno OUTPUT, @Mensaje OUTPUT"; }
                List<SqlParameter> parametros = new List<SqlParameter>();
                SqlParameter pTabla = new SqlParameter("@Tabla", System.Data.SqlDbType.NVarChar, 100);
                pTabla.Value = StringTabla;
                parametros.Add(pTabla);
                SqlParameter pCampo = new SqlParameter("@CampoId", System.Data.SqlDbType.NVarChar, 100);
                pCampo.Value = StringCampo;
                parametros.Add(pCampo);
                SqlParameter pId = new SqlParameter("@Id", System.Data.SqlDbType.NVarChar, 20);
                pId.Value = StringId;
                parametros.Add(pId);
                SqlParameter pJson = new SqlParameter("@Json", System.Data.SqlDbType.NVarChar, -1);
                pJson.Value = reljson;
                parametros.Add(pJson);                
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

        private string jsonRetorno(int Retorno, string Mensaje, bool Resultado, string Valor = "NINGUNO")
        {
            var jsonMensaje = "{" + "\"" + "Mensaje" + "\"" + ": " + "\"" + Mensaje + "\"" + ", " + "\"" + "Retorno" + "\"" + ": " + "\"" + Retorno.ToString() + "\"" + ", " + "\"" + "Resultado" + "\"" + ": " + "\"" + Resultado.ToString().ToLower() + "\"" + ", " + "\"" + "Valor" + "\"" + ": " + Valor + "}";
            return jsonMensaje;
        }
    }
}