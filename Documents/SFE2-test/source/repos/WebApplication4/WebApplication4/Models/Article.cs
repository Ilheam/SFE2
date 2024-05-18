using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication4.Models
{
    //[Table("articles")] // Ensure this matches the actual table name

    public class Article
    {

        [Key]
        public int ArticleId { get; set; }
        public string NomArticle { get; set; }
        public string Description { get; set; }
        public decimal Prix { get; set; }
        public string ImageArticle { get; set; }
        public DateTime DateCreation { get; set; }
    }
}
