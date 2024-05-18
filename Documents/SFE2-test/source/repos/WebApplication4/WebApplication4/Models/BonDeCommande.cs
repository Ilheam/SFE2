﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebApplication4.Models
{
    [Table("bondecommandes")]
    public class BonDeCommande
    {
        public int Id { get; set; }
        public int EnteteId { get; set; }
        public Entete_BC Entete { get; set; }
        public int DetailId { get; set; }
        public DetailsBc Detail { get; set; }
        [JsonIgnore]
        public List<DetailsBc> Details { get; set; } = new List<DetailsBc>();
        [NotMapped]
        public string FournisseurNom { get; set; }
        [NotMapped]
        public string ArticleNom { get; set; }
    }
}