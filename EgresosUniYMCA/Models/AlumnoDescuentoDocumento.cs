using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class AlumnoDescuentoDocumento
    {
        public int AlumnoDescuentoId { get; set; }
        public byte[] AlumnoDescuentoDocumento1 { get; set; }

        public virtual AlumnoDescuento AlumnoDescuento { get; set; }
    }
}
