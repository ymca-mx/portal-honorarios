using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class SistemaConfiguracion
    {
        public int ParametroId { get; set; }
        public string Parametro { get; set; }
        public string Descripcion { get; set; }
        public string Valor { get; set; }
        public int UsuarioId { get; set; }

        public virtual Usuario Usuario { get; set; }
    }
}
