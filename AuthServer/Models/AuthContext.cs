using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AuthServer.Models
{
    public partial class AuthContext : DbContext 
    {
        public virtual DbSet<Usuario> Usuario { get; set; }
        public virtual DbSet<UsuarioDetalle> UsuarioDetalle { get; set; }
        public virtual DbSet<UsuarioTipo> UsuarioTipo { get; set; }
        public virtual DbSet<Genero> Genero { get; set; }
        public virtual DbSet<Estatus> Estatus { get; set; }

        public AuthContext(DbContextOptions<AuthContext> options) 
            
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Estatus>(entity =>
            {
                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnType("varchar(50)");
            });
            
            modelBuilder.Entity<Genero>(entity =>
            {
                entity.Property(e => e.GeneroId).ValueGeneratedNever();

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnType("varchar(20)");
            });
            
            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.Property(e => e.UsuarioId).ValueGeneratedNever();

                entity.Property(e => e.Materno)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnType("varchar(200)");

                entity.Property(e => e.Paterno)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.HasOne(d => d.Estatus)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.EstatusId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Usuario_Estatus");

                entity.HasOne(d => d.UsuarioTipo)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.UsuarioTipoId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Usuario_UsuarioTipo");
            });
           
            modelBuilder.Entity<UsuarioDetalle>(entity =>
            {
                entity.HasKey(e => e.UsuarioId)
                    .HasName("PK__UsuarioD__2B3DE7B8BB2875D0");

                entity.Property(e => e.UsuarioId).ValueGeneratedNever();

                entity.Property(e => e.Celular)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.FechaNacimiento).HasColumnType("date");

                entity.Property(e => e.FechaRegistro).HasColumnType("date");

                entity.Property(e => e.Observaciones)
                    .IsRequired()
                    .HasColumnType("varchar(300)");

                entity.Property(e => e.Telefono)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.HasOne(d => d.Genero)
                    .WithMany(p => p.UsuarioDetalle)
                    .HasForeignKey(d => d.GeneroId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_UsuarioDetalle_Genero");

                entity.HasOne(d => d.Usuario)
                    .WithOne(p => p.UsuarioDetalle)
                    .HasForeignKey<UsuarioDetalle>(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_UsuarioDetalle_Usuario");
            });
            
            modelBuilder.Entity<UsuarioTipo>(entity =>
            {
                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnType("varchar(100)");
            });
        }
      


    }
}