using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebApplication4.Models
{
    [Table("detailsbc")] // Ensure this matches the actual table name

    public class DetailsBc
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "La validation 1 est requise")]
        public string Validation1 { get; set; }

        [Range(1, 100, ErrorMessage = "La validation 2 doit être entre 1 et 100")]
        public int Validation2 { get; set; }

        public int IdArticle { get; set; }
        public int Quantite { get; set; }
        public decimal PrixUnitaire { get; set; }
        [JsonIgnore]

        public decimal Montant { get { return Quantite * PrixUnitaire; } }
        public int BonDeCommandeId { get; set; }
        [JsonIgnore]


        public BonDeCommande BonDeCommande { get; set; }
    }
}