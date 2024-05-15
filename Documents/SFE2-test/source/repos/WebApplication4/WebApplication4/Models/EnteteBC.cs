using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication4.Models
{
    [Table("entete_bc")] // Ensure this matches the actual table name

    public class Entete_BC
    {
        public int Id { get; set; }
        public int IdArticle { get; set; }
        public int IdFournisseur { get; set; }
        public string NumeroBonCommande { get; set; }
        public DateTime Date { get; set; }
        public decimal Devis { get; set; }
    }
}