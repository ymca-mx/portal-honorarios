using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class AsociacionDetalle
    {
        public int AsociacionId { get; set; }
        public string Banco { get; set; }
        public string BancoCuenta { get; set; }
        public string Moneda { get; set; }

        public virtual Asociacion Asociacion { get; set; }
    }
}
