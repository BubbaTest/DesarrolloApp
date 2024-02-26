using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace Nicarao
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));


            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/login-jquery-js").Include(
                            "~/Scripts/jquery-2.1.4/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                                                                "~/Scripts/main.js",
                                                                 //"~/Scripts/main-nicarao.js",
                                                                //"~/Scripts/filepond.js",
                                                                //"~/Scripts/filepond-plugin-file-validate-type.js",
                                                                ////"~/Scripts/filepond-plugin-get-file.js",
                                                                //"~/Scripts/filepond-plugin-get-file.min.js",
                                                                "~/Scripts/gaia_js/fnGaia.js",
                                                                //"~/Scripts/mainsol.js",
                                                                ////"~/Scripts/dexie.js",
                                                                ////"~/Scripts/Dexie.Nicaraolocal.DAL.js",
                                                                "~/Scripts/gaia_js/menu.js",
                                                                "~/Scripts/moment-with-locales.min.js",
                                                                "~/Scripts/moment.min.js"
                                                                // "~/Scripts/Calendar-csj.js"
                                                                 ));


            ////bundles.Add(new ScriptBundle("~/bundles/metro").Include("~/Scripts/metro.js"));

            ////bundles.Add(new ScriptBundle("~/bundles/login-metro-js").Include("~/Scripts/metro.js"));

            ////bundles.Add(new ScriptBundle("~/bundles/template").Include(
            ////                            "~/Scripts/metro.js"));
            bundles.Add(new ScriptBundle("~/bundles/template").Include(
                    "~/Scripts/umd/popper.js",
                    "~/Scripts/bootstrap.js",                    
                    "~/Scripts/bootstrap-datepicker.js",
                    "~/Scripts/bootstrap-datepicker.es.js"
                    ));

            bundles.Add(new ScriptBundle("~/bundles/inputmask").Include(
                                                                        "~/Scripts/jquery.inputmask/jquery.inputmask.bundle.js"
                                                                        ////"~/Scripts/jquery.inputmask/inputmask.*"
                                                                        ////, "~/Scripts/jquery.inputmask/jquery.inputmask.min.js"//,"~/Scripts/jquery.inputmask/phone-codes/phone.min.js"
                                                                        ));

            bundles.Add(new ScriptBundle("~/bundles/select2").Include("~/Scripts/select2.js",
                                                                     "~/Scripts/es.js"));

            bundles.Add(new ScriptBundle("~/bundles/tooltip").Include("~/Scripts/tipped.js"));

            bundles.Add(new ScriptBundle("~/bundles/alertify").Include(
                        "~/Scripts/alertify.js"));

            bundles.Add(new ScriptBundle("~/bundles/datatables").Include(
                        "~/Scripts/jquery.base64.js",
                        "~/Scripts/DataTables/jquery.dataTables.js",
                        "~/Scripts/DataTables/jquery.dataTables.min.js",
                        ////"~/Scripts/DataTables/dataTables.bootstrap4.min.js",
                        "~/Scripts/DataTables/dataTables.select.min.js",
                        "~/Scripts/DataTables/dataTables.buttons.min.js",
                        "~/Scripts/DataTables/dataTables.responsive.min.js",
                        "~/Scripts/DataTables/responsive.bootstrap4.min.js",
                        "~/Scripts/DataTables/buttons.flash.min.js",
                        "~/Scripts/DataTables/jszip.min.js",
                        "~/Scripts/DataTables/pdfmake.min.js",
                        "~/Scripts/DataTables/vfs_fonts.js",
                        "~/Scripts/DataTables/buttons.html5.min.js",
                        "~/Scripts/DataTables/buttons.print.min.js"));

            //bundles.Add(new ScriptBundle("~/bundles/ckeditor").Include("~/Scripts/ckeditor/ckeditor.js"));

            //bundles.Add(new ScriptBundle("~/bundles/tools/calendar").Include(
            //    ////"~/Scripts/fullcalendar-3.9.0/lib/jquery.min.js",
            //    "~/Scripts/fullcalendar-3.9.0/lib/moment.min.js",
            //    "~/Scripts/fullcalendar-3.9.0/fullcalendar.min.js",
            //    "~/Scripts/fullcalendar-3.9.0/scheduler.min.js",
            //    "~/Scripts/fullcalendar-3.9.0/locale-all.js"
            //    ));

            ////bundles.Add(new StyleBundle("~/Content/css/app").Include("~/Content/app/Layout.css"));
            bundles.Add(new StyleBundle("~/Content/css/app").Include(
                                        "~/Content/app/Layout.css",
                                        "~/Content/app/style.css",
                                        "~/Content/Template_Master/TemplateMaster.css",
                                        //"~/Content/filepond.css",
                                        //"~/Content/css_wizard/WizzardNE.css",
                                        //"~/Content/filepond-plugin-get-file.css",
                                        "~/Content/font-awesome.css",
                                        //"~/Content/fontawesome-all.css",
                                        "~/Content/app/stylebutton.css"));


            ////bundles.Add(new StyleBundle("~/Content/css/Template_Master").Include(
            ////                          "~/Content/Template_Master/TemplateMaster.css"));

            ////bundles.Add(new StyleBundle("~/Content/css/LeninBootstrap").Include(
            ////    "~/Content/bootstrap.css",
            ////    "~/Content/bootstrap-float-label-master/bootstrap-float-label.css",
            ////    "~/Content/Template_Master/TemplateMaster.css",
            ////    "~/Content/css_wizard/WizzardNE.css",
            ////    "~/Content/font-awesome.css",
            ////    "~/Content/app/stylebutton.css",
            ////    "~/Content/sidebar.css",
            ////    "~/Content/app/StyleProject.css",
            ////    "~/Content/template-app.css",
            ////    "~/Content/datepicker.css"));

            bundles.Add(new StyleBundle("~/Content/css/login").Include("~/Content/app/signin.css"));

            //bundles.Add(new StyleBundle("~/Content/css/tools/calendar").Include(
            //                "~/Content/tools/fullcalendar-3.9.0/fullcalendar.css",
            //                //"~/Content/tools/fullcalendar-3.9.0/fullcalendar.print.min.css",
            //                "~/Content/tools/fullcalendar-3.9.0/scheduler.min.css"));


            ////lenin
            ////bundles.Add(new StyleBundle("~/Content/css/metro").Include(
            ////                            "~/Content/metro/metro.css",
            ////                            "~/Content/metro/metro-icons.css",
            ////                            "~/Content/metro/metro-responsive.css",
            ////                            "~/Content/metro/metro-schemes.css",
            ////                            "~/Content/metro/metro-colors.css"));

            ////bundles.Add(new StyleBundle("~/Content/css/template").Include(
            ////                            "~/Content/metro/metro.css",
            ////                            "~/Content/metro/metro-icons.css",
            ////                            "~/Content/metro/metro-responsive.css",
            ////                            "~/Content/metro/metro-schemes.css",
            ////                            "~/Content/metro/metro-colors.css"));


            //bundles.Add(new StyleBundle("~/Content/css/login-metro-css").Include(
            //                            "~/Content/metro/metro.css",
            //                            "~/Content/metro/metro-icons.css",
            //                            "~/Content/metro/metro-responsive.css",
            //                            "~/Content/metro/metro-schemes.css",
            //                            "~/Content/metro/metro-colors.css"));

            bundles.Add(new StyleBundle("~/Content/css/template").Include(
                                        "~/Content/bootstrap.css",
                                        "~/Content/bootstrap-float-label-master/bootstrap-float-label.css",
                                        "~/Content/app/StyleProject.css",
                                        ////"~/Content/font-awesome.css",
                                        ////"~/Content/fontawesome-all.css",  
                                        "~/Content/sidebar.css",
                                        "~/Content/template-app.css",
                                        "~/Content/datepicker.css"));

            bundles.Add(new StyleBundle("~/Content/css/select2").Include("~/Content/css/select2.css"));

            bundles.Add(new StyleBundle("~/Content/css/tooltip").Include("~/Content/tools/tipped.css"));

            ////bundles.Add(new StyleBundle("~/Content/css/alertify").Include("~/Content/tools/alertify.css",
            ////                                                                "~/Content/tools/themes/bootstrap.css"));
            bundles.Add(new StyleBundle("~/Content/css/alertify").Include("~/Content/alertifyjs/alertify.css",
                                                                            "~/Content/alertifyjs/themes/bootstrap.css"));

            //bundles.Add(new StyleBundle("~/Content/calendarcsj").Include("~/Content/Calendar-csj/Calendar-csj.css"));

            bundles.Add(new StyleBundle("~/Content/css/datatables").Include(
                                        "~/Content/DataTables/css/jquery.dataTables.css",
                                        "~/Content/DataTables/css/jquery.dataTables.min.css",
                                        "~/Content/DataTables/css/dataTables.bootstrap4.min.css",
                                        "~/Content/DataTables/css/responsive.bootstrap4.min.css",
                                        "~/Content/DataTables/css/select.bootstrap4.min.css",
                                        "~/Content/DataTables/css/buttons.dataTables.min.css",
                                        "~/Content/DataTables/css/buttons.bootstrap4.min.css"
                                        ));

            bundles.Add(new ScriptBundle("~/Content/css/stylebutton").Include("~/Content/app/stylebutton.css"));

        }
    }
}