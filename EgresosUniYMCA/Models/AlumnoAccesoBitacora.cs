using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class AlumnoAccesoBitacora
    {
        public int AlumnoId { get; set; }
        public DateTime FechaIngreso { get; set; }
        public TimeSpan HoraIngreso { get; set; }

        public virtual Alumno Alumno { get; set; }
    }
}
