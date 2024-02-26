using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Nicarao.App.Models.formato
{
    public class Formato : CatalogoBase
    {
        [Key]
        public string FormacioId { get; set; }
        public string Plantilla { get; set; }
    }
}