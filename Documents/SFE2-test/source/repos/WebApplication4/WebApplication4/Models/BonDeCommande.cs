﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication4.Models
{
    [Table("bondecommandes")] // Ensure this matches the actual table name

    public class BonDeCommande
    {
        public int Id { get; set; } // This will be the primary key

        public int EnteteId { get; set; }
        public Entete_BC Entete { get; set; }
        public List<DetailsBc> Details { get; set; }
    }
}