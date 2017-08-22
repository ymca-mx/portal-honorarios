using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AspNet.Security.OpenIdConnect.Primitives;
using AspNet.Security.OpenIdConnect.Server;
using System.Security.Claims;
using AspNet.Security.OpenIdConnect.Extensions;
using AuthServer.Models;
using Microsoft.Extensions.Options;
using AuthServer.Extensions;
using Microsoft.AspNetCore.Authentication;
using OpenIddict.Core;
using Microsoft.AspNetCore.Http.Authentication;

namespace AuthServer.Controllers
{
    public class AuthorizationController : Controller
    {

        readonly  AuthContext _context;
        private readonly AppSettings _settings;

        public AuthorizationController(AuthContext context, IOptions<AppSettings> settings)
        {
            _context = context;
            _settings = settings.Value;
        }


        [HttpPost("~/connect/token"), Produces("application/json")]
        public  async Task<IActionResult>  Exchange(OpenIdConnectRequest request)
        {
            
            if (request.IsPasswordGrantType())
            {
                var user = _context.Usuario.SingleOrDefault(x => x.UsuarioId == int.Parse(request.Username));

                if (user == null)
                {
                    return BadRequest(new OpenIdConnectResponse
                    {
                        Error = OpenIdConnectConstants.Errors.InvalidGrant,
                        ErrorDescription = "The user is invalid."
                    });
                }

                if (!new User(_context).CheckPassword(user, request.Password))
                {
                    return BadRequest(new OpenIdConnectResponse
                    {
                        Error = OpenIdConnectConstants.Errors.InvalidGrant,
                        ErrorDescription = "The password is invalid."
                    });
                }

                var ticket = await CreateTicketAsync(request, user);
                return SignIn(ticket.Principal, ticket.Properties, ticket.AuthenticationScheme);
            }

            if (request.IsRefreshTokenGrantType())
            {
                var info = await HttpContext.Authentication.GetAuthenticateInfoAsync(OpenIdConnectServerDefaults.AuthenticationScheme);
                var user = new User(_context).GetUser(info.Principal);

                if (user == null)
                {
                    return BadRequest(new OpenIdConnectResponse
                    {
                        Error = OpenIdConnectConstants.Errors.InvalidGrant,
                        ErrorDescription = "The refresh token is no longer valid."
                    });
                }

                var ticket = await CreateTicketAsync(request, user, info.Properties);
                return SignIn(ticket.Principal, ticket.Properties, ticket.AuthenticationScheme);
            }

            return BadRequest(new OpenIdConnectResponse
            {
                Error = OpenIdConnectConstants.Errors.UnsupportedGrantType,
                ErrorDescription = "The specified grant type is not supported."
            });

        }

        private async Task<AuthenticationTicket> CreateTicketAsync(OpenIdConnectRequest request, Usuario User, AuthenticationProperties properties = null)
        {
            var identity =
            new ClaimsIdentity(
                OpenIdConnectServerDefaults.AuthenticationScheme,
                OpenIdConnectConstants.Claims.Name,
                OpenIdConnectConstants.Claims.Role
                );

            identity.AddClaim(OpenIdConnectConstants.Claims.Subject, $"{User.UsuarioId}", OpenIdConnectConstants.Destinations.AccessToken);
            identity.AddClaim(OpenIdConnectConstants.Claims.Name, User.Nombre, OpenIdConnectConstants.Destinations.AccessToken);

            var principal = new ClaimsPrincipal(identity);

            var ticket = new AuthenticationTicket(principal, properties, OpenIdConnectServerDefaults.AuthenticationScheme);

            if (!request.IsRefreshTokenGrantType())
            {
                ticket.SetScopes(new[]
                {
                    OpenIdConnectConstants.Scopes.OpenId,
                    OpenIdConnectConstants.Scopes.Email,
                    OpenIdConnectConstants.Scopes.Profile,
                    OpenIdConnectConstants.Scopes.OfflineAccess,
                    OpenIddictConstants.Scopes.Roles
                }.Intersect(request.GetScopes()));

                ticket.SetResources("resource_server");

                foreach (var claim in ticket.Principal.Claims)
                {
                    var destinations = new List<string>
                    {
                        OpenIdConnectConstants.Destinations.AccessToken
                    };

                    if ((claim.Type == OpenIdConnectConstants.Claims.Name && ticket.HasScope(OpenIdConnectConstants.Scopes.Profile)) ||
                        (claim.Type == OpenIdConnectConstants.Claims.Email && ticket.HasScope(OpenIdConnectConstants.Scopes.Email)) ||
                        (claim.Type == OpenIdConnectConstants.Claims.Role && ticket.HasScope(OpenIddictConstants.Claims.Roles)))
                    {
                        destinations.Add(OpenIdConnectConstants.Destinations.IdentityToken);
                    }

                    claim.SetDestinations(destinations);
                }
            }

            return ticket;
        }
    }

    

}


