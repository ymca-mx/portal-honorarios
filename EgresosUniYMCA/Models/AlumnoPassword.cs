using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class AlumnoPassword
    {
        public int AlumnoId { get; set; }
        public string Password { get; set; }

        public virtual Alumno Alumno { get; set; }
    }
}
