using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Nicarao.App.Models.formato
{
    public class Marca : CatalogoBase
    {
        [Key]
        public string MarcaId { get; set; }
    }
}