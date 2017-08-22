using System;
using System.Collections.Generic;

namespace AuthServer.Models
{
    public partial class Genero
    {
        public Genero()
        {
            UsuarioDetalle = new HashSet<UsuarioDetalle>();
        }

        public int GeneroId { get; set; }
        public string Descripcion { get; set; }

        public virtual ICollection<UsuarioDetalle> UsuarioDetalle { get; set; }
    }
}
