using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class ReciboDetalle
    {
        public int ReciboId { get; set; }
        public int SucursalCajaId { get; set; }
        public DateTime FechaCancelacion { get; set; }
        public int UsuarioId { get; set; }
        public string Observaciones { get; set; }

        public virtual Usuario Usuario { get; set; }
        public virtual Recibo Recibo { get; set; }
    }
}
