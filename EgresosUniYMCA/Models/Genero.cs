using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class Genero
    {
        public Genero()
        {
            AlumnoDetalle = new HashSet<AlumnoDetalle>();
            DocenteDetalle = new HashSet<DocenteDetalle>();
            DocenteDetalle1 = new HashSet<DocenteDetalle1>();
            ProspectoDetalle = new HashSet<ProspectoDetalle>();
            UsuarioDetalle = new HashSet<UsuarioDetalle>();
        }

        public int GeneroId { get; set; }
        public string Descripcion { get; set; }

        public virtual ICollection<AlumnoDetalle> AlumnoDetalle { get; set; }
        public virtual ICollection<DocenteDetalle> DocenteDetalle { get; set; }
        public virtual ICollection<DocenteDetalle1> DocenteDetalle1 { get; set; }
        public virtual ICollection<ProspectoDetalle> ProspectoDetalle { get; set; }
        public virtual ICollection<UsuarioDetalle> UsuarioDetalle { get; set; }
    }
}
