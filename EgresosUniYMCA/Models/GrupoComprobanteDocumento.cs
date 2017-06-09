using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class GrupoComprobanteDocumento
    {
        public int GrupoComprobanteId { get; set; }
        public byte[] Documento { get; set; }

        public virtual GrupoComprobante GrupoComprobante { get; set; }
    }
}
