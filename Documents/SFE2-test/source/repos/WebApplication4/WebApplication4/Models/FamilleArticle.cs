using System.ComponentModel.DataAnnotations;

namespace WebApplication4.Models
{
    public class FamilleArticle
    {
        //you dont have to add the key attribute, just addidng to be explicit
        [Key]
        public int FamilleArticleId { get; set; }
        public string Nom { get; set; }
        public string Description { get; set; }
        public decimal Prix { get; set; }
        public string Image { get; set; }
        public DateTime DateCreation { get; set; }
        public string Categorie { get; set; }
    }
}
