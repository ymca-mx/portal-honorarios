using System;
using System.Collections.Generic;

namespace AuthServer.Models
{
    public partial class Estatus
    {
        public Estatus()
        {
            Usuario = new HashSet<Usuario>();
        }

        public int EstatusId { get; set; }
        public string Descripcion { get; set; }

        public virtual ICollection<Usuario> Usuario { get; set; }
    }
}
