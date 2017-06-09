using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class GrupoAlumnoBitacora
    {
        public int AlumnoId { get; set; }
        public int GrupoId { get; set; }
        public DateTime FechaAsignacion { get; set; }
        public TimeSpan HoraAsignacion { get; set; }
        public int UsuarioId { get; set; }
    }
}
