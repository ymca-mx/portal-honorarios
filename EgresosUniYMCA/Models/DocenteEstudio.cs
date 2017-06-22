using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class DocenteEstudio
    {
        public DocenteEstudio()
        {
            DocenteEstudioDocumento = new HashSet<DocenteEstudioDocumento>();
        }

        public int EstudioId { get; set; }
        public int? DocenteId { get; set; }
        public string Institucion { get; set; }
        public int? OfertaEducativaTipoId { get; set; }
        public string Carrera { get; set; }
        public bool? Cedula { get; set; }
        public bool? Titulo { get; set; }
        public DateTime? Fecha { get; set; }
        public TimeSpan? Hora { get; set; }
        public int? UsuarioId { get; set; }
        public int? EstatusId { get; set; }

        public virtual ICollection<DocenteEstudioDocumento> DocenteEstudioDocumento { get; set; }
        public virtual Docente Docente { get; set; }
        public virtual OfertaEducativaTipo OfertaEducativaTipo { get; set; }
    }
}
