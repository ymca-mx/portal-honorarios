using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class ReferenciaEspecial
    {
        public int ConsecutivoId { get; set; }
        public DateTime FechaPago { get; set; }
        public string ReferenciaId { get; set; }
        public decimal Importe { get; set; }
        public string Movimiento { get; set; }
    }
}
