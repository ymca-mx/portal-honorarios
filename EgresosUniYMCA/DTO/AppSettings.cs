﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EgresosUniYMCA.DTO
{
    public class Jwt
    {
        public string SigningKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
    }

    public class AppSettings
    {
        public string ConnectionString { get; set; }
        public Jwt Jwt { get; set; }
    }
}
