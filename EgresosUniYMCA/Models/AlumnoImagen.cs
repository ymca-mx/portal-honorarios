using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class AlumnoImagen
    {
        public int AlumnoId { get; set; }
        public byte[] Imagen { get; set; }

        public virtual AlumnoImagenDetalle AlumnoImagenDetalle { get; set; }
        public virtual Alumno Alumno { get; set; }
    }
}
