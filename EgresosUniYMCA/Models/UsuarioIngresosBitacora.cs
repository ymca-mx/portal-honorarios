using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class UsuarioIngresosBitacora
    {
        public int UsuarioId { get; set; }
        public DateTime FechaIngreso { get; set; }
        public TimeSpan HoraIngreso { get; set; }
        public TimeSpan HoraSalida { get; set; }
        public string TipoIngreso { get; set; }

        public virtual Usuario Usuario { get; set; }
    }
}
