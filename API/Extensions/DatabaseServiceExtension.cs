using System;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;

namespace API.Extensions
{
    public static class DatabaseServiceExtension
    {
        public static IServiceCollection AddDatabaseServices(this IServiceCollection services, IConfiguration config)
        {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            string connectionString;

            services.AddDbContext<StoreContext>(opt =>
            {
                if (env == "Development")
                {
                    connectionString = config.GetConnectionString("DefaultConnection");
                }
                else
                {
                    connectionString = GetConnectionString("DATABASE_URL");
                }

                opt.UseNpgsql(connectionString);
            });

            services.AddDbContext<AppIdentityDbContext>(opt =>
            {
                if (env == "Development")
                {
                    connectionString = config.GetConnectionString("IdentityConnection");
                }
                else
                {
                    connectionString = GetConnectionString("HEROKU_POSTGRESQL_CHARCOAL_URL");
                }

                opt.UseNpgsql(connectionString);
            });

            services.AddSingleton<IConnectionMultiplexer>(_ =>
            {
                ConfigurationOptions configuration;
                if (env == "Development")
                {
                    configuration = ConfigurationOptions.Parse(config.GetConnectionString("Redis"), true);
                }
                else
                {
                    var tokens = Environment.GetEnvironmentVariable("REDIS_URL").Split(':', '@');
                    configuration = ConfigurationOptions.Parse(string.Format("{0}:{1},password={2}", tokens[3], tokens[4], tokens[2]), true);
                }

                return ConnectionMultiplexer.Connect(configuration);
            });

            return services;

        }
        private static string GetConnectionString(string url)
        {
            string connstr;
            var connUrl = Environment.GetEnvironmentVariable(url);

            // Parse connection URL to connection string for Npgsql
            connUrl = connUrl.Replace("postgres://", string.Empty);
            var pgUserPass = connUrl.Split("@")[0];
            var pgHostPortDb = connUrl.Split("@")[1];
            var pgHostPort = pgHostPortDb.Split("/")[0];
            var pgDb = pgHostPortDb.Split("/")[1];
            var pgUser = pgUserPass.Split(":")[0];
            var pgPass = pgUserPass.Split(":")[1];
            var pgHost = pgHostPort.Split(":")[0];
            var pgPort = pgHostPort.Split(":")[1];

            connstr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb}; SSL Mode=Require; Trust Server Certificate=true";
            return connstr;
        }
    }


}