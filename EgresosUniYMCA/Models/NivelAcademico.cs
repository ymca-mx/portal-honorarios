using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class NivelAcademico
    {
        public NivelAcademico()
        {
            OfertaEducativaRequerimiento = new HashSet<OfertaEducativaRequerimiento>();
        }

        public int NivelAcademicoId { get; set; }
        public string Descripcion { get; set; }
        public int EstatusId { get; set; }

        public virtual ICollection<OfertaEducativaRequerimiento> OfertaEducativaRequerimiento { get; set; }
        public virtual Estatus Estatus { get; set; }
    }
}
