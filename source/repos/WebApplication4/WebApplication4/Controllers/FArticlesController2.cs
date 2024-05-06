using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using WebApplication4.Models;

namespace WebApplication4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FArticlesController2 : ControllerBase
    {
        private readonly Class1 _connection;

        public FArticlesController2(Class1 connection)
        {
            _connection = connection;
        }

        // GET: api/FArticles
        [HttpGet]
        public IActionResult Index()
        {
            using (var conn = _connection.GetConnection())
            {
                conn.Open();
                using (var cmd = new MySqlCommand("SELECT * FROM FamilleArticle", conn))
                using (var reader = cmd.ExecuteReader())
                {
                    var familleArticles = new List<FamilleArticle>();
                    while (reader.Read())
                    {
                        var familleArticle = new FamilleArticle
                        {
                            FamilleArticleId = Convert.ToInt32(reader["FamilleArticleId"]),
                            Nom = reader["Nom"].ToString(),
                            Description = reader["Description"].ToString(),
                            Prix = Convert.ToDecimal(reader["Prix"]),
                            Image = reader["Image"].ToString(),
                            DateCreation = Convert.ToDateTime(reader["DateCreation"]),
                            Categorie = reader["Categorie"].ToString()
                        };
                        familleArticles.Add(familleArticle);
                    }
                    return Ok(familleArticles);
                }
            }
        }

        // GET: api/FArticles/Details/5
        [HttpGet("{id}")]
        public IActionResult Details(int? id)
        {
            if (id == null)
            {
                return BadRequest("Id parameter is required.");
            }

            using (var conn = _connection.GetConnection())
            {
                conn.Open();
                using (var cmd = new MySqlCommand("SELECT * FROM FamilleArticle WHERE FamilleArticleId = @id", conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            var familleArticle = new FamilleArticle();
                            while (reader.Read())
                            {
                                familleArticle.FamilleArticleId = Convert.ToInt32(reader["FamilleArticleId"]);
                                familleArticle.Nom = reader["Nom"].ToString();
                                familleArticle.Description = reader["Description"].ToString();
                                familleArticle.Prix = Convert.ToDecimal(reader["Prix"]);
                                familleArticle.Image = reader["Image"].ToString();
                                familleArticle.DateCreation = Convert.ToDateTime(reader["DateCreation"]);
                                familleArticle.Categorie = reader["Categorie"].ToString();
                            }
                            return Ok(familleArticle);
                        }
                        else
                        {
                            return NotFound();
                        }
                    }
                }
            }
        }

        // POST: api/FArticles/Create
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] FamilleArticle familleArticle)
        {
            if (familleArticle == null)
            {
                return BadRequest("FamilleArticle data is missing.");
            }

            using (var conn = _connection.GetConnection())
            {
                conn.Open();
                using (var cmd = new MySqlCommand("INSERT INTO FamilleArticles (Nom, Description, Prix, Image, DateCreation, Categorie) VALUES (@Nom, @Description, @Prix, @Image, @DateCreation, @Categorie)", conn))
                {
                    cmd.Parameters.AddWithValue("@Nom", familleArticle.Nom);
                    cmd.Parameters.AddWithValue("@Description", familleArticle.Description);
                    cmd.Parameters.AddWithValue("@Prix", familleArticle.Prix);
                    cmd.Parameters.AddWithValue("@Image", familleArticle.Image);
                    cmd.Parameters.AddWithValue("@DateCreation", familleArticle.DateCreation);
                    cmd.Parameters.AddWithValue("@Categorie", familleArticle.Categorie);
                    await cmd.ExecuteNonQueryAsync();
                }
            }
            return Ok("FamilleArticle created successfully.");
        }

        // PUT: api/FArticles/Edit/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] FamilleArticle familleArticle)
        {
            if (id != familleArticle?.FamilleArticleId)
            {
                return BadRequest("Id in the URL does not match the FamilleArticle Id.");
            }

            if (familleArticle == null)
            {
                return BadRequest("FamilleArticle data is missing.");
            }

            using (var conn = _connection.GetConnection())
            {
                conn.Open();
                using (var cmd = new MySqlCommand("UPDATE FamilleArticles SET Nom = @Nom, Description = @Description, Prix = @Prix, Image = @Image, DateCreation = @DateCreation, Categorie = @Categorie WHERE FamilleArticleId = @Id", conn))
                {
                    cmd.Parameters.AddWithValue("@Nom", familleArticle.Nom);
                    cmd.Parameters.AddWithValue("@Description", familleArticle.Description);
                    cmd.Parameters.AddWithValue("@Prix", familleArticle.Prix);
                    cmd.Parameters.AddWithValue("@Image", familleArticle.Image);
                    cmd.Parameters.AddWithValue("@DateCreation", familleArticle.DateCreation);
                    cmd.Parameters.AddWithValue("@Categorie", familleArticle.Categorie);
                    cmd.Parameters.AddWithValue("@Id", id);
                    await cmd.ExecuteNonQueryAsync();
                }
            }
            return Ok("FamilleArticle updated successfully.");
        }

        // DELETE: api/FArticles/Delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            using (var conn = _connection.GetConnection())
            {
                conn.Open();
                using (var cmd = new MySqlCommand("DELETE FROM FamilleArticle WHERE FamilleArticleId = @Id", conn))
                {
                    cmd.Parameters.AddWithValue("@Id", id);
                    await cmd.ExecuteNonQueryAsync();
                }
            }
            return Ok("FamilleArticle deleted successfully.");
        }
    }
}