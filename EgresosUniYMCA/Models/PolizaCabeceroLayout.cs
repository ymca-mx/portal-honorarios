using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class PolizaCabeceroLayout
    {
        public int PolizaTipoId { get; set; }
        public int ConfiguracionId { get; set; }
        public string Descripcion { get; set; }
        public string ValorDefault { get; set; }
        public int Longitud { get; set; }
        public bool TieneEspacio { get; set; }

        public virtual PolizaTipo PolizaTipo { get; set; }
    }
}
