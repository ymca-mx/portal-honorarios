using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AuthServer.Models;
using AuthServer.Extensions;

namespace AuthServer.Extensions
{
    public class User
    {
        readonly AuthContext _context;

        public User(AuthContext context)
        {
            _context = context;
        }

        public bool CheckPassword(Usuario User, string password)
        {
            string pass = security.Encripta(27,password);

            return _context.UsuarioDetalle.Count(x => x.UsuarioId == User.UsuarioId && x.Usuario.Password == pass) > 0 ? true : false;
        }

        public Usuario GetUser(ClaimsPrincipal claim)
        {
            return _context.Usuario.SingleOrDefault(x => x.UsuarioId == int.Parse(claim.FindFirst(n => n.Type == "sub").Value));
        }
    }
}
