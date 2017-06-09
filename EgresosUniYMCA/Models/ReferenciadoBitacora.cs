using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class ReferenciadoBitacora
    {
        public int PagoId { get; set; }
        public string ReferenciaId { get; set; }
        public DateTime FechaPago { get; set; }
        public decimal Importe { get; set; }
        public string Movimiento { get; set; }
        public int Consecutivo { get; set; }
        public DateTime FechaProcesado { get; set; }
        public TimeSpan HoraProcesado { get; set; }
    }
}
