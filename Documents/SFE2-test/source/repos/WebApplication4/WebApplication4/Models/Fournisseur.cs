using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication4.Models

{
    [Table("fournisseurs")]

    public class Fournisseur
    {
        [Key]
        public int FournisseurId { get; set; }
        public string Nom { get; set; }
        public string Telephone { get; set; }
        public string Designation { get; set; }
        public string Adresse { get; set; }  // Ensure this property exists

        public string Email { get; set; }
        // Autres propriétés spécifiques au fournisseur
    }
}
