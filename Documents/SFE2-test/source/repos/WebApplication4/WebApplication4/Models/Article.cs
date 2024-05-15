namespace WebApplication4.Models
{
    public class Article
    {
        public int ArticleId { get; set; }
        public string NomArticle { get; set; }
        public string Description { get; set; }
        public decimal Prix { get; set; }
        public string ImageArticle { get; set; }
        public DateTime DateCreation { get; set; }
    }
}
