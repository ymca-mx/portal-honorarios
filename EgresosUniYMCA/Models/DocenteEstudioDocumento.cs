using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class DocenteEstudioDocumento
    {
        public int EstudioId { get; set; }
        public int DocuentoTipoId { get; set; }
        public string DocumentoUrl { get; set; }

        public virtual DocumentoTipo DocuentoTipo { get; set; }
        public virtual DocenteEstudio Estudio { get; set; }
    }
}
