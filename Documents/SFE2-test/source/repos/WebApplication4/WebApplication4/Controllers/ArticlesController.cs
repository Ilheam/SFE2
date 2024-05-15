using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication4.Models;

namespace WebApplication4.Controllers
{
    [Route("api/Articles")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly Class1 _dbContext;

        public ArticlesController(Class1 dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            using (var conn = _dbContext.GetConnection())
            {
                conn.Open();
                using (var cmd = new MySqlCommand("SELECT * FROM articles", conn))
                using (var reader = cmd.ExecuteReader())
                {
                    var articles = new List<Article>();
                    while (reader.Read())
                    {
                        var article = new Article
                        {
                            ArticleId = Convert.ToInt32(reader["ArticleId"]),
                            NomArticle = reader["NomArticle"].ToString(),
                            Description = reader["Description"].ToString(),
                            Prix = Convert.ToDecimal(reader["Prix"]),
                            ImageArticle = reader["ImageArticle"].ToString(),
                            DateCreation = Convert.ToDateTime(reader["DateCreation"])
                        };
                        articles.Add(article);
                    }
                    return Ok(articles);
                }
            }
        }

        [HttpGet("{id}")]
        public IActionResult Details(int id)
        {
            using (var conn = _dbContext.GetConnection())
            {
                conn.Open();
                using (var cmd = new MySqlCommand("SELECT * FROM articles WHERE ArticleId = @id", conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            var article = new Article();
                            while (reader.Read())
                            {
                                article.ArticleId = Convert.ToInt32(reader["ArticleId"]);
                                article.NomArticle = reader["NomArticle"].ToString();
                                article.Description = reader["Description"].ToString();
                                article.Prix = Convert.ToDecimal(reader["Prix"]);
                                article.ImageArticle = reader["ImageArticle"].ToString();
                                article.DateCreation = Convert.ToDateTime(reader["DateCreation"]);
                            }
                            return Ok(article);
                        }
                        else
                        {
                            return NotFound();
                        }
                    }
                }
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Article article)
        {
            if (article == null)
            {
                return BadRequest("Article data is missing.");
            }

            using (var conn = _dbContext.GetConnection())
            {
                conn.Open();
                using (var cmd = new MySqlCommand("INSERT INTO articles (NomArticle, Description, Prix, ImageArticle, DateCreation) VALUES (@NomArticle, @Description, @Prix, @ImageArticle, @DateCreation)", conn))
                {
                    cmd.Parameters.AddWithValue("@NomArticle", article.NomArticle);
                    cmd.Parameters.AddWithValue("@Description", article.Description);
                    cmd.Parameters.AddWithValue("@Prix", article.Prix);
                    cmd.Parameters.AddWithValue("@ImageArticle", article.ImageArticle);
                    cmd.Parameters.AddWithValue("@DateCreation", article.DateCreation);
                    await cmd.ExecuteNonQueryAsync();
                }
            }
            return Ok(new { message = "Article created successfully." });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] Article article)
        {
            if (article == null)
            {
                return BadRequest("Article data is missing.");
            }

            using (var conn = _dbContext.GetConnection())
            {
                conn.Open();
                using (var cmd = new MySqlCommand("UPDATE articles SET NomArticle = @NomArticle, Description = @Description, Prix = @Prix, ImageArticle = @ImageArticle, DateCreation = @DateCreation WHERE ArticleId = @Id", conn))
                {
                    cmd.Parameters.AddWithValue("@NomArticle", article.NomArticle);
                    cmd.Parameters.AddWithValue("@Description", article.Description);
                    cmd.Parameters.AddWithValue("@Prix", article.Prix);
                    cmd.Parameters.AddWithValue("@ImageArticle", article.ImageArticle);
                    cmd.Parameters.AddWithValue("@DateCreation", article.DateCreation);
                    cmd.Parameters.AddWithValue("@Id", id);
                    await cmd.ExecuteNonQueryAsync();
                }
            }
            return Ok(new { message = "Article updated successfully." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            using (var conn = _dbContext.GetConnection())
            {
                conn.Open();
                using (var cmd = new MySqlCommand("DELETE FROM articles WHERE ArticleId = @Id", conn))
                {
                    cmd.Parameters.AddWithValue("@Id", id);
                    await cmd.ExecuteNonQueryAsync();
                }
            }
            return Ok(new { message = "Article deleted successfully." });
        }
    }
}
