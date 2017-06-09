using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class PreguntaValor
    {
        public PreguntaValor()
        {
            PreguntaTipo = new HashSet<PreguntaTipo>();
        }

        public int ValorId { get; set; }
        public string Descripcion { get; set; }

        public virtual ICollection<PreguntaTipo> PreguntaTipo { get; set; }
    }
}
