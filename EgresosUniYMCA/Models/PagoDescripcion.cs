using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class PagoDescripcion
    {
        public int PagoId { get; set; }
        public string Descripcion { get; set; }

        public virtual Pago Pago { get; set; }
    }
}
