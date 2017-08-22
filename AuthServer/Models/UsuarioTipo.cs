using System;
using System.Collections.Generic;

namespace AuthServer.Models
{
    public partial class UsuarioTipo
    {
        public UsuarioTipo()
        {
            Usuario = new HashSet<Usuario>();
        }

        public int UsuarioTipoId { get; set; }
        public string Descripcion { get; set; }

        public virtual ICollection<Usuario> Usuario { get; set; }
    }
}
