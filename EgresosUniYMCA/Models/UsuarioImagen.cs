using System;
using System.Collections.Generic;

namespace EgresosUniYMCA.Models
{
    public partial class UsuarioImagen
    {
        public int UsuarioId { get; set; }
        public byte[] Imagen { get; set; }

        public virtual UsuarioImagenDetalle UsuarioImagenDetalle { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
}
