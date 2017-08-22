using System;

namespace AuthServer.Extensions
{
    public class security
    {
        public static String Encripta(int clave, String cadena)
        {
            String Valores = "";
            for (int i = 0; i < cadena.Length; i++)
            {
                int iValor = (int)Convert.ToChar(cadena.Substring(i, 1)) * clave;
                String sHexa = String.Format("{0:X}", iValor);
                sHexa = "0" + sHexa;
                Valores += sHexa;
            }

            return Valores;
        }
    }
}
