using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class ReferenciaTipo
    {
        public ReferenciaTipo()
        {
            ReferenciaProcesada = new HashSet<ReferenciaProcesada>();
        }

        public int ReferenciaTipoId { get; set; }
        public string Descripcion { get; set; }

        public virtual ICollection<ReferenciaProcesada> ReferenciaProcesada { get; set; }
    }
}
