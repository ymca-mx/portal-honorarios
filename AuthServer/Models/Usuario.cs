using System;
using System.Collections.Generic;

namespace AuthServer.Models
{
    public partial class Usuario
    {
        public Usuario()
        {
        }

        public int UsuarioId { get; set; }
        public string Nombre { get; set; }
        public string Paterno { get; set; }
        public string Materno { get; set; }
        public string Password { get; set; }
        public int UsuarioTipoId { get; set; }
        public int EstatusId { get; set; }
        
        public virtual UsuarioDetalle UsuarioDetalle { get; set; }
        public virtual Estatus Estatus { get; set; }
        public virtual UsuarioTipo UsuarioTipo { get; set; }
    }
}
