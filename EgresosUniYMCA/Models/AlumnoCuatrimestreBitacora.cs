using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class AlumnoCuatrimestreBitacora
    {
        public int AlumnoId { get; set; }
        public int OfertaEducativaId { get; set; }
        public int Cuatrimestre { get; set; }
        public int Anio { get; set; }
        public int PeriodoId { get; set; }
        public bool? EsRegular { get; set; }
        public DateTime FechaAsignacion { get; set; }
        public TimeSpan HoraAsignacion { get; set; }
        public int UsuarioId { get; set; }
    }
}
