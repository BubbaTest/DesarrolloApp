using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Nicarao.App.Models
{
    public class vwCamposExtendidos
    {
        [Key]
        public string Name { get; set; }
        public string Legenda { get; set; }
        public string CampoTipo { get; set; }
        public bool Requerido { get; set; }
        public string Placeholder { get; set; }
        public string Tooltip { get; set; }
        public string maxlength { get; set; }
    }
}