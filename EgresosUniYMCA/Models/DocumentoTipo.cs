using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class DocumentoTipo
    {
        public DocumentoTipo()
        {
            DocenteEstudioDocumento = new HashSet<DocenteEstudioDocumento>();
        }

        public int DocumentoTipoId { get; set; }
        public string Descripcion { get; set; }

        public virtual ICollection<DocenteEstudioDocumento> DocenteEstudioDocumento { get; set; }
    }
}
