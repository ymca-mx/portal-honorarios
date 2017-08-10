
using FluentValidation.Attributes;
using EgresosUniYMCA.ViewModels.Validations;

 [Validator(typeof(CredentialsViewModelValidator))]
public class CredentialsViewModel  
{
        public string UserName { get; set; }
        public string Password { get; set; }        
}